import type {Blob} from "@elide/runtime/js/intrinsics/blob/Blob";
import {installGlobal} from "@elide/runtime/js/intrinsics/base";
import type {URLSearchParams} from "./URLSearchParams";

/**
 * Input types for a `URL` object.
 *
 * URLs are backed by immutable data, but are mutable by default (in some cases, URLs are immutable, such as when they
 * are returned as part of a Fetch response). At all times, the URL constructor can take a `string` or another `URL`
 * (whether mutable or immutable).
 */
export type URLInputs = string | IURL;

/**
 * ## API: URL
 *
 * Defines the API surface of the JS-standard `URL` class, from the WhatWG URL Standard, as implemented/provided by the
 * Elide JS Runtime.
 *
 * ### String parsing rules
 *
 * URLs are parsed at construction time; the URL class will refuse to construct if given bad input. The following rules
 * apply to URLs parsed from strings:
 *
 * - Relative URLs are not supported when parsing on the server-side (there is no implied context to be "relative" to)
 * - Exception to above: protocol-relative URLs are allowed
 * - The `origin` field is not supported when used server-side
 *
 * ### Further reading
 *
 * See also:
 * - [MDN: `URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL)
 * - [WhatWG URL Specification](https://url.spec.whatwg.org/)
 * - [`java.net.URI` (JDK19)](https://docs.oracle.com/en/java/javase/19/docs/api/java.base/java/net/URI.html)
 */
export interface IURL {
    /**
     * ### URL: `hash`
     *
     * From [MDN](https://developer.mozilla.org/en-US/docs/Web/API/URL/hash):
     * "The hash property of the URL interface is a string containing a '#' followed by the fragment identifier of
     * the URL. The fragment is not percent-decoded. If the URL does not have a fragment identifier, this property
     * contains an empty string — `""`."
     *
     * #### Notes & further reading
     * - Spec: [URL Standard](https://url.spec.whatwg.org/#dom-url-hash)
     * - MDN: [URL.hash](https://developer.mozilla.org/en-US/docs/Web/API/URL/hash)
     *
     * #### Example value:
     * ```
     * const url = new URL("https://elide.dev/?one=two#hello");
     * url.hash;
     * ← "#hello"
     * ```
     */
    hash: string;

    /**
     * ### URL: `host`
     *
     * From [MDN](https://developer.mozilla.org/en-US/docs/Web/API/URL/host):
     * "The host property of the URL interface is a string containing the host, that is the hostname, and then, if the
     * port of the URL is nonempty, a ':', followed by the port of the URL."
     *
     * #### Notes & further reading
     * - Spec: [URL Standard](https://url.spec.whatwg.org/#dom-url-host)
     * - MDN: [URL.host](https://developer.mozilla.org/en-US/docs/Web/API/URL/host)
     *
     * #### Example value:
     * ```
     * const url = new URL("https://elide.dev/?one=two#hello");
     * console.log(url.host);
     * "elide.dev"
     *
     * // `host` includes any non-standard port:
     * const url = new URL("https://elide.dev:123/?one=two#hello");
     * url.host;
     * ← "elide.dev:123"
     * ```
     */
    host: string;

    /**
     * ### URL: `hostname`
     *
     * From [MDN](https://developer.mozilla.org/en-US/docs/Web/API/URL/hostname):
     * "The hostname property of the URL interface is a string containing the domain name of the URL."
     *
     * #### Notes & further reading
     * - Spec: [URL Standard](https://url.spec.whatwg.org/#dom-url-hostname)
     * - MDN: [URL.hostname](https://developer.mozilla.org/en-US/docs/Web/API/URL/hostname)
     * - Differs from [host] because it never contains a port
     *
     * #### Example value:
     * ```
     * const url = new URL("https://elide.dev/?one=two#hello");
     * url.hostname;
     * ← "elide.dev"
     * ```
     */
    hostname: string;

    /**
     * ### URL: `href`
     *
     * From [MDN](https://developer.mozilla.org/en-US/docs/Web/API/URL/href):
     * "The href property of the URL interface is a string containing the whole URL."
     *
     * #### Notes & further reading
     * - Spec: [URL Standard](https://url.spec.whatwg.org/#dom-url-href)
     * - MDN: [URL.href](https://developer.mozilla.org/en-US/docs/Web/API/URL/href)
     *
     * #### Example value:
     * ```
     * const url = new URL("https://elide.dev/?one=two#hello");
     * url.href;
     * ← "https://elide.dev/?one=two#hello"
     * ```
     */
    href: string;

    /**
     *
     */
    toString(): string;

