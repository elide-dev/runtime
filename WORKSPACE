workspace(name = "elide")

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
    "GO_VERSION",
    "GRAALVM_VERSION",
    "JAVA_LANGUAGE_LEVEL",
    "KOTLIN_COMPILER_FINGERPRINT",
    "KOTLIN_COMPILER_VERSION",
    "KOTLIN_SDK_VERSION",
    "NODE_VERSION",
    "PROTOBUF_VERSION",
)

http_archive(
    name = "com_github_bazelbuild_buildtools",
    sha256 = "7f43df3cca7bb4ea443b4159edd7a204c8d771890a69a50a190dc9543760ca21",
    strip_prefix = "buildtools-5.0.1",
    urls = ["https://github.com/bazelbuild/buildtools/archive/5.0.1.tar.gz"],
)

http_archive(
    name = "com_google_protobuf",
    sha256 = "8b28fdd45bab62d15db232ec404248901842e5340299a57765e48abe8a80d930",
    strip_prefix = "protobuf-%s" % PROTOBUF_VERSION,
    urls = ["https://github.com/protocolbuffers/protobuf/archive/v%s.tar.gz" % PROTOBUF_VERSION],
)

http_archive(
    name = "com_google_googleapis",
    sha256 = "573d0cdad2c60c555f22579ebeb86d5d404f374f3b651e0843451e3497b6568f",
    strip_prefix = "googleapis-13f9b8908d84fa85c7573223aac3ac900f1cca27",
    urls = ["https://github.com/googleapis/googleapis/archive/13f9b8908d84fa85c7573223aac3ac900f1cca27.tar.gz"],
)

http_archive(
    name = "proto_common",
    build_file = "proto_common.bzl",
    sha256 = "215220fdbe924a338a789459dd630ce46f9195d3e73efeb3172e201b578a053d",
    strip_prefix = "api-common-protos-e16c55b094638b43a97edd0847614ab91e2461f7",
    urls = ["https://github.com/googleapis/api-common-protos/archive/e16c55b094638b43a97edd0847614ab91e2461f7.tar.gz"],
)

http_archive(
    name = "safe_html_types",
    build_file = "safe_html_types.bzl",
    sha256 = "2356090e7632f49ea581bb6f8808fa038a7433d433f3e8d7045a36f81fb39d65",
    strip_prefix = "safe-html-types-8507735457ea41a37dfa027fb176d49d5783c4ba",
    urls = ["https://github.com/google/safe-html-types/archive/8507735457ea41a37dfa027fb176d49d5783c4ba.tar.gz"],
)

http_archive(
    name = "rules_proto",
    sha256 = "e017528fd1c91c5a33f15493e3a398181a9e821a804eb7ff5acdd1d2d6c2b18d",
    strip_prefix = "rules_proto-4.0.0-3.20.0",
    urls = [
        "https://github.com/bazelbuild/rules_proto/archive/refs/tags/4.0.0-3.20.0.tar.gz",
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
        "https://repo1.maven.org/maven2/org/graalvm/sdk/graal-sdk/%s/graal-sdk-%s.jar" % (GRAALVM_VERSION, GRAALVM_VERSION),
    ],
)

http_archive(
    name = "io_bazel_stardoc",
    sha256 = "3fd8fec4ddec3c670bd810904e2e33170bedfe12f90adf943508184be458c8bb",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/stardoc/releases/download/0.5.3/stardoc-0.5.3.tar.gz",
        "https://github.com/bazelbuild/stardoc/releases/download/0.5.3/stardoc-0.5.3.tar.gz",
    ],
)

http_archive(
    name = "bazel_skylib",
    sha256 = "74d544d96f4a5bb630d465ca8bbcfe231e3594e5aae57e1edbf17a6eb3ca2506",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/bazel-skylib/releases/download/1.3.0/bazel-skylib-1.3.0.tar.gz",
        "https://github.com/bazelbuild/bazel-skylib/releases/download/1.3.0/bazel-skylib-1.3.0.tar.gz",
    ],
)

http_archive(
    name = "rules_java",
    sha256 = "89c311d7aeae8db785977bf236d9b558e6805216280f8405f79ecd622d7595b8",
    strip_prefix = "rules_java-18f0930765378ecbf5fd72c89fc7db270855fc2d",
    url = "https://github.com/bazelbuild/rules_java/archive/18f0930765378ecbf5fd72c89fc7db270855fc2d.tar.gz",
)

