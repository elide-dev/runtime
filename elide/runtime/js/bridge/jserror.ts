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

import { installGlobal } from "../intrinsics/base";
const { NativeTypeError, NativeValueError } = primordials;

/**
 * # JS: Value Error
 *
 * Wraps a native value error.
 */
class ValueError extends NativeValueError {
    protected __valueError__: boolean = true;

    constructor(message?: string) {
        super(message || '`ValueError` was thrown');
    }

    /** @suppress {reportUnknownTypes} */
    static [Symbol.hasInstance](instance: any | ValueError): boolean {
        return (instance && instance.__valueError__ === true) || false;
    }
}

/**
 * # JS: Type Error
 *
 * Wraps a native value error.
 */
class TypeError extends NativeTypeError {
    protected __valueError__: boolean = true;

    constructor(message?: string) {
        super(message || '`ValueError` was thrown');
    }

    /** @suppress {reportUnknownTypes} */
    static [Symbol.hasInstance](instance: any | ValueError): boolean {
        return (instance && instance.__valueError__ === true) || false;
    }
}

// Install as global.
installGlobal("ValueError", ValueError);
installGlobal("TypeError", TypeError);