    /**
     * ### URL: `origin`
     *
     * From [MDN](https://developer.mozilla.org/en-US/docs/Web/API/URL/origin):
     * "The origin read-only property of the URL interface returns a string containing the Unicode serialization of the
     * origin of the represented URL.
     *
     * The exact structure varies depending on the type of URL:
     * - For http or https URLs, the scheme followed by '://', followed by the domain, followed by ':', followed by the
     *   port (the default port, 80 and 443 respectively, if explicitly specified).
     * - For file: URLs, the value is browser dependent.
     * - For blob: URLs, the origin of the URL following blob: will be used. For example, "blob:https://mozilla.org"
     *   will be returned as "https://mozilla.org"."
     *
     * #### Notes & further reading
     * - Always read-only
     * - Spec: [URL Standard](https://url.spec.whatwg.org/#dom-url-origin)
     * - MDN: [URL.origin](https://developer.mozilla.org/en-US/docs/Web/API/URL/origin)
     *
     * #### Example value:
     * ```
     * const url = new URL("https://elide.dev/?one=two#hello");
     * url.origin;
     * ← "https://elide.dev"
     * ```
     */
    readonly origin: string;

    /**
     * ### URL: `password`
     *
     * From [MDN](https://developer.mozilla.org/en-US/docs/Web/API/URL/password):
     * "The password property of the URL interface is a string containing the password specified before the domain name.
     * If it is set without first setting the username property, it silently fails."
     *
     * #### Notes & further reading
     * - **Username property must always be set first**
     * - Spec: [URL Standard](https://url.spec.whatwg.org/#dom-url-password)
     * - MDN: [URL.password](https://developer.mozilla.org/en-US/docs/Web/API/URL/password)
     *
     * #### Example value:
     * ```
     * const url = new URL("https://hello:cool@elide.dev/?one=two#hello");
     * url.password;
     * ← "cool"
     * ```
     */
    password: string;

    /**
     * ### URL: `pathname`
     *
     * From [MDN](https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname):
     * "The pathname property of the URL interface represents a location in a hierarchical structure. It is a string
     * constructed from a list of path segments, each of which is prefixed by a / character. If the URL has no path
     * segments, the value of its pathname property will be the empty string."
     *
     * #### Notes & further reading
     * - Spec: [URL Standard](https://url.spec.whatwg.org/#dom-url-pathname)
     * - MDN: [URL.pathname](https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname)
     *
     * #### Example value:
     * ```
     * const url = new URL("https://elide.dev/hello?one=two#hello");
     * url.pathname;
     * ← "/hello"
     * ```
     */
    pathname: string;

    /**
     * ### URL: `port`
     *
     * From [MDN](https://developer.mozilla.org/en-US/docs/Web/API/URL/port):
     * "The port property of the URL interface is a string containing the port number of the URL."
     *
     * #### Notes & further reading
     * - Spec: [URL Standard](https://url.spec.whatwg.org/#dom-url-port)
     * - MDN: [URL.port](https://developer.mozilla.org/en-US/docs/Web/API/URL/port)
     *
     * #### Example value:
     * ```
     * // for a standard port:
     * const url = new URL("https://elide.dev/?one=two#hello");
     * url.port;
     * ← 443
     *
     * // for a non-standard port:
     * const url = new URL("https://elide.dev:123/?one=two#hello");
     * url.port;
     * ← 123
     * ```
     */
    port: string;

    /**
     * ### URL: `protocol`
     *
     * From [MDN](https://developer.mozilla.org/en-US/docs/Web/API/URL/protocol):
     * "The protocol property of the URL interface is a string representing the protocol scheme of the URL, including
     * the final ':'."
     *
     * #### Notes & further reading
     * - Always includes the final `:` character
     * - Spec: [URL Standard](https://url.spec.whatwg.org/#dom-url-protocol)
     * - MDN: [URL.protocol](https://developer.mozilla.org/en-US/docs/Web/API/URL/protocol)
     *
     * #### Example value:
     * ```
     * const url = new URL("https://elide.dev/?one=two#hello");
     * url.protocol;
     * ← "https:"
     * ```
     */
    protocol: string;

    /**
     * ### URL: `search`
     *
     * From [MDN](https://developer.mozilla.org/en-US/docs/Web/API/URL/search):
     * "The search property of the URL interface is a search string, also called a query string, that is a string
     * containing a '?' followed by the parameters of the URL."
     *
     * #### Notes & further reading
     * - [searchParams] is usually a better alternative
     * - Always includes the initial `?` value
     * - Spec: [URL Standard](https://url.spec.whatwg.org/#dom-url-search)
     * - MDN: [URL.search](https://developer.mozilla.org/en-US/docs/Web/API/URL/search)
     *
     * #### Example value:
     * ```
     * const url = new URL("https://elide.dev/?one=two#hello");
     * url.search;
     * ← "?one=two"
     * ```
     *
     * @see searchParams for a more convenient way to access the query parameters.
     */
    search: string;

