workspace(
    name = "elide",
    managed_directories = {
        "@npm": [
            "node_modules",
        ],
    },
)

load(
    "@bazel_tools//tools/build_defs/repo:http.bzl",
    "http_archive",
    "http_jar",
)
load(
    "@bazel_tools//tools/build_defs/repo:java.bzl",
    "java_import_external",
)
load(
    "//tools:config.bzl",
    "BUF_VERSION",
    "GO_VERSION",
    "GRAALVM_VERSION",
    "JAVA_LANGUAGE_LEVEL",
    "KOTLIN_COMPILER_VERSION",
    "NODE_VERSION",
    "PROTOBUF_VERSION",
)

http_archive(
    name = "com_github_bazelbuild_buildtools",
    sha256 = "977a0bd4593c8d4c8f45e056d181c35e48aa01ad4f8090bdb84f78dca42f47dc",
    strip_prefix = "buildtools-6.1.2",
    urls = ["https://github.com/bazelbuild/buildtools/archive/v6.1.2.tar.gz"],
)

http_archive(
    name = "com_google_protobuf",
    sha256 = "8b28fdd45bab62d15db232ec404248901842e5340299a57765e48abe8a80d930",
    strip_prefix = "protobuf-%s" % PROTOBUF_VERSION,
    urls = ["https://github.com/protocolbuffers/protobuf/archive/v%s.tar.gz" % PROTOBUF_VERSION],
)

http_archive(
    name = "com_google_googleapis",
    sha256 = "24d8df6ed2422a78d9b661b02ab857daaec6054b43244419e0c9e99c875af833",
    strip_prefix = "googleapis-85f8c758016c279fb7fa8f0d51ddc7ccc0dd5e05",
    urls = ["https://github.com/googleapis/googleapis/archive/85f8c758016c279fb7fa8f0d51ddc7ccc0dd5e05.tar.gz"],
)

http_archive(
    name = "proto_common",
    build_file = "proto_common.bzl",
    sha256 = "87e7426a92d252e01123be3b714a4f0cb711e5cb9b9477c099f653dc072a7321",
    strip_prefix = "api-common-protos-3332dec527759859840a3a2ff108c67a54708130",
    urls = ["https://github.com/googleapis/api-common-protos/archive/3332dec527759859840a3a2ff108c67a54708130.tar.gz"],
)

http_archive(
    name = "safe_html_types",
    build_file = "safe_html_types.bzl",
    sha256 = "fe1c98b1dfbcd741fd4b4c39fb938c03f42b2cb48dacc13b92ac2edb5d970c77",
    strip_prefix = "safe-html-types-a0fa702c497b7e201e48b52b5adf0259f1d381ca",
    urls = ["https://github.com/google/safe-html-types/archive/a0fa702c497b7e201e48b52b5adf0259f1d381ca.tar.gz"],
)

http_archive(
    name = "rules_proto",
    sha256 = "66bfdf8782796239d3875d37e7de19b1d94301e8972b3cbd2446b332429b4df1",
    strip_prefix = "rules_proto-4.0.0",
    urls = [
        "https://github.com/bazelbuild/rules_proto/archive/refs/tags/4.0.0.tar.gz",
    ],
)

http_archive(
    name = "rules_buf",
    sha256 = "523a4e06f0746661e092d083757263a249fedca535bd6dd819a8c50de074731a",
    strip_prefix = "rules_buf-0.1.1",
    urls = [
        "https://github.com/bufbuild/rules_buf/archive/refs/tags/v0.1.1.zip",
    ],
)

http_archive(
    name = "typescript",
    build_file = "microsoft/typescript.bzl",
    sha256 = "ef620f5bb00702cc2cdc008119e66f5ff3b6ce0d66e08acfae7767fdfb79c8ac",
    strip_prefix = "TypeScript-1c822c42a4d527c2f97a27cf1d5cfe2e5558e280",
    urls = [
        "https://github.com/microsoft/typescript/archive/1c822c42a4d527c2f97a27cf1d5cfe2e5558e280.tar.gz",
    ],
)

http_archive(
    name = "rules_pkg",
    sha256 = "8f9ee2dc10c1ae514ee599a8b42ed99fa262b757058f65ad3c384289ff70c4b8",
    urls = [
        "https://github.com/bazelbuild/rules_pkg/releases/download/0.9.1/rules_pkg-0.9.1.tar.gz",
    ],
)

rules_kotlin_version = "1.6.0"

