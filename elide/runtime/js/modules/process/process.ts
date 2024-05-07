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
 * Intrinsic: Process.
 *
 * Provides a shim which offers a `process` module implementation that is compatible with Node.js-style imports.
 */

function intrinsic(): any {
  // @ts-expect-error intrinsic symbol
  const api = __Elide_node_process__;
  if (!api) {
    throw new Error(`The 'process' module failed to load the intrinsic API.`);
  }
  return api || {};
}

/**
 * Intrinsic: Process.
 *
 * Defines the API for the `process` module.
 */
export interface NodeProcessAPI {
  /**
   * Property: `env`.
   *
   * The environment variables.
   */
  env: Record<string, string>;

  /**
   * Property: `argv`.
   *
   * The command-line arguments.
   */
  argv: string[];

  /**
   * Property: `platform`.
   *
   * The platform identifier.
   */
  platform: string;

  /**
   * Property: `version`.
   *
   * The Node.js version.
   */
  version: string;

  /**
   * Property: `versions`.
   *
   * The Node.js version information.
   */
  versions: Record<string, string>;

  /**
   * Property: `arch`.
   *
   * The architecture identifier.
   */
  arch: string;

  /**
   * Property: `pid`.
   *
   * The process identifier.
   */
  pid: number;

  /**
   * Property: `cwd`.
   *
   * The current working directory.
   */
  cwd: string;

  /**
   * Property: `exit`.
   *
   * The exit function.
   */
  exit: (code?: number) => never;

  /**
   * Property: `nextTick`.
   *
   * The next tick function.
   */
  nextTick: (callback: (...args: any[]) => void, ...args: any[]) => void;
}

function getProcessAPI(): NodeProcessAPI {
  return intrinsic() as NodeProcessAPI || {};
}

/**
 * Property: `env`.
 *
 * Environment variables made available to the program.
 */
export const env = getProcessAPI().env;

/**
 * Property: `argv`.
 *
 * The command-line arguments.
 */
export const argv = getProcessAPI().argv;

/**
 * Property: `platform`.
 *
 * The platform identifier.
 */
export const platform = getProcessAPI().platform;

/**
 * Property: `version`.
 *
 * The Node.js version.
 */
export const version = getProcessAPI().version;

/**
 * Property: `versions`.
 *
 * The Node.js version information.
 */
export const versions = getProcessAPI().versions;

/**
 * Property: `arch`.
 *
 * The architecture identifier.
 */
export const arch = getProcessAPI().arch;

/**
 * Property: `pid`.
 *
 * The process identifier.
 */
export const pid = getProcessAPI().pid;

/**
 * Property: `cwd`.
 *
 * The current working directory.
 */
export const cwd = getProcessAPI().cwd;

/**
 * Property: `exit`.
 *
 * Exits the process with the specified exit code.
 *
 * @param code The exit code.
 */
export function exit(code?: number): never {
  return getProcessAPI().exit(code);
}

/**
 * Property: `nextTick`.
 *
 * Queues a function to be executed on the next tick of the event loop.
 *
 * @param callback The function to execute.
 * @param args The arguments to pass to the function.
 */
export function nextTick(callback: (...args: any[]) => void, ...args: any[]): void {
  return getProcessAPI().nextTick(callback, ...args);
}
