'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.allowPrintInProduction = undefined;

var _ = require('../');

var _env = require('../env');

/**
 * Allow "print" method in production
 * @see print
 * @returns {boolean}
 */
var __allowPrintInProduction = true;

/**
 * Terminal colors association
 * @returns {Object}
 */
var terminalColorsAssociation = {
    black: '30',
    red: '31',
    green: '32',
    yellow: '33',
    blue: '34',
    magenta: '35',
    cyan: '36',
    white: '37',
    orange: '38;5;214'

    /**
     * Converts string color to terminal one
     * @param {string} color 
     * @returns {string}
     */
};var strColorToNumColor = function strColorToNumColor(color) {
    return terminalColorsAssociation[color] || terminalColorsAssociation.white;
};

/**
 * Print
 * @param {string} key
 * @param {mixed} [message]
 * @param {string} [color]
 */
var print = function print() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'green';


    if (true === (0, _env.isProduction)() && false === __allowPrintInProduction) {
        return;
    }

    if (true === (0, _env.isBrowser)()) {
        console.log('%c' + key, 'color:' + color + ';font-weight:bold;', message);
    } else console.log('\x1B[' + strColorToNumColor(color) + 'm%s\x1B[0m', key, message);
};

/**
 * Allow "print" method in production
 * @param {boolean} allow 
 */
var allowPrintInProduction = exports.allowPrintInProduction = function allowPrintInProduction(allow) {
    __allowPrintInProduction = !!allow;
};

exports.default = print;