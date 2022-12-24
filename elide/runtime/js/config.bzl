load(
    "//tools/defs/closure:externs.bzl",
    "extern",
)

## JS: Debugging
## -------------
## Whether to build debugging features into the runtime.
DEBUG = False

## JS: Language Level
## ------------------
## Language level to use for the compiled runtime.
JS_LANGUAGE = "ECMASCRIPT_2021"

## JS: Compiler Arguments
## ----------------------
## Configures the Closure Compiler.
JS_ARGS = []

## JS: Intrinsics & Externs
## ------------------------
## Describes the baseline set of externs available in the Elide JS runtime environment.
BASE_JS_EXTERNS = [extern(i) for i in [
    "browser/intl",
]] + [
    "//third_party/graalvm/js",
]

## JS: Static Defines
## ------------------
## Compile-time definitions which control code inclusion and behavior.
DEFINES = {}
