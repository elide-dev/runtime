"""Exports the API surface for C compiler rules."""

load(
    "@rules_cc//cc:defs.bzl",
    _cc_binary = "cc_binary",
    _cc_library = "cc_library",
    _cc_proto_library = "cc_proto_library",
)

## Exports.
cc_library = _cc_library
cc_binary = _cc_binary
cc_proto_library = _cc_proto_library
