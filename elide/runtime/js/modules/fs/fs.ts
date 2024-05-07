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

/**
 * Intrinsic: Filesystem.
 *
 * Provides a shim which offers a `fs` module implementation that is compatible with Node.js-style imports.
 */

const internals: any = globalThis['__Elide_node_fs__'];

/**
 * File system constants
 */
const constants = {
  F_OK: 0,
  R_OK: 4,
  W_OK: 2,
  X_OK: 1,
};

/**
 * Check access to a file
 *
 * Tests a user's permissions for the file or directory specified by path. The mode argument is an optional integer
 * that specifies the accessibility checks to be performed. mode should be either the value fs.constants.F_OK or a
 * mask consisting of the bitwise OR of any of fs.constants.R_OK, fs.constants.W_OK, and fs.constants.X_OK (e.g.
 * fs.constants.W_OK | fs.constants.R_OK). Check File access constants for possible values of mode.
 *
 * @param path Path to check access for
 * @param mode Mode to check; defaults to `fs.constants.F_OK`
 * @param callback Callback function to dispatch with failures
 */
export function access(path: string | Buffer | URL, mode: number = constants.F_OK, callback: (err: NodeJS.ErrnoException) => void): void {
  internals.access(path, callback);
}

/**
 * Read a file
 *
 * Asynchronously reads the entire contents of a file. The encoding option is ignored if data is a buffer.
 *
 * @param path Path to the file
 * @param options Options for reading the file
 * @param callback Callback function to dispatch with the file contents
 */
export function readFile(path: string | Buffer | URL, options: { encoding: string; flag?: string; }, callback: (err: NodeJS.ErrnoException, data: string) => void): void {
  internals.readFile(path, options, callback);
}

/**
 * Read a file synchronously
 *
 * Synchronously reads the entire contents of a file. The encoding option is ignored if data is a buffer.
 *
 * @param path Path to the file
 * @param options Options for reading the file
 * @returns The file contents
 */
export function readFileSync(path: string | Buffer | URL, options: { encoding: string; flag?: string; }): string {
  return internals.readFileSync(path, options);
}

/**
 * Write a file
 *
 * Asynchronously writes data to a file, replacing the file if it already exists. data can be a string or a buffer.
 *
 * @param path Path to the file
 * @param data Data to write to the file
 * @param options Options for writing the file
 * @param callback Callback function to dispatch with the file contents
 */
export function writeFile(path: string | Buffer | URL, data: any, options: { encoding: string; mode?: number; flag?: string; }, callback: (err: NodeJS.ErrnoException) => void): void {
  internals.writeFile(path, data, options, callback);
}

/**
 * Write a file synchronously
 *
 * Synchronously writes data to a file, replacing the file if it already exists. data can be a string or a buffer.
 *
 * @param path Path to the file
 * @param data Data to write to the file
 * @param options Options for writing the file
 */
export function writeFileSync(path: string | Buffer | URL, data: any, options: { encoding: string; mode?: number; flag?: string; }): void {
  internals.writeFileSync(path, data, options);
}

export default {
  access,
  constants,
  readFile,
  readFileSync,
  writeFile,
  writeFileSync,
};
