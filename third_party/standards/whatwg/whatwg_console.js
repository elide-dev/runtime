/*
 * Copyright 2019 The Closure Compiler Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Definitions for console debugging facilities.
 *     https://console.spec.whatwg.org/
 * @externs
 */

/**
 * @constructor
 * @see https://console.spec.whatwg.org/
 */
let Console;

/**
 * If condition is false, perform Logger("error", data).
 * @param {*} condition
 * @param {...*} var_data
 * @return {undefined}
 */
Console.assert = function(condition, var_data) {};

/**
 * @return {undefined}
 */
Console.clear = function() {};

/**
 * @param {...*} var_data
 * @return {undefined}
 */
Console.debug = function(var_data) {};

/**
 * @param {...*} var_data
 * @return {undefined}
 */
Console.error = function(var_data) {};

/**
 * @param {...*} var_data
 * @return {undefined}
 */
Console.info = function(var_data) {};

/**
 * @param {...*} var_data
 * @return {undefined}
 */
Console.log = function(var_data) {};

/**
 * @param {!Object} tabularData
 * @param {*=} properties
 * @return {undefined}
 */
Console.table = function(tabularData, properties) {};

/**
 * @param {...*} var_data
 * @return {undefined}
 */
Console.trace = function(var_data) {};

/**
 * @param {...*} var_data
 * @return {undefined}
 */
Console.warn = function(var_data) {};

/**
 * @param {*} item
 * @return {undefined}
 */
Console.dir = function(item) {};

/**
 * @param {...*} var_data
 * @return {undefined}
 */
Console.dirxml = function(var_data) {};

/**
 * @param {string=} label
 * @return {undefined}
 */
Console.count = function(label) {};

/**
 * @param {string=} label
 * @return {undefined}
 */
Console.countReset = function(label) {};

/**
 * @param {...*} var_data
 * @return {undefined}
 */
Console.group = function(var_data) {};

/**
 * @param {...*} var_data
 * @return {undefined}
 */
Console.groupCollapsed = function(var_data) {};

/**
 * @return {undefined}
 */
Console.groupEnd = function() {};

/**
 * @param {string} label
 * @return {undefined}
 */
Console.time = function(label) {};

/**
 * @param {string} label
 * @param {...*} data
 * @return {undefined}
 */
Console.timeLog = function(label, data) {};

/**
 * @param {string} label
 * @return {undefined}
 */
Console.timeEnd = function(label) {};
