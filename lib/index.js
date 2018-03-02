import _ from './lodash'
import { v1, v4 } from 'uuid'

/**
 * Generate an UUID
 * @param {string} version 
 * @returns {string}
 */
export const uuid = version => Number(version) === 1 || version === 'v1' ? v1() : v4();

/**
 * Does input has required value
 * @param {string} input
 * @param {mixed} target
 * @returns {boolean}
 */
export const has = (input, target) => {

    if (typeof target === 'string') {
        return !!(input && input.indexOf(target) !== -1);
    } else if (Array.isArray(target)) {
        return target.indexOf(input) !== -1;
    } else if (_.isPlainObject(target)) {
        return Object.values(target).findIndex(v => v === input) !== -1;
    } else return false;

}

/**
 * Get input length
 * @param {mixed} input 
 * @returns {number}
 */
export const length = input => (
    _.isPlainObject(input) ? Object.keys(input).length : (
        !!input ? input.length : 0
    )
)

/**
 * Get all values (deep) from a defined object
 * @param {Object} target
 * @returns {Array}
 */
export const getObjValues = (target = {}) => {

    let values = [];

    Object.values(target).forEach(v => {

        if (false === _.isPlainObject(v)) {
            values.push(v);
        } else getObjValues(v).forEach(dv => {
            values.push(dv);
        });

    });

    return values;

}

/**
 * Converts array to Object
 * @param {Array} arr 
 * @returns {Object}
 */
export const toObject = (arr = []) => arr.reduce((result, item) => {
    let key = Object.keys(item)[0];
    result[key] = item[key];
    return result;
}, {});

/**
 * Clone
 * @param {Object|Array} target
 * @returns {mixed}
 */
export const clone = target => {

    if (false === _.isPlainObject(target) && false === Array.isArray(target)) {
        console.warn('clone :: Can not clone specified properties');
        return;
    }

    if (true === Array.isArray(target)) {
        return target.slice(0);
    } else if (_.isPlainObject(target)) {
        return Object.assign({}, target);
    } return null;

}

/**
 * Merge two properties
 * @param {mixed} base
 * @param {mixed} target
 * @returns {mixed}
 */
export const merge = (base = null, target = null) => {

    if (null === base && null === target) {
        console.warn('merge :: Can not merge two "null" properties');
        return;
    }

    let tb = typeof base;
    let te = typeof target;
    
    if (tb === 'object' && false === _.isPlainObject(base)) {
        tb = null === base ? 'object:null' : 'object:array';
    }

    if (tb === 'object' && false === _.isPlainObject(target)) {
        te = null === target ? 'object:null' : 'object:array';
    }

    if (tb !== te) {
        console.warn('merge :: Can not merge two properties with different types');
        return;
    }

    if (true === Array.isArray(base)) {
        return base.concat(entry);
    } else if (true === _.isPlainObject(base)) {
        return _.merge(base, target);
    } else return base + target;

}

/**
 * Cast
 * @param {string} type 
 * @param {mixed} value 
 */
export const cast = (type, value) => {

    switch (type)
    {
        case 'boolean':
        case 'bool':
            if (value === 'true') value = true;
            else if (value === 1) value = true;
            else if (value === '1') value = true;
            else if (value === 'false') value = false;
            else if (value === 0) value = false;
            else if (value === '0') value = false;
            else value = !!value;
            break;

        case 'string':
        case 'str':
            value = String(value || '');
            break;

        case 'int':
        case 'integer':
        case 'number':
            value = Number(value || '');
            if (isNaN(value)) value = 0;
            break;
    }

    return value;

}
