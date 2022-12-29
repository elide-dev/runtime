"""Provides macros for wiring together multi-language Protocol Buffer targets."""

load(
    "@rules_proto//proto:defs.bzl",
    _proto_library = "proto_library",
)
load(
    "@rules_java//java:defs.bzl",
    _java_proto_library = "java_proto_library",
)
load(
    "@io_bazel_rules_closure//closure:defs.bzl",
    _closure_js_proto_library = "closure_js_proto_library",
)

def _model(name, srcs = [], deps = [], java_kwargs = {}, js_kwargs = {}, **kwargs):
    """Wire together a universal runtime model."""

    native.filegroup(
        name = "%s-proto-src" % name,
        srcs = srcs,
    )

    _proto_library(
        name = "%s-proto" % name,
        srcs = [":%s-proto-src" % name],
        deps = deps,
        **kwargs
    )
    _java_proto_library(
        name = "%s-java" % name,
        deps = [":%s-proto" % name],
        **java_kwargs
    )
    _closure_js_proto_library(
        name = "%s-closure" % name,
        srcs = [":%s-proto-src" % name],
        **js_kwargs
    )
    native.alias(
        name = name,
        actual = ":%s-proto" % name,
    )

## Exports.
model = _model
