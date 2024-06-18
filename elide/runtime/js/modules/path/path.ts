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
 * Intrinsic: Path.
 *
 * Provides a shim which offers a `path` module implementation that is compatible with Node.js-style imports.
 */

const { node_path } = primordials;

if (!node_path) {
  throw new Error(`The 'path' module failed to load its intrinsic API.`);
}

const internals: any = node_path;

/**
 * Represents an object with path properties.
 */
interface PathObject {
  root: string;
  dir: string;
  base: string;
  ext: string;
  name: string;
}

/**
 * Intrinsic: Path.
 *
 * Provides a shim which offers a `path` module implementation that is compatible with Node.js-style imports.
 */
export interface NodePathAPI {
  /**
   * Filesystem path delimiter.
   *
   * Specifies the path separation delimiter to use for this platform.
   */
  delimiter: string;

  /**
   * Provides POSIX-oriented path methods.
   */
  posix: NodePathAPI;

  /**
   * Provides Windows-oriented path methods.
   */
  win32: NodePathAPI;

  /**
   * The `path.basename()` method returns the last portion of a path, similar to the Unix `basename` command. Trailing
   * directory separators are ignored.
   *
   * @param path Path to get the base-name for
   * @param ext Extension to trim (optional)
   * @return The base-name of the path
   */
  basename(path: string, ext?: string): string;

  /**
   * The `path.dirname()` method returns the directory name of a path, similar to the Unix `dirname` command.
   *
   * @param path Path to get the directory name for
   * @return The directory name of the path
   */
  dirname(path: string): string;

  /**
   * The `path.extname()` method returns the extension of the path, from the last occurrence of the `.` (period)
   * character to end of string in the last portion of the path.
   *
   * @param path Path to get the extension for
   * @return The extension of the path
   */
  extname(path: string): string;

  /**
   * The `path.format()` method returns a path string from an object. This is the reverse operation from `path.parse()`.
   *
   * @param pathObject Object with path properties
   * @return The formatted path string
   */
  format(pathObject: PathObject): string;

  /**
   * The `path.isAbsolute()` method determines if the given path is an absolute path.
   *
   * @param path Path to check
   * @return True if the path is absolute, false otherwise
   */
  isAbsolute(path: string): boolean;

  /**
   * The `path.join()` method joins all given path segments together using the platform-specific separator as a code,
   * then normalizes the resulting path.
   *
   * @param paths Path segments to join
   * @return The joined path
   */
  join(...paths: string[]): string;

  /**
   * The `path.normalize()` method normalizes the given path, resolving `'..'` and `'.'` segments.
   *
   * @param path Path to normalize
   * @return The normalized path
   */
  normalize(path: string): string;

  /**
   * The `path.parse()` method returns an object whose properties represent significant elements of the path.
   *
   * @param path Path to parse
   * @return An object with path properties
   */
  parse(path: string): PathObject;

  /**
   * The `path.relative()` method returns the relative path from `from` to `to` based on the current working directory.
   *
   * @param from Starting path
   * @param to Destination path
   * @return The relative path
   */
  relative(from: string, to: string): string;

  /**
   * The `path.resolve()` method resolves a sequence of paths or path segments into an absolute path.
   *
   * @param pathSegments Path segments to resolve
   * @return The resolved absolute path
   */
  resolve(...pathSegments: string[]): string;

  /**
   * The `path.sep` property returns a platform-specific path segment separator.
   */
  sep: string;

  /**
   * The `path.toNamespacedPath()` method returns an equivalent path for the specified path allowing the use of
   * string-based keys for `require()`, instead of the object-literal-based path mapping technique.
   *
   * @param path Path to convert
   * @return The namespaced path
   */
  toNamespacedPath(path: string): string;
}

function getPathAPI(): NodePathAPI {
  return internals as NodePathAPI || {
    delimiter: ':',
    sep: '/'
  };
}

/**
 * Provides POSIX-oriented path methods.
 */
export const posix = getPathAPI().posix;

/**
 * Provides Windows-oriented path methods.
 */
export const win32 = getPathAPI().win32;

/**
 * Filesystem path delimiter.
 *
 * Specifies the path separation delimiter to use for this platform.
 */
export const delimiter = getPathAPI().delimiter;

/**
 * The `path.sep` property returns a platform-specific path segment separator.
 */
export const sep = getPathAPI().sep;

/**
 * The `path.basename()` method returns the last portion of a path, similar to the Unix `basename` command. Trailing
 * directory separators are ignored.
 *
 * @param path Path to get the base-name for
 * @param ext Extension to trim (optional)
 * @return The base-name of the path
 */
export function basename(path: string, ext?: string): string {
  // @ts-expect-error type difference
  return getPathAPI().basename(path, ext || null);
}

/**
 * The `path.dirname()` method returns the directory name of a path, similar to the Unix `dirname` command.
 *
 * @param path Path to get the directory name for
 * @return The directory name of the path
 */
export function dirname(path: string): string {
  return getPathAPI().dirname(path);
}

/**
 * The `path.extname()` method returns the extension of the path, from the last occurrence of the `.` (period)
 * character to end of string in the last portion of the path.
 *
 * @param path Path to get the extension for
 * @return The extension of the path
 */
export function extname(path: string): string {
  return getPathAPI().extname(path);
}

/**
 * The `path.format()` method returns a path string from an object. This is the reverse operation from `path.parse()`.
 *
 * @param pathObject Object with path properties
 * @return The formatted path string
 */
export function format(pathObject: PathObject): string {
  return getPathAPI().format(pathObject);
}

/**
 * The `path.isAbsolute()` method determines if the given path is an absolute path.
 *
 * @param path Path to check
 * @return True if the path is absolute, false otherwise
 */
export function isAbsolute(path: string): boolean {
  return getPathAPI().isAbsolute(path);
}

/**
 * The `path.join()` method joins all given path segments together using the platform-specific separator as a code,
 * then normalizes the resulting path.
 *
 * @param paths Path segments to join
 * @return The joined path
 */
export function join(...paths: string[]): string {
  return getPathAPI().join(...paths);
}

/**
 * The `path.normalize()` method normalizes the given path, resolving `'..'` and `'.'` segments.
 *
 * @param path Path to normalize
 * @return The normalized path
 */
export function normalize(path: string): string {
  return getPathAPI().normalize(path);
}

/**
 * The `path.parse()` method returns an object whose properties represent significant elements of the path.
 *
 * @param path Path to parse
 * @return An object with path properties
 */
export function parse(path: string): PathObject {
  return getPathAPI().parse(path);
}

/**
 * The `path.relative()` method returns the relative path from `from` to `to` based on the current working directory.
 *
 * @param from Starting path
 * @param to Destination path
 * @return The relative path
 */
export function relative(from: string, to: string): string {
  return getPathAPI().relative(from, to);
}

/**
 * The `path.resolve()` method resolves a sequence of paths or path segments into an absolute path.
 *
 * @param pathSegments Path segments to resolve
 * @return The resolved absolute path
 */
export function resolve(...pathSegments: string[]): string {
  return getPathAPI().resolve(...pathSegments);
}

/**
 * The `path.toNamespacedPath()` method returns an equivalent path for the specified path allowing the use of
 * string-based keys for `require()`, instead of the object-literal-based path mapping technique.
 *
 * @param path Path to convert
 * @return The namespaced path
 */
export function toNamespacedPath(path: string): string {
  return getPathAPI().toNamespacedPath(path);
}
