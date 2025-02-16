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

// noinspection JSUnresolvedFunction

/*global goog*/

goog.module('elide.runtime.js.entry');

const {
  app_env,
  version,
  node_process,
} = primordials;

/**
 * Type structure of a Node process object.
 *
 * @typedef {{
 *   cwd: string,
 *   NODE_DEBUG: boolean,
 *   noDeprecation: boolean,
 *   browser: boolean,
 *   pid: number,
 *   NODE_ENV: string,
 *   env: !Object<string, string>,
 *   version: string
 * }}
 */
let NodeProcess;

/**
 * Type structure of a Node process with extra Elide-provided properties.
 *
 * @typedef {NodeProcess}
*/
let EnhancedNodeProcess;

/**
 * Application environment injected by the Elide runtime.
 *
 * @type {!Object<string, !string>}
 */
const injectedApplicationEnvironment = app_env;

/**
 * Elide version provided by the runtime.
 *
 * @type {!string}
 */
const elideVersion = version;

/**
 * Intrinsic process object, injected by the runtime.
 *
 * @type {!EnhancedNodeProcess}
 */
const intrinsicProcess = node_process;

/**
 * Return the Node Process API to use.
 *
 * @returns {!EnhancedNodeProcess}
 */
function nodeProcessAPI() {
    return intrinsicProcess;
}
