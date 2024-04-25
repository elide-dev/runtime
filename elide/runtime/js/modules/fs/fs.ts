/**
 * Intrinsic: Filesystem.
 *
 * Provides a shim which offers a `fs` module implementation that is compatible with Node.js-style imports.
 */

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
  console.log('access fs', {path, mode, callback})
}

export default {
  access,
};
