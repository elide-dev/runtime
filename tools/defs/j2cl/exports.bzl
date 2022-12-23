"""Defines the export surface for code used from J2CL."""

load(
    "@io_bazel_rules_closure//closure:defs.bzl",
    "closure_js_library",
)
load(
    "@com_google_j2cl//build_defs:rules.bzl",
    _j2cl_application = "j2cl_application",
    _j2cl_library = "j2cl_library",
    _j2wasm_application = "j2wasm_application",
    _j2wasm_library = "j2wasm_library",
)

j2cl_application = _j2cl_application
j2cl_library = _j2cl_library
j2wasm_application = _j2wasm_application
j2wasm_library = _j2wasm_library
