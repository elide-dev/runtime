// from `isaccs/inherits`
export function inherits(ctor, superCtor) {
    if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function () {};
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
    }
}

export const TextEncoder = globalThis['TextEncoder'];

export const TextDecoder = globalThis['TextDecoder'];
