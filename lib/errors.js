import _ from './lodash'
import { length, toObject } from './'
import { HTTPStatus } from './http'

/**
 * Error name
 * @returns {string}
 */
const ERROR_NAME = 'APP_ERROR'

/**
 * Error code base
 * @returns {number}
 */
const ERROR_CODE_BASE = 1000

/**
 * BASE ERROR KEYS
 * MUST NOT BE EDITED - See "appErrorKeys" key below
 * @returns {Object}
 */
const BASE_ERROR_KEYS = Object.freeze({
    INTERNAL_ERROR:        [0, HTTPStatus.INTERNAL_ERROR, 'Something went wrong...'],
    BAD_REQUEST:           [1, HTTPStatus.BAD_REQUEST, 'Bad request'],
    UNAUTHORIZED:          [2, HTTPStatus.UNAUTHORIZED, 'Unauthorized'],
    AUTH_REQUIRED:         [3, HTTPStatus.AUTH_REQUIRED, 'Authentication required'],
    NOT_FOUND:             [4, HTTPStatus.NOT_FOUND, 'Not found'],
    METHOD_NOT_ALLOWED:    [5, HTTPStatus.METHOD_NOT_ALLOWED, 'Method not allowed'],
    CONFLICT:              [6, HTTPStatus.CONFLICT, 'Conflict'],
    REQUEST_TIMEOUT:       [7, HTTPStatus.REQUEST_TIMEOUT, 'Request timeout'],
    RANGE_NOT_SATISFIABLE: [8, HTTPStatus.RANGE_NOT_SATISFIABLE, 'Range not satisfiable'],
    TOO_MANY_REQUESTS:     [9, HTTPStatus.TOO_MANY_REQUESTS, 'Too many requests'],
    BAD_GATEWAY:           [10, HTTPStatus.BAD_GATEWAY, 'Bad gateway'],
    SERVICE_UNAVAILABLE:   [11, HTTPStatus.SERVICE_UNAVAILABLE, 'Service unavailable']
})

/**
 * App errors keys
 * @returns {Object}
 */
let appErrorKeys = toObject(Object.keys(BASE_ERROR_KEYS).map(key => ({
    [key]: BASE_ERROR_KEYS[key].concat([key])
})))

/**
 * Assign / extend current error keys
 * @param {Object} errors
 * @returns {Object}
 */
export const assignErrors = (errors = {}) => {

    if (length(errors) === 0 || false === _.isPlainObject(errors)) {
        console.warn('assignErrors :: Invalid or empty "errors" parameter');
        return;
    }

    errors = toObject(Object.keys(errors).map(key => {
        return { [key.toUpperCase()]: errors[key].concat([key.toUpperCase()]) }
    }));

    Object.assign(appErrorKeys, errors);

}

/**
 * Get error by key
 * @param {string} key 
 * @param {Array} [replace]
 * @returns {Array} error
 */
export const getError = (key, replace = []) => {

    if (false === Array.isArray(replace)) {
        console.warn('getError :: "replace" must be an Array');
        replace = [replace];
    }
    
    let error = _.get(appErrorKeys, key, appErrorKeys.INTERNAL_ERROR).slice(0);

    if (replace.length !== 0) {
        replace.forEach((rk, index) => {
            error[2] = error[2].replace(`{${index}}`, rk);
        });
    }

    return error;

}

/**
 * Get error by http status code
 * @param {number} statusCode 
 * @param {Array} [replace]
 * @returns {Array} error
 */
export const getHTTPError = (statusCode, replace = []) => {
    
    let errorKey = null;
    const statusKeys = Object.keys(HTTPStatus);

    for (let i = 0, l = statusKeys.length; i < l; ++i) {
        if (HTTPStatus[statusKeys[i]] === statusCode) {
            errorKey = statusKeys[i];
            break;
        }
    }

    return getError(errorKey, replace);

}

/**
 * Extract error parameters
 * @param {Array} error 
 * @returns {Object}
 */
export const extractErrorParameters = (error = []) => ({
    code: error[0],
    status: error[1],
    message: error[2],
    reason: error[3]
})

/**
 * Formatted error to array
 * @param {Object} formattedError 
 * @returns {Array}
 */
export const formattedErrorToArray = (formattedError = {}) => [
    formattedError.code,
    formattedError.status,
    formattedError.message,
    formattedError.reason
]

export default class Errors extends Error
{
    /**
     * Errors constructor
     * @param {Array} [error] 
     * @param {Object} [additionalParameters]
     */
    constructor(error = [], additionalParameters = {}) {

        const { headers, cookies, debug, message, code, reason, status } = additionalParameters;

        error = extractErrorParameters(error);
        super(error.message);

        Object.setPrototypeOf(this, Errors.prototype);
        this.name = ERROR_NAME;

        this.error = {
            code: code || ERROR_CODE_BASE + Number(error.code),
            status: status || error.status,
            message: message || this.message,
            reason: reason || error.reason,
            headers, debug, cookies
        };
        
    }

    /**
     * Get formatted error
     * @return {Object}
     */
    getFormattedError = () => {

        const error = this.error;
        let formatted = {};

        Object.keys(error).forEach(key => {
            if (undefined !== error[key]) {
                formatted[key] = error[key];
            }
        });

        return formatted;

    }

    /**
     * Get error code
     * @return {number}
     */
    getCode = () => this.getFormattedError().code

    /**
     * Get error http status
     * @return {number}
     */
    getHTTPStatus = () => this.getFormattedError().status

    /**
     * Get error message
     * @return {string}
     */
    getMessage = () => this.getFormattedError().message

    /**
     * Get error reason
     * @return {string}
     */
    getReason = () => this.getFormattedError().reason

    /**
     * Get error stack trace
     * @returns {string}
     */
    getStack = () => this.stack

    /**
     * Get error headers
     * @returns {mixed}
     */
    getHeaders = () => this.getFormattedError().headers

    /**
     * Get error cookies
     * @returns {mixed}
     */
    getCookies = () => this.getFormattedError().cookies
}