rules_kotlin_sha = "a57591404423a52bd6b18ebba7979e8cd2243534736c5c94d35c89718ea38f94"

http_archive(
    name = "io_bazel_rules_kotlin",
    sha256 = rules_kotlin_sha,
    urls = ["https://github.com/bazelbuild/rules_kotlin/releases/download/v%s/rules_kotlin_release.tgz" % rules_kotlin_version],
)

java_import_external(
    name = "org_graalvm_sdk",
    jar_sha256 = "6d3994e14cadba8ffb4b431899266dd19e84c7543eaf9190a0e530bc79dfaed1",
    jar_urls = [
        "https://maven.pkg.st/org/graalvm/sdk/graal-sdk/%s/graal-sdk-%s.jar" % (GRAALVM_VERSION, GRAALVM_VERSION),
    ],
)

http_archive(
    name = "io_bazel_stardoc",
    sha256 = "dfbc364aaec143df5e6c52faf1f1166775a5b4408243f445f44b661cfdc3134f",
    urls = [
        "https://github.com/bazelbuild/stardoc/releases/download/0.5.6/stardoc-0.5.6.tar.gz",
    ],
)

http_archive(
    name = "google_bazel_common",
    sha256 = "22bfc8de051be2f3c9f64fecb6d3ca195c49bdd7edb983f74b2c481ab604bf8b",
    strip_prefix = "bazel-common-340a5edaf011f76568a6351984e090a8b202ebd6",
    urls = ["https://github.com/google/bazel-common/archive/340a5edaf011f76568a6351984e090a8b202ebd6.zip"],
)

http_archive(
    name = "bazel_skylib",
    sha256 = "66ffd9315665bfaafc96b52278f57c7e2dd09f5ede279ea6d39b2be471e7e3aa",
    urls = [
        "https://github.com/bazelbuild/bazel-skylib/releases/download/1.4.2/bazel-skylib-1.4.2.tar.gz",
    ],
)

http_archive(
    name = "rules_java",
    sha256 = "060f163a2cf3b7ed7f17d1fc68e40e34ffdb0b7ed554ccfc04c2ab5b7cde2842",
    strip_prefix = "rules_java-8df92300a0df1a5a9048c44a6dde44dfe40001ed",
    url = "https://github.com/bazelbuild/rules_java/archive/8df92300a0df1a5a9048c44a6dde44dfe40001ed.tar.gz",
)

http_archive(
    name = "io_bazel_rules_go",
    sha256 = "278b7ff5a826f3dc10f04feaf0b70d48b68748ccd512d7f98bf442077f043fe3",
    urls = [
        "https://github.com/bazelbuild/rules_go/releases/download/v0.41.0/rules_go-v0.41.0.zip",
    ],
)

http_archive(
    name = "bazel_gazelle",
    sha256 = "29218f8e0cebe583643cbf93cae6f971be8a2484cdcfa1e45057658df8d54002",
    urls = [
        "https://github.com/bazelbuild/bazel-gazelle/releases/download/v0.32.0/bazel-gazelle-v0.32.0.tar.gz",
    ],
)

http_archive(
    name = "rules_python",
    sha256 = "7576a25c4655eb2ec46ccb54e9b65ef75bf89e3292b380775eaaf38db1f7b02b",
    strip_prefix = "rules_python-bb8c4859950ecea29e794e85df579558c9d893fd",
    url = "https://github.com/bazelbuild/rules_python/archive/bb8c4859950ecea29e794e85df579558c9d893fd.zip",
)

http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "c911b5bd8aee8b0498cc387cacdb5f917098ce477fb4182db07b0ef8a9e045c0",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/4.7.1/rules_nodejs-4.7.1.tar.gz"],
)

http_archive(
    name = "io_bazel_rules_webtesting",
    sha256 = "e9abb7658b6a129740c0b3ef6f5a2370864e102a5ba5ffca2cea565829ed825a",
    urls = ["https://github.com/bazelbuild/rules_webtesting/releases/download/0.3.5/rules_webtesting.tar.gz"],
)

http_archive(
    name = "com_google_javascript_closure_library",
    sha256 = "6ccf6c1bf10173275394fb1dfd98cbbd54251dc3e9dfa09b872b872e4ed7e6c4",
    strip_prefix = "closure-library-f94055af5ac46eecabe937c1cb3360fb5e4659f3",
    url = "https://github.com/google/closure-library/archive/f94055af5ac46eecabe937c1cb3360fb5e4659f3.tar.gz",
)

