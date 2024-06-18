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
    _pkg_filegroup = "pkg_filegroup",
    _pkg_files = "pkg_files",
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
    "--inject_libraries=true",
    "--rewrite_polyfills=true",
]

_JS_MODULES_CLOSURE = False

_RUNTIME_DEFINES = {}
_RUNTIME_DEFINES.update(_DEFINES)
_RUNTIME_DEFINES.update({
    # Additional runtime definitions here.
})

# Module prefix to apply for JS runtime "modules".
_JS_MODULE_PREFIX = "@elide/runtime/module"

_ARCHIVE_ROOT_PREFIX = "__runtime__"
_ELIDE_MODULE_ROOT_PREFIX = "node_modules"
_ELIDE_MODULE_PREFIX = "elide"

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
    # Nothing at this time.
}

def _abstract_runtime_targets(name, srcs = [], deps = [], **kwargs):
    """Create any abstract targets required by each concrete target."""
    native.filegroup(
        name = name,
        srcs = srcs,
        visibility = ["//visibility:private"],
    )

def _js_library(name, srcs = [], deps = [], ts_deps = [], exports = [], **kwargs):
    """Create a library target for code which implements some aspect of Elide JS runtime functionality."""

    if len(srcs) == 0 and len(exports) > 0:
        _closure_js_library(
            name = name,
            srcs = srcs,
            exports = exports,
            **kwargs
        )
    else:
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

def _js_module(
        name,
        package_json = "package.json",
        entry_point = None,
        module = None,
        host_module = None,
        elide_module = False,
        js_srcs = [],
        srcs = [],
        deps = [],
        ts_deps = [],
        ts_args = {},
        js_args = {},
        **kwargs):
    """Defines a JavaScript module target."""

    outs = []
    jsouts = []
    module_path = "%s/%s" % (_JS_MODULE_PREFIX, module or name)
    compiler_args = [] + _RUNTIME_JS_ARGS

    if entry_point == None:
        default_ext = len(srcs) > 0 and ".ts" or ".js"
        entry_point = "index%s" % default_ext

    if not _JS_MODULES_CLOSURE:
        _esbuild(
            name = "%s.jsopt" % name,
            srcs = js_srcs + srcs,
            entry_point = entry_point,
            format = "esm",
            output = "%s.mjs" % (module or name),
            sourcemap = "external",
            target = _JS_TARGET,
            config = "//elide/runtime/js/modules:esbuild-config",
        )
        _esbuild(
            name = "%s.jsopt.cjs" % name,
            srcs = js_srcs + srcs,
            entry_point = entry_point,
            format = "cjs",
            output = "%s.cjs" % (module or name),
            sourcemap = "external",
            target = _JS_TARGET,
            config = "//elide/runtime/js/modules:esbuild-config",
        )
        native.filegroup(
            name = "%s_module_src" % name,
            srcs = [
                package_json,
                "%s.mjs" % name,
                "%s.cjs" % name,
            ],
        )
    else:
        if len(srcs) > 0:
            _ts_library(
                name = "%s_ts" % name,
                srcs = srcs,
                deps = ts_deps,
                module = "/".join(module_path.split("/")[0:-1]),
                **ts_args
            )
            native.filegroup(
                name = "%s_types" % name,
                srcs = [":%s_ts" % name],
                output_group = "types",
            )
            native.filegroup(
                name = "%s_tsdev" % name,
                srcs = [":%s_ts" % name],
                output_group = "es5_sources",
            )
            native.filegroup(
                name = "%s_tsprod" % name,
                srcs = [":%s_ts" % name],
                output_group = "es6_sources",
            )
            outs.append("%s_types" % name)
            jsouts.append("%s_tsdev" % name)

        _closure_js_library(
            name = "%s_js" % name,
            srcs = js_srcs + jsouts,
            deps = deps + [
                "//third_party/google/tsickle:tslib",
            ],
            **js_args
        )
        _closure_js_binary(
            name = "%s_jsbin" % name,
            deps = [":%s_js" % name],
            defs = compiler_args + (
                ["-D%s=%s" % i for i in (_RUNTIME_DEFINES.items() if _RUNTIME_DEFINES else [])]
            ),
            **kwargs
        )
        native.filegroup(
            name = "%s_module_src" % name,
            srcs = [
                package_json,
                "%s_jsbin" % name,
            ],
        )

    _pkg_files(
        name = "%s.tarfiles" % name,
        srcs = [":%s_module_src" % name],
    )

    archive_prefix = "%s/%s/" % (_ARCHIVE_ROOT_PREFIX, module or name)
    if host_module:
        archive_prefix = "%s/%s/%s/" % (_ARCHIVE_ROOT_PREFIX, host_module, module or name)
    if elide_module:
        if host_module:
            archive_prefix = "%s/%s:%s/%s/" % (_ELIDE_MODULE_ROOT_PREFIX, _ELIDE_MODULE_PREFIX, host_module, module or name)
        else:
            archive_prefix = "%s/%s:%s/" % (_ELIDE_MODULE_ROOT_PREFIX, _ELIDE_MODULE_PREFIX, module or name)

    _pkg_filegroup(
        name = "%s.tarfilegroup" % name,
        srcs = [":%s.tarfiles" % name],
        prefix = archive_prefix,
    )
    _pkg_tar(
        name = "%s.tarball" % name,
        out = "%s.tar" % name,
        srcs = [":%s_module_src" % name],
        package_dir = "%s/%s/" % (_ARCHIVE_ROOT_PREFIX, module or name),
    )
    native.alias(
        name = name,
        actual = "%s.tarfilegroup" % name,
    )

