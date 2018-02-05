import _ from './lodash'

// ***************************** CAUTION ***************************** //
// * Settings might be exported to the client through webpack builds * //
// *** IF SO, DO NOT DECLARE OR ASSIGN PRIVATE KEYS ON CLIENT SIDE *** //
// ***************************** CAUTION ***************************** //

/**
 * Show warning if a key is undefined on "get" method call
 * @returns {boolean}
 */
let __warnOnUndefinedKey = true;

/**
 * BASE SETTINGS
 * MUST NOT BE EDITED - See "appSettings" key below
 * @returns {Object}
 */
const BASE_SETTINGS = Object.freeze({
    users: {
        roles: {}
    }
})

/**
 * App settings
 * @returns {Object}
 */
let appSettings = Object.assign({}, BASE_SETTINGS)

/**
 * Assign / extend current settings
 * @param {Object} settings
 * @returns {Object}
 */
const assign = (settings = {}) => _.merge(appSettings, settings)

/**
 * Get setting by key
 * @param {string} key 
 * @param {mixed} [defaultValue]
 * @returns {mixed}
 */
const get = (key, defaultValue) => {

    const value = _.get(appSettings, key, defaultValue);

    if (undefined === value &&
        true === __warnOnUndefinedKey) {
        console.warn(`get :: Warning, "${key}" is undefined.`);
    }

    return value;

}

/**
 * Warn on undefined key on "get" method call
 * @param {boolean} warn 
 */
const warnOnUndefinedKey = warn => {
    __warnOnUndefinedKey = !!warn;
}

export { assign, get, warnOnUndefinedKey }
export default appSettings
