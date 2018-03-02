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
 * Is development
 * @returns {boolean}
 */
export const isDevelopment = () => (
    'development' === CURRENT_ENV
)

/**
 * Is staging
 * @returns {boolean}
 */
export const isStaging = () => (
    'staging' === CURRENT_ENV
)

/**
 * Is development
 * @returns {boolean}
 */
export const isProduction = () => (
    'production' === CURRENT_ENV
)

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
