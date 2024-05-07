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

import {globalContext, installGlobal} from "../base";
import type {Crypto} from "../primordials";

/**
 * @return Crypto Intrinsic `Crypto` bridge.
 */
function resolveIntrinsic(): Crypto {
    return globalContext['__elide_crypto'] as Crypto;
}

declare global {
    /**
     * Top-level Web Crypto API interface.
     */
        // @ts-ignore
    export const crypto: Crypto;
}

installGlobal('crypto', resolveIntrinsic());
