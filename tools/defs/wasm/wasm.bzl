"""Macros and rules for working with universal WASM binaries."""

load(
    "//tools:config.bzl",
    _RUST_EDITION = "RUST_EDITION",
)
load(
    "//tools/defs/rust:exports.bzl",
    _rust_binary = "rust_binary",
)

def _wasm_rust_transition_impl(settings, attr):
    return {
        "//command_line_option:platforms": "@rules_rust//rust/platform:wasm",
    }

def _wasi_rust_transition_impl(settings, attr):
    return {
        "//command_line_option:platforms": "@rules_rust//rust/platform:wasi",
    }

wasm_rust_transition = transition(
    implementation = _wasm_rust_transition_impl,
    inputs = [],
    outputs = [
        "//command_line_option:platforms",
    ],
)

wasi_rust_transition = transition(
    implementation = _wasi_rust_transition_impl,
    inputs = [],
    outputs = [
        "//command_line_option:platforms",
    ],
)

def _wasm_binary_impl(ctx):
    out = ctx.actions.declare_file(ctx.label.name)
    if ctx.attr.precompile:
        ctx.actions.run(
            executable = ctx.executable._compile_tool,
            arguments = [ctx.files.binary[0].path, out.path],
            outputs = [out],
            inputs = ctx.files.binary,
        )
    else:
        ctx.actions.run(
            executable = "cp",
            arguments = [ctx.files.binary[0].path, out.path],
            outputs = [out],
            inputs = ctx.files.binary,
        )

    return [DefaultInfo(files = depset([out]), runfiles = ctx.runfiles([out]))]

def _wasm_attrs(transition):
    return {
        "binary": attr.label(mandatory = True, cfg = transition),
        "precompile": attr.bool(default = False),
        "_whitelist_function_transition": attr.label(default = "@bazel_tools//tools/whitelists/function_transition_whitelist"),
    }

wasm_rust_binary_rule = rule(
    implementation = _wasm_binary_impl,
    attrs = _wasm_attrs(wasm_rust_transition),
)

wasi_rust_binary_rule = rule(
    implementation = _wasm_binary_impl,
    attrs = _wasm_attrs(wasi_rust_transition),
)

def _wasm_rust_binary(name, tags = [], wasi = False, crate_type = "cdylib", **kwargs):
    wasm_name = "_wasm_" + name.replace(".", "_")
    kwargs.setdefault("visibility", ["//visibility:public"])

    _rust_binary(
        name = wasm_name,
        edition = _RUST_EDITION,
        crate_type = crate_type,
        out_binary = True,
        tags = ["manual"],
        **kwargs
    )

    bin_rule = wasm_rust_binary_rule
    if wasi:
        bin_rule = wasi_rust_binary_rule

    bin_rule(
        name = name,
        precompile = select({
            "//tools/conditions:linux_x86_64": True,
            "//conditions:default": False,
        }),
        binary = ":" + wasm_name,
        tags = tags + ["manual"],
    )

wasm_rust_binary = _wasm_rust_binary
