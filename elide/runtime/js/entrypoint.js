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

// Top-level Intrinsics.
goog.require('elide.runtime.js.bridge.jserror');
goog.require('elide.runtime.js.intrinsics.base64');
goog.require('elide.runtime.js.intrinsics.console');
goog.require('elide.runtime.js.intrinsics.err.ValueError');
goog.require('elide.runtime.js.intrinsics.url.URL');

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
 * Global symbol where application environment is injected.
 *
 * @const
 * @type {!string}
 */
const APP_ENV = '__Elide_app_env__';

/**
 * Global symbol where Elide version is injected.
 *
 * @const
 * @type {!string}
 */
const RUNTIME_VERSION = '__Elide_version__';

/**
 * Global symbol where the intrinsic process object is injected.
 *
 * @const
 * @type {!string}
 */
const RUNTIME_PROCESS = '__Elide_node_process__';

/**
 * Application environment injected by the Elide runtime.
 *
 * @type {!Object<string, !string>}
 */
const injectedApplicationEnvironment = globalThis[APP_ENV];

/**
 * Elide version provided by the runtime.
 *
 * @type {!string}
 */
const elideVersion = globalThis[RUNTIME_VERSION];

/**
 * Intrinsic process object, injected by the runtime.
 *
 * @type {!EnhancedNodeProcess}
 */
const intrinsicProcess = globalThis[RUNTIME_PROCESS];

/**
 * Return the Node Process API to use.
 *
 * @returns {!EnhancedNodeProcess}
 */
function nodeProcessAPI() {
    return intrinsicProcess;
}

globalThis['window'] = undefined;
globalThis['gc'] = null;

/**
 * Global application object.
 *
 * @type {!Object<string, *>}
 */
const App = {};
globalThis['global'] = App;
globalThis['self'] = App;

/**
 * Global Elide object.
 *
 * @type {{
 *   version: !string,
 *   process: !EnhancedNodeProcess,
 *   context: {build: boolean, runtime: boolean}
 * }}
 */
const Elide = {
    'process': nodeProcessAPI(),
    'version': elideVersion,
    'context': {
        'build': false,
        'runtime': true
    },
};

globalThis['Elide'] = Elide;

/**
 * Global process proxy object.
 *
 * @type {!EnhancedNodeProcess}
 */
const process = Elide.process;

globalThis['process'] = process;
