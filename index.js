'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cast = exports.merge = exports.clone = exports.toObject = exports.getObjValues = exports.length = exports.has = exports.uuid = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _lodash = require('./lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _uuid = require('uuid');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Generate an UUID
 * @param {string} version 
 * @returns {string}
 */
var uuid = exports.uuid = function uuid(version) {
    return Number(version) === 1 || version === 'v1' ? (0, _uuid.v1)() : (0, _uuid.v4)();
};

/**
 * Does input has required value
 * @param {string} input
 * @param {mixed} target
 * @returns {boolean}
 */
var has = exports.has = function has(input, target) {

    if (typeof target === 'string') {
        return !!(input && input.indexOf(target) !== -1);
    } else if (Array.isArray(target)) {
        return target.indexOf(input) !== -1;
    } else if (_lodash2.default.isPlainObject(target)) {
        return (0, _values2.default)(target).findIndex(function (v) {
            return v === input;
        }) !== -1;
    } else return false;
};

/**
 * Get input length
 * @param {mixed} input 
 * @returns {number}
 */
var length = exports.length = function length(input) {
    return _lodash2.default.isPlainObject(input) ? (0, _keys2.default)(input).length : !!input ? input.length : 0;
};

/**
 * Get all values (deep) from a defined object
 * @param {Object} target
 * @returns {Array}
 */
var getObjValues = exports.getObjValues = function getObjValues() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    var values = [];

    (0, _values2.default)(target).forEach(function (v) {

        if (false === _lodash2.default.isPlainObject(v)) {
            values.push(v);
        } else getObjValues(v).forEach(function (dv) {
            values.push(dv);
        });
    });

    return values;
};

/**
 * Converts array to Object
 * @param {Array} arr 
 * @returns {Object}
 */
var toObject = exports.toObject = function toObject() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return arr.reduce(function (result, item) {
        var key = (0, _keys2.default)(item)[0];
        result[key] = item[key];
        return result;
    }, {});
};

/**
 * Clone
 * @param {Object|Array} target
 * @returns {mixed}
 */
var clone = exports.clone = function clone(target) {

    if (false === _lodash2.default.isPlainObject(target) && false === Array.isArray(target)) {
        console.warn('clone :: Can not clone specified properties');
        return;
    }

    if (true === Array.isArray(target)) {
        return target.slice(0);
    } else if (_lodash2.default.isPlainObject(target)) {
        return (0, _assign2.default)({}, target);
    }return null;
};

/**
 * Merge two properties
 * @param {mixed} base
 * @param {mixed} target
 * @returns {mixed}
 */
var merge = exports.merge = function merge() {
    var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


    if (null === base && null === target) {
        console.warn('merge :: Can not merge two "null" properties');
        return;
    }

    var tb = typeof base === 'undefined' ? 'undefined' : (0, _typeof3.default)(base);
    var te = typeof target === 'undefined' ? 'undefined' : (0, _typeof3.default)(target);

    if (tb === 'object' && false === _lodash2.default.isPlainObject(base)) {
        tb = null === base ? 'object:null' : 'object:array';
    }

    if (tb === 'object' && false === _lodash2.default.isPlainObject(target)) {
        te = null === target ? 'object:null' : 'object:array';
    }

    if (tb !== te) {
        console.warn('merge :: Can not merge two properties with different types');
        return;
    }

    if (true === Array.isArray(base)) {
        return base.concat(entry);
    } else if (true === _lodash2.default.isPlainObject(base)) {
        return _lodash2.default.merge(base, target);
    } else return base + target;
};

/**
 * Cast
 * @param {string} type 
 * @param {mixed} value 
 */
var cast = exports.cast = function cast(type, value) {

    switch (type) {
        case 'boolean':
        case 'bool':
            if (value === 'true') value = true;else if (value === 1) value = true;else if (value === '1') value = true;else if (value === 'false') value = false;else if (value === 0) value = false;else if (value === '0') value = false;else value = !!value;
            break;

        case 'string':
        case 'str':
            value = String(value || '');
            break;

        case 'int':
        case 'integer':
        case 'number':
            value = Number(value || '');
            if (isNaN(value)) value = 0;
            break;
    }

    return value;
};