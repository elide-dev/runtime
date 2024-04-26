"""Defines binary distribution endpoints for the Elide CLI."""

_latest_version = "1.0-dev-19838"

_download_domain = "dl.elide.dev"

_elide_version_configs = {
    "1.0-v3-alpha3-b1": {
        "urls": ["https://dl.elide.dev/cli/v1/snapshot/{platform}/{version}/elide.tar.gz"],
        "manifest": "https://dl.elide.dev/cli/v1/snapshot/{platform}/{version}/manifest.txt",
        "release": "https://dl.elide.dev/cli/v1/snapshot/{platform}/{version}/release.json",
        "sha256": {
            "darwin-aarch64": "ae9b672d0d58268eb368d880904b80d2f2c33d5f14fa0ae2ebcb7e01be1ced47",
            "darwin-amd64": "f47e8249da742dcd7b2cc237009abdf77cbb97a00cfbc8e57c6e6c4b2e387bdf",
            "linux-amd64": "9192926e8a6834782561e545d168693998021d029f93af41128ac45938dcab4b",
        },
    },
    "1.0.0-r2": {
        "urls": ["https://dl.elide.dev/cli/v1/snapshot/{platform}/{version}/elide.zip"],
        "sha256": {
            "darwin-aarch64": "0b4679f57b644aefd11acb794e0044d83f49ddac0ef96e7a1417f36a1a297eba",
            "darwin-amd64": "d18f92effa617405dc18d42c203a02f5ace684095b8253b64201528c1bc26376",
            "linux-amd64": "f1fe32812fc1fa13c48e7ef1d96dfd0698e788767363cdd50edf332a2e1e688b",
        },
    },
    "1.0-dev-19838": {
        "urls": ["https://static.elide.dev/{version}/{platform}/elide-1.0.0-alpha8-{platform}.zip"],
        "trim_prefix": "elide-1.0.0-alpha8-{platform}",
        "sha256": {
            "darwin-aarch64": "b4323e9f8d954ce5d70ca696948f98cf09a03cbace65b0c4b90ab17e9a8d12fa",
            "linux-amd64": "79b248d03cc65f95c8140278ab4bb3b0b0fa6d9d74319ca0955c534be124b4f5",
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
        if arch == "aarch64":
            fail("Elide CLI is not currently supported on ARM64 Linux.")
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
    sha = config["sha256"][platform]
    urls = [url.format(**format_args) for url in config["urls"]]
    trim_prefix = config.get("trim_prefix", None)
    trim_prefix = trim_prefix.format(**format_args) if trim_prefix else None

    ctx.download_and_extract(
        url = urls,
        sha256 = sha,
        stripPrefix = trim_prefix,
    )

    ctx.file("WORKSPACE", "workspace(name = \"{name}\")".format(name = ctx.name))
    ctx.file("BUILD", """
package(default_visibility = ["//visibility:public"])

exports_files(["elide"])

filegroup(name = "libs", srcs = glob(["*"], exclude = ["elide"]))
filegroup(name = "resources", srcs = glob(["resources/*"]))

filegroup(name = "cli", srcs = ["elide", ":libs", ":resources"])
alias(name = "elide_cli", actual = ":elide")
    """)

elide_bindist_repository = repository_rule(
    attrs = {
        "version": attr.string(
            default = _latest_version,
        ),
    },
    implementation = _elide_bindist_repository_impl,
)

latest_version = _latest_version
