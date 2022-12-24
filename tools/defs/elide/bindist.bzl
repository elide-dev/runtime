"""Defines binary distribution endpoints for the Elide CLI."""

_latest_version = "1.0.0-r2"

_download_domain = "dl.elide.dev"

_elide_version_configs = {
    "1.0.0-r2": {
        "urls": ["https://dl.elide.dev/cli/v1/snapshot/{platform}/{version}/elide.zip"],
        "sha": {
            "darwin-aarch64": "0b4679f57b644aefd11acb794e0044d83f49ddac0ef96e7a1417f36a1a297eba",
            "darwin-amd64": "d18f92effa617405dc18d42c203a02f5ace684095b8253b64201528c1bc26376",
            "linux-aarch64": None,
            "linux-amd64": "f1fe32812fc1fa13c48e7ef1d96dfd0698e788767363cdd50edf332a2e1e688b",
        },
    },
}

def _get_platform(ctx):
    res = ctx.execute(["uname", "-p"])
    arch = "amd64"
    if res.return_code == 0:
        uname = res.stdout.strip()
        if uname == "arm":
            arch = "aarch64"
        elif uname == "aarch64":
            arch = "aarch64"
    if ctx.os.name == "linux":
        return "linux-%s" % arch
    elif ctx.os.name == "mac os x":
        if arch == "arm64" or arch == "aarch64":
            return "darwin-aarch64"
        return "darwin-amd64"
    else:
        fail("Unsupported operating system for Elide CLI: " + ctx.os.name)

def _elide_bindist_repository_impl(ctx):
    platform = _get_platform(ctx)
    version = ctx.attr.version
    format_args = {
        "version": version,
        "platform": platform,
    }

    # download the compressed binary
    config = _elide_version_configs[version]
    sha = config["sha"][platform]
    urls = [url.format(**format_args) for url in config["urls"]]

    ctx.download_and_extract(
        url = urls,
        sha256 = sha,
    )

    ctx.file("WORKSPACE", "workspace(name = \"{name}\")".format(name = ctx.name))
    ctx.file("BUILD", """
package(default_visibility = ["//visibility:public"])
exports_files(["elide"])
filegroup(name = "elide_cli", srcs = ["elide"])
    """)

elide_bindist_repository = repository_rule(
    attrs = {
        "version": attr.string(
            mandatory = True,
        ),
    },
    implementation = _elide_bindist_repository_impl,
)
