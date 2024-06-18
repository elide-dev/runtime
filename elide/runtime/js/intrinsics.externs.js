/*
 * Copyright (c) 2024 Elide Technologies, Inc.
 *
 * Licensed under the MIT license (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *   https://opensource.org/license/mit/
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under the License.
 */

// noinspection JSAnnotator,JSUnusedAssignment

/**
 * @fileoverview Native intrinsic externs provided by the Elide runtime.
 * @externs
 * @author samuel.gammon@gmail.com (Sam Gammon)
 */

// Primordials are provided to runtime internals from the host VM.

/**
 * Host-provided bindins.
 *
 * @type {!Object<string, *>}
 */
const primordials = {};

/**
 * Console base.
 *
 * @constructor
 */
function ConsoleBridge() {}

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
 * Constructor entrypoint for an intrinsic `URL` object.
 *
 * @param {*} url_input URL to parse or copy.
 * @param {*} opt_url_base Base URL to resolve against, if applicable.
 * @constructor
 */
function URL(url_input, opt_url_base) {}
