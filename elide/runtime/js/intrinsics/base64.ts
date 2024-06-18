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

export {};

declare global {
    /**
     * Standard DOM `btoa` function which encodes a string to Base64.
     *
     * @param input Input string to encode.
     * @return Encoded string.
     */
    // @ts-ignore
    export const btoa: (input: string) => string;

    /**
     * Standard DOM `atob` function which decodes a string from base64.
     *
     * @param input Input string to decode.
     * @return Decoded string.
     */
    // @ts-ignore
    export const atob: (input: string) => string;
}
