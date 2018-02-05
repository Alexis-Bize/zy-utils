'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isServer = exports.isBrowser = exports.isProduction = exports.isStaging = exports.isDevelopment = exports.CURRENT_ENV = exports.DEFAULT_ENV = undefined;

var _lodash = require('./lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Default environment
 * @returns {string}
 */
var DEFAULT_ENV = exports.DEFAULT_ENV = 'development';

/**
 * Current environment
 * @returns {string}
 */
var CURRENT_ENV = exports.CURRENT_ENV = process.env.NODE_ENV || DEFAULT_ENV;

/**
 * Is development
 * @returns {boolean}
 */
var isDevelopment = exports.isDevelopment = function isDevelopment() {
  return 'development' === CURRENT_ENV;
};

/**
 * Is staging
 * @returns {boolean}
 */
var isStaging = exports.isStaging = function isStaging() {
  return 'staging' === CURRENT_ENV;
};

/**
 * Is development
 * @returns {boolean}
 */
var isProduction = exports.isProduction = function isProduction() {
  return 'production' === CURRENT_ENV;
};

/**
 * Is browser
 * @returns {boolean}
 */
var isBrowser = exports.isBrowser = function isBrowser() {
  return typeof window !== 'undefined' && typeof _lodash2.default.get(window, 'document.createElement') === 'function';
};

/**
 * Is server
 * @returns {boolean}
 */
var isServer = exports.isServer = function isServer() {
  return false === isBrowser();
};