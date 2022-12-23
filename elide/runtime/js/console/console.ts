/**
 * ## API: Console
 *
 * Defines the surface of the Console API for Elide. Elide's console intrinsics are standards-compliant with the WhatWG
 * Console API Specification, within reason considering the limitations of JavaScript on the server-side. See below for
 * an exhaustive list of differences with the standard.
 *
 * ### WhatWG Console Specification: Unsupported Features
 *
 * - Extended or non-spec methods for performance measurement are not available (`profile`, etc)
 * - Methods related to "grouping" log messages do nothing, since many server-side log systems are not capable of
 *   grouping messages after the fact
 */
export interface IConsole {
    /**
     * Log a message to the console at the `INFO` level.
     *
     * @param args Arguments of any type, which the developer wishes to emit to the console; any number of arguments may
     *   be passed, and each argument will be emitted to the same console message call.
     */
    info(...args: any[]): void;
}
