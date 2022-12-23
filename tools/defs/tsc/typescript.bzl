"""Provides macros for compiling TypeScript to Closure JS."""

load(
    "@npm//@bazel/typescript:index.bzl",
    _ts_library = "ts_library",
)

_BASE_TS_ARGS = {
    "tsconfig": "//:tsconfig",
    "compiler": "//tools/defs/tsc/compiler:tsc_wrapped",
}

def _wrapped_ts_library(name, *args, **kwargs):
    """Wrap `ts_library` with extra arguments, which are considered standard for Elide's runtime TS environment."""

    config = {}
    config.update(_BASE_TS_ARGS)
    config.update(kwargs)

    _ts_library(
        name = name,
        *args,
        **config
    )

ts_library = _wrapped_ts_library
