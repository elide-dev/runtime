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
 * Intrinsic: Zlib.
 *
 * Provides access to the Zlib compression and decompression library.
 */

const { node_zlib } = primordials;
if (!node_zlib) {
  throw new Error(`The 'zlib' module failed to load the intrinsic API.`);
}

function intrinsic(): any {
  return node_zlib;
}

/**
 * Provides constants defined by the `zlib` module.
 */
export const constants = intrinsic().constants;

/**
 * Calculates a CRC32 checksum for the given data.
 *
 * @param data The data to checksum
 * @param value The initial value for the checksum (optional)
 * @returns The CRC32 checksum for the given data
 */
export function crc32(data: string | Buffer | DataView | any, value?: number): number {
    return intrinsic().crc32(data, value);
}

export type Deflate = any;

export type Inflate = any;

/**
 * Creates a writable stream which compresses data using the DEFLATE algorithm.
 *
 * @param options Zlib options to apply to this stream. Optional.
 * @returns Deflation stream
 */
export function createDeflate(options?: any): Deflate {
    return intrinsic().createDeflate(options);
}

/**
 * Creates a readable stream which decompresses data using the DEFLATE algorithm.
 *
 * @param options Zlib options to apply to this stream. Optional.
 * @returns Inflation stream
 */
export function createInflate(options?: any): Inflate {
    return intrinsic().createInflate(options);
}

/**
 * Synchronously compresses the given data using the DEFLATE algorithm.
 *
 * @param data The data to compress
 * @param options Zlib options to apply to this compression. Optional.
 * @returns The compressed data
 */
export function deflateSync(data: string | Buffer | DataView | any, options?: any): Buffer {
    return intrinsic().deflateSync(data, options);
}

/**
 * Synchronously decompresses the given data using the DEFLATE algorithm.
 *
 * @param data The data to decompress
 * @param options Zlib options to apply to this decompression. Optional.
 * @returns The decompressed data
 */
export function inflateSync(data: string | Buffer | DataView | any, options?: any): Buffer {
    return intrinsic().inflateSync(data, options);
}

/**
 * Synchronously compresses the given data using the gzip algorithm.
 *
 * @param data The data to compress
 * @param options Zlib options to apply to this compression. Optional.
 * @returns The compressed data
 */
export function gzipSync(data: string | Buffer | DataView | any, options?: any): Buffer {
    return intrinsic().gzipSync(data, options);
}

/**
 * Synchronously decompresses the given data using the gzip algorithm.
 *
 * @param data The data to decompress
 * @param options Zlib options to apply to this decompression. Optional.
 * @returns The decompressed data
 */
export function gunzipSync(data: string | Buffer | DataView | any, options?: any): Buffer {
    return intrinsic().gunzipSync(data, options);
}
