"""Exports the surface area of API used within the Kotlin Rules for Bazel."""

load(
    "@io_bazel_rules_kotlin//kotlin:jvm.bzl",
    _kt_jvm_binary = "kt_jvm_binary",
    _kt_jvm_import = "kt_jvm_import",
    _kt_jvm_library = "kt_jvm_library",
)
load(
    "@io_bazel_rules_kotlin//kotlin:js.bzl",
    _kt_js_import = "kt_js_import",
    _kt_js_library = "kt_js_library",
)

## Exports.
kt_jvm_import = _kt_jvm_import
kt_jvm_library = _kt_jvm_library
kt_jvm_binary = _kt_jvm_binary
kt_js_import = _kt_js_import
kt_js_library = _kt_js_library
