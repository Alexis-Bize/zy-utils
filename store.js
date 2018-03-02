'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFromStore = exports.addToStore = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _2 = require('./');

var _lodash = require('./lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Store
 * @returns {Array}
 */
var __store = [];

/**
 * Add to store
 * @param {mixed} prop 
 * @param {Array} filter 
 */
var addToStore = exports.addToStore = function addToStore(prefix, prop) {
    var filter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];


    prefix = String(prefix || Date.now());
    var filtered = null;

    if (true === Array.isArray(prop)) {
        filtered = prop.slice(0);
    } else if (true === _lodash2.default.isPlainObject(prop)) {
        filtered = (0, _assign2.default)({}, prop);
    } else {
        filtered = prop;
        filter = [];
    }

    if ((0, _2.length)(filter) !== 0) {
        filter = filter.filter(function (f1) {
            return (0, _2.length)(f1) !== 0;
        }).map(function (f2) {
            return f2.toLowerCase();
        });
        (true === Array.isArray(prop) ? prop : (0, _keys2.default)(prop)).forEach(function (k) {
            if (false === (0, _2.has)(k.toLowerCase(), filter)) {
                true === Array.isArray(prop) ? filtered.splice(filtered.indexOf(k.toLowerCase()), 1) : delete filtered[k];
            }
        });
    }

    __store.push({
        prefix: prefix,
        content: filtered
    });
};

/**
 * Get from store
 * @param {prefix}
 * @returns {Array}
 */
var getFromStore = exports.getFromStore = function getFromStore(prefix) {
    return prefix ? __store.filter(function (s) {
        return s.prefix === prefix;
    }).map(function (s) {
        return s.content;
    }).filter(function (r) {
        return (0, _2.length)(r);
    }) : __store;
};