"""Provides macros for compiling TypeScript to Closure JS."""

load(
    "@npm//@bazel/typescript:index.bzl",
    _ts_config = "ts_config",
    _ts_library = "ts_library",
)
load(
    "//tools/defs/closure:exports.bzl",
    _closure_js_library = "closure_js_library",
)
load(
    "//tools/defs/tsc:consumer.bzl",
    _ts_consumer = "devmode_consumer",
)

ES_TARGET = "es2020"
MODULE_TARGET = "esnext"

_BASE_TS_DEPS = [
    # Nothing at this time.
]

_BASE_JS_DEPS = [
    "//third_party/google/tsickle:tslib",
]

_BASE_SUPPRESSIONS = [
    "JSC_UNREACHABLE_CODE",
]

JS_RUNTIME_TOOLS = "//elide/runtime/js/tools"

_BASE_TS_ARGS = {
    "devmode_module": MODULE_TARGET,
    "devmode_target": ES_TARGET,
    "prodmode_module": MODULE_TARGET,
    "prodmode_target": ES_TARGET,
    "compiler": "//tools/defs/tsc/compiler:tsc_wrapped",
    "tsconfig": "//elide/runtime/js:tsconfig",
}

def _wrapped_ts_library(
        name,
        module,
        srcs = [],
        deps = [],
        closure_deps = [],
        lib_kwargs = {},
        suppress = [],
        include_tools = True,
        *args,
        **kwargs):
    """Wrap `ts_library` with extra arguments, which are considered standard for Elide's runtime TS environment."""

    config = {}
    config.update(_BASE_TS_ARGS)
    config.update(kwargs)

    ts_deps_resolved = _BASE_TS_DEPS + ["%s_ts" % i for i in deps]
    closure_deps_resolved = ["%s_js" % i for i in closure_deps]

    if include_tools:
        ts_deps_resolved += [JS_RUNTIME_TOOLS]

    native.filegroup(
        name = "%s_src" % name,
        srcs = srcs,
    )
    _ts_library(
        name = "%s_ts" % name,
        module_name = module,
        srcs = srcs and [":%s_src" % name] or [],
        deps = ts_deps_resolved,
        *args,
        **config
    )
    _ts_consumer(
        name = "%s_consumer" % name,
        deps = [":%s_ts" % name],
    )
    _closure_js_library(
        name = "%s_js" % name,
        srcs = [":%s_consumer" % name],
        deps = _BASE_JS_DEPS + closure_deps_resolved,
        suppress = _BASE_SUPPRESSIONS + (suppress or []),
        **lib_kwargs
    )
    native.alias(
        name = name,
        actual = "%s_ts" % name,
    )

ts_library = _wrapped_ts_library
ts_config = _ts_config
