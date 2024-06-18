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

const { node_fs } = primordials;

if (!node_fs) {
  throw new Error(`The 'fs' module failed to load its intrinsic API.`);
}

const intrinsic: any = node_fs();

function internalsAccessor(): any {
  return intrinsic;
}

/**
 * File system constants
 */
export const constants = {
  UV_FS_SYMLINK_DIR: 1,
  UV_FS_SYMLINK_JUNCTION: 2,
  O_RDONLY: 0,
  O_WRONLY: 1,
  O_RDWR: 2,
  UV_DIRENT_UNKNOWN: 0,
  UV_DIRENT_FILE: 1,
  UV_DIRENT_DIR: 2,
  UV_DIRENT_LINK: 3,
  UV_DIRENT_FIFO: 4,
  UV_DIRENT_SOCKET: 5,
  UV_DIRENT_CHAR: 6,
  UV_DIRENT_BLOCK: 7,
  S_IFMT: 61440,
  S_IFREG: 32768,
  S_IFDIR: 16384,
  S_IFCHR: 8192,
  S_IFBLK: 24576,
  S_IFIFO: 4096,
  S_IFLNK: 40960,
  S_IFSOCK: 49152,
  O_CREAT: 512,
  O_EXCL: 2048,
  UV_FS_O_FILEMAP: 0,
  O_NOCTTY: 131072,
  O_TRUNC: 1024,
  O_APPEND: 8,
  O_DIRECTORY: 1048576,
  O_NOFOLLOW: 256,
  O_SYNC: 128,
  O_DSYNC: 4194304,
  O_SYMLINK: 2097152,
  O_NONBLOCK: 4,
  S_IRWXU: 448,
  S_IRUSR: 256,
  S_IWUSR: 128,
  S_IXUSR: 64,
  S_IRWXG: 56,
  S_IRGRP: 32,
  S_IWGRP: 16,
  S_IXGRP: 8,
  S_IRWXO: 7,
  S_IROTH: 4,
  S_IWOTH: 2,
  S_IXOTH: 1,
  F_OK: 0,
  R_OK: 4,
  W_OK: 2,
  X_OK: 1,
  UV_FS_COPYFILE_EXCL: 1,
  COPYFILE_EXCL: 1,
  UV_FS_COPYFILE_FICLONE: 2,
  COPYFILE_FICLONE: 2,
  UV_FS_COPYFILE_FICLONE_FORCE: 4,
  COPYFILE_FICLONE_FORCE: 4
};

/**
 * `FileHandle` class.
 */
export const FileHandle = globalThis['FileHandle'];

/**
 * `Dir` class.
 */
export const Dir = globalThis['Dir'];

/**
 * `Dirent` class.
 */
export const Dirent = globalThis['Dirent'];

/**
 * `ReadStream` class.
 */
export const ReadStream = globalThis['ReadStream'];

/**
 * `WriteStream` class.
 */
export const WriteStream = globalThis['WriteStream'];

/**
 * `Stats` class.
 */
export const Stats = globalThis['Stats'];

/**
 * `StatFs` class.
 */
export const StatFs = globalThis['StatFs'];

/**
 * `FSWatcher` class.
 */
export const FSWatcher = globalThis['FSWatcher'];

/**
 * `StatWatcher` class.
 */
export const StatWatcher = globalThis['StatWatcher'];

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
  internalsAccessor().access(path, callback);
}

/**
 * Check access to a file synchronously
 *
 * Tests a user's permissions for the file or directory specified by path. The mode argument is an optional integer
 * that specifies the accessibility checks to be performed. mode should be either the value fs.constants.F_OK or a
 * mask consisting of the bitwise OR of any of fs.constants.R_OK, fs.constants.W_OK, and fs.constants.X_OK (e.g.
 * fs.constants.W_OK | fs.constants.R_OK). Check File access constants for possible values of mode.
 *
 * @param path Path to check access for
 * @param mode Mode to check; defaults to `fs.constants.F_OK`
 */
