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

export type BrotliCompress = any;

export type BrotliDecompress = any;

export type BufferLike = any;

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
 * Creates a readable stream which decompresses data using the zip algorithm.
 *
 * @param options Zlib options to apply to this stream. Optional.
 * @returns Inflation stream
 */
export function createUnzip(options?: any): Inflate {
    return intrinsic().createUnzip(options);
}

/**
 * Creates a writable stream which compresses data using the Brotli algorithm.
 *
 * @param options Brotli options to apply to this stream. Optional.
 * @returns Deflation stream
 */
export function createBrotliCompress(options?: any): Deflate {
    return intrinsic().createBrotliCompress(options);
}

/**
 * Creates a readable stream which decompresses data using the Brotli algorithm.
 *
 * @param options Brotli options to apply to this stream. Optional.
 * @returns Inflation stream
 */
export function createBrotliDecompress(options?: any): Inflate {
    return intrinsic().createBrotliDecompress(options);
}

/**
 * Asynchronously compresses the given data using the DEFLATE algorithm.
 *
 * @param data The data to compress
 * @param options Zlib options to apply to this compression. Optional.
 * @param cbk Callback to invoke when the operation completes, and which receives the resulting data.
 */
export function deflate(
    data: string | Buffer | DataView | any,
    optionsOrCbk?: any,
    cbk?: (errOrResult: Error | BufferLike) => void,
): Buffer {
    const callback = cbk || optionsOrCbk;
    const opts = cbk ? optionsOrCbk : undefined;
    return intrinsic().deflate(data, opts, callback);
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
 * Asynchronously decompresses the given data using the DEFLATE algorithm.
 *
 * @param data The data to decompress
 * @param options Zlib options to apply to this compression. Optional.
 * @param cbk Callback to invoke when the operation completes, and which receives the resulting data.
 */
export function inflate(
    data: string | Buffer | DataView | any,
    optionsOrCbk?: any,
    cbk?: (errOrResult: Error | BufferLike) => void,
): Buffer {
    const callback = cbk || optionsOrCbk;
    const opts = cbk ? optionsOrCbk : undefined;
    return intrinsic().inflate(data, opts, callback);
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
 * Asynchronously compresses the given data using the gzip algorithm.
 *
 * @param data The data to compress
 * @param options Zlib options to apply to this compression. Optional.
 * @param cbk Callback to invoke when the operation completes, and which receives the resulting data.
 */
export function gzip(
    data: string | Buffer | DataView | any,
    optionsOrCbk?: any,
    cbk?: (errOrResult: Error | BufferLike) => void,
): Buffer {
    const callback = cbk || optionsOrCbk;
    const opts = cbk ? optionsOrCbk : undefined;
    return intrinsic().gzip(data, opts, callback);
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
 * Asynchronously decompresses the given data using the gzip algorithm.
 *
 * @param data The data to decompress
 * @param options Zlib options to apply to this compression. Optional.
 * @param cbk Callback to invoke when the operation completes, and which receives the resulting data.
 */
export function gunzip(
    data: string | Buffer | DataView | any,
    optionsOrCbk?: any,
    cbk?: (errOrResult: Error | BufferLike) => void,
): Buffer {
    const callback = cbk || optionsOrCbk;
    const opts = cbk ? optionsOrCbk : undefined;
    return intrinsic().gunzip(data, opts, callback);
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

/**
 * Asynchronously decompresses the given data using the zip algorithm.
 *
 * @param data The data to decompress
 * @param options Zlib options to apply to this compression. Optional.
 * @param cbk Callback to invoke when the operation completes, and which receives the resulting data.
 */
export function unzip(
    data: string | Buffer | DataView | any,
    optionsOrCbk?: any,
    cbk?: (errOrResult: Error | BufferLike) => void,
): Buffer {
    const callback = cbk || optionsOrCbk;
    const opts = cbk ? optionsOrCbk : undefined;
    return intrinsic().unzip(data, opts, callback);
}

/**
 * Synchronously decompresses the given data using the zip algorithm.
 *
 * @param data The data to decompress
 * @param options Zlib options to apply to this decompression. Optional.
 * @returns The decompressed data
 */
export function unzipSync(data: string | Buffer | DataView | any, options?: any): Buffer {
    return intrinsic().unzipSync(data, options);
}

/**
 * Asynchronously compresses the given data using the Brotli algorithm.
 *
 * @param data The data to compress
 * @param options Brotli options to apply to this compression. Optional.
 * @param cbk Callback to invoke when the operation completes, and which receives the resulting data.
 */
export function brotliCompress(
    data: string | Buffer | DataView | any,
    optionsOrCbk?: any,
    cbk?: (errOrResult: Error | BufferLike) => void,
): Buffer {
    const callback = cbk || optionsOrCbk;
    const opts = cbk ? optionsOrCbk : undefined;
    return intrinsic().brotliCompress(data, opts, callback);
}

/**
 * Synchronously compresses the given data using the Brotli algorithm.
 *
 * @param data The data to compress
 * @param options Brotli options to apply to this compression. Optional.
 * @returns The compressed data
 */
export function brotliCompressSync(data: string | Buffer | DataView | any, options?: any): Buffer {
    return intrinsic().brotliCompressSync(data, options);
}

/**
 * Asynchronously decompresses the given data using the Brotli algorithm.
 *
 * @param data The data to decompress
 * @param options Brotli options to apply to this compression. Optional.
 * @param cbk Callback to invoke when the operation completes, and which receives the resulting data.
 */
export function brotliDecompress(
    data: string | Buffer | DataView | any,
    optionsOrCbk?: any,
    cbk?: (errOrResult: Error | BufferLike) => void,
): Buffer {
    const callback = cbk || optionsOrCbk;
    const opts = cbk ? optionsOrCbk : undefined;
    return intrinsic().brotliDecompress(data, opts, callback);
}

/**
 * Synchronously decompresses the given data using the Brotli algorithm.
 *
 * @param data The data to decompress
 * @param options Brotli options to apply to this decompression. Optional.
 * @returns The decompressed data
 */
export function brotliDecompressSync(data: string | Buffer | DataView | any, options?: any): Buffer {
    return intrinsic().brotliDecompressSync(data, options);
}
