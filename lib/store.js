import { has, length } from './'
import _ from './lodash'

/**
 * Store
 * @returns {Array}
 */
let __store = [];

/**
 * Add to store
 * @param {mixed} prop 
 * @param {Array} filter 
 */
export const addToStore = (prefix, prop, filter = []) => {

    prefix = String(prefix || Date.now());
    let filtered = null;

    if (true === Array.isArray(prop)) {
        filtered = prop.slice(0);
    } else if (true === _.isPlainObject(prop)) {
        filtered = Object.assign({}, prop);
    } else {
        filtered = prop;
        filter = [];
    }

    if (length(filter) !== 0) {
        filter = filter.filter(f1 => length(f1) !== 0).map(f2 => f2.toLowerCase());
        (true === Array.isArray(prop) ? prop : Object.keys(prop)).forEach(k => {
            if (false === has(k.toLowerCase(), filter)) {
                true === Array.isArray(prop) ? (
                    filtered.splice(filtered.indexOf(k.toLowerCase()), 1)
                ) : delete filtered[k];
            }
        });
    }

    __store.push({
        prefix,
        content: filtered
    });

}

/**
 * Get from store
 * @param {prefix}
 * @returns {Array}
 */
export const getFromStore = prefix => prefix ? (
    __store.filter(s => s.prefix === prefix).map(s => s.content).filter(r => length(r))
) : __store
