import { length } from './'
import { isProduction, isBrowser } from './env'

/**
 * Allow "print" method in production
 * @see print
 * @returns {boolean}
 */
let __allowPrintInProduction = true;

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
}

/**
 * Converts string color to terminal one
 * @param {string} color 
 * @returns {string}
 */
const strColorToNumColor = color => (
    terminalColorsAssociation[color] || terminalColorsAssociation.white
)

/**
 * Print
 * @param {string} key
 * @param {mixed} [message]
 * @param {string} [color]
 */
const print = (key = '', message = '', color = 'green') => {

    if (true === isProduction() &&
        false === __allowPrintInProduction) {
        return;
    }

    if (true === isBrowser()) {
        console.log(`%c${key}`, `color:${color};font-weight:bold;`, message);
    } else console.log(`\x1b[${strColorToNumColor(color)}m%s\x1b[0m`, key, message);
    
}

/**
 * Allow "print" method in production
 * @param {boolean} allow 
 */
export const allowPrintInProduction = allow => {
    __allowPrintInProduction = !!allow;
}

export default print