export function accessSync(path: string | Buffer | URL, mode: number = constants.F_OK): void {
  internalsAccessor().accessSync(path, mode);
}

/**
 * Append to a file
 *
 * Asynchronously append data to a file, creating the file if it does not yet exist. data can be a string or a buffer.
 *
 * @param path Path to the file
 * @param data Data to append to the file
 * @param options Options for appending to the file
 * @param callback Callback function to dispatch with the file contents
 */
export function appendFile(path: string | Buffer | URL, data: any, options: { encoding: string; mode?: number; flag?: string; }, callback: (err: NodeJS.ErrnoException) => void): void {
  internalsAccessor().appendFile(path, data, options, callback);
}

/**
 * Append to a file synchronously
 *
 * Synchronously append data to a file, creating the file if it does not yet exist. data can be a string or a buffer.
 *
 * @param path Path to the file
 * @param data Data to append to the file
 * @param options Options for appending to the file
 */
export function appendFileSync(path: string | Buffer | URL, data: any, options: { encoding: string; mode?: number; flag?: string; }): void {
  internalsAccessor().appendFileSync(path, data, options);
}

/**
 * Change the permissions of a file
 *
 * Asynchronously changes the permissions of a file. See File access constants for possible values of mode.
 *
 * @param path Path to the file
 * @param mode Mode to set
 * @param callback Callback function to dispatch with failures
 */
export function chmod(path: string | Buffer | URL, mode: number, callback: (err: NodeJS.ErrnoException) => void): void {
  internalsAccessor().chmod(path, mode, callback);
}

/**
 * Change the permissions of a file synchronously
 *
 * Synchronously changes the permissions of a file. See File access constants for possible values of mode.
 *
 * @param path Path to the file
 * @param mode Mode to set
 */
export function chmodSync(path: string | Buffer | URL, mode: number): void {
  internalsAccessor().chmodSync(path, mode);
}

/**
 * Change the ownership of a file
 *
 * Asynchronously changes the ownership of a file. See File access constants for possible values of mode.
 *
 * @param path Path to the file
 * @param uid User ID to set
 * @param gid Group ID to set
 * @param callback Callback function to dispatch with failures
 */
export function chown(path: string | Buffer | URL, uid: number, gid: number, callback: (err: NodeJS.ErrnoException) => void): void {
  internalsAccessor().chown(path, uid, gid, callback);
}

/**
 * Change the ownership of a file synchronously
 *
 * Synchronously changes the ownership of a file. See File access constants for possible values of mode.
 *
 * @param path Path to the file
 * @param uid User ID to set
 * @param gid Group ID to set
 */
export function chownSync(path: string | Buffer | URL, uid: number, gid: number): void {
  internalsAccessor().chownSync(path, uid, gid);
}

/**
 * Open a file
 *
 * Asynchronously opens the file specified by path. flags can be a string or a number. mode defaults to 0o666.
 * The callback gets two arguments (err, fd).
 *
 * @param path Path to the file
 * @param flags Flags for opening the file
 * @param mode Mode to open the file with
 * @param callback Callback function to dispatch with failures
 */
export function open(path: string | Buffer | URL, flags: string | number, mode: number, callback: (err: NodeJS.ErrnoException, fd: number) => void): void {
  internalsAccessor().open(path, flags, mode, callback);
}

/**
 * Open a file synchronously
 *
 * Synchronously opens the file specified by path. flags can be a string or a number. mode defaults to 0o666.
 *
 * @param path Path to the file
 * @param flags Flags for opening the file
 * @param mode Mode to open the file with
 * @returns The file descriptor
 */
export function openSync(path: string | Buffer | URL, flags: string | number, mode: number): number {
  return internalsAccessor().openSync(path, flags, mode);
}

/**
 * Close a file
 *
 * Asynchronously closes the file descriptor. No arguments other than a possible exception are given to the completion callback.
 *
 * @param fd File descriptor to close
 * @param callback Callback function to dispatch with failures
 */
