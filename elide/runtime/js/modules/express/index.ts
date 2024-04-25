import { Router } from "../../intrinsics/node/core";

export function express(): Router {
    return globalThis['express']();
};
