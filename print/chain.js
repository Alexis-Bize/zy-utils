'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _freeze = require('babel-runtime/core-js/object/freeze');

var _freeze2 = _interopRequireDefault(_freeze);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChainPrint = function () {

  /**
   * ChainPrint constructor
   * @param {string} prefix 
   * @param {boolean} [braceWrapping]
   */


  /**
   * Default callback color
   * @returns {string}
   */

  /**
   * Prefixed key separator
   * @returns {string}
   */
  function ChainPrint(prefix) {
    var braceWrapping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    (0, _classCallCheck3.default)(this, ChainPrint);

    _initialiseProps.call(this);

    this.prefix = prefix.toUpperCase();
    this.braceWrapping = !!braceWrapping;

    this.key = '';
    this.message = '';
    this.color = ChainPrint.defaultPrintColor;
    this.callbackInfo = (0, _assign2.default)({}, ChainPrint.defaultCallbackProperties);
  }

  /**
   * Get prefixed key
   * @returns {string}
   */


  /**
   * Default callback properties
   * @returns {Object}
   */


  /**
   * Default print color
   * @returns {string}
   */


  (0, _createClass3.default)(ChainPrint, [{
    key: 'prefixedKey',
    get: function get() {

      var output = length(this.getKey()) ? [this.getPrefix(), this.getKey()].join(' ' + ChainPrint.prefixedKeySep + ' ') : this.getPrefix();

      return this.useBraceWrapping() ? '[' + output + ']' : output;
    }

    /**
     * Set key
     * @param {string} key
     * @returns {Object}
     */


    /**
     * Set base message
     * @param {string} message
     * @returns {Object}
     */


    /**
     * Set base color
     * @param {string} color
     * @returns {Object}
     */


    /**
     * Set callback info
     * @param {Object} properties
     * @returns {Object}
     */


    /**
     * Get prefix
     * @param {boolean} braceWrapping
     * @returns {string}
     */


    /**
     * Get key
     * @returns {string}
     */


    /**
     * Get message
     * @returns {string}
     */


    /**
     * Get color
     * @returns {string}
     */


    /**
     * Get print properties
     * @returns {Array}
     */


    /**
     * Get callback info
     * @returns {Array}
     */


    /**
     * Use brace wrapping
     * @returns {boolean}
     */


    /**
     * Print
     * @param {string|Function} [key]
     * @param {Function|null} [cb]
     * @returns {Function}
     */

  }]);
  return ChainPrint;
}();

ChainPrint.prefixedKeySep = '-';
ChainPrint.defaultPrintColor = 'yellow';
ChainPrint.defaultCallbackColor = 'green';
ChainPrint.defaultCallbackProperties = (0, _freeze2.default)({
  key: '',
  message: '',
  color: ChainPrint.defaultCallbackColor
});

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.setKey = function () {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    _this.key = key.toUpperCase();
    return _this;
  };

  this.setBaseMessage = function () {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    _this.message = message;
    return _this;
  };

  this.setBaseColor = function () {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    _this.color = color;
    return _this;
  };

  this.setCallbackInfo = function (properties) {
    (0, _assign2.default)(_this.callbackInfo, properties);
    return _this;
  };

  this.getPrefix = function () {
    var braceWrapping = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (true === braceWrapping) return '[' + _this.prefix + ']';
    return _this.prefix;
  };

  this.getKey = function () {
    return _this.key;
  };

  this.getBaseMessage = function () {
    return _this.message;
  };

  this.getBaseColor = function () {
    return _this.color;
  };

  this.getPrintProperties = function () {
    return [_this.prefixedKey, _this.getBaseMessage(), _this.getBaseColor()];
  };

  this.getCallbackInfo = function () {
    return [_this.callbackInfo.key || _this.prefixedKey, _this.callbackInfo.message || '', _this.callbackInfo.color || ChainPrint.defaultCallbackColor];
  };

  this.useBraceWrapping = function () {
    return _this.braceWrapping;
  };

  this.print = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:

              if (typeof key === 'string') _this.setKey(key);else cb = typeof key === 'function' ? key : null;

              _2.default.apply(undefined, (0, _toConsumableArray3.default)(_this.getPrintProperties()));

              if (!(null === cb)) {
                _context.next = 6;
                break;
              }

              _context.t0 = true;
              _context.next = 9;
              break;

            case 6:
              _context.next = 8;
              return cb().then(function () {
                _2.default.apply(undefined, (0, _toConsumableArray3.default)(_this.getCallbackInfo()));
              });

            case 8:
              _context.t0 = _context.sent;

            case 9:
              return _context.abrupt('return', _context.t0);

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function () {
      return _ref.apply(this, arguments);
    };
  }();
};

exports.default = ChainPrint;