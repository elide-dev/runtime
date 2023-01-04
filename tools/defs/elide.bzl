"""Macros and definitions for defining Elide Runtime targets."""

load(
    "//tools:config.bzl",
    _ENABLE_J2CL = "ENABLE_J2CL",
    _ENABLE_J2WASM = "ENABLE_J2WASM",
)
load(
    "//elide/runtime/js:config.bzl",
    _DEBUG = "DEBUG",
    _DEFINES = "DEFINES",
    _JS_ARGS = "JS_ARGS",
    _JS_LANGUAGE = "JS_LANGUAGE",
    _JS_TARGET = "JS_TARGET",
)
load(
    "//tools/defs/closure:exports.bzl",
    _closure_js_binary = "closure_js_binary",
    _closure_js_library = "closure_js_library",
)
load(
    "//tools/defs/pkg:exports.bzl",
    _pkg_tar = "pkg_tar",
    _pkg_zip = "pkg_zip",
)
load(
    "//tools/defs/java:exports.bzl",
    _jar_resources = "jar_resources",
)
load(
    "//tools/defs/esbuild:exports.bzl",
    _esbuild = "esbuild",
    _esbuild_config = "esbuild_config",
)
load(
    "//tools/defs/j2cl:exports.bzl",
    _j2cl_application = "j2cl_application",
    _j2cl_library = "j2cl_library",
    _j2wasm_application = "j2wasm_application",
    _j2wasm_library = "j2wasm_library",
)
load(
    "//tools/defs/tsc:exports.bzl",
    _ts_config = "ts_config",
    _ts_library = "ts_library",
    _ts_project = "ts_project",
)
load(
    "//tools/defs/elide:elide.bzl",
    _elide_test = "elide_test",
)

_RUNTIME_JS_ARGS = _JS_ARGS + [
    # Additional Closure Compiler arguments for the runtime.
    "--env=CUSTOM",
    "--inject_libraries=false",
    "--rewrite_polyfills=false",
]

_RUNTIME_DEFINES = {}
_RUNTIME_DEFINES.update(_DEFINES)
_RUNTIME_DEFINES.update({
    # Additional runtime definitions here.
})

_common_js_library_config = {
    "language": _JS_LANGUAGE,
}

_base_js_library_config = {
    "convention": "CLOSURE",
}

_base_js_runtime_config = {
    "language": _JS_LANGUAGE,
    "dependency_mode": "PRUNE",
    "output_wrapper": "(function(){%output%}).call({});",
}

_ts_compiler_args = {
    "allow_js": False,
    "source_map": True,
    "composite": True,
    "declaration": True,
    "emit_declaration_only": True,
}

def _abstract_runtime_targets(name, srcs = [], deps = [], **kwargs):
    """Create any abstract targets required by each concrete target."""
    native.filegroup(
        name = name,
        srcs = srcs,
        visibility = ["//visibility:private"],
    )

def _js_library(name, srcs = [], deps = [], ts_deps = [], **kwargs):
    """Create a library target for code which implements some aspect of Elide JS runtime functionality."""

    _abstract_runtime_targets(
        name = "%s_src" % name,
        srcs = srcs,
        deps = deps,
        **kwargs
    )
    config = {}
    config.update(_common_js_library_config)
    config.update(_base_js_library_config)
    config.update(kwargs)

    deplist = [i for i in deps]
    deplist += ["%s_js" % i for i in ts_deps]

    _closure_js_library(
        name = "%s_js" % name,
        srcs = [":%s_src" % name],
        deps = deplist,
        **config
    )
    native.alias(
        name = name,
        actual = ":%s_js" % name,
    )

def _js_runtime(
        name,
        main,
        entrypoint,
        deps,
        ts_deps = [],
        extra_production_args = [],
        esbuild_opt = None,
        extra_sources = [],
        **kwargs):
    """Single-use target macro which defines the main application entry target for the Elide JavaScript runtime."""

    config = {}
    config.update(_common_js_library_config)
    config.update(_base_js_runtime_config)
    config.update(kwargs)

    compiler_args = [] + _RUNTIME_JS_ARGS + config.get("extra_production_args", [])

    native.filegroup(
        name = "%s.typings" % name,
        srcs = [main] + ts_deps,
        output_group = "types",
    )

    if _ENABLE_J2WASM:
        fail("WASM is not supported yet.")
    if _ENABLE_J2CL:
        _j2cl_application(
            name = "%s.jsbin" % name,
            entry_points = [entrypoint],
            extra_production_args = compiler_args,
            closure_defines = _RUNTIME_DEFINES,
            deps = deps + [main],
            **config
        )
    else:
        _closure_js_binary(
            name = "%s.jsbin" % name,
            entry_points = [entrypoint],
            defs = compiler_args + (
                ["-D%s=%s" % i for i in (_RUNTIME_DEFINES.items() if _RUNTIME_DEFINES else [])]
            ),
            deps = deps + [main],
            **config
        )

    _esbuild_config(
        name = "%s.esbuildconfig" % name,
        config_file = "//elide/runtime/js/tools:esbuild.config.js",
    )
    _esbuild(
        name = "%s.jsopt" % name,
        srcs = [":%s.jsbin" % name],
        entry_point = "%s.jsbin.js" % name,
        format = "esm",
        output = "%s.bin.js" % name,
        sourcemap = "external",
        target = _JS_TARGET,
        config = ":%s.esbuildconfig" % name,
    )
    native.genrule(
        name = "%s.compressed.gen" % name,
        srcs = ["%s.bin.js" % name] + (extra_sources or []),
        outs = ["runtime.gz"],
        cmd = "gzip --force --best --to-stdout $(SRCS) > $(OUTS)",
    )
    native.genrule(
        name = "%s.compressed.sha256" % name,
        srcs = ["runtime.gz"],
        outs = ["runtime.gz.sha256"],
        cmd = "shasum -a 256 $(SRCS) | cut -d ' ' -f 1 > $(OUTS)",
    )
    native.filegroup(
        name = "%s.compressed" % name,
        srcs = [
            "runtime.gz",
            "runtime.gz.sha256",
            ":%s.typings" % name,
        ],
    )
    native.alias(
        name = name,
        actual = "%s.jsopt" % name,
    )

def _ts_runtime(name, main, ts_config, deps, **kwargs):
    """Single-use target macro which defines the main application entry target for the Elide TypeScript runtime."""

    tsc = {}
    tsc.update(_ts_compiler_args)
    tsc.update(kwargs)

    _ts_project(
        name = "%s-tsproject" % name,
        srcs = [main],
        deps = deps,
        tsconfig = ts_config,
        **tsc
    )
    native.alias(
        name = name,
        actual = "%s-tsproject" % name,
    )

def _runtime_dist(name, language, target, manifest, info = [], configs = [], extra_sources = []):
    """ """

    native.filegroup(
        name = "distfiles",
        srcs = [
            "runtime.gz",
            "runtime.gz.sha256",
        ] + configs + extra_sources,
    )
    _pkg_tar(
        name = "%s.tarball" % language,
        out = "%s.dist.tar" % language,
        srcs = [":distfiles"],
    )
    _jar_resources(
        name = "%s.runtime" % language,
        language = language,
        manifest = manifest,
        srcs = [":distfiles"],
    )
    native.filegroup(
        name = "distributions",
        srcs = [
            ":%s.tarball" % language,
            ":%s.runtime" % language,
        ] + info,
    )

    _pkg_tar(
        name = "dist-all",
        out = "%s.dist-all.tar.gz" % language,
        srcs = [":distributions"],
    )

    native.alias(
        name = name,
        actual = ":dist-all",
    )
    native.alias(
        name = language,
        actual = name,
    )

## Exports.
elide_test = _elide_test
js_library = _js_library
js_runtime = _js_runtime
ts_library = _ts_library
ts_config = _ts_config
ts_runtime = _ts_runtime
runtime_dist = _runtime_dist
