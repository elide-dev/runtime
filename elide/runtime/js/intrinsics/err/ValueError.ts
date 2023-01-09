import { installGlobal } from "../base";

/**
 * # JS: Value Error
 *
 * TBD.
 */
export class ValueError extends Error {
    constructor(message?: string) {
        super(message);
    }
}

installGlobal("ValueError", ValueError);
