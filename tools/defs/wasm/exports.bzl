"""Exports the API surface of WASM rules and definitions for Bazel."""

load(
    "//tools/defs/wasm:wasm.bzl",
    _wasm_rust_binary = "wasm_rust_binary",
)

## Exports.
wasm_rust_binary = _wasm_rust_binary
