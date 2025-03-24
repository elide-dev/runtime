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

// @ts-ignore
const { node_stream } = primordials;
const intrinsic = node_stream();

/**
 * Intrinsic: Stream.
 *
 * Stream handling primitives and stream implementations.
 */

if (!globalThis['stream'] || !globalThis['stream']['Readable']) {
    throw new Error("Cannot load `stream` module before polyfills");
}
const stream = globalThis['stream'] || {};
export const Readable = intrinsic['Readable'] || stream['Readable'];
export const Writable = intrinsic['Writable'] || stream['Writable'];
export const Transform = intrinsic['Transform'] || stream['Transform'];
export const Duplex = intrinsic['Duplex'] || stream['Duplex'];
export const pipeline = intrinsic['pipeline'] || stream['pipeline'];
export const finished = intrinsic['finished'] || stream['finished'];

export default stream;