http_archive(
    name = "externs",
    build_file = "google/closure/externs.bzl",
    sha256 = "9890dbd032922066b632cb5ff3d0c3797574abd22046148e346ca9f0a040dbcc",
    strip_prefix = "closure-compiler-0f94b985603723f241f9efd0ee3a8cdbd651818c/externs",
    url = "https://github.com/google/closure-compiler/archive/0f94b985603723f241f9efd0ee3a8cdbd651818c.tar.gz",
)

guava_version = "30.1.1"

guava_sha256 = "44ce229ce26d880bf3afc362bbfcec34d7e6903d195bbb1db9f3b6e0d9834f06"

java_import_external(
    name = "com_google_guava",
    jar_sha256 = guava_sha256,
    jar_urls = [
        "https://maven.pkg.st/com/google/guava/guava/%s-jre/guava-%s-jre.jar" % (guava_version, guava_version),
    ],
    licenses = ["notice"],
    exports = [
        "@com_google_code_findbugs_jsr305",
        "@com_google_errorprone_error_prone_annotations",
    ],
    deps = [
        "@com_google_guava_failure_access",
    ],
)

java_import_external(
    name = "com_google_guava_failure_access",
    jar_sha256 = "a171ee4c734dd2da837e4b16be9df4661afab72a41adaf31eb84dfdaf936ca26",
    jar_urls = [
        "https://maven.pkg.st/com/google/guava/failureaccess/1.0.1/failureaccess-1.0.1.jar",
    ],
    licenses = ["notice"],
)

http_archive(
    name = "com_google_j2cl",
    sha256 = "e6e16c82b1fba14f57144a589115d94ca5712d25e5a5c3ef79f75a0506340deb",
    strip_prefix = "j2cl-6699ca5439e31ba6aa37c47fd4a05f4be20be423",
    url = "https://github.com/elide-tools/j2cl/archive/6699ca5439e31ba6aa37c47fd4a05f4be20be423.tar.gz",
)

http_archive(
    name = "com_google_elemental2",
    sha256 = "f659a94b1549e82a70b89b7a53ed9dc4a1c526117548bf527802c70d8efc9e3f",
    strip_prefix = "elemental2-fa6f03b5156b6056601f02702105c30f14a3ce4b",
    url = "https://github.com/google/elemental2/archive/fa6f03b5156b6056601f02702105c30f14a3ce4b.tar.gz",
)

http_archive(
    name = "aspect_bazel_lib",
    sha256 = "d488d8ecca98a4042442a4ae5f1ab0b614f896c0ebf6e3eafff363bcc51c6e62",
    strip_prefix = "bazel-lib-1.33.0",
    url = "https://github.com/aspect-build/bazel-lib/archive/refs/tags/v1.33.0.tar.gz",
)

http_archive(
    name = "com_google_jsinterop_generator",
    sha256 = "ff7637e682d8f4d3efec038eae7f194527ff9830da9a980cf126617fa0daccf8",
    strip_prefix = "jsinterop-generator-6066f4ed7fbc9fc86460a45151cc03ad3a733325",
    url = "https://github.com/google/jsinterop-generator/archive/6066f4ed7fbc9fc86460a45151cc03ad3a733325.zip",
)

java_import_external(
    name = "com_google_jsinterop_annotations",
    jar_sha256 = "b2cc45519d62a1144f8cd932fa0c2c30a944c3ae9f060934587a337d81b391c8",
    jar_urls = [
        "https://maven.pkg.st/com/google/jsinterop/jsinterop-annotations/1.0.1/jsinterop-annotations-1.0.1.jar",
    ],
    licenses = ["notice"],  # GWT Terms
)

http_archive(
    name = "rules_graal",
    sha256 = "14e6d480fb2c0f03f2331efef316d2b8e07c32d34b1ea8a0eef83ea6a15d22df",
    strip_prefix = "rules_graal-9fd38761df4ac293f952d10379c0c3520dd9ceed",
    url = "https://github.com/andyscott/rules_graal/archive/9fd38761df4ac293f952d10379c0c3520dd9ceed.zip",
)

http_archive(
    name = "com_github_google_flatbuffers",
    sha256 = "2673233caeaf955b0886672f3fc91886bc7145a4dabbf4ce549b9a203f3f896d",
    strip_prefix = "flatbuffers-48da2389205ca5fbd0d1f40ad52d9c0b8685a076",
    urls = ["https://github.com/google/flatbuffers/archive/48da2389205ca5fbd0d1f40ad52d9c0b8685a076.tar.gz"],
)

