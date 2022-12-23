"""Macros and definitions for defining Elide Runtime targets."""

load(
    "//elide/runtime/js:config.bzl",
    _DEBUG = "DEBUG",
    _DEFINES = "DEFINES",
    _JS_ARGS = "JS_ARGS",
    _JS_LANGUAGE = "JS_LANGUAGE",
)
load(
    "//tools/defs/closure:exports.bzl",
    _closure_js_library = "closure_js_library",
)
load(
    "//tools/defs/j2cl:exports.bzl",
    _j2cl_application = "j2cl_application",
    _j2cl_library = "j2cl_library",
    _j2wasm_application = "j2wasm_application",
    _j2wasm_library = "j2wasm_library",
)

_RUNTIME_JS_ARGS = _JS_ARGS + [
    # Additional Closure Compiler arguments for the runtime.
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
}

def _abstract_runtime_targets(name, srcs = [], deps = [], **kwargs):
    """Create any abstract targets required by each concrete target."""
    native.filegroup(
        name = name,
        srcs = srcs,
        visibility = ["//visibility:private"],
    )

def _js_library(name, srcs = [], deps = [], **kwargs):
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

    _closure_js_library(
        name = "%s_js" % name,
        srcs = [":%s_src" % name],
        deps = deps,
        **config
    )
    native.alias(
        name = name,
        actual = ":%s_js" % name,
    )

def _js_runtime(name, entrypoint, deps, extra_production_args = [], **kwargs):
    """Single-use target macro which defines the main application entry target for the Elide JavaScript runtime."""

    config = {}
    config.update(_common_js_library_config)
    config.update(_base_js_runtime_config)
    config.update(kwargs)

    compiler_args = [] + _RUNTIME_JS_ARGS + config.get("extra_production_args", [])

    _j2cl_application(
        name = name,
        entry_points = [entrypoint],
        extra_production_args = ["--env=CUSTOM"] + compiler_args,
        closure_defines = _RUNTIME_DEFINES,
        deps = deps,
        **config
    )

## Exports.
js_library = _js_library
js_runtime = _js_runtime
