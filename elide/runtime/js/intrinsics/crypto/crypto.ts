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