http_archive(
    name = "rules_foreign_cc",
    sha256 = "2a4d07cd64b0719b39a7c12218a3e507672b82a97b98c6a89d38565894cf7c51",
    strip_prefix = "rules_foreign_cc-0.9.0",
    url = "https://github.com/bazelbuild/rules_foreign_cc/archive/0.9.0.tar.gz",
)

# BAZEL_ZIG_CC_VERSION = "v0.9.2"

# http_archive(
#    name = "bazel-zig-cc",
#    sha256 = "73afa7e1af49e3dbfa1bae9362438cdc51cb177c359a6041a7a403011179d0b5",
#    strip_prefix = "bazel-zig-cc-{}".format(BAZEL_ZIG_CC_VERSION),
#    urls = ["https://git.sr.ht/~motiejus/bazel-zig-cc/archive/{}.tar.gz".format(BAZEL_ZIG_CC_VERSION)],
# )

BAZEL_TOOLCHAINS_VERSION = "5.1.2"

BAZEL_TOOLCHAINS_FINGERPRINT = None

http_archive(
    name = "bazel_toolchains",
    sha256 = BAZEL_TOOLCHAINS_FINGERPRINT,
    strip_prefix = "bazel-toolchains-v%s" % BAZEL_TOOLCHAINS_VERSION,
    urls = [
        "https://github.com/bazelbuild/bazel-toolchains/releases/download/v%s/bazel-toolchains-%s.tar.gz" % (BAZEL_TOOLCHAINS_VERSION, BAZEL_TOOLCHAINS_VERSION),
    ],
)

RULES_JVM_EXTERNAL_TAG = "4.2"

RULES_JVM_EXTERNAL_SHA = "cd1a77b7b02e8e008439ca76fd34f5b07aecb8c752961f9640dea15e9e5ba1ca"

http_archive(
    name = "rules_jvm_external",
    sha256 = RULES_JVM_EXTERNAL_SHA,
    strip_prefix = "rules_jvm_external-%s" % RULES_JVM_EXTERNAL_TAG,
    url = "https://github.com/bazelbuild/rules_jvm_external/archive/%s.zip" % RULES_JVM_EXTERNAL_TAG,
)

## -- Dependency Setup -- ##

#load("@google_bazel_common//:workspace_defs.bzl", "google_common_workspace_rules")

#google_common_workspace_rules()

# toolchains

http_archive(
    name = "rbe_default",
    sha256 = "f341312f4c80e1d6f81c937660ee0430175ecef85468f1c11e7fd99871cc7b5a",
    urls = ["https://storage.googleapis.com/elide-snapshots/tools/rbe/r1a/rbe_default.tar"],
)

# rules_kotlin

load("@io_bazel_rules_kotlin//kotlin:repositories.bzl", "kotlin_repositories", "kotlinc_version")

kotlin_repositories(
    compiler_release = kotlinc_version(
        release = KOTLIN_COMPILER_VERSION,
        sha256 = None,
    ),
)

register_toolchains("//tools/defs/kt/toolchain")

# rules_go

load("@io_bazel_rules_go//go:deps.bzl", "go_register_toolchains", "go_rules_dependencies")
load("@bazel_gazelle//:deps.bzl", "gazelle_dependencies")
load("//:godeps.bzl", "go_dependencies")

# gazelle:repository_macro godeps.bzl%go_dependencies
go_dependencies()

go_rules_dependencies()

go_register_toolchains(version = GO_VERSION)

gazelle_dependencies()

# elide

load("//tools/defs/elide:bindist.bzl", "elide_bindist_repository")

elide_bindist_repository(
    name = "elide_cli",
)

# j2cl

load("@com_google_j2cl//build_defs:repository.bzl", "load_j2cl_repo_deps")

load_j2cl_repo_deps()

load("@com_google_j2cl//build_defs:rules.bzl", "setup_j2cl_workspace", "j2cl_maven_import_external")
load("//tools/defs/closure:compiler.bzl", "setup_closure_compiler")

setup_closure_compiler()

setup_j2cl_workspace(
    omit_com_google_javascript_closure_compiler = True,
    omit_kotlin = True,
)

# rules_buf

load("@rules_buf//buf:repositories.bzl", "rules_buf_dependencies", "rules_buf_toolchains")

