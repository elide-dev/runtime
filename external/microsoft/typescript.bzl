package(
    default_visibility = ["//visibility:private"],
)

exports_files([
    "Herebyfile.mjs",
    "package.json",
    "package-lock.json",
])

filegroup(
    name = "typescript.js",
    srcs = ["lib/typescript.js"],
    visibility = ["//visibility:public"],
)

alias(
    name = "typescript",
    actual = "typescript.js",
    visibility = ["//visibility:public"],
)