    /**
     * ### URL: `searchParams`
     *
     * From [MDN](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams):
     * "The searchParams readonly property of the URL interface returns a URLSearchParams object allowing access to the
     * GET decoded query arguments contained in the URL."
     *
     * #### Notes & further reading
     * - Always read-only
     * - Spec: [URL Standard](https://url.spec.whatwg.org/#interface-urlsearchparams)
     * - MDN: [URL.searchParams](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams)
     *
     * #### Example value:
     * ```
     * const url = new URL("https://elide.dev/?one=two#hello");
     * url.searchParams.get('one');
     * ← "two"
     * ```
     */
    readonly searchParams: URLSearchParams;

    /**
     * ### URL: `username`
     *
     * From [MDN](https://developer.mozilla.org/en-US/docs/Web/API/URL/username):
     * "The username property of the URL interface is a string containing the username specified before the domain
     * name."
     *
     * #### Notes & further reading
     * - Spec: [URL Standard](https://url.spec.whatwg.org/#dom-url-username)
     * - MDN: [URL.username](https://developer.mozilla.org/en-US/docs/Web/API/URL/username)
     *
     * #### Example value:
     * ```
     * const url = new URL("https://hello:cool@elide.dev/?one=two#hello");
     * url.username;
     * ← "hello"
     * ```
     */
    username: string;

    /**
     * Convert the URL to a JSON-compatible string; in practice, the return result is the same value as [toString].
     *
     * From [MDN](https://developer.mozilla.org/en-US/docs/Web/API/URL/toJSON):
     * "The toJSON() method of the URL interface returns a string containing a serialized version of the URL, although
     * in practice it seems to have the same effect as URL.toString()."
     *
     * @return Absolute string URL.
     */
    toJSON(): string;
}

/** Main URL constructor instance. */
namespace Intrinsics {
    /** Intrinsic URL implementation. */
    export declare const URL: {
        prototype: IURL;

        /**
         * Constructor: Absolute URL with a base URL.
         *
         * @param url URL string to parse, potentially as a relative URL.
         */
        new(url: URLInputs): IURL;

        /**
         * Constructor: Potentially-relative URL with a base URL.
         *
         * @param url URL string to parse, potentially as a relative URL.
         * @param base Base URL to use if `url` is relative.
         */
        new(url: URLInputs, base?: URLInputs): IURL;

        /**
         * Create a new `URL` object which references the provided [File] or [Blob] object.
         *
         * This method is not supported server-side.
         *
         * From [MDN](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL):
         * "The URL.createObjectURL() static method creates a string containing a URL representing the object given in
         * the parameter. The URL lifetime is tied to the document in the window on which it was created. The new object
         * URL represents the specified File object or Blob object. To release an object URL, call revokeObjectURL()."
         *
         * @see createObjectURL to create a URL from a blob.
         * @see revokeObjectURL to revoke a created object URL.
         * @param obj `Blob`, or `File`, or `MediaSource` to create a URL for.
         * @return URL reference for the provided resource.
         */
        createObjectURL(obj: Blob): string;

        /**
         * Revoke a previously-issued temporary URL reference to a [File] or [Blob] object.
         *
         * This method is not supported server-side.
         *
         * From [MDN](https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL):
         * "The `URL.revokeObjectURL()` static method releases an existing object `URL` which was previously created by
         * calling `URL.createObjectURL()`. Call this method when you've finished using an object `URL` to let the
         * browser know not to keep the reference to the file any longer."
         *
         * @see createObjectURL to create a URL from a file or blob.
         * @param url URL which was previously created via [createObjectURL], which should be revoked.
         */
        revokeObjectURL(url: string): void;
    };
}

/**
 * TBD.
 */
interface ImmutableURL extends URL {
    /** @inheritDoc */
    readonly hash: string;

    /** @inheritDoc */
    readonly host: string;

    /** @inheritDoc */
    readonly hostname: string;

    /** @inheritDoc */
    readonly href: string;

    /** @inheritDoc */
    readonly password: string;

    /** @inheritDoc */
    readonly pathname: string;

    /** @inheritDoc */
    readonly port: string;

    /** @inheritDoc */
    readonly protocol: string;

    /** @inheritDoc */
    readonly search: string;

    /** @inheritDoc */
    readonly searchParams: URLSearchParams;

    /** @inheritDoc */
    readonly username: string;
}

// Intrinsic-only API surface.
interface IntrinsicURL extends ImmutableURL {
    // Internal: get the `hash` value.
    getHash(): string;

    // Internal: get the `host` value.
    getHost(): string;

    // Internal: get the `hostname` value.
    getHostname(): string;

