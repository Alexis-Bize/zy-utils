import _ from './lodash'

/**
 * Default environment
 * @returns {string}
 */
export const DEFAULT_ENV = 'development'

/**
 * Current environment
 * @returns {string}
 */
export const CURRENT_ENV = process.env.NODE_ENV || DEFAULT_ENV

/**
 * Is specified env
 * @param {string} env
 */
export const isEnv = env => (
    env === CURRENT_ENV
)

/**
 * Is development
 * @returns {boolean}
 */
export const isDevelopment = () => isEnv('development');

/**
 * Is staging
 * @returns {boolean}
 */
export const isStaging = () => isEnv('staging');

/**
 * Is development
 * @returns {boolean}
 */
export const isProduction = () => isEnv('production');

/**
 * Is test
 * @returns {boolean}
 */
export const isTest = () => isEnv('test');

/**
 * Is browser
 * @returns {boolean}
 */
export const isBrowser = () => (
    typeof window !== 'undefined' &&
    typeof _.get(window, 'document.createElement') === 'function'
)

/**
 * Is server
 * @returns {boolean}
 */
export const isServer = () => (
    false === isBrowser()
)
