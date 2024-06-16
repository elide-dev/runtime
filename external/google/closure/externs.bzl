load(
    "@elide//tools:defs.bzl",
    "closure_extern",
    "extern",
    "js_extern",
)

package(
    default_visibility = ["//visibility:public"],
)

## Externs: ECMAScript 3, 5, and 6.
## ----------------------------------------------
## Always included by Closure Compiler (implied).
[
    js_extern(
        name = js,
        srcs = [closure_extern(js)],
    ) for js in [
        "es3",
        "es5",
        "es6",
        "es6_collections",
    ]
]

## Externs: Browser standards.
## ----------------------------------------------
## Browser standards supported by the Elide runtime.
[
    js_extern(
        name = "browser_%s" % js,
        srcs = [closure_extern("browser/%s" % js)],
    ) for js in [
        "fetchapi",       ## Fetch API.
        "intl",           ## Internationalization API.
        "url",            ## URL APIs.
        "svg",            ## SVG APIs.
        "webassembly",    ## WebAssembly APIs.
        "webstorage",     ## Web Storage API.
    ]
]

## Externs: W3C standards.
## ----------------------------------------------
## Standards supported by the World Wide Web Consortium.
[
    js_extern(
        name = "browser_%s" % js,
        srcs = [closure_extern("browser/w3c_%s" % js)],
    ) for js in [
        "abort",          ## W3C `AbortSignal` and `AbortController` APIs.
        "fileapi",        ## W3C Files API.
        "indexeddb",      ## W3C IndexedDB Standard.
        "trusted_types",  ## W3C Trusted Types Standard.
        "webcrypto",      ## W3C Web Crypto API.
        "worklets",       ## W3C Worklets Standard.
    ]
]


## Externs: WhatWG standards.
## ----------------------------------------------
## Standards supported by the Web Hypertext Application Technology Working Group (WHATWG).
[
    js_extern(
        name = "browser_%s" % js,
        srcs = [closure_extern("browser/whatwg_%s" % js)],
    ) for js in [
        # Nothing at this time.
    ]
]