    // Internal: get the `href` value.
    getHref(): string;

    // Internal: get the `origin` value.
    getOrigin(): string;

    // Internal: get the `password` value.
    getPassword(): string;

    // Internal: get the `pathname` value.
    getPathname(): string;

    // Internal: get the `port` value.
    getPort(): number;

    // Internal: get the `protocol` value.
    getProtocol(): string;

    // Internal: get the `search` value.
    getSearch(): string;

    // Internal: get the `searchParams` value.
    getSearchParams(): URLSearchParams;

    // Internal: get the `username` value.
    getUsername(): string;
}

// Intrinsic-only API surface (mutable)
interface IntrinsicMutableURL extends IURL {
    // Internal: set the `hash` value.
    setHash(hash: string): void;

    // Internal: set the `host` value.
    setHost(host: string): void;

    // Internal: set the `hostname` value.
    setHostname(hostname: string): void;

    // Internal: set the `href` value.
    setHref(href: string): void;

    // Internal: set the `password` value.
    setPassword(password: string): void;

    // Internal: set the `pathname` value.
    setPathname(pathname: string): void;

    // Internal: set the `port` value.
    setPort(port: number): void;

    // Internal: set the `protocol` value.
    setProtocol(protocol: string): void;

    // Internal: set the `search` value.
    setSearch(search: string): void;

    // Internal: set the `username` value.
    setUsername(username: string): void;
}

/**
 * TBD.
 */
export class URL implements ImmutableURL {
    // Intrinsic URL instance.
    protected _intrinsic: IntrinsicURL;

    /**
     * TBD.
     */
    constructor(url: URLInputs, base?: URLInputs) {
        this._intrinsic = new Intrinsics.URL(url, base) as IntrinsicURL;
    }

    /** @inheritDoc */
    get hash(): string {
        return this._intrinsic.getHash();
    }

    /** @inheritDoc */
    get host(): string {
        return this._intrinsic.getHost();
    }

    /** @inheritDoc */
    get hostname(): string {
        return this._intrinsic.getHostname();
    }

    /** @inheritDoc */
    get href(): string {
        return this._intrinsic.getHref();
    }

    /** @inheritDoc */
    get origin(): string {
        return this._intrinsic.getOrigin();
    }

    /** @inheritDoc */
    get password(): string {
        return this._intrinsic.getPassword();
    }

    /** @inheritDoc */
    get pathname(): string {
        return this._intrinsic.getPathname();
    }

    /** @inheritDoc */
    get port(): string {
        return this._intrinsic.getPort().toString();
    }

    /** @inheritDoc */
    get protocol(): string {
        return this._intrinsic.getProtocol();
    }

    /** @inheritDoc */
    get search(): string {
        return this._intrinsic.getSearch();
    }

    /** @inheritDoc */
    get searchParams(): URLSearchParams {
        return this._intrinsic.getSearchParams();
    }

    /** @inheritDoc */
    get username(): string {
        return this._intrinsic.getUsername();
    }

    /** @inheritDoc */
    toJSON(): string {
        return this._intrinsic.toJSON();
    }

    /** @inheritDoc */
    toString(): string {
        return this._intrinsic.toString();
    }
}

/**
 * TBD.
 */
export class MutableURL extends URL implements IURL {
    // Intrinsic URL instance.
    private asMutable(): IntrinsicMutableURL {
        // known to be mutable
        return this._intrinsic as unknown as IntrinsicMutableURL;
    }

    /**
     * TBD.
     */
    constructor(url: URLInputs, base?: URLInputs) {
        super(url, base);
    }

    /** @inheritDoc */
    override set hash(value: string) {
        this.asMutable().setHash(value);
    }

    /** @inheritDoc */
    override set host(value: string) {
        this.asMutable().setHost(value);
    }

    /** @inheritDoc */
    override set hostname(value: string) {
        this.asMutable().setHostname(value);
    }

    /** @inheritDoc */
    override set href(value: string) {
        this.asMutable().setHref(value);
    }

    /** @inheritDoc */
    override set password(value: string) {
        this.asMutable().setPassword(value);
    }

    /** @inheritDoc */
    override set pathname(value: string) {
        this.asMutable().setPathname(value);
    }

    /** @inheritDoc */
    override set port(value: string) {
        this.asMutable().setPort(Number.parseInt(value));  // @TODO(sgammon): type alignment
    }

    /** @inheritDoc */
    override set protocol(value: string) {
        this.asMutable().setProtocol(value);
    }

    /** @inheritDoc */
    override set search(value: string) {
        this.asMutable().setSearch(value);
    }

    /** @inheritDoc */
    override set username(value: string) {
        this.asMutable().setUsername(value);
    }
}

installGlobal("URL", MutableURL);
