// Type definitions for Express 4.17 (modified for use with Elide)
// Project: http://expressjs.com
// Definitions by: Sam Gammon <https://github.com/sgammon>
//                 Boris Yankov <https://github.com/borisyankov>
//                 China Medical University Hospital <https://github.com/CMUH>
//                 Puneet Arora <https://github.com/puneetar>
//                 Dylan Frankland <https://github.com/dfrankland>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/* =================== USAGE ===================

    import express = require("express");
    var app = express();

 =============================================== */

import * as core from './core';

/**
 * Creates an Express application. The express() function is a top-level function exported by the express module.
 */
declare function e(): core.Express;

declare namespace e {
    /**
     * These are the exposed prototypes.
     */
    var application: Application;
    var request: Request;
    var response: Response;

    export function Router(options?: RouterOptions): core.Router;

    interface RouterOptions {
        /**
         * Enable case sensitivity.
         */
        caseSensitive?: boolean | undefined;

        /**
         * Preserve the req.params values from the parent router.
         * If the parent and the child have conflicting param names, the child’s value take precedence.
         *
         * @default false
         * @since 4.5.0
         */
        mergeParams?: boolean | undefined;

        /**
         * Enable strict routing.
         */
        strict?: boolean | undefined;
    }

    interface Application extends core.Application {}
    interface CookieOptions extends core.CookieOptions {}
    interface Errback extends core.Errback {}
    interface ErrorRequestHandler<
        P = core.ParamsDictionary,
        ResBody = any,
        ReqBody = any,
        ReqQuery = core.Query,
        Locals extends Record<string, any> = Record<string, any>
    > extends core.ErrorRequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> {}
    interface Express extends core.Express {}
    interface Handler extends core.Handler {}
    interface IRoute extends core.IRoute {}
    interface IRouter extends core.IRouter {}
    interface IRouterHandler<T> extends core.IRouterHandler<T> {}
    interface IRouterMatcher<T> extends core.IRouterMatcher<T> {}
    interface MediaType extends core.MediaType {}
    interface NextFunction extends core.NextFunction {}
    interface Locals extends core.Locals {}
    interface Request<
        P = core.ParamsDictionary,
        ResBody = any,
        ReqBody = any,
        ReqQuery = core.Query,
        Locals extends Record<string, any> = Record<string, any>
    > extends core.Request<P, ResBody, ReqBody, ReqQuery, Locals> {}
    interface RequestHandler<
        P = core.ParamsDictionary,
        ResBody = any,
        ReqBody = any,
        ReqQuery = core.Query,
        Locals extends Record<string, any> = Record<string, any>
    > extends core.RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> {}
    interface RequestParamHandler extends core.RequestParamHandler {}
    interface Response<
        ResBody = any,
        Locals extends Record<string, any> = Record<string, any>
    > extends core.Response<ResBody, Locals> {}
    interface Router extends core.Router {}
    interface Send extends core.Send {}
}

export = e;