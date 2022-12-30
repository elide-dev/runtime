load("@bazel_gazelle//:deps.bzl", "go_repository")

def go_dependencies():
    go_repository(
        name = "com_github_evanw_esbuild",
        importpath = "github.com/evanw/esbuild",
        sum = "h1:B9hb5GRgRkGYmq582yGGPwSFks769bJOPksdKaEERXw=",
        version = "v0.16.12",
    )
    go_repository(
        name = "org_golang_x_sys",
        importpath = "golang.org/x/sys",
        sum = "h1:w8ZOecv6NaNa/zC8944JTU3vz4u6Lagfk4RPQxv92NQ=",
        version = "v0.3.0",
    )
