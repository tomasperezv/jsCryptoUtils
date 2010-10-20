/**
 * @package    cryptoUtils
 * @module     base64
 * @author     tom@0x101.com
 * @version    0.01
 */

/**
 * @class xor
 */
var xor = {
    
    ENCODE_BLOCKS_SIZE : 1,
    
    /**
     * @param {string} inputText
     * @param {string} key
     * @return {string}
     */    
    encode: function (inputText, key) {
	
	var outputText = '';
	
	    if (typeof(inputText) === 'string') {
		// init the stringBlocksIterator
		inputIterator = new StringBlocksIterator;
		inputIterator.init(inputText, this.ENCODE_BLOCKS_SIZE);
		
		keyIterator = new StringBlocksIterator;
		keyIterator.init(key, this.ENCODE_BLOCKS_SIZE);
		
		var subdata = null;
		while ((subdata = inputIterator.current())) {
		    var x = subdata.charCodeAt(0);
		    
		    // If are at the end of the key, then go to the
		    // begin.
		    if(keyIterator.current() === null) {
			keyIterator.reset();
		    }
		    
		    var y = keyIterator.current().charCodeAt(0);
		    
		    // Apply the xor operation.
		    var result = x ^ y;
		    outputText += String.fromCharCode(result);
		    
		    cryptoConsole.logArrayAsBin([x, y, result], 'input, output, result');
		    
		    inputIterator.next();
		    keyIterator.next();
		}
		   
	    }
	    
	    return outputText;
	}
}

