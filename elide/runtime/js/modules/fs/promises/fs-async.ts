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
 * Provides a shim which offers a `fs/promises` module implementation that is compatible with Node.js-style imports.
 */

const internalsAccessor: any = globalThis['__Elide_node_fs_promises__'];

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
 * @returns A promise that resolves if the file is accessible
 */
export function access(path: string | Buffer | URL, mode: number = constants.F_OK): Promise<void> {
  return internalsAccessor().access(path, mode);
}

/**
 * Read a file
 *
 * Asynchronously reads the entire contents of a file. The encoding option is ignored if data is a buffer.
 *
 * @param path Path to the file
 * @param options Options for reading the file
 * @returns A promise that resolves with the file contents
 */
export function readFile(path: string | Buffer | URL, options: { encoding: string; flag?: string; }): Promise<string> {
  return internalsAccessor().readFile(path, options);
}

/**
 * Write a file
 *
 * Asynchronously writes data to a file, replacing the file if it already exists. data can be a string or a buffer.
 *
 * @param path Path to the file
 * @param data Data to write to the file
 * @param options Options for writing the file
 * @returns A promise that resolves when the file is written
 */
export function writeFile(path: string | Buffer | URL, data: string | Buffer | Uint8Array, options: { encoding: string; flag?: string; }): Promise<void> {
  return internalsAccessor().writeFile(path, data, options);
}

/**
 * Make a directory
 *
 * Asynchronously creates a directory. The optional options argument can be a number that specifies the mode (permission
 * and sticky bits), or an object. If the recursive option is set to false, the directory must be empty. The mode
 * defaults to 0o777.
 *
 * @param path Path to the directory
 * @param options Options for creating the directory
 * @returns A promise that resolves when the directory is created
 */
export function mkdir(path: string | Buffer | URL, options: { recursive: boolean; }): Promise<void> {
  return internalsAccessor().mkdir(path, options);
}

export default {
  access,
  constants,
  readFile,
  writeFile,
  mkdir,
};