http_archive(
    name = "io_bazel_rules_go",
    sha256 = "f2dcd210c7095febe54b804bb1cd3a58fe8435a909db2ec04e31542631cf715c",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_go/releases/download/v0.31.0/rules_go-v0.31.0.zip",
        "https://github.com/bazelbuild/rules_go/releases/download/v0.31.0/rules_go-v0.31.0.zip",
    ],
)

http_archive(
    name = "bazel_gazelle",
    sha256 = "de69a09dc70417580aabf20a28619bb3ef60d038470c7cf8442fafcf627c21cb",
    urls = [
        "https://storage.googleapis.com/bazel-mirror/github.com/bazelbuild/bazel-gazelle/releases/download/v0.24.0/bazel-gazelle-v0.24.0.tar.gz",
        "https://github.com/bazelbuild/bazel-gazelle/releases/download/v0.24.0/bazel-gazelle-v0.24.0.tar.gz",
    ],
)

http_archive(
    name = "rules_python",
    sha256 = "55726ab62f7933d72a8e03d3fd809f1a66e8f67147a3ead6e88638ee8ac11410",
    strip_prefix = "rules_python-6e0cb652386870f72d8dab554a2ce0e4688c9ab5",
    url = "https://github.com/bazelbuild/rules_python/archive/6e0cb652386870f72d8dab554a2ce0e4688c9ab5.zip",
)

http_archive(
    name = "aspect_rules_js",
    sha256 = "66ecc9f56300dd63fb86f11cfa1e8affcaa42d5300e2746dba08541916e913fd",
    strip_prefix = "rules_js-1.13.0",
    url = "https://github.com/aspect-build/rules_js/archive/refs/tags/v1.13.0.tar.gz",
)

http_archive(
    name = "aspect_rules_ts",
    sha256 = "e81f37c4fe014fc83229e619360d51bfd6cb8ac405a7e8018b4a362efa79d000",
    strip_prefix = "rules_ts-1.0.4",
    url = "https://github.com/aspect-build/rules_ts/archive/refs/tags/v1.0.4.tar.gz",
)

http_archive(
    name = "com_google_j2cl",
    sha256 = None,
    strip_prefix = "j2cl-42e9863a7eb6ccbd81dedf351181b4c6b1c55706",
    url = "https://github.com/elide-tools/j2cl/archive/42e9863a7eb6ccbd81dedf351181b4c6b1c55706.tar.gz",
)

http_archive(
    name = "com_google_elemental2",
    sha256 = "bf925bef3a9e2104e45c7a097e87f8c7d87735a1496343dd0b86af94fc050c0d",
    strip_prefix = "elemental2-7c822ebb67e7a34546ba5123fb48b46483fcd57f",
    url = "https://github.com/google/elemental2/archive/7c822ebb67e7a34546ba5123fb48b46483fcd57f.tar.gz",
)

http_archive(
    name = "com_google_jsinterop_generator",
    sha256 = "9ce71fed8a0d0a8e004e5a910c1bc3dae34e18a4ba27c04fd6a64f21176055a4",
    strip_prefix = "jsinterop-generator-00852a07cf4b78711243b2a0a86287984a90712f",
    url = "https://github.com/google/jsinterop-generator/archive/00852a07cf4b78711243b2a0a86287984a90712f.zip",
)