def _py_library(
        name,
        srcs,
        module = None,
        deps = [],
        data = [],
        **kwargs):
    """Defines a Python package."""

    native.filegroup(
        name = "%s.files" % name,
        srcs = srcs + deps,
        data = data,
    )
    _pkg_tar(
        name = "%s.archive" % name,
        out = "%s.tar" % name,
        srcs = [":%s.files" % name],
        package_dir = "%s/python/%s/" % (_ARCHIVE_ROOT_PREFIX, module or name),
    )
    native.alias(
        name = name,
        actual = "%s.archive" % name,
    )

def _py_runtime(
        name,
        deps,
        extra_sources = [],
        **kwargs):
    """Single-use target macro which defines the main application entry target for the Elide Python runtime."""

    native.filegroup(
        name = "%s.files" % name,
        srcs = extra_sources + deps,
    )
    native.alias(
        name = name,
        actual = "%s.files" % name,
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
        srcs = (extra_sources or []) + ["%s.bin.js" % name],
        outs = ["runtime.js.gz"],
        cmd = "gzip --force --best --to-stdout $(SRCS) > $(OUTS)",
    )
    native.genrule(
        name = "%s.compressed.sha256" % name,
        srcs = ["runtime.js.gz"],
        outs = ["runtime.js.gz.sha256"],
        cmd = "shasum -a 256 $(SRCS) | cut -d ' ' -f 1 > $(OUTS)",
    )
    native.filegroup(
        name = "%s.compressed" % name,
        srcs = [
            "runtime.js.gz",
            "runtime.js.gz.sha256",
            ":%s.typings" % name,
        ],
    )
    native.alias(
        name = name,
        actual = "%s.jsopt" % name,
    )