rules_buf_dependencies()

rules_buf_toolchains(version = BUF_VERSION)

# rules_proto

load("@rules_proto//proto:repositories.bzl", "rules_proto_dependencies", "rules_proto_toolchains")

rules_proto_dependencies()

rules_proto_toolchains()

# graalvm

load("@rules_graal//graal:graal_bindist.bzl", "graal_bindist_repository")

graal_bindist_repository(
    name = "graal",
    java_version = JAVA_LANGUAGE_LEVEL,
    version = GRAALVM_VERSION,
)

# elemental2

load("@com_google_elemental2//build_defs:repository.bzl", "load_elemental2_repo_deps")

load_elemental2_repo_deps()

load("@com_google_elemental2//build_defs:workspace.bzl", "setup_elemental2_workspace")

setup_elemental2_workspace()

# rules_java

load("@rules_java//java:repositories.bzl", "rules_java_dependencies", "rules_java_toolchains")

rules_java_dependencies()

rules_java_toolchains()

# protocol buffers

load("@com_google_protobuf//:protobuf_deps.bzl", "protobuf_deps", "PROTOBUF_MAVEN_ARTIFACTS")

protobuf_deps()

# rules_jvm_external

load("@rules_jvm_external//:repositories.bzl", "rules_jvm_external_deps")

rules_jvm_external_deps()

load("@rules_jvm_external//:setup.bzl", "rules_jvm_external_setup")

rules_jvm_external_setup()

# buildtools

load("@com_github_bazelbuild_buildtools//buildifier:deps.bzl", "buildifier_dependencies")

buildifier_dependencies()

# rules_webtesting

load("@io_bazel_rules_webtesting//web:repositories.bzl", "web_test_repositories")

web_test_repositories()

load("@io_bazel_rules_webtesting//web/versioned:browsers-0.3.3.bzl", "browser_repositories")

browser_repositories(
    chromium = True,
    firefox = True,
)

# rules_nodejs

load("@build_bazel_rules_nodejs//:index.bzl", "node_repositories", "yarn_install")

node_repositories(
    node_version = NODE_VERSION,
    node_repositories = {
        "21.7.3-darwin_amd64": ("node-v21.7.3-darwin-x64.tar.gz", "node-v21.7.3-darwin-x64", "58d0212e169764c3424d2d5bec73e8a098d34b4e82fca6e1dd54083ea3049c5f"),
        "21.7.3-darwin_arm64": ("node-v21.7.3-darwin-arm64.tar.gz", "node-v21.7.3-darwin-arm64", "165d3ba3500cfc8708f85d3815aaaa21ce418164c933d5419c30825ccad3a99c"),
        "21.7.3-linux_amd64": ("node-v21.7.3-linux-x64.tar.xz", "node-v21.7.3-linux-x64", "19e17a77e59044de169cd19be3f3bccae686982fba022f9634421b44724ee90c"),
        "21.7.3-windows_amd64": ("node-v21.7.3-win-x64.zip", "node-v21.7.3-win-x64", "d2314f496782b53ad2fe5fa82fca6ff7f39f07fe59dd007116404ad92179c78e"),
    },
    package_json = [
        "//:package.json",
        "@typescript//:package.json",
    ],
)

yarn_install(
    name = "npm",
    package_json = "//:package.json",
    strict_visibility = True,
    yarn_lock = "//:yarn.lock",
)

load("@build_bazel_rules_nodejs//toolchains/esbuild:esbuild_repositories.bzl", "esbuild_repositories")

esbuild_repositories(npm_repository = "npm")

# JVM dependencies

load("@rules_jvm_external//:defs.bzl", "maven_install")

THIRD_PARTY_ARTIFACTS = (
    PROTOBUF_MAVEN_ARTIFACTS
)

MAVEN_REPOSITORIES = [
    "https://maven.pkg.st",
    "https://maven.elide.dev",
    "https://repo1.maven.org/maven2",
]

maven_install(
    artifacts = THIRD_PARTY_ARTIFACTS + [
        "info.picocli:picocli:4.7.0",
    ],
    fetch_javadoc = True,
    fetch_sources = True,
    generate_compat_repositories = True,
    maven_install_json = "@//:maven_install.json",
    repositories = MAVEN_REPOSITORIES,
    strict_visibility = True,
    version_conflict_policy = "pinned",
)

load("@maven//:defs.bzl", "pinned_maven_install")

pinned_maven_install()

