/*global goog*/

goog.module('elide.runtime.js.entry');

// Top-level Intrinsics.
goog.require('elide.runtime.js.intrinsics.base64');
goog.require('elide.runtime.js.intrinsics.console');

// WhatWG URL Specification.
goog.require('elide.runtime.js.intrinsics.url.URL');
goog.require('elide.runtime.js.intrinsics.url.URLSearchParams');
