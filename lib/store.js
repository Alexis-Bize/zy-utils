import { has, length } from './'

/**
 * Headers
 * @returns {Object}
 */
let __headers = {}

/**
 * Cookies
 * @returns {Array}
 */
let __cookies = []

/**
 * Store headers
 * @param {Object} headers 
 * @param {Array} filter
 */
const storeHeaders = (headers, filter = []) => {

    let filtered = Object.assign({}, headers);

    if (length(filter) !== 0) {

        filter = filter.filter(f1 => length(f1) !== 0).map(f2 => f2.toLowerCase());

        Object.keys(headers).forEach(header => {
            if (false === has(header.toLowerCase(), filter)) {
                delete filtered[header];
            }
        });

    }

    Object.assign(__headers, filtered);
    
}

/**
 * Store cookies
 * @param {Array} cookies 
 */
const storeCookies = cookies => {
    __cookies = __cookies.concat(cookies);
}

/**
 * Get and flush headers
 * @returns {Object}
 */
const getAndFlushHeaders = () => {
    const headers = Object.assign({}, __headers);
    __headers = {};
    return headers;
}

/**
 * Get and flush cookies
 * @returns {Object}
 */
const getAndFlushCookies = () => {
    const cookies = __cookies.slice(0);
    __cookies = [];
    return cookies;
}

export default {
    storeHeaders,
    getAndFlushHeaders,
    storeCookies,
    getAndFlushCookies
}