LOMBOK_VERSION = "1.18.16"

LOMBOK_JAR_SHA256 = "7206cbbfd6efd5e85bceff29545633645650be58d58910a23b0d4835fbd15ed7"

http_jar(
    name = "lombok_jar",
    sha256 = LOMBOK_JAR_SHA256,
    url = "https://projectlombok.org/downloads/lombok-%s.jar" % LOMBOK_VERSION,
)

new_local_repository(
    name = "lombok",
    build_file = "third_party/lombok/BUILD.bazel",
    path = "third_party/lombok/",
)

# J2CL dependencies

j2cl_maven_import_external(
    name = "org_projectlombok_lombok-j2cl",
    annotation_only = True,
    artifact = "org.projectlombok:lombok:%s" % LOMBOK_VERSION,
    artifact_sha256 = LOMBOK_JAR_SHA256,
    server_urls = MAVEN_REPOSITORIES,
)

j2cl_maven_import_external(
    name = "org_checkerframework_checker_qual-j2cl",
    annotation_only = True,
    artifact = "org.checkerframework:checker-qual:2.5.3",
    artifact_sha256 = "7be622bd25208ccfbb9b634af8bd37aef54368403a1fdce84d908078330a189d",
    server_urls = MAVEN_REPOSITORIES,
)

j2cl_maven_import_external(
    name = "com_google_errorprone_error_prone_annotations-j2cl",
    annotation_only = True,
    artifact = "com.google.errorprone:error_prone_annotations:2.4.0",
    artifact_sha256 = "5f2a0648230a662e8be049df308d583d7369f13af683e44ddf5829b6d741a228",
    server_urls = MAVEN_REPOSITORIES,
)

j2cl_maven_import_external(
    name = "com_google_code_findbugs_jsr305-j2cl",
    annotation_only = True,
    artifact = "com.google.code.findbugs:jsr305:3.0.2",
    server_urls = MAVEN_REPOSITORIES,
)

j2cl_maven_import_external(
    name = "com_google_j2objc_annotations-j2cl",
    annotation_only = True,
    artifact = "com.google.j2objc:j2objc-annotations:jar:1.3",
    artifact_sha256 = "21af30c92267bd6122c0e0b4d20cccb6641a37eaf956c6540ec471d584e64a7b",
    server_urls = MAVEN_REPOSITORIES,
)

j2cl_maven_import_external(
    name = "com_google_guava-j2cl",
    artifact = "com.google.guava:guava-gwt:29.0-jre",
    artifact_sha256 = "39e899acd9f9f09da2871eaaab0024cae2506da24457c9542955ed754f653292",
    server_urls = MAVEN_REPOSITORIES,
    deps = [
        "@com_google_elemental2//:elemental2-promise-j2cl",
        "@com_google_errorprone_error_prone_annotations-j2cl",
        "@com_google_j2cl//:jsinterop-annotations-j2cl",
        "@com_google_j2objc_annotations-j2cl",
        "@org_checkerframework_checker_qual-j2cl",
    ],
)

# zig toolchain

# load("@bazel-zig-cc//toolchain:defs.bzl", zig_toolchains = "toolchains")

# zig_toolchains()

# register_toolchains(
#    "@zig_sdk//toolchain:darwin_arm64",
#    "@zig_sdk//toolchain:darwin_amd64",
#    "@zig_sdk//toolchain:x86_64-linux-gnu.2.31",
# )

# skylib

load("@bazel_skylib//:workspace.bzl", "bazel_skylib_workspace")

bazel_skylib_workspace()

# rules_pkg

load("@rules_pkg//:deps.bzl", "rules_pkg_dependencies")

rules_pkg_dependencies()

# rules_buf

load("@rules_buf//buf:defs.bzl", "buf_dependencies")

buf_dependencies(
    name = "proto",
    modules = [
        "buf.build/googleapis/googleapis:75b4300737fb4efca0831636be94e517",
        "buf.build/elide/safe-html-types:3d5d7e9b28be4293bba1e2571091590e",
        "buf.build/elide/v3:1b11fd0a79d74e2b83b01b0483f49f11",
    ],
)

# aspect

load("@aspect_bazel_lib//lib:repositories.bzl", "aspect_bazel_lib_dependencies")

aspect_bazel_lib_dependencies()

# rules_foreign_cc

load("@rules_foreign_cc//foreign_cc:repositories.bzl", "rules_foreign_cc_dependencies")

rules_foreign_cc_dependencies()
