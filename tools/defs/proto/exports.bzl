"""Defines the exported API surface of the Protocol Buffer Rules for Bazel."""

load(
    "@rules_proto//proto:defs.bzl",
    _proto_common = "proto_common",
    _proto_descriptor_set = "proto_descriptor_set",
    _proto_library = "proto_library",
)

## Exports.
proto_common = _proto_common
proto_descriptor_set = _proto_descriptor_set
proto_library = _proto_library
