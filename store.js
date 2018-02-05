'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Headers
 * @returns {Object}
 */
var __headers = {};

/**
 * Cookies
 * @returns {Array}
 */
var __cookies = [];

/**
 * Store headers
 * @param {Object} headers 
 * @param {Array} filter
 */
var storeHeaders = function storeHeaders(headers) {
    var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


    var filtered = (0, _assign2.default)({}, headers);

    if ((0, _.length)(filter) !== 0) {

        filter = filter.filter(function (f1) {
            return (0, _.length)(f1) !== 0;
        }).map(function (f2) {
            return f2.toLowerCase();
        });

        (0, _keys2.default)(headers).forEach(function (header) {
            if (false === (0, _.has)(header.toLowerCase(), filter)) {
                delete filtered[header];
            }
        });
    }

    (0, _assign2.default)(__headers, filtered);
};

/**
 * Store cookies
 * @param {Array} cookies 
 */
var storeCookies = function storeCookies(cookies) {
    __cookies = __cookies.concat(cookies);
};

/**
 * Get and flush headers
 * @returns {Object}
 */
var getAndFlushHeaders = function getAndFlushHeaders() {
    var headers = (0, _assign2.default)({}, __headers);
    __headers = {};
    return headers;
};

/**
 * Get and flush cookies
 * @returns {Object}
 */
var getAndFlushCookies = function getAndFlushCookies() {
    var cookies = __cookies.slice(0);
    __cookies = [];
    return cookies;
};

exports.default = {
    storeHeaders: storeHeaders,
    getAndFlushHeaders: getAndFlushHeaders,
    storeCookies: storeCookies,
    getAndFlushCookies: getAndFlushCookies
};