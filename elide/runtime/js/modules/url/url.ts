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
 * Intrinsic: URL.
 *
 * Implements URL parsing and formatting.
 */

const internals: any = globalThis['__Elide_node_url__'];

// Re-export built-in URL intrinsic.
export const URL = globalThis['URL'];

// Re-export built-in URL search parameters intrinsic.
export const URLSearchParams = globalThis['URLSearchParams'];

/**
 * Returns the Punycode ASCII serialization of the domain. If domain is an invalid domain, the empty string is returned.
 * It performs the inverse operation to url.domainToUnicode().
 *
 * @param domain The domain to serialize.
 * @returns The Punycode ASCII serialization of the domain.
 */
export function domainToASCII(domain: string): string {
  return internals.domainToASCII(domain);
}

/**
 * Returns the Unicode serialization of the domain. If domain is an invalid domain, the empty string is returned.
 * It performs the inverse operation to url.domainToASCII().
 *
 * @param domain The domain to serialize.
 * @returns The Unicode serialization of the domain.
 */
export function domainToUnicode(domain: string): string {
  return internals.domainToUnicode(domain);
}

/**
 * This function ensures the correct decodings of percent-encoded characters as well as ensuring a cross-platform valid absolute path string.
 *
 * @param url The URL string to convert to a path.
 * @returns The path string.
 */
export function fileURLToPath(url: string): string {
  return internals.fileURLToPath(url);
}

/**
 * Object describing a query string.
 */
export type QueryParams = {
  [key: string]: string | string[]
}

/**
 * Object describing a URL.
 */
export type URLObject = {
  protocol: string,
  slashes: boolean,
  auth: string,
  username: string,
  password: string,
  host: string,
  hostname: string,
  port: string,
  pathname: string,
  search: string,
  query: QueryParams,
  hash: string,
  href: string
}

/**
 * Options which can be passed to `format`.
 */
export type URLFormatOptions = {
  unicode?: boolean,
  auth?: boolean,
  fragment?: boolean,
  search?: boolean
}

/**
 * Returns the formatted URL string.
 *
 * @param url The URL object to format.
 * @param options Formatting options; optional.
 * @returns The formatted URL string.
 */
export function format(url: URL | URLObject, options?: Partial<URLFormatOptions>): string {
  return internals.format(url, options);
}

/**
 * This function ensures that path is resolved absolutely, and that the URL control characters are correctly encoded
 * when converting into a File URL.
 *
 * @param path The path to convert to a URL.
 * @returns The URL object.
 */
export function pathToFileURL(path: string): URL {
  return internals.pathToFileURL(path);
}

/**
 * This utility function converts a URL object into an ordinary options object as expected by the `http.request()`
 * and `https.request()` APIs.
 *
 * @param url URL to convert
 * @returns The options object.
 */
export function urlToHttpOptions(url: URL): any {
  return internals.urlToHttpOptions(url);
}

/**
 * Parses a URL string and returns a URL object.
 *
 * @param url The URL string to parse.
 * @param parseQueryString If true, the query property will always be set to an object returned by the querystring module's parse() method.
 * @param slashesDenoteHost If true, the first token after the literal string // and preceding the next / will be interpreted as the host.
 * @returns The URL object.
 */
export function parse(url: string, parseQueryString: boolean = false, slashesDenoteHost: boolean = false): URLObject {
  return internals.parse(url, parseQueryString);
}

/**
 * Resolves a URL.
 *
 * @param from The base URL.
 * @param to The URL to resolve.
 * @returns The resolved URL.
 */
export function resolve(from: string, to: string): string {
  return internals.resolve(from, to);
}

export default {
  URL,
  URLSearchParams,
  domainToASCII,
  domainToUnicode,
  fileURLToPath,
  format,
  pathToFileURL,
  urlToHttpOptions,
  parse,
  resolve,
}
