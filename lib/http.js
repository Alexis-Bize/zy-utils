import { has, length } from './';

/**
 * BASE HTTP STATUS
 * @returns {Object}
 */
const BASE_HTTP_STATUS = Object.freeze({
    CONTINUE: 100,
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    PARTIAL_CONTENT: 206,
    MOVED_TEMPORARILY: 302,
    NOT_MODIFIED: 304,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    AUTH_REQUIRED: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    REQUEST_TIMEOUT: 408,
    RANGE_NOT_SATISFIABLE: 416,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    BANDWIDTH_LIMIT_EXCEEDED: 509
});

/**
 * BASE HTTP METHODS
 * @returns {Object}
 */
const BASE_HTTP_METHODS = Object.freeze({
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
    OPTIONS: 'OPTIONS',
    HEAD: 'HEAD'
});

/**
 * BASE HTTP HEADERS
 * @returns {Object}
 */
const BASE_HTTP_HEADERS = Object.freeze({
    WWW_AUTHENTICATE: 'WWW-Authenticate',
    ALLOW_ORIGIN: 'Access-Control-Allow-Origin',
    ALLOW_METHODS: 'Access-Control-Allow-Methods',
    CONTENT_TYPE: 'Content-Type',
    CONTENT_DISPOSITION: 'Content-Disposition',
    ACCEPT: 'Accept',
    X_RATE_LIMIT_LIMIT: 'X-Rate-Limit-Limit',
    X_RATE_LIMIT_REMAINING: 'X-Rate-Limit-Remaining',
    X_RATE_LIMIT_RESET: 'X-Rate-Limit-Reset',
    RETRY_AFTER: 'Retry-After',
    SET_COOKIE: 'Set-Cookie'
});

/**
 * BASE HTTP CONTENT TYPES
 * @returns {Object}
 */
const BASE_HTTP_CONTENT_TYPES = Object.freeze({
    TEXT_HTML: 'text/html',
    APPLICATION_JSON: 'application/json',
    APPLICATION_OCTET_STREAM: 'application/octet-stream',
    IMAGE_PNG: 'image/png',
    APPLICATION_XHTML: 'application/xhtml+xml',
    APPLICATION_XML: 'application/xml',
    APPLICATION_SOAP_XML: 'application/soap+xml',
    APPLICATION_X_WWW_FORM_URLENCODED: 'application/x-www-form-urlencoded',
    MULTIPART_FORM_DATA: 'multipart/form-data'
});

/**
 * HTTP Status
 * @returns {Object}
 */
let HTTPStatus = Object.assign({}, BASE_HTTP_STATUS);

/**
 * HTTP Methods
 * @returns {Object}
 */
let HTTPMethods = Object.assign({}, BASE_HTTP_METHODS);

/**
 * HTTP Headers
 * @returns {Object}
 */
let HTTPHeaders = Object.assign({}, BASE_HTTP_HEADERS);

/**
 * HTTP Content types
 * @returns {Object}
 */
let HTTPContentTypes = Object.assign({}, BASE_HTTP_CONTENT_TYPES);

/**
 * Assign HTTP status
 * @param {string} key
 * @param {numer} code
 * @returns {Object}
 */
export const assignHTTPStatus = (key, code) => {
    if (length(key) === 0 || typeof key !== 'string') {
        console.warn('assignHTTPStatus :: Missing or invalid "key" parameter');
        return;
    }

    if (length(code) === 0 || typeof code !== 'number') {
        console.warn('assignHTTPStatus :: Missing or invalid "code" parameter');
        return;
    }

    key = key.toUpperCase();

    if (true === has(key, Object.keys(HTTPStatus))) {
        console.warn('assignHTTPStatus :: Duplicate "key" in status list');
        return;
    }

    HTTPStatus = Object.assign({}, HTTPStatus, { [key]: code });
    return HTTPStatus;
};

/**
 * Assign HTTP header
 * @param {string} key
 * @param {string} value
 * @returns {Object}
 */
export const assignHTTPHeader = (key, value) => {
    if (length(key) === 0 || typeof key !== 'string') {
        console.warn('assignHTTPHeader :: Missing or invalid "key" parameter');
        return;
    }

    if (length(value) === 0 || typeof value !== 'string') {
        console.warn(
            'assignHTTPHeader :: Missing or invalid "value" parameter'
        );
        return;
    }

    key = key.toUpperCase();

    if (true === has(key, Object.keys(HTTPHeaders))) {
        console.warn('assignHTTPHeader :: Duplicate "key" in headers list');
        return;
    }

    HTTPHeaders = Object.assign({}, HTTPHeaders, { [key]: value });
    return HTTPStatus;
};

/**
 * Assign HTTP content type
 * @param {string} key
 * @param {string} value
 * @returns {Object}
 */
export const assignHTTPContentType = (key, value) => {
    if (length(key) === 0 || typeof key !== 'string') {
        console.warn(
            'assignHTTPContentType :: Missing or invalid "key" parameter'
        );
        return;
    }

    if (length(value) === 0 || typeof value !== 'string') {
        console.warn(
            'assignHTTPContentType :: Missing or invalid "value" parameter'
        );
        return;
    }

    key = key.toUpperCase();

    if (true === has(key, Object.keys(HTTPContentTypes))) {
        console.warn(
            'assignHTTPContentType :: Duplicate "key" in content types list'
        );
        return;
    }

    HTTPContentTypes = Object.assign({}, HTTPContentTypes, { [key]: value });
    return HTTPContentTypes;
};

export const HTTPCodes = HTTPStatus; // ALIAS
export const HTTPStatusCodes = HTTPStatus; // ALIAS

export { HTTPStatus, HTTPContentTypes, HTTPMethods, HTTPHeaders };