def _ts_runtime(
        name,
        main,
        ts_config,
        deps,
        closure_deps = [],
        closure_lib_kwargs = {},
        closure_bin_kwargs = {},
        extra_sources = [],
        extra_production_args = [],
        **kwargs):
    """Single-use target macro which defines the main application entry target for the Elide TypeScript runtime."""

    tsc = {}
    tsc.update(_ts_compiler_args)
    tsc.update(kwargs)

    _ts_library(
        name = "%s-tslib" % name,
        srcs = [main],
        deps = deps,
        module = "@elide/runtime/ts",
        nowrap = True,
        tsconfig = ts_config,
        devmode_target = "es2020",
        prodmode_target = "es2020",
        **tsc
    )
    native.filegroup(
        name = "%s-typings" % name,
        srcs = [":%s-tslib" % name],
        output_group = "types",
    )
    native.filegroup(
        name = "%s-devsrc" % name,
        srcs = [":%s-tslib" % name],
        output_group = "es5_sources",
    )
    native.filegroup(
        name = "%s-prodsrc" % name,
        srcs = [":%s-tslib" % name],
        output_group = "es6_sources",
    )
    _closure_js_library(
        name = "%s-js" % name,
        srcs = [":%s-devsrc" % name],
        deps = closure_deps,
        **closure_lib_kwargs
    )

    compiler_args = [] + _RUNTIME_JS_ARGS + extra_production_args

    if _ENABLE_J2WASM:
        fail("WASM is not supported yet.")
    if _ENABLE_J2CL:
        _j2cl_application(
            name = "%s.jsbin" % name,
            entry_points = ["elide.runtime.ts.entrypoint"],
            extra_production_args = compiler_args,
            closure_defines = _RUNTIME_DEFINES,
            deps = [":%s-js" % name] + closure_deps,
            **closure_bin_kwargs
        )
    else:
        _closure_js_binary(
            name = "%s.jsbin" % name,
            entry_points = ["elide.runtime.ts.entrypoint"],
            defs = compiler_args + (
                ["-D%s=%s" % i for i in (_RUNTIME_DEFINES.items() if _RUNTIME_DEFINES else [])]
            ),
            deps = [":%s-js" % name] + closure_deps,
            **closure_bin_kwargs
        )

    native.filegroup(
        name = "%s-files" % name,
        srcs = [
            ":%s-typings" % name,
            ":%s.jsbin" % name,
        ] + extra_sources,
    )
    _pkg_tar(
        name = "tsruntime.tarball",
        out = "runtime.ts.tar",
        srcs = [":%s-files" % name],
    )
    native.alias(
        name = name,
        actual = "tsruntime.tarball",
    )

def _runtime_dist(name, language, target, manifest, info = [], configs = [], modules = [], elide_modules = [], extra_sources = []):
    """ """

    outs = []

    if language == "js":
        native.filegroup(
            name = "distfiles",
            srcs = [
                "runtime.js.gz",
                "runtime.js.gz.sha256",
            ] + configs + extra_sources,
        )
        if len(modules) > 0:
            _pkg_tar(
                name = "%s.elide-modules" % language,
                out = "%s.elide-modules.tar" % language,
                extension = "tar",
                srcs = elide_modules,
            )
            _pkg_tar(
                name = "%s.modules" % language,
                out = "%s.modules.tar" % language,
                extension = "tar",
                srcs = modules,
                deps = ["%s.elide-modules" % language],
            )
            outs.append(":%s.modules" % language)
        _pkg_tar(
            name = "%s.tarball" % language,
            out = "%s.dist.tar" % language,
            srcs = [":distfiles"] + modules,
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

        _pkg_zip(
            name = "dist-all",
            out = "%s.dist-all.zip" % language,
            srcs = [":distributions"],
        )
        native.filegroup(
            name = "dist-all-outs",
            srcs = [
                ":dist-all",
            ] + outs
        )

    elif language == "py":
        if len(modules) > 0:
            _pkg_tar(
                name = "%s.modules" % language,
                out = "%s.modules.tar" % language,
                extension = "tar",
                deps = modules,
            )
            outs.append(":%s.modules" % language)

        _pkg_tar(
            name = "%s.tarball" % language,
            out = "%s.dist.tar" % language,
            srcs = modules,
        )
        native.filegroup(
            name = "distributions",
            srcs = [
                ":%s.tarball" % language,
            ] + info,
        )
        _pkg_tar(
            name = "dist-all",
            out = "%s.dist-all.tar" % language,
            srcs = [":distributions"],
        )
        native.filegroup(
            name = "dist-all-outs",
            srcs = [
                ":dist-all",
            ] + outs
        )


    else:
        fail("Unrecognized language: %s" % language)

    native.alias(
        name = name,
        actual = ":dist-all-outs",
    )
    native.alias(
        name = language,
        actual = name,
    )

## Exports.
elide_test = _elide_test
js_library = _js_library
js_runtime = _js_runtime
js_module = _js_module
ts_library = _ts_library
ts_config = _ts_config
ts_runtime = _ts_runtime
runtime_dist = _runtime_dist
py_library = _py_library
py_runtime = _py_runtime