export function close(fd: number, callback: (err: NodeJS.ErrnoException) => void): void {
  internalsAccessor().close(fd, callback);
}

/**
 * Close a file synchronously
 *
 * Synchronously closes the file descriptor.
 *
 * @param fd File descriptor to close
 */
export function closeSync(fd: number): void {
  internalsAccessor().closeSync(fd);
}

/**
 * Copy a file
 *
 * Asynchronously copies src to dest. By default, dest is overwritten if it already exists.
 *
 * @param src Path to the source file
 * @param dest Path to the destination file
 * @param flags Flags for copying the file
 * @param callback Callback function to dispatch with failures
 */
export function copyFile(src: string | Buffer | URL, dest: string | Buffer | URL, flags: number, callback: (err: NodeJS.ErrnoException) => void): void {
  internalsAccessor().copyFile(src, dest, flags, callback);
}

/**
 * Copy a file synchronously
 *
 * Synchronously copies src to dest. By default, dest is overwritten if it already exists.
 *
 * @param src Path to the source file
 * @param dest Path to the destination file
 * @param flags Flags for copying the file
 */
export function copyFileSync(src: string | Buffer | URL, dest: string | Buffer | URL, flags: number): void {
  internalsAccessor().copyFileSync(src, dest, flags);
}

/**
 * Check if a file exists
 *
 * Tests whether or not the given path exists by checking with the file system. Then calls the callback argument with either true or false.
 *
 * @param path Path to check for existence
 * @param callback Callback function to dispatch with the result
 */
export function exists(path: string | Buffer | URL, callback: (exists: boolean) => void): void {
  internalsAccessor().exists(path, callback);
}

/**
 * Check if a file exists synchronously
 *
 * Tests whether or not the given path exists by checking with the file system.
 *
 * @param path Path to check for existence
 * @returns Whether the path exists
 */
export function existsSync(path: string | Buffer | URL): boolean {
  return internalsAccessor().existsSync(path);
}

/**
 * Directory create callback.
 */
export type MkdirCallback = (err: NodeJS.ErrnoException) => void

/**
 * Options for creating a directory.
 */
export type MkdirOptions = { recursive?: boolean; mode?: number; }

/**
 * Make a directory
 *
 * Asynchronously creates a directory.
 *
 * @param path Path to the directory
 * @param options Options for creating the directory
 * @param callback Callback function to dispatch with failures
 */
export function mkdir(path: string | Buffer | URL, optionsOrCallback: MkdirCallback | MkdirOptions, callback?: MkdirCallback): void {
  if (callback) {
    internalsAccessor().mkdir(path, optionsOrCallback as MkdirOptions, callback);
  } else {
    internalsAccessor().mkdir(path, optionsOrCallback as MkdirCallback);
  }
}

/**
 * Make a directory synchronously
 *
 * Synchronously creates a directory.
 *
 * @param path Path to the directory
 * @param options Options for creating the directory
 */
export function mkdirSync(path: string | Buffer | URL, options?: { recursive: boolean; mode?: number; }): void {
  internalsAccessor().mkdirSync(path, options);
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
  internalsAccessor().readFile(path, options, callback);
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
export function readFileSync(path: string | Buffer | URL, options?: string | { encoding?: string; flag?: string; }): string {
  return internalsAccessor().readFileSync(path, options || null);
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
  internalsAccessor().writeFile(path, data, options, callback);
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
  internalsAccessor().writeFileSync(path, data, options);
}

export default {
  constants,
  access,
  accessSync,
  appendFile,
  appendFileSync,
  chmod,
  chmodSync,
  chown,
  chownSync,
  open,
  openSync,
  close,
  closeSync,
  copyFile,
  copyFileSync,
  exists,
  existsSync,
  mkdir,
  mkdirSync,
  readFile,
  readFileSync,
  writeFile,
  writeFileSync,
};
