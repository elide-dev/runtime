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
 * Intrinsic: Buffer.
 *
 * Provides a shim which offers a `Buffer` implementation that is compatible with Node.js-style imports.
 */

const {
  node_buffer_module: node_buffer,
  node_buffer_Blob,
  node_buffer_File,
  node_buffer_Buffer
} = primordials;

/**
 * Maximum buffer size.
 */
export const kMaxLength = 4294967296;

/**
 * Maximum string length.
 */
export const kStringMaxLength = 536870888;

/**
 * The `constants` object contains useful constants for working with buffers.
 */
export const constants = {
  MAX_LENGTH: kMaxLength,
  MAX_STRING_LENGTH: kStringMaxLength,
}

/**
 * Export the intrinsic `Buffer` type as the main export, and also an export called `Buffer`.
 */
export const Buffer = node_buffer_Buffer;

/**
 * Export the intrinsic `SlowBuffer` type.
 */
export const SlowBuffer = Buffer;

/**
 * Export the intrinsic `Blob` type.
 */
export const Blob = node_buffer_Blob;

/**
 * Export the intrinsic `File` type.
 */
export const File = node_buffer_File;

/**
 * Resolves a 'blob:nodedata:...' to an associated <Blob> object registered using a prior call to
 * `URL.createObjectURL()`.
 *
 * @param blob - The blob URL to resolve.
 * @returns The associated <Blob> object.
 */
export function resolveObjectURL(blob: Blob): string {
  return URL.createObjectURL(blob);
}

/**
 * Transcodes a buffer from one encoding to another.
 *
 * Re-encodes the given Buffer or Uint8Array instance from one character encoding to another. Returns a new Buffer
 * instance. Throws if the fromEnc or toEnc specify invalid character encodings or if conversion from fromEnc to
 * toEnc is not permitted.
 *
 * Encodings supported by buffer.transcode() are: 'ascii', 'utf8', 'utf16le', 'ucs2', 'latin1', and 'binary'.
 * The transcoding process will use substitution characters if a given byte sequence cannot be adequately
 * represented in the target encoding. For instance:
 * 
 * ```js
 * const { Buffer, transcode } = require('node:buffer');
 * const newBuf = transcode(Buffer.from('€'), 'utf8', 'ascii');
 * console.log(newBuf.toString('ascii'));
 * // Prints: '?'COPY
 * ```
 *
 * Because the Euro (€) sign is not representable in US-ASCII, it is replaced with ? in the transcoded Buffer.
 *
 * @param buffer The buffer to transcode.
 * @param fromEnc The source encoding.
 * @param toEnc The target encoding.
 * @returns The transcoded buffer.
 */
export function transcode(buffer: Buffer | Uint8Array, fromEnc: string, toEnc: string): Buffer {
  return node_buffer.transcode(buffer, fromEnc, toEnc);
}

/**
 * Determines whether the given buffer is valid UTF-8.
 *
 * @param buffer The buffer to check.
 * @returns `true` if the buffer is valid UTF-8, otherwise `false`.
 */
export function isUtf8(buffer: Buffer | Uint8Array): boolean {
  return node_buffer.isUtf8(buffer);
}

/**
 * Determines whether the given buffer is valid ASCII.
 *
 * @param buffer The buffer to check.
 * @returns `true` if the buffer is valid ASCII, otherwise `false`.
 */
export function isAscii(buffer: Buffer | Uint8Array): boolean {
  return node_buffer.isAscii(buffer);
}

/**
 * Decodes a string into bytes using Latin-1 (ISO-8859), and encodes those bytes into a string using Base64.
 *
 * The data may be any JavaScript-value that can be coerced into a string.
 *
 * This function is only provided for compatibility with legacy web platform APIs and should never be used in new code,
 * because they use strings to represent binary data and predate the introduction of typed arrays in JavaScript.
 *
 * For code running using Node.js APIs, converting between base64-encoded strings and binary data should be performed
 * using Buffer.from(str, 'base64') and buf.toString('base64').
 */
export const btoa = globalThis['btoa'];

/**
 * Decodes a string of Base64-encoded data into bytes, and encodes those bytes into a string using Latin-1 (ISO-8859-1).
 *
 * The data may be any JavaScript-value that can be coerced into a string.
 *
 * This function is only provided for compatibility with legacy web platform APIs and should never be used in new code,
 * because they use strings to represent binary data and predate the introduction of typed arrays in JavaScript. For
 * code running using Node.js APIs, converting between base64-encoded strings and binary data should be performed
 * using Buffer.from(str, 'base64') and buf.toString('base64').
 */
export const atob = globalThis['atob'];

// `Buffer` is assigned as the default export.
export default Buffer;