java_import_external(
    name = "com_google_jsinterop_annotations",
    jar_sha256 = "b2cc45519d62a1144f8cd932fa0c2c30a944c3ae9f060934587a337d81b391c8",
    jar_urls = [
        "https://mirror.bazel.build/maven.ibiblio.org/maven2/com/google/jsinterop/jsinterop-annotations/1.0.1/jsinterop-annotations-1.0.1.jar",
        "http://maven.ibiblio.org/maven2/com/google/jsinterop/jsinterop-annotations/1.0.1/jsinterop-annotations-1.0.1.jar",
        "https://repo1.maven.org/maven2/com/google/jsinterop/jsinterop-annotations/1.0.1/jsinterop-annotations-1.0.1.jar",
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
    name = "cel_spec",
    sha256 = "639e1bb2c11eca9d208e09de9115096a8ea9bad7094ce896d095437534aa0628",
    strip_prefix = "cel-spec-8f7ae41b744cbc0129263c5f8f2dfd2390ced522",
    url = "https://github.com/google/cel-spec/archive/8f7ae41b744cbc0129263c5f8f2dfd2390ced522.zip",
)

http_archive(
    name = "com_github_google_flatbuffers",
    sha256 = "917bc64329af88a7a22b113ad6cc76b81e27e8946a498241e25ca3608a377eb3",
    strip_prefix = "flatbuffers-8468eab83bacc8bbd6cb5ae22197af06a9437b2d",
    urls = ["https://github.com/google/flatbuffers/archive/8468eab83bacc8bbd6cb5ae22197af06a9437b2d.tar.gz"],
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

# rules_kotlin

load("@io_bazel_rules_kotlin//kotlin:repositories.bzl", "kotlin_repositories", "kotlinc_version")

kotlin_repositories(
    compiler_release = kotlinc_version(
        release = KOTLIN_COMPILER_VERSION,
        sha256 = None,
    ),
)

register_toolchains("//tools/defs/kt/toolchain")

# j2cl

load("@com_google_j2cl//build_defs:repository.bzl", "load_j2cl_repo_deps")

load_j2cl_repo_deps()

load("@com_google_j2cl//build_defs:rules.bzl", "setup_j2cl_workspace")

setup_j2cl_workspace(
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

# rules_go

load("@bazel_gazelle//:deps.bzl", "go_repository")
load("@io_bazel_rules_go//go:deps.bzl", "go_register_toolchains", "go_rules_dependencies")

go_register_toolchains(version = GO_VERSION)

go_rules_dependencies()

# rules_jvm_external

load("@rules_jvm_external//:repositories.bzl", "rules_jvm_external_deps")

rules_jvm_external_deps()

load("@rules_jvm_external//:setup.bzl", "rules_jvm_external_setup")

rules_jvm_external_setup()

# buildtools

load("@com_github_bazelbuild_buildtools//buildifier:deps.bzl", "buildifier_dependencies")

buildifier_dependencies()

# rules_ts

load("@aspect_rules_ts//ts:repositories.bzl", "rules_ts_dependencies")

rules_ts_dependencies(
    ts_version_from = "//:package.json",
)

# rules_js

load("@aspect_rules_js//js:repositories.bzl", "rules_js_dependencies")

rules_js_dependencies()

load("@rules_nodejs//nodejs:repositories.bzl", "nodejs_register_toolchains")

nodejs_register_toolchains(
    name = "nodejs",
    node_version = NODE_VERSION,
)

load("@aspect_rules_js//npm:npm_import.bzl", "npm_translate_lock")

npm_translate_lock(
    name = "npm",
    pnpm_lock = "//:pnpm-lock.yaml",
    verify_node_modules_ignored = "//:.bazelignore",
)

load("@npm//:repositories.bzl", "npm_repositories")

npm_repositories()

#load("//tools/defs/java/testing:junit5.bzl", "junit5_repositories")

#junit5_repositories()

# JVM dependencies

load("@rules_jvm_external//:defs.bzl", "maven_install")
load("@rules_jvm_external//:specs.bzl", "maven")

THIRD_PARTY_ARTIFACTS = (
    PROTOBUF_MAVEN_ARTIFACTS
)

MAVEN_REPOSITORIES = [
    "https://repo1.maven.org/maven2",
    "https://elide-snapshots.storage-download.googleapis.com/repository/v3/",
]

maven_install(
    artifacts = THIRD_PARTY_ARTIFACTS + [],
    fetch_javadoc = True,
    fetch_sources = True,
    generate_compat_repositories = True,
    repositories = MAVEN_REPOSITORIES,
    strict_visibility = True,
    version_conflict_policy = "pinned",
)

#load("@maven//:defs.bzl", "pinned_maven_install")

#pinned_maven_install()

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

# skylib

#load("@bazel_skylib//:workspace.bzl", "bazel_skylib_workspace")

#bazel_skylib_workspace()

# stardoc

#load("@io_bazel_stardoc//:setup.bzl", "stardoc_repositories")

#stardoc_repositories()
