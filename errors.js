'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formattedErrorToArray = exports.extractErrorParameters = exports.getHTTPError = exports.getError = exports.assignErrors = undefined;

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _freeze = require('babel-runtime/core-js/object/freeze');

var _freeze2 = _interopRequireDefault(_freeze);

var _lodash = require('./lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _2 = require('./');

var _http = require('./http');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Error name
 * @returns {string}
 */
var ERROR_NAME = 'APP_ERROR';

/**
 * Error code base
 * @returns {number}
 */
var ERROR_CODE_BASE = 1000;

/**
 * BASE ERROR KEYS
 * MUST NOT BE EDITED - See "appErrorKeys" key below
 * @returns {Object}
 */
var BASE_ERROR_KEYS = (0, _freeze2.default)({
    INTERNAL_ERROR: [0, _http.HTTPStatus.INTERNAL_ERROR, 'Something went wrong...'],
    BAD_REQUEST: [1, _http.HTTPStatus.BAD_REQUEST, 'Bad request'],
    UNAUTHORIZED: [2, _http.HTTPStatus.UNAUTHORIZED, 'Unauthorized'],
    AUTH_REQUIRED: [3, _http.HTTPStatus.AUTH_REQUIRED, 'Authentication required'],
    NOT_FOUND: [4, _http.HTTPStatus.NOT_FOUND, 'Not found'],
    METHOD_NOT_ALLOWED: [5, _http.HTTPStatus.METHOD_NOT_ALLOWED, 'Method not allowed'],
    CONFLICT: [6, _http.HTTPStatus.CONFLICT, 'Conflict'],
    REQUEST_TIMEOUT: [7, _http.HTTPStatus.REQUEST_TIMEOUT, 'Request timeout'],
    RANGE_NOT_SATISFIABLE: [8, _http.HTTPStatus.RANGE_NOT_SATISFIABLE, 'Range not satisfiable'],
    TOO_MANY_REQUESTS: [9, _http.HTTPStatus.TOO_MANY_REQUESTS, 'Too many requests'],
    BAD_GATEWAY: [10, _http.HTTPStatus.BAD_GATEWAY, 'Bad gateway'],
    SERVICE_UNAVAILABLE: [11, _http.HTTPStatus.SERVICE_UNAVAILABLE, 'Service unavailable']
});

/**
 * App errors keys
 * @returns {Object}
 */
var appErrorKeys = (0, _2.toObject)((0, _keys2.default)(BASE_ERROR_KEYS).map(function (key) {
    return (0, _defineProperty3.default)({}, key, BASE_ERROR_KEYS[key].concat([key]));
}));

/**
 * Assign / extend current error keys
 * @param {Object} errors
 * @returns {Object}
 */
var assignErrors = exports.assignErrors = function assignErrors() {
    var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    if ((0, _2.length)(errors) === 0 || false === _lodash2.default.isPlainObject(errors)) {
        console.warn('assignErrors :: Invalid or empty "errors" parameter');
        return;
    }

    errors = (0, _2.toObject)((0, _keys2.default)(errors).map(function (key) {
        return (0, _defineProperty3.default)({}, key.toUpperCase(), errors[key].concat([key.toUpperCase()]));
    }));

    (0, _assign2.default)(appErrorKeys, errors);
};

/**
 * Get error by key
 * @param {string} key 
 * @param {Array} [replace]
 * @returns {Array} error
 */
var getError = exports.getError = function getError(key) {
    var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


    if (false === Array.isArray(replace)) {
        console.warn('getError :: "replace" must be an Array');
        replace = [replace];
    }

    var error = _lodash2.default.get(appErrorKeys, key, appErrorKeys.INTERNAL_ERROR).slice(0);

    if (replace.length !== 0) {
        replace.forEach(function (rk, index) {
            error[2] = error[2].replace('{' + index + '}', rk);
        });
    }

    return error;
};

/**
 * Get error by http status code
 * @param {number} statusCode 
 * @param {Array} [replace]
 * @returns {Array} error
 */
var getHTTPError = exports.getHTTPError = function getHTTPError(statusCode) {
    var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


    var errorKey = null;
    var statusKeys = (0, _keys2.default)(_http.HTTPStatus);

    for (var i = 0, l = statusKeys.length; i < l; ++i) {
        if (_http.HTTPStatus[statusKeys[i]] === statusCode) {
            errorKey = statusKeys[i];
            break;
        }
    }

    return getError(errorKey, replace);
};

/**
 * Extract error parameters
 * @param {Array} error 
 * @returns {Object}
 */
var extractErrorParameters = exports.extractErrorParameters = function extractErrorParameters() {
    var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return {
        code: error[0],
        status: error[1],
        message: error[2],
        reason: error[3]
    };
};

/**
 * Formatted error to array
 * @param {Object} formattedError 
 * @returns {Array}
 */
var formattedErrorToArray = exports.formattedErrorToArray = function formattedErrorToArray() {
    var formattedError = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return [formattedError.code, formattedError.status, formattedError.message, formattedError.reason];
};

var Errors = function (_Error) {
    (0, _inherits3.default)(Errors, _Error);

    /**
     * Errors constructor
     * @param {Array} [error] 
     * @param {Object} [additionalParameters]
     */
    function Errors() {
        var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var additionalParameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        (0, _classCallCheck3.default)(this, Errors);
        var headers = additionalParameters.headers,
            cookies = additionalParameters.cookies,
            debug = additionalParameters.debug,
            message = additionalParameters.message,
            code = additionalParameters.code,
            reason = additionalParameters.reason,
            status = additionalParameters.status;


        error = extractErrorParameters(error);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Errors.__proto__ || (0, _getPrototypeOf2.default)(Errors)).call(this, error.message));

        _initialiseProps.call(_this);

        (0, _setPrototypeOf2.default)(_this, Errors.prototype);
        _this.name = ERROR_NAME;

        _this.error = {
            code: code || ERROR_CODE_BASE + Number(error.code),
            status: status || error.status,
            message: message || _this.message,
            reason: reason || error.reason,
            headers: headers, debug: debug, cookies: cookies
        };

        return _this;
    }

    /**
     * Get formatted error
     * @return {Object}
     */


    /**
     * Get error code
     * @return {number}
     */


    /**
     * Get error http status
     * @return {number}
     */


    /**
     * Get error message
     * @return {string}
     */


    /**
     * Get error reason
     * @return {string}
     */


    /**
     * Get error stack trace
     * @returns {string}
     */


    /**
     * Get error headers
     * @returns {mixed}
     */


    /**
     * Get error cookies
     * @returns {mixed}
     */


    return Errors;
}(Error);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.getFormattedError = function () {

        var error = _this2.error;
        var formatted = {};

        (0, _keys2.default)(error).forEach(function (key) {
            if (undefined !== error[key]) {
                formatted[key] = error[key];
            }
        });

        return formatted;
    };

    this.getCode = function () {
        return _this2.getFormattedError().code;
    };

    this.getHTTPStatus = function () {
        return _this2.getFormattedError().status;
    };

    this.getMessage = function () {
        return _this2.getFormattedError().message;
    };

    this.getReason = function () {
        return _this2.getFormattedError().reason;
    };

    this.getStack = function () {
        return _this2.stack;
    };

    this.getHeaders = function () {
        return _this2.getFormattedError().headers;
    };

    this.getCookies = function () {
        return _this2.getFormattedError().cookies;
    };
};

exports.default = Errors;