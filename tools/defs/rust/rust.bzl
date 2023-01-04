# Copyright 2015 The Bazel Authors. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# buildifier: disable=module-docstring
load("@bazel_skylib//lib:paths.bzl", "paths")
load("@rules_rust//rust/private:common.bzl", "rust_common")
load("@rules_rust//rust/private:rustc.bzl", "rustc_compile_action")
load(
    "@rules_rust//rust/private:utils.bzl",
    "can_build_metadata",
    "compute_crate_name",
    "crate_root_src",
    "dedent",
    "determine_output_hash",
    "expand_dict_value_locations",
    "find_toolchain",
    "get_import_macro_deps",
    "transform_deps",
)
# TODO(marco): Separate each rule into its own file.

def _assert_no_deprecated_attributes(_ctx):
    """Forces a failure if any deprecated attributes were specified

    Args:
        _ctx (ctx): The current rule's context object
    """
    pass

def _assert_correct_dep_mapping(ctx):
    """Forces a failure if proc_macro_deps and deps are mixed inappropriately

    Args:
        ctx (ctx): The current rule's context object
    """
    for dep in ctx.attr.deps:
        if rust_common.crate_info in dep:
            if dep[rust_common.crate_info].type == "proc-macro":
                fail(
                    "{} listed {} in its deps, but it is a proc-macro. It should instead be in the bazel property proc_macro_deps.".format(
                        ctx.label,
                        dep.label,
                    ),
                )
    for dep in ctx.attr.proc_macro_deps:
        type = dep[rust_common.crate_info].type
        if type != "proc-macro":
            fail(
                "{} listed {} in its proc_macro_deps, but it is not proc-macro, it is a {}. It should probably instead be listed in deps.".format(
                    ctx.label,
                    dep.label,
                    type,
                ),
            )

def get_edition(attr, toolchain, label):
    """Returns the Rust edition from either the current rule's attirbutes or the current `rust_toolchain`

    Args:
        attr (struct): The current rule's attributes
        toolchain (rust_toolchain): The `rust_toolchain` for the current target
        label (Label): The label of the target being built

    Returns:
        str: The target Rust edition
    """
    if getattr(attr, "edition"):
        return attr.edition
    elif not toolchain.default_edition:
        fail("Attribute `edition` is required for {}.".format(label))
    else:
        return toolchain.default_edition

def _transform_sources(ctx, srcs, crate_root):
    """Creates symlinks of the source files if needed.

    Rustc assumes that the source files are located next to the crate root.
    In case of a mix between generated and non-generated source files, this
    we violate this assumption, as part of the sources will be located under
    bazel-out/... . In order to allow for targets that contain both generated
    and non-generated source files, we generate symlinks for all non-generated
    files.

    Args:
        ctx (struct): The current rule's context.
        srcs (List[File]): The sources listed in the `srcs` attribute
        crate_root (File): The file specified in the `crate_root` attribute,
                           if it exists, otherwise None

    Returns:
        Tuple(List[File], File): The transformed srcs and crate_root
    """
    has_generated_sources = len([src for src in srcs if not src.is_source]) > 0

    if not has_generated_sources:
        return srcs, crate_root

    generated_sources = []

    generated_root = crate_root
    package_root = paths.dirname(ctx.build_file_path)

    if crate_root and (crate_root.is_source or crate_root.root.path != ctx.bin_dir.path):
        generated_root = ctx.actions.declare_file(paths.relativize(crate_root.short_path, package_root))
        ctx.actions.symlink(
            output = generated_root,
            target_file = crate_root,
            progress_message = "Creating symlink to source file: {}".format(crate_root.path),
        )
    if generated_root:
        generated_sources.append(generated_root)

    for src in srcs:
        # We took care of the crate root above.
        if src == crate_root:
            continue
        if src.is_source or src.root.path != ctx.bin_dir.path:
            src_symlink = ctx.actions.declare_file(paths.relativize(src.short_path, package_root))
            ctx.actions.symlink(
                output = src_symlink,
                target_file = src,
                progress_message = "Creating symlink to source file: {}".format(src.path),
            )
            generated_sources.append(src_symlink)
        else:
            generated_sources.append(src)

    return generated_sources, generated_root

def _rust_binary_impl(ctx):
    """The implementation of the `rust_binary` rule

    Args:
        ctx (ctx): The rule's context object

    Returns:
        list: A list of providers. See `rustc_compile_action`
    """
    toolchain = find_toolchain(ctx)
    crate_name = compute_crate_name(ctx.workspace_name, ctx.label, toolchain, ctx.attr.crate_name)
    _assert_correct_dep_mapping(ctx)

    output = ctx.actions.declare_file(ctx.label.name + toolchain.binary_ext)

    deps = transform_deps(ctx.attr.deps)
    proc_macro_deps = transform_deps(ctx.attr.proc_macro_deps + get_import_macro_deps(ctx))

    srcs, crate_root = _transform_sources(ctx, ctx.files.srcs, getattr(ctx.file, "crate_root", None))
    if not crate_root:
        crate_root = crate_root_src(ctx.attr.name, srcs, ctx.attr.crate_type)

    return rustc_compile_action(
        ctx = ctx,
        attr = ctx.attr,
        toolchain = toolchain,
        crate_info = rust_common.create_crate_info(
            name = crate_name,
            type = ctx.attr.crate_type,
            root = crate_root,
            srcs = depset(srcs),
            deps = depset(deps),
            proc_macro_deps = depset(proc_macro_deps),
            aliases = ctx.attr.aliases,
            output = output,
            extra_outputs = ctx.attr.extra_outputs,
            edition = get_edition(ctx.attr, toolchain, ctx.label),
            rustc_env = ctx.attr.rustc_env,
            rustc_env_files = ctx.files.rustc_env_files,
            is_test = False,
            compile_data = depset(ctx.files.compile_data),
            owner = ctx.label,
        ),
    )

def _stamp_attribute(default_value):
    return attr.int(
        doc = dedent("""\
            Whether to encode build information into the `Rustc` action. Possible values:

            - `stamp = 1`: Always stamp the build information into the `Rustc` action, even in \
            [--nostamp](https://docs.bazel.build/versions/main/user-manual.html#flag--stamp) builds. \
            This setting should be avoided, since it potentially kills remote caching for the target and \
            any downstream actions that depend on it.

            - `stamp = 0`: Always replace build information by constant values. This gives good build result caching.

            - `stamp = -1`: Embedding of build information is controlled by the \
            [--[no]stamp](https://docs.bazel.build/versions/main/user-manual.html#flag--stamp) flag.

            Stamped targets are not rebuilt unless their dependencies change.

            For example if a `rust_library` is stamped, and a `rust_binary` depends on that library, the stamped
            library won't be rebuilt when we change sources of the `rust_binary`. This is different from how
            [`cc_library.linkstamps`](https://docs.bazel.build/versions/main/be/c-cpp.html#cc_library.linkstamp)
            behaves.
        """),
        default = default_value,
        values = [1, 0, -1],
    )

_common_attrs = {
    "aliases": attr.label_keyed_string_dict(
        doc = dedent("""\
            Remap crates to a new name or moniker for linkage to this target

            These are other `rust_library` targets and will be presented as the new name given.
        """),
    ),
    "compile_data": attr.label_list(
        doc = dedent("""\
            List of files used by this rule at compile time.

            This attribute can be used to specify any data files that are embedded into
            the library, such as via the
            [`include_str!`](https://doc.rust-lang.org/std/macro.include_str!.html)
            macro.
        """),
        allow_files = True,
    ),
    "crate_features": attr.string_list(
        doc = dedent("""\
            List of features to enable for this crate.

            Features are defined in the code using the `#[cfg(feature = "foo")]`
            configuration option. The features listed here will be passed to `rustc`
            with `--cfg feature="${feature_name}"` flags.
        """),
    ),
    "crate_name": attr.string(
        doc = dedent("""\
            Crate name to use for this target.

            This must be a valid Rust identifier, i.e. it may contain only alphanumeric characters and underscores.
            Defaults to the target name, with any hyphens replaced by underscores.
        """),
    ),
    "crate_root": attr.label(
        doc = dedent("""\
            The file that will be passed to `rustc` to be used for building this crate.

            If `crate_root` is not set, then this rule will look for a `lib.rs` file (or `main.rs` for rust_binary)
            or the single file in `srcs` if `srcs` contains only one file.
        """),
        allow_single_file = [".rs"],
    ),
    "data": attr.label_list(
        doc = dedent("""\
            List of files used by this rule at compile time and runtime.

            If including data at compile time with include_str!() and similar,
            prefer `compile_data` over `data`, to prevent the data also being included
            in the runfiles.
        """),
        allow_files = True,
    ),
    "deps": attr.label_list(
        doc = dedent("""\
            List of other libraries to be linked to this library target.

            These can be either other `rust_library` targets or `cc_library` targets if
            linking a native library.
        """),
    ),
    "edition": attr.string(
        doc = "The rust edition to use for this crate. Defaults to the edition specified in the rust_toolchain.",
    ),
    # Previously `proc_macro_deps` were a part of `deps`, and then proc_macro_host_transition was
    # used into cfg="host" using `@local_config_platform//:host`.
    # This fails for remote execution, which needs cfg="exec", and there isn't anything like
    # `@local_config_platform//:exec` exposed.
    "proc_macro_deps": attr.label_list(
        doc = dedent("""\
            List of `rust_library` targets with kind `proc-macro` used to help build this library target.
        """),
        cfg = "exec",
        providers = [rust_common.crate_info],
    ),
    "rustc_env": attr.string_dict(
        doc = dedent("""\
            Dictionary of additional `"key": "value"` environment variables to set for rustc.

            rust_test()/rust_binary() rules can use $(rootpath //package:target) to pass in the
            location of a generated file or external tool. Cargo build scripts that wish to
            expand locations should use cargo_build_script()'s build_script_env argument instead,
            as build scripts are run in a different environment - see cargo_build_script()'s
            documentation for more.
        """),
    ),
    "rustc_env_files": attr.label_list(
        doc = dedent("""\
            Files containing additional environment variables to set for rustc.

            These files should  contain a single variable per line, of format
            `NAME=value`, and newlines may be included in a value by ending a
            line with a trailing back-slash (`\\\\`).

            The order that these files will be processed is unspecified, so
            multiple definitions of a particular variable are discouraged.

            Note that the variables here are subject to
            [workspace status](https://docs.bazel.build/versions/main/user-manual.html#workspace_status)
            stamping should the `stamp` attribute be enabled. Stamp variables
            should be wrapped in brackets in order to be resolved. E.g.
            `NAME={WORKSPACE_STATUS_VARIABLE}`.
        """),
        allow_files = True,
    ),
    "rustc_flags": attr.string_list(
        doc = dedent("""\
            List of compiler flags passed to `rustc`.

            These strings are subject to Make variable expansion for predefined
            source/output path variables like `$location`, `$execpath`, and
            `$rootpath`. This expansion is useful if you wish to pass a generated
            file of arguments to rustc: `@$(location //package:target)`.
        """),
    ),
    # TODO(stardoc): How do we provide additional documentation to an inherited attribute?
    # "name": attr.string(
    #     doc = "This name will also be used as the name of the crate built by this rule.",
    # `),
    "srcs": attr.label_list(
        doc = dedent("""\
            List of Rust `.rs` source files used to build the library.

            If `srcs` contains more than one file, then there must be a file either
            named `lib.rs`. Otherwise, `crate_root` must be set to the source file that
            is the root of the crate to be passed to rustc to build this crate.
        """),
        allow_files = [".rs"],
    ),
    "stamp": _stamp_attribute(default_value = 0),
    "version": attr.string(
        doc = "A version to inject in the cargo environment variable.",
        default = "0.0.0",
    ),
    "_cc_toolchain": attr.label(
        doc = (
            "In order to use find_cc_toolchain, your rule has to depend " +
            "on C++ toolchain. See `@rules_cc//cc:find_cc_toolchain.bzl` " +
            "docs for details."
        ),
        default = Label("@bazel_tools//tools/cpp:current_cc_toolchain"),
    ),
    "_collect_cc_coverage": attr.label(
        default = Label("@rules_rust//util:collect_coverage"),
        executable = True,
        cfg = "exec",
    ),
    "_error_format": attr.label(
        default = Label("@rules_rust//:error_format"),
    ),
    "_extra_exec_rustc_flag": attr.label(
        default = Label("@rules_rust//:extra_exec_rustc_flag"),
    ),
    "_extra_exec_rustc_flags": attr.label(
        default = Label("@rules_rust//:extra_exec_rustc_flags"),
    ),
    "_extra_rustc_flag": attr.label(
        default = Label("@rules_rust//:extra_rustc_flag"),
    ),
    "_extra_rustc_flags": attr.label(
        default = Label("@rules_rust//:extra_rustc_flags"),
    ),
    "_import_macro_dep": attr.label(
        default = Label("@rules_rust//util/import"),
        cfg = "exec",
    ),
    "_is_proc_macro_dep": attr.label(
        default = Label("@rules_rust//:is_proc_macro_dep"),
    ),
    "_is_proc_macro_dep_enabled": attr.label(
        default = Label("@rules_rust//:is_proc_macro_dep_enabled"),
    ),
    "_process_wrapper": attr.label(
        doc = "A process wrapper for running rustc on all platforms.",
        default = Label("@rules_rust//util/process_wrapper"),
        executable = True,
        allow_single_file = True,
        cfg = "exec",
    ),
    "_stamp_flag": attr.label(
        doc = "A setting used to determine whether or not the `--stamp` flag is enabled",
        default = Label("@rules_rust//rust/private:stamp"),
    ),
}

