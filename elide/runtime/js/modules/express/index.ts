import {Router} from "../../intrinsics/node/core";

export default function express(): Router {
    return globalThis['express']();
};
