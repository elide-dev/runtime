// noinspection JSAnnotator,JSUnusedAssignment

/**
 * @fileoverview Native intrinsic externs provided by the Elide runtime.
 * @externs
 * @author samuel.gammon@gmail.com (Sam Gammon)
 */

/**
 * Main Console intrinsic entrypoint.
 *
 * @type {*}
 */
var ConsoleBridge;

/**
 * Main Base64 intrinsic entrypoint.
 *
 * @constructor
 */
function Base64Bridge() {}

/**
 * Encode the `input` string to Base64, then return the resulting string.
 *
 * @param {!string} input Input string to encode.
 * @return {!string} Encoded string.
 */
Base64Bridge.prototype.encode = function (input) {};

/**
 * Decode the `input` string from Base64, then return the resulting string.
 *
 * @param {!string} input Input string to decode.
 * @return {!string} Decoded string.
 */
Base64Bridge.prototype.decode = function (input) {};

/**
 * Bridge to intrinsic Base64 implementations.
 *
 * @type {Base64Bridge}
 */
var Base64;

/**
 * Mount-point for intrinsic classes defined by the Elide VM.
 */
var Intrinsics;

/**
 * Constructor entrypoint for an intrinsic `URL` object.
 *
 * @param {*} url_input URL to parse or copy.
 * @param {*} opt_url_base Base URL to resolve against, if applicable.
 * @constructor
 */
Intrinsics.URL = function (url_input, opt_url_base) {};
