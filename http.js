'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HTTPHeaders = exports.HTTPMethods = exports.HTTPContentTypes = exports.HTTPStatus = exports.HTTPStatusCodes = exports.HTTPCodes = exports.assignHTTPContentType = exports.assignHTTPHeader = exports.assignHTTPStatus = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _freeze = require('babel-runtime/core-js/object/freeze');

var _freeze2 = _interopRequireDefault(_freeze);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * BASE HTTP STATUS
 * @returns {Object}
 */
var BASE_HTTP_STATUS = (0, _freeze2.default)({
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
var BASE_HTTP_METHODS = (0, _freeze2.default)({
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
var BASE_HTTP_HEADERS = (0, _freeze2.default)({
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
var BASE_HTTP_CONTENT_TYPES = (0, _freeze2.default)({
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
var HTTPStatus = (0, _assign2.default)({}, BASE_HTTP_STATUS);

/**
 * HTTP Methods
 * @returns {Object}
 */
var HTTPMethods = (0, _assign2.default)({}, BASE_HTTP_METHODS);

/**
 * HTTP Headers
 * @returns {Object}
 */
var HTTPHeaders = (0, _assign2.default)({}, BASE_HTTP_HEADERS);

/**
 * HTTP Content types
 * @returns {Object}
 */
var HTTPContentTypes = (0, _assign2.default)({}, BASE_HTTP_CONTENT_TYPES);

/**
 * Assign HTTP status
 * @param {string} key 
 * @param {numer} code 
 * @returns {Object}
 */
var assignHTTPStatus = exports.assignHTTPStatus = function assignHTTPStatus(key, code) {

    if ((0, _.length)(key) === 0 || typeof key !== 'string') {
        console.warn('assignHTTPStatus :: Missing or invalid "key" parameter');
        return;
    }

    if ((0, _.length)(code) === 0 || typeof code !== 'number') {
        console.warn('assignHTTPStatus :: Missing or invalid "code" parameter');
        return;
    }

    key = key.toUpperCase();

    if (true === (0, _.has)(key, (0, _keys2.default)(HTTPStatus))) {
        console.warn('assignHTTPStatus :: Duplicate "key" in status list');
        return;
    }

    exports.HTTPStatus = HTTPStatus = (0, _assign2.default)({}, HTTPStatus, (0, _defineProperty3.default)({}, key, code));
    return HTTPStatus;
};

/**
 * Assign HTTP header
 * @param {string} key 
 * @param {string} value 
 * @returns {Object}
 */
var assignHTTPHeader = exports.assignHTTPHeader = function assignHTTPHeader(key, value) {

    if ((0, _.length)(key) === 0 || typeof key !== 'string') {
        console.warn('assignHTTPHeader :: Missing or invalid "key" parameter');
        return;
    }

    if ((0, _.length)(value) === 0 || typeof value !== 'string') {
        console.warn('assignHTTPHeader :: Missing or invalid "value" parameter');
        return;
    }

    key = key.toUpperCase();

    if (true === (0, _.has)(key, (0, _keys2.default)(HTTPHeaders))) {
        console.warn('assignHTTPHeader :: Duplicate "key" in headers list');
        return;
    }

    exports.HTTPHeaders = HTTPHeaders = (0, _assign2.default)({}, HTTPHeaders, (0, _defineProperty3.default)({}, key, value));
    return HTTPStatus;
};

/**
 * Assign HTTP content type
 * @param {string} key 
 * @param {string} value 
 * @returns {Object}
 */
var assignHTTPContentType = exports.assignHTTPContentType = function assignHTTPContentType(key, value) {

    if ((0, _.length)(key) === 0 || typeof key !== 'string') {
        console.warn('assignHTTPContentType :: Missing or invalid "key" parameter');
        return;
    }

    if ((0, _.length)(value) === 0 || typeof value !== 'string') {
        console.warn('assignHTTPContentType :: Missing or invalid "value" parameter');
        return;
    }

    key = key.toUpperCase();

    if (true === (0, _.has)(key, (0, _keys2.default)(HTTPContentTypes))) {
        console.warn('assignHTTPContentType :: Duplicate "key" in content types list');
        return;
    }

    exports.HTTPContentTypes = HTTPContentTypes = (0, _assign2.default)({}, HTTPContentTypes, (0, _defineProperty3.default)({}, key, value));
    return HTTPContentTypes;
};

var HTTPCodes = exports.HTTPCodes = HTTPStatus; // ALIAS
var HTTPStatusCodes = exports.HTTPStatusCodes = HTTPStatus; // ALIAS

exports.HTTPStatus = HTTPStatus;
exports.HTTPContentTypes = HTTPContentTypes;
exports.HTTPMethods = HTTPMethods;
exports.HTTPHeaders = HTTPHeaders;