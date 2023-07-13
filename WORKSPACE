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
    "http_file",
)
load(
    "@bazel_tools//tools/build_defs/repo:git.bzl",
    "git_repository",
)
load(
    "@bazel_tools//tools/build_defs/repo:java.bzl",
    "java_import_external",
)
load(
    "@bazel_tools//tools/build_defs/repo:jvm.bzl",
    "jvm_maven_import_external",
)
load(
    "@bazel_tools//tools/build_defs/repo:utils.bzl",
    "maybe",
)
load(
    "//tools:config.bzl",
    "BUF_VERSION",
    "ENABLE_J2CL",
    "ENABLE_J2WASM",
    "GO_VERSION",
    "GRAALVM_VERSION",
    "JAVA_LANGUAGE_LEVEL",
    "KOTLIN_COMPILER_FINGERPRINT",
    "KOTLIN_COMPILER_VERSION",
    "KOTLIN_SDK_VERSION",
    "NODE_VERSION",
    "PROTOBUF_VERSION",
    "RUST_EDITION",
    "RUST_VERSION",
    "YARN_VERSION",
)

http_archive(
    name = "com_github_bazelbuild_buildtools",
    sha256 = "e3bb0dc8b0274ea1aca75f1f8c0c835adbe589708ea89bf698069d0790701ea3",
    strip_prefix = "buildtools-5.1.0",
    urls = ["https://github.com/bazelbuild/buildtools/archive/5.1.0.tar.gz"],
)

http_archive(
    name = "com_google_protobuf",
    sha256 = "8b28fdd45bab62d15db232ec404248901842e5340299a57765e48abe8a80d930",
    strip_prefix = "protobuf-%s" % PROTOBUF_VERSION,
    urls = ["https://github.com/protocolbuffers/protobuf/archive/v%s.tar.gz" % PROTOBUF_VERSION],
)

http_archive(
    name = "com_google_googleapis",
    sha256 = "d4559d63ce6bdff9690a2c058ddbf91581eac203b3e3fc5021577b8c644f3313",
    strip_prefix = "googleapis-d2f3b35e4b6a47db31eb47fd4e9d4e1aab90a1e9",
    urls = ["https://github.com/googleapis/googleapis/archive/d2f3b35e4b6a47db31eb47fd4e9d4e1aab90a1e9.tar.gz"],
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
    sha256 = "ec57139e466faae563f2fc39609da4948a479bb51b6d67aedd7d9b1b8059c433",
    urls = [
        "https://github.com/bazelbuild/stardoc/releases/download/0.5.4/stardoc-0.5.4.tar.gz",
    ],
)

