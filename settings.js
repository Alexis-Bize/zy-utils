'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warnOnUndefinedKey = exports.get = exports.assign = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _freeze = require('babel-runtime/core-js/object/freeze');

var _freeze2 = _interopRequireDefault(_freeze);

var _lodash = require('./lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ***************************** CAUTION ***************************** //
// * Settings might be exported to the client through webpack builds * //
// *** IF SO, DO NOT DECLARE OR ASSIGN PRIVATE KEYS ON CLIENT SIDE *** //
// ***************************** CAUTION ***************************** //

/**
 * Show warning if a key is undefined on "get" method call
 * @returns {boolean}
 */
var __warnOnUndefinedKey = true;

/**
 * BASE SETTINGS
 * MUST NOT BE EDITED - See "appSettings" key below
 * @returns {Object}
 */
var BASE_SETTINGS = (0, _freeze2.default)({
  users: {
    roles: {}
  }
});

/**
 * App settings
 * @returns {Object}
 */
var appSettings = (0, _assign2.default)({}, BASE_SETTINGS);

/**
 * Assign / extend current settings
 * @param {Object} settings
 * @returns {Object}
 */
var assign = function assign() {
  var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _lodash2.default.merge(appSettings, settings);
};

/**
 * Get setting by key
 * @param {string} key 
 * @param {mixed} [defaultValue]
 * @returns {mixed}
 */
var get = function get(key, defaultValue) {

  var value = _lodash2.default.get(appSettings, key, defaultValue);

  if (undefined === value && true === __warnOnUndefinedKey) {
    console.warn('get :: Warning, "' + key + '" is undefined.');
  }

  return value;
};

/**
 * Warn on undefined key on "get" method call
 * @param {boolean} warn 
 */
var warnOnUndefinedKey = function warnOnUndefinedKey(warn) {
  __warnOnUndefinedKey = !!warn;
};

exports.assign = assign;
exports.get = get;
exports.warnOnUndefinedKey = warnOnUndefinedKey;
exports.default = appSettings;