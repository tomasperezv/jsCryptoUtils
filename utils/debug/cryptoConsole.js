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
var cryptoConsole = {
    
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
     * @param {string|object} input
     * @param {int} logLevel
     */
    log: function(input, logLevel) {
	if (typeof logLevel === 'undefined') {
	   var logLevel = this.LOG_LEVEL_DEBUG; 
	}
	this._consoleLog(input, logLevel);
    },
    
    /**
     * @param {object} input
     */
    info: function(input) {
	this._consoleLog(input, this.LOG_LEVEL_INFO);
    },
    
    
    /**
     * @param {int} input
     */
    toBinaryString: function(input) {
	return this.toBaseX(input, this.BASE_BIN);
    },
    
    /**
     * @param {int} input
     */
    toHexString: function(input) {
	return this.toBaseX(input, this.BASE_HEX);
    },
    
    /**
     * @param {int} input
     * @param {int} base
     */
    toBaseX: function(input, base) {
	input = parseInt(input);
	var inputAsBaseX = input.toString(base);
	
	return inputAsBaseX;	
    },

    /**
     * @param {Array} arrayInput
     * @param {string} description
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
     * @param {Array} arrayInput
     * @param {string} description
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
     * @param {string|object} input
     * @param {int} logLevel
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
     * @return {boolean} Check if the console object is present.
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
     * @return {boolean} Check if the debug mode is enabled.
     */
    _isDebugEnabled: function() {
	return this._enabled;
    },
    
    enableDebug: function() {
	this._enabled = true;
    },
    
    disableDebug: function() {
	this._enabled = false;
    }
}
