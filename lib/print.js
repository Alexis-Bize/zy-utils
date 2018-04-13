import { length } from './'
import { isProduction, isBrowser } from './env'

/**
 * Allow "print" method in production
 * @see print
 * @returns {boolean}
 */
let __allowPrintInProduction = true;

/**
 * @see skipColorize
 * @returns {boolean}
 */
let __skipColorize = false;

/**
 * Terminal colors association
 * @returns {Object}
 */
const terminalColorsAssociation = {
    black: '30',
    red: '31',
    green: '32',
    yellow: '33',
    blue: '34',
    magenta: '35',
    cyan: '36',
    white: '37',
    orange: '38;5;214'
};

/**
 * Level association
 * @returns {Object}
 */
const levelAssociation = {
    error: 'error',
    warn: 'warn',
    debug: 'debug',
    info: 'log',
};

/**
 * Converts string color to terminal one
 * @param {string} color
 * @returns {string}
 */
const strColorToNumColor = color => (
    terminalColorsAssociation[color] || terminalColorsAssociation.white
)

/**
 * Converts level to method name
 * @param {string} level
 * @returns {string}
 */
const levelToMethodName = level => (
    levelAssociation[level] || levelAssociation.info
)

/**
 * Print
 * @param {string} key
 * @param {mixed} [message]
 * @param {Object} [options]
 */
const print = (key = '', message = '', options = {}) => {

    if (true === isProduction() &&
        false === __allowPrintInProduction) {
        return;
    }

    let color = 'green';

    if (typeof options === 'string') {
        color = options || color;
        options = {};
    }

    if (length(options.color) !== 0) {
        color = options.color;
    }

    const logMethod = console[levelToMethodName(options.level)];

    if (true === __skipColorize) {
        logMethod(key, message);
        return;
    }

    if (true === isBrowser()) {
        logMethod(`%c${key}`, `color:${color};font-weight:bold;`, message);
    } else logMethod(`\x1b[${strColorToNumColor(color)}m%s\x1b[0m`, key, message);

}

/**
 * Allow "print" method in production
 * @param {boolean} allow
 */
export const allowPrintInProduction = allow => {
    __allowPrintInProduction = !!allow;
}

/**
 * Skip colorize
 * @param {boolean} skip
 */
export const skipColorize = skip => {
    __skipColorize = !!skip
}

export default print
