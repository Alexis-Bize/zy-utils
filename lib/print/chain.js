import print from './'

export default class ChainPrint
{
    /**
     * Prefixed key separator
     * @returns {string}
     */
    static prefixedKeySep = '-'
    
    /**
     * Default print color
     * @returns {string}
     */
    static defaultPrintColor = 'yellow'

    /**
     * Default callback color
     * @returns {string}
     */
    static defaultCallbackColor = 'green'

    /**
     * Default callback properties
     * @returns {Object}
     */
    static defaultCallbackProperties = Object.freeze({
        key: '',
        message: '',
        color: ChainPrint.defaultCallbackColor
    })
    
    /**
     * ChainPrint constructor
     * @param {string} prefix 
     * @param {boolean} [braceWrapping]
     */
    constructor(prefix, braceWrapping = true) {

        this.prefix = prefix.toUpperCase();
        this.braceWrapping = !!braceWrapping;

        this.key = '';
        this.message = '';
        this.color = ChainPrint.defaultPrintColor
        this.callbackInfo = Object.assign({}, ChainPrint.defaultCallbackProperties);

    }

    /**
     * Get prefixed key
     * @returns {string}
     */
    get prefixedKey() {

        const output = length(this.getKey()) ? [
            this.getPrefix(), this.getKey()
        ].join(` ${ChainPrint.prefixedKeySep} `) : this.getPrefix();

        return this.useBraceWrapping() ? (
            `[${output}]`
        ) : output;

    }

    /**
     * Set key
     * @param {string} key
     * @returns {Object}
     */
    setKey = (key = '') => {
        this.key = key.toUpperCase();
        return this;
    }

    /**
     * Set base message
     * @param {string} message
     * @returns {Object}
     */
    setBaseMessage = (message = '') => {
        this.message = message;
        return this;
    }

    /**
     * Set base color
     * @param {string} color
     * @returns {Object}
     */
    setBaseColor = (color = '') => {
        this.color = color;
        return this;
    }

    /**
     * Set callback info
     * @param {Object} properties
     * @returns {Object}
     */
    setCallbackInfo = properties => {
        Object.assign(this.callbackInfo, properties);
        return this;
    }

    /**
     * Get prefix
     * @param {boolean} braceWrapping
     * @returns {string}
     */
    getPrefix = (braceWrapping = false) => {
        if (true === braceWrapping) return `[${this.prefix}]`
        return this.prefix;
    }

    /**
     * Get key
     * @returns {string}
     */
    getKey = () => this.key

    /**
     * Get message
     * @returns {string}
     */
    getBaseMessage = () => this.message

    /**
     * Get color
     * @returns {string}
     */
    getBaseColor = () => this.color

    /**
     * Get print properties
     * @returns {Array}
     */
    getPrintProperties = () => [
        this.prefixedKey,
        this.getBaseMessage(),
        this.getBaseColor()
    ]

    /**
     * Get callback info
     * @returns {Array}
     */
    getCallbackInfo = () => [
        this.callbackInfo.key || this.prefixedKey,
        this.callbackInfo.message || '',
        this.callbackInfo.color || ChainPrint.defaultCallbackColor
    ]

    /**
     * Use brace wrapping
     * @returns {boolean}
     */
    useBraceWrapping = () => this.braceWrapping

    /**
     * Print
     * @param {string|Function} [key]
     * @param {Function|null} [cb]
     * @returns {Function}
     */
    print = async (key = '', cb = null) => {

        if (typeof key === 'string') this.setKey(key);
        else cb = typeof key === 'function' ? key : null;

        print(...this.getPrintProperties());

        return null === cb ? true : await cb().then(() => {
            print(...this.getCallbackInfo());
        });

    }
}