http_archive(
    name = "bazel_skylib",
    sha256 = "b8a1527901774180afc798aeb28c4634bdccf19c4d98e7bdd1ce79d1fe9aaad7",
    urls = [
        "https://github.com/bazelbuild/bazel-skylib/releases/download/1.4.1/bazel-skylib-1.4.1.tar.gz",
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
    sha256 = "6dc2da7ab4cf5d7bfc7c949776b1b7c733f05e56edc4bcd9022bb249d2e2a996",
    urls = [
        "https://github.com/bazelbuild/rules_go/releases/download/v0.39.1/rules_go-v0.39.1.zip",
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
    sha256 = "eaaa92494105f9c7f33849bec57070ea17c8ca8287378b499598d06b45dff802",
    strip_prefix = "rules_python-62e95a46fec4421d2ae8060c02ea45f800f5ce57",
    url = "https://github.com/bazelbuild/rules_python/archive/62e95a46fec4421d2ae8060c02ea45f800f5ce57.zip",
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
    sha256 = "a7e1c6d0fd2b9ae75fdd45c68f6a8a01b00170385a0119c6e13a05718f337113",
    strip_prefix = "closure-library-e03fe350d8fc73dfaceb30913ab6b988cea041f9",
    url = "https://github.com/google/closure-library/archive/e03fe350d8fc73dfaceb30913ab6b988cea041f9.tar.gz",
)

http_archive(
    name = "externs",
    build_file = "google/closure/externs.bzl",
    sha256 = "58d0f6a007005bef8af13a5e3fd4a6a6292c69911474d34a316e9ababc0641b5",
    strip_prefix = "closure-compiler-2ab0d626091aba7a9deb247a083c3efdb5b6ab7b/externs",
    url = "https://github.com/google/closure-compiler/archive/2ab0d626091aba7a9deb247a083c3efdb5b6ab7b.tar.gz",
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
    sha256 = "b9537e33993477727fa8e7f2cd8d8eadd8ab03e3e8a29ca20ecc56f5dd011a25",
    strip_prefix = "elemental2-5cdc3ff41334db8f015b9e8486f79eec53152f7c",
    url = "https://github.com/google/elemental2/archive/5cdc3ff41334db8f015b9e8486f79eec53152f7c.tar.gz",
)

http_archive(
    name = "aspect_bazel_lib",
    sha256 = "5f3443b1d98a462a8b7330f4742483afc8b2d17c8555dd97ce4146f43e961718",
    strip_prefix = "bazel-lib-1.31.1",
    url = "https://github.com/aspect-build/bazel-lib/archive/refs/tags/v1.31.1.tar.gz",
)

http_archive(
    name = "com_google_jsinterop_generator",
    sha256 = "af5e22e7f7a84095ea7f4e47219aef37490989a77797026e81a934b883c081cb",
    strip_prefix = "jsinterop-generator-c873fb2da441f4cb93444298b52159063e54c817",
    url = "https://github.com/google/jsinterop-generator/archive/c873fb2da441f4cb93444298b52159063e54c817.zip",
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
    sha256 = "99e8c754f9b11dc4ce476d1d6d53a0cacd3286140bacab3403b13ba0caac606e",
    strip_prefix = "flatbuffers-6e214c3a498fe7f9c7923aecdae4c789e224ad18",
    urls = ["https://github.com/google/flatbuffers/archive/6e214c3a498fe7f9c7923aecdae4c789e224ad18.tar.gz"],
)

http_archive(
    name = "rules_rust",
    sha256 = "4a9cb4fda6ccd5b5ec393b2e944822a62e050c7c06f1ea41607f14c4fdec57a2",
    urls = ["https://github.com/bazelbuild/rules_rust/releases/download/0.25.1/rules_rust-v0.25.1.tar.gz"],
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

load("@com_google_j2cl//build_defs:rules.bzl", "setup_j2cl_workspace")
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

load("@com_google_protobuf//:protobuf_deps.bzl", "protobuf_deps")
load("@com_google_protobuf//:protobuf_deps.bzl", "PROTOBUF_MAVEN_ARTIFACTS")

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

load("@build_bazel_rules_nodejs//:index.bzl", "node_repositories")

node_repositories(
    node_version = NODE_VERSION,
    package_json = [
        "//:package.json",
        "@typescript//:package.json",
    ],
)

load("@build_bazel_rules_nodejs//:index.bzl", "npm_install", "yarn_install")

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
load("@rules_jvm_external//:specs.bzl", "maven")

THIRD_PARTY_ARTIFACTS = (
    PROTOBUF_MAVEN_ARTIFACTS
)

MAVEN_REPOSITORIES = [
    "https://maven.pkg.st/",
    "https://repo1.maven.org/maven2",
    "https://elide-snapshots.storage-download.googleapis.com/repository/v3/",
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

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_jar")

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

load("@com_google_j2cl//build_defs:rules.bzl", "j2cl_maven_import_external")

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

# rules_rust

load("@rules_rust//rust:repositories.bzl", "rules_rust_dependencies", "rust_register_toolchains", "rust_repository_set")

rules_rust_dependencies()

rust_register_toolchains(
    edition = RUST_EDITION,
    extra_target_triples = [
        "x86_64-apple-darwin",
        "x86_64-unknown-linux-gnu",
        "aarch64-apple-darwin",
        "wasm32-unknown-unknown",
        "wasm32-wasi",
    ],
    versions = [RUST_VERSION],
)

rust_repository_set(
    name = "macos_x86_64",
    edition = RUST_EDITION,
    exec_triple = "x86_64-apple-darwin",
    extra_target_triples = ["aarch64-unknown-linux-gnu"],
    versions = [RUST_VERSION],
)

rust_repository_set(
    name = "linux_x86_64",
    edition = RUST_EDITION,
    exec_triple = "x86_64-unknown-linux-gnu",
    extra_target_triples = ["aarch64-unknown-linux-gnu"],
    versions = [RUST_VERSION],
)

load("@rules_rust//crate_universe:repositories.bzl", "crate_universe_dependencies")
load("@rules_rust//crate_universe:defs.bzl", "crates_repository")

crate_universe_dependencies(
    bootstrap = True,
)

crates_repository(
    name = "crates",
    cargo_lockfile = "//:Cargo.lock",
    lockfile = "//:Cargo.Bazel.lock",
    manifests = ["//:Cargo.toml"],
)

load("@crates//:defs.bzl", "crate_repositories")

crate_repositories()

load("@rules_rust//tools/rust_analyzer:deps.bzl", "rust_analyzer_dependencies")

rust_analyzer_dependencies()

load("@rules_rust//bindgen:repositories.bzl", "rust_bindgen_dependencies", "rust_bindgen_register_toolchains")

rust_bindgen_dependencies()

rust_bindgen_register_toolchains()

load("@rules_rust//proto/protobuf:repositories.bzl", "rust_proto_protobuf_dependencies", "rust_proto_protobuf_register_toolchains")

rust_proto_protobuf_dependencies()

rust_proto_protobuf_register_toolchains()

load("@rules_rust//proto/protobuf:transitive_repositories.bzl", "rust_proto_protobuf_transitive_repositories")

rust_proto_protobuf_transitive_repositories()

load("@rules_rust//proto:transitive_repositories.bzl", "rust_proto_transitive_repositories")

rust_proto_transitive_repositories()

load("@rules_rust//wasm_bindgen:repositories.bzl", "rust_wasm_bindgen_dependencies", "rust_wasm_bindgen_register_toolchains")

rust_wasm_bindgen_dependencies()

rust_wasm_bindgen_register_toolchains()

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
