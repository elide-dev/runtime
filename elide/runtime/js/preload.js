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

goog.module('elide.runtime.js.preload');

const nodeModules = [
  'assert',
  'assert/strict',
  'buffer',
  'child_process',
  'cluster',
  'console',
  'crypto',
  'dgram',
  'diagnostics_channel',
  'dns',
  'dns/promises',
  'domain',
  'events',
  'fs',
  'fs/promises',
  'http',
  'http2',
  'https',
  'inspector',
  'module',
  'net',
  'os',
  'path',
  'perf_hooks',
  'process',
  'querystring',
  'readline',
  'stream',
  'stream/promises',
  'string_decoder',
  'timers',
  'timers/promises',
  'tls',
  'trace_events',
  'tty',
  'url',
  'util',
  'v8',
  'vm',
  'wasi',
  'worker_threads',
  'zlib'
];

const elideModules = [
  'sqlite'
];

/**
 * Preload all modules.
 */
function preload() {
  try {
    for (const module of nodeModules) {
      require(`node:${module}`);
      import(`node:${module}`);
      require(`${module}`);
      import(`${module}`);
    }
  } catch (err) {}

  try {
    for (const module of elideModules) {
      require(`elide:${module}`);
      import(`elide:${module}`);
    }
  } catch (err) {}
}

preload();
