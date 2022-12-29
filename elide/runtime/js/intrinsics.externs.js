// noinspection JSAnnotator,JSUnusedAssignment

/**
 * @fileoverview Native intrinsic externs provided by the Elide runtime.
 * @externs
 * @author samuel.gammon@gmail.com (Sam Gammon)
 */

/**
 * Main Console intrinsic entrypoint.
 *
 * @type {!Console}
 */
var ConsoleBridge;

globalContext.Console = ConsoleBridge;

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

globalContext.Base64 = Base64;
