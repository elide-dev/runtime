"""Defines the exported API surface of the Protocol Buffer Rules for Bazel."""

load(
    "@rules_rust//rust:defs.bzl",
    _rust_binary = "rust_binary",
    _rust_library = "rust_library",
    _rust_shared_library = "rust_shared_library",
    _rust_static_library = "rust_static_library",
    _rust_test = "rust_test",
)
load(
    "@crates//:defs.bzl",
    _aliases = "aliases",
    _all_crate_deps = "all_crate_deps",
)
load(
    "@rules_rust//cargo:defs.bzl",
    _cargo_build_script = "cargo_build_script",
)
load(
    "@rules_rust//wasm_bindgen:wasm_bindgen.bzl",
    _rust_wasm_bindgen = "rust_wasm_bindgen",
)
load(
    "@rules_rust//bindgen:bindgen.bzl",
    _rust_bindgen_library = "rust_bindgen_library",
)
load(
    "@rules_rust//proto:proto.bzl",
    _rust_proto_library = "rust_proto_library",
)

## Exports.
rust_library = _rust_library
rust_binary = _rust_binary
rust_test = _rust_test
rust_shared_library = _rust_shared_library
rust_static_library = _rust_static_library
rust_proto_library = _rust_proto_library
rust_bindgen_library = _rust_bindgen_library
rust_wasm_bindgen = _rust_wasm_bindgen
aliases = _aliases
all_crate_deps = _all_crate_deps
cargo_build_script = _cargo_build_script