_experimental_use_cc_common_link_attrs = {
    "experimental_use_cc_common_link": attr.int(
        doc = (
            "Whether to use cc_common.link to link rust binaries. " +
            "Possible values: [-1, 0, 1]. " +
            "-1 means use the value of the toolchain.experimental_use_cc_common_link " +
            "boolean build setting to determine. " +
            "0 means do not use cc_common.link (use rustc instead). " +
            "1 means use cc_common.link."
        ),
        values = [-1, 0, 1],
        default = -1,
    ),
}

_common_providers = [
    rust_common.crate_info,
    rust_common.dep_info,
    DefaultInfo,
]

_rust_binary_attrs = dict({
    "crate_type": attr.string(
        doc = dedent("""\
            Crate type that will be passed to `rustc` to be used for building this crate.

            This option is a temporary workaround and should be used only when building
            for WebAssembly targets (//rust/platform:wasi and //rust/platform:wasm).
        """),
        default = "bin",
    ),
    "linker_script": attr.label(
        doc = dedent("""\
            Link script to forward into linker via rustc options.
        """),
        cfg = "exec",
        allow_single_file = True,
    ),
    "extra_outputs": attr.string_list(
        doc = dedent("""\
            List of extra outputs to expect from the `rustc` invocation.

            For example, if you are expecting LLVM bitcode (from passing `--emit=llvm-bc`),
            you can list `<file>.bc` here to add it to the action outputs.
        """),
    ),
    "out_binary": attr.bool(
        doc = (
            "Force a target, regardless of it's `crate_type`, to always mark the " +
            "file as executable. This attribute is only used to support wasm targets but is " +
            "expected to be removed following a resolution to https://github.com/bazelbuild/rules_rust/issues/771."
        ),
        default = False,
    ),
    "stamp": _stamp_attribute(default_value = -1),
    "_grep_includes": attr.label(
        allow_single_file = True,
        cfg = "exec",
        default = Label("@bazel_tools//tools/cpp:grep-includes"),
        executable = True,
    ),
}.items() + _experimental_use_cc_common_link_attrs.items())

rust_binary = rule(
    implementation = _rust_binary_impl,
    provides = _common_providers,
    attrs = dict(_common_attrs.items() + _rust_binary_attrs.items()),
    executable = True,
    fragments = ["cpp"],
    host_fragments = ["cpp"],
    toolchains = [
        str(Label("@rules_rust//rust:toolchain_type")),
        "@bazel_tools//tools/cpp:toolchain_type",
    ],
    incompatible_use_toolchain_transition = True,
    doc = dedent("""\
        Builds a Rust binary crate.

        Example:

        Suppose you have the following directory structure for a Rust project with a
        library crate, `hello_lib`, and a binary crate, `hello_world` that uses the
        `hello_lib` library:

        ```output
        [workspace]/
            WORKSPACE
            hello_lib/
                BUILD
                src/
                    lib.rs
            hello_world/
                BUILD
                src/
                    main.rs
        ```

        `hello_lib/src/lib.rs`:
        ```rust
        pub struct Greeter {
            greeting: String,
        }

        impl Greeter {
            pub fn new(greeting: &str) -> Greeter {
                Greeter { greeting: greeting.to_string(), }
            }

            pub fn greet(&self, thing: &str) {
                println!("{} {}", &self.greeting, thing);
            }
        }
        ```

        `hello_lib/BUILD`:
        ```python
        package(default_visibility = ["//visibility:public"])

        load("@rules_rust//rust:defs.bzl", "rust_library")

        rust_library(
            name = "hello_lib",
            srcs = ["src/lib.rs"],
        )
        ```

        `hello_world/src/main.rs`:
        ```rust
        extern crate hello_lib;

        fn main() {
            let hello = hello_lib::Greeter::new("Hello");
            hello.greet("world");
        }
        ```

        `hello_world/BUILD`:
        ```python
        load("@rules_rust//rust:defs.bzl", "rust_binary")

        rust_binary(
            name = "hello_world",
            srcs = ["src/main.rs"],
            deps = ["//hello_lib"],
        )
        ```

        Build and run `hello_world`:
        ```
        $ bazel run //hello_world
        INFO: Found 1 target...
        Target //examples/rust/hello_world:hello_world up-to-date:
        bazel-bin/examples/rust/hello_world/hello_world
        INFO: Elapsed time: 1.308s, Critical Path: 1.22s

        INFO: Running command line: bazel-bin/examples/rust/hello_world/hello_world
        Hello world
        ```

        On Windows, a PDB file containing debugging information is available under
        the key `pdb_file` in `OutputGroupInfo`. Similarly on macOS, a dSYM folder
        is available under the key `dsym_folder` in `OutputGroupInfo`.
"""),
)
