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
 * Intrinsic: Child Process.
 *
 * Provides primitives for spawning child processes.
 */

const { node_child_process, NodeChildProcess } = primordials;

/**
 * Class which implements `ChildProcess` handle behavior.
 */
export const ChildProcess = NodeChildProcess;

/**
 * Callback for child process execution via methods like `exec`.
 */
export type ExecCallback = (error: Error | null, stdout: string, stderr: string) => void;

/**
 * Create a child process which calls into the provided `command`, with the provided `options` and optional `callback`.
 *
 * @param command Command to execute in the child-process
 * @param options Options to apply, if desired (or otherwise the argument in this position is the callback)
 * @param cbk Callback to provide (also option)
 * @return Child process handle.
 */
export function exec(command: string, options?: object | ExecCallback, cbk?: ExecCallback): typeof ChildProcess {
  return node_child_process.exec(command, options as any, cbk);
}

/**
 * Create a child process which calls into the provided `command`, with the provided `options` and optional `callback`.
 *
 * @param command Command to execute in the child-process
 * @param argsOrOptionsOrCallback Args, or options, or the callback (or nothing).
 * @param optionsOrCallback Options, or the callback (or nothing).
 * @param cbk Callback to provide (also optional).
 * @return Child process handle.
 */
export function execFile(
  command: string,
  argsOrOptionsOrCallback: object | string[] | ExecCallback,
  optionsOrCallback: object | ExecCallback,
  cbk?: ExecCallback,
): typeof ChildProcess {
  // resolve callback
  const callback = cbk || (
    typeof argsOrOptionsOrCallback === 'function' ? argsOrOptionsOrCallback : (
      typeof optionsOrCallback === 'function' ? optionsOrCallback : undefined
    )
  );

  // resolve args
  const args = (
    Array.isArray(argsOrOptionsOrCallback) ? argsOrOptionsOrCallback : []
  );

  // resolve options
  const options = (
    typeof optionsOrCallback !== 'function' ? optionsOrCallback : (
      typeof argsOrOptionsOrCallback !== 'function' ? argsOrOptionsOrCallback : undefined
    )
  );

  return node_child_process.execFile(
    command,
    args,
    options,
    callback,
  );
}

/**
 * Fork with a new child process with the provided `modulePath` entrypoint.
 *
 * @param modulePath Module path to fork
 * @param argsOrOptionsOrCallback Arguments, options, or callback to pass to the forked process
 * @param argsOrCallback Arguments or callback to pass to the forked process
 * @param cbk Callback to pass to the forked process
 * @return Child process handle.
 */
export function fork(
  modulePath: string,
  argsOrOptionsOrCallback?: object | string[],
  optionsOrCallback?: object | ExecCallback,
  cbk?: ExecCallback,
): typeof ChildProcess {
  // resolve callback
  const callback = cbk || (
    typeof argsOrOptionsOrCallback === 'function' ? argsOrOptionsOrCallback : (
      typeof optionsOrCallback === 'function' ? optionsOrCallback : undefined
    )
  );

  // resolve args
  const args = (
    Array.isArray(argsOrOptionsOrCallback) ? argsOrOptionsOrCallback : []
  );

  // resolve options
  const options = (
    typeof optionsOrCallback !== 'function' ? optionsOrCallback : (
      typeof argsOrOptionsOrCallback !== 'function' ? argsOrOptionsOrCallback : undefined
    )
  );

  return node_child_process.fork(
    modulePath,
    args,
    options,
    callback,
  );
}

/**
 * Spawn a new child process with the provided `command`.
 *
 * @param command Command to spawn
 * @param argsOrOptions Arguments or options to apply to the command, if desired
 * @param options Options to apply to the command, if desired
 * @return Child process handle.
 */
export function spawn(
  command: string,
  argsOrOptions?: object | string[],
  options?: object,
): typeof ChildProcess {
  return node_child_process.spawn(
    command,
    !!options ? argsOrOptions : undefined,
    !!options ? options : argsOrOptions,
  );
}

/**
 * Execute a command synchronously.
 *
 * @param command Command string to execute
 * @param options Options to apply to the command, if desired
 * @return String or buffer, depending on output encoding settings
 */
export function execSync(command: string, options?: object): string | Buffer {
  return node_child_process.execSync(command, options);
}

/**
 * Execute a specific file synchronously.
 *
 * @param file File to execute
 * @param argsOrOptions Arguments or options to apply to the command, if desired
 * @param options Options to apply to the command, if desired
 * @return String or buffer, depending on output encoding settings
 */
export function execFileSync(file: string, argsOrOptions?: object | string[], options?: object): string | Buffer {
  return node_child_process.execFileSync(
    file,
    !!options ? argsOrOptions : undefined,
    !!options ? options : argsOrOptions,
  );
}

/**
 * Spawn and execute a command in a child process, synchronously.
 *
 * @param file File to execute
 * @param argsOrOptions Arguments or options to apply to the command, if desired
 * @param options Options to apply to the command, if desired
 * @return Child process execution result object.
 */
export function spawnSync(command: string, argsOrOptions?: object | string[], options?: object): {
  pid: number;
  output: Array<Buffer | string>;
  stdout: Buffer | string;
  stderr: Buffer | string;
  status: number | null;
  signal: string | null;
  error: Error | null;
} {
  return node_child_process.spawnSync(
    command,
    !!options ? argsOrOptions : undefined,
    !!options ? options : argsOrOptions,
  );
}
