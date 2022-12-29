import {globalContext, installGlobal} from "@elide/runtime/js/intrinsics/base";
import type {IConsole} from "@elide/runtime/js/intrinsics/primordials";

/** Enumerates available log levels. */
export enum LogLevel {
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
}

function throwNotSupported(): Error {
    return new Error('Method not supported');
}

/**
 * TBD.
 */
abstract class AbstractConsole implements IConsole {
    /**
     * TBD.
     *
     * @param level
     * @param args
     */
    abstract deliverLog(level: LogLevel, args: any[]): void;

    /** @inheritDoc */
    info(...args: any[]): void {
        this.deliverLog(LogLevel.INFO, args);
    }

    /**
     * TBD.
     *
     * @param condition
     * @param data
     */
    assert(condition?: boolean, ...data: any[]): void;

    /**
     * TBD.
     *
     * @param value
     * @param message
     * @param optionalParams
     */
    assert(value?: unknown, message?: unknown, ...optionalParams: unknown[]): void {
        throw new Error("Method not implemented.");
    }

    /**
     * TBD.
     *
     * @param args
     */
    debug(...args: any[]): void {
        this.deliverLog(LogLevel.DEBUG, args);
    }

    /**
     * TBD.
     *
     * @param args
     */
    error(...args: any[]): void {
        this.deliverLog(LogLevel.ERROR, args);
    }

    /**
     * TBD.
     *
     * @param args
     */
    log(...args: any[]): void {
        this.deliverLog(LogLevel.DEBUG, args);
    }

    /**
     * TBD.
     *
     * @param args
     */
    trace(...args: any[]): void {
        this.deliverLog(LogLevel.DEBUG, args);
    }

    /**
     * TBD.
     *
     * @param args
     */
    warn(...args: any[]): void {
        this.deliverLog(LogLevel.WARN, args);
    }

    /**
     * TBD.
     */
    clear(): void {
        throw throwNotSupported();
    }

    /**
     * TBD.
     *
     * @param label
     */
    count(label?: unknown): void {
        throw throwNotSupported();
    }

    /**
     * TBD.
     *
     * @param label
     */
    countReset(label?: unknown): void {
        throw throwNotSupported();
    }

    /**
     * TBD.
     *
     * @param obj
     * @param options
     */
    dir(obj?: any | unknown, options?: any): void {
        throw throwNotSupported();
    }

    /**
     * TBD.
     *
     * @param data
     */
    dirxml(...data: any[]): void {
        throw throwNotSupported();
    }

    /**
     * TBD.
     *
     * @param label
     */
    group(...label: any[]): void {
        throw throwNotSupported();
    }

    /**
     * TBD.
     *
     * @param label
     */
    groupCollapsed(...label: any[]): void {
        throw throwNotSupported();
    }

    /**
     * TBD.
     */
    groupEnd(): void {
        throw throwNotSupported();
    }

    /**
     * TBD.
     *
     * @param tabularData
     * @param properties
     */
    table(tabularData?: unknown, properties?: unknown): void {
        throw throwNotSupported();
    }

    /**
     * TBD.
     *
     * @param label
     */
    time(label?: string | unknown): void {
        throw throwNotSupported();
    }

    /**
     * TBD.
     *
     * @param label
     */
    timeEnd(label?: string | unknown): void {
        throw throwNotSupported();
    }

    /**
     * TBD.
     *
     * @param label
     * @param data
     */
    timeLog(label: string | unknown, ...data: any[] | unknown[]): void {
        throw throwNotSupported();
    }

    /**
     * TBD.
     *
     * @param label
     */
    timeStamp(label?: string | unknown): void {
        throw throwNotSupported();
    }

    /**
     * TBD.
     *
     * @param label
     */
    profile(label?: string): void {
        throw throwNotSupported();
    }

    /**
     * TBD.
     *
     * @param label
     */
    profileEnd(label?: string): void {
        throw throwNotSupported();
    }
}

/** JS bridge to the console intrinsics. */
export class ConsoleBridge extends AbstractConsole {
    // Acquire the intrinsic console so that we can proxy to it.
    private acquireIntrinsic(): IConsole {
        return globalContext["Console"] as IConsole;
    }

    /** @inheritDoc */
    deliverLog(level: string, args: any[]) {
        const intrinsic = this.acquireIntrinsic();
        switch (level) {
            case 'info': intrinsic.info(args); break;
        }
    }
}

/** Main `console` global. */
export const console: IConsole = new ConsoleBridge();

declare global {
    // @ts-ignore
    export const console: IConsole;
}

installGlobal('console', console);
