/**
 * @package    cryptoUtils.utils.debug
 * @module     cryptoConsole
 * @author     tom@0x101.com
 * @version    0.01
 */

/**
 * @class cryptoConsole
 * @see http://getfirebug.com/wiki/index.php/Console_API
 */
var CryptoConsole = {
    
    /**
     * @const LOG_LEVEL_DEBUG
     */
    LOG_LEVEL_DEBUG : 0,
    
    /**
     * @const LOG_LEVEL_INFO
     */
    LOG_LEVEL_INFO : 1,
    
    /**
     * @const LOG_LEVEL_WARN
     */
    LOG_LEVEL_WARN : 2,

    /**
     * @const LOG_LEVEL_ERROR
     */
    LOG_LEVEL_ERROR : 3,
    
    /**
     * @const BASE_BIN
     */
    BASE_BIN: 2,

    /**
     * @const BASE_HEX
     */
    BASE_HEX: 16,

    /**
	 * Log a text/object in the console with an optional error level(DEBUG) as
	 * default.
	 * 
	 * @author tom@0x101.com 
	 * @visibility {Public}
     * @param {String|Object} input
     * @param {Integer} logLevel
	 * @return void
     */
    log: function(input, logLevel) {
		if (typeof logLevel === 'undefined') {
			var logLevel = this.LOG_LEVEL_DEBUG; 
		}
		this._consoleLog(input, logLevel);
    },
    
    /**
	 * Log a text/object in the console in the info error level.
	 *
	 * @author tom@0x101.com 
	 * @visibility {Public}
     * @param {object} input
	 * @return void
     */
    info: function(input) {
		this._consoleLog(input, this.LOG_LEVEL_INFO);
    },
    
    /**
	 * Convert a number to a string with its numeric representation in binary. 
	 *
	 * @author tom@0x101.com 
	 * @visibility {Public}
     * @param {Integer} input
	 * @return {String}
     */
    toBinaryString: function(input) {
		return this.toBaseX(input, this.BASE_BIN);
    },
    
    /**
	 * Convert a number to a string with its numeric representation in hex base. 
	 *
	 * @author tom@0x101.com 
	 * @visibility {Public}
     * @param {Integer} input
	 * @return {String}
     */
    toHexString: function(input) {
		return this.toBaseX(input, this.BASE_HEX);
    },
    
    /**
	 * Convert a number to a string with its numeric representation in a custom
	 * numeric base(Binary as default). 
	 *
	 * @author tom@0x101.com 
	 * @visibility {Public}
     * @param {Integer} input
     * @param {Integer} base
	 * @return {String}
     */
    toBaseX: function(input, base) {
		if (typeof base === 'undefined') {
			var base = this.BASE_BIN; 
		}
		input = parseInt(input);	
		var inputAsBaseX = input.toString(base);
		return inputAsBaseX;	
    },

    /**
	 * Log an array in the console in binary.
	 *
	 * @author tom@0x101.com 
	 * @visibility {Public}
     * @param {Array} arrayInput
     * @param {String} description
	 * @return void
     */
	logArrayAsBin: function(arrayInput, description) {
		var outputArray = new Array();
		for (var key in arrayInput) {
			var input = arrayInput[key];
			var inputAsBin = this.toBinaryString(input);
			outputArray[key] = inputAsBin;
		}
		this.logArray(outputArray, description);
     },

    /**
	 * Log an array in the console.
	 * 
	 * @author tom@0x101.com 
	 * @visibility {Public}
     * @param {Array} arrayInput
     * @param {String} description
	 * @return void
     */
     logArray: function(arrayInput, description) {
		var outputString = description + ' ';
		for (var key in arrayInput) {
			var input = arrayInput[key];
			outputString += ' ' + input;
		}
		this.log(outputString);
     },

    /**
	 * Log an input element(text/object) in the console in an specified warning
	 * level.
	 *
	 * @author tom@0x101.com 
	 * @visibility {Private}
     * @param {String|object} input
     * @param {Integer} logLevel
	 * @return void
     */
    _consoleLog: function(input, logLevel) {
		if ( this._isConsoleEnabled() && this._isDebugEnabled()) {
	    
		    if(typeof input === 'object') {
				logLevel = this.LOG_LEVEL_INFO;
			}
	    
			switch(logLevel) {
				default:
				case this.LOG_LEVEL_DEBUG: {
					console.debug(input);
					break;
				}
				case this.LOG_LEVEL_INFO: {
					console.info(input);
					break;
				}
				case this.LOG_LEVEL_WARN: {
					console.warn(input);
					break;
				}
				case this.LOG_LEVEL_ERROR: {
					console.error(input);
					break;
				}		
			}
		}
    },
    
    /**
	 * @author tom@0x101.com 
	 * @visibility {Private}
     * @return {Boolean} Check if the console object is present.
     */
    _isConsoleEnabled: function() {	
		/*
		 * The following solution is equivalent to:
		 *  
		 * typeof window.console !== 'undefined' && 
		 * typeof window.console.log !== 'undefined
		 */
		var consoleEnabled = ('console' in window && 'log' in window.console);
		return consoleEnabled;
    },
    
    /**
	 * @author tom@0x101.com 
	 * @visibility {Private}
     * @return {Boolean} Check if the debug mode is enabled.
     */
    _isDebugEnabled: function() {
		return this._enabled;
    },
   
	/**
	 * @author tom@0x101.com 
	 * @visibility {Public}
	 * @return void 
	 */
    enableDebug: function() {
		this._enabled = true;
    },
    
	/**
	 * @author tom@0x101.com 
	 * @visibility {Public}
	 * @return void 
	 */
    disableDebug: function() {
		this._enabled = false;
    }
}
