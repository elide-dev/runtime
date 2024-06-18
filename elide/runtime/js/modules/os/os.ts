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
 * Intrinsic: OS.
 *
 * Provides a shim which offers a `os` module implementation that is compatible with Node.js-style imports.
 */

const { node_os } = primordials;
if (!node_os) {
  throw new Error(`The 'os' module failed to load the intrinsic API.`);
}

function intrinsic(): any {
  return node_os;
}

/**
 * Resolves operating system constants for the current platform.
 */
export const constants = {};

/**
 * Returns the operating system's end-of-line value.
 */
export const EOL = intrinsic().EOL;

/**
 * Returns the operating system's null device path.
 */
export const devNull = intrinsic().devNull;

/**
 * Returns the number of logical CPUs available to the current process.
 *
 * @returns The number of logical CPUs available to the current process
 */
export function availableParallelism(): number {
  return intrinsic().availableParallelism() as number;
}

/**
 * Returns the operating system CPU architecture for which the Elide binary was compiled.
 *
 * Possible values follow the Node API:
 * 'arm', 'arm64', 'ia32', 'loong64', 'mips', 'mipsel', 'ppc', 'ppc64', 'riscv64', 's390', 's390x', and 'x64'.
 *
 * @returns The operating system CPU architecture for which the Elide binary was compiled
 */
export function arch(): string {
  return intrinsic().arch() as string;
}

/**
 * Describes CPU info as part of a return value from `cpus`.
 */
export type CpuInfo = {
  model: string;
  speed: number;
  times: {
    user: number;
    nice: number;
    sys: number;
    idle: number;
    irq: number;
  };
};

/**
 * Returns an array of objects containing information about each logical CPU core.
 *
 * @returns An array of objects containing information about each logical CPU core
 */
export function cpus(): CpuInfo[] {
  return intrinsic().cpus() as CpuInfo[];
}

/**
 * Returns the endianness of the CPU for which the Elide binary was compiled.
 *
 * Possible values are 'BE' for big endian and 'LE' for little endian.
 *
 * @returns The endianness of the CPU for which the Elide binary was compiled
 */
export function endianness(): "BE" | "LE" {
  return intrinsic().endianness() as "BE" | "LE";
}

/**
 * Returns the amount of free system memory in bytes.
 *
 * @returns The amount of free system memory in bytes
 */
export function freemem(): number {
  return intrinsic().freemem() as number;
}

/**
 * Returns the priority value for the provided process ID, or the current process, if no ID is given.
 *
 * @param pid Process ID to get the priority for
 * @returns The priority value for the provided process ID
 */
export function getPriority(pid?: number): number {
  return intrinsic().getPriority(pid) as number;
}

/**
 * Returns the home directory of the current user.
 *
 * @returns The home directory of the current user
 */
export function homedir(): string {
  return intrinsic().homedir() as string;
}

/**
 * Returns the hostname of the operating system.
 *
 * @returns The hostname of the operating system
 */
export function hostname(): string {
  return intrinsic().hostname() as string;
}

/**
 * Returns the load average of the system.
 *
 * @returns Load averages
 */
export function loadavg(): number[] {
  return intrinsic().loadavg() as number[];
}

/**
 * Returns the machine type.
 *
 * @returns The machine type
 */
export function machine(): string {
  return intrinsic().machine() as string;
}

/**
 * Object shape of a network interface info payload returned by `networkInterfaces`.
 */
export type NetworkInterfaceInfo = {
  address: string;
  netmask: string;
  family: string;
  mac: string;
  internal: boolean;
  cidr: string;
  scopeid?: number;
}

/**
 * Returns network interfaces.
 *
 * @returns Network interfaces
 */
export function networkInterfaces(): { [key: string]: NetworkInterfaceInfo[] } {
  return intrinsic().networkInterfaces() as { [key: string]: NetworkInterfaceInfo[] };
}

/**
 * Returns the operating system platform.
 *
 * Possible values are 'aix', 'android', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', and 'win32'.
 *
 * @returns The operating system platform
 */
export function platform(): string {
  return intrinsic().platform() as string;
}

/**
 * Returns the operating system as a string.
 *
 * @returns The operating system as a string
 */
export function release(): string {
  return intrinsic().release() as string;
}

/**
 * Attempts to set the priority of the provided process ID, or the current process, if no ID is given. 
 *
 * @param pidOrPriority Process ID to set the priority for, or the priority value to set if the value
 *   should be set for the current process. Default is `0`.
 * @param priority Priority value to set for the provided process ID
 */
export function setPriority(pidOrPriority: number, priority?: number): void {
  intrinsic().setPriority(pidOrPriority, priority);
}

/**
 * Returns the operating system's default directory for temporary files as a string.
 *
 * @returns The operating system's default directory for temporary files
 */
export function tmpdir(): string {
  return intrinsic().tmpdir() as string;
}

/**
 * Returns the total amount of system memory in bytes.
 *
 * @returns The total amount of system memory in bytes
 */
export function totalmem(): number {
  return intrinsic().totalmem() as number;
}

/**
 * Returns the operating system type as a string.
 *
 * @returns The operating system type as a string
 */
export function type(): string {
  return intrinsic().type() as string;
}

/**
 * Returns the system uptime in seconds.
 *
 * @returns The system uptime in seconds
 */
export function uptime(): number {
  return intrinsic().uptime() as number;
}

/**
 * Options which can be passed into the `userInfo` method.
 */
export type UserInfoOptions = {
  encoding?: BufferEncoding;
}

/**
 * Object shape of a user info payload returned by `userInfo`.
 */
export type UserInfo = {
  username: string;
  uid: number;
  gid: number;
  shell: string;
  homedir: string;
}

/**
 * Returns information about the currently effective user.
 *
 * @param options Options for retrieving user information
 * @returns Information about the currently effective user
 */
export function userInfo(options?: UserInfoOptions): UserInfo {
  return intrinsic().userInfo(options) as UserInfo;
}

/**
 * Returns the operating system version as a string.
 *
 * @returns The operating system version as a string
 */
export function version(): string {
  return intrinsic().version() as string;
}
