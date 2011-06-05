/**
 * @package    cryptoUtils
 * @module     Xor
 * @author     tom@0x101.com
 */

/**
 * @class xor
 */
function Xor() {
	Algorithm.call();
}

Xor.prototype = new Algorithm();

/**
 * Apply a basic XOR encoding to a string. 
 * 
 * @author tom@0x101.com 
 * @visibility {Public}
 * @param {String} inputText
 * @param {String} key
 * @return {String}
 */    
Xor.prototype.encode = function (inputText, key) {

	var outputText = '';

	if (typeof(inputText) === 'string') {
		// init the stringBlocksIterator
		inputIterator = new StringBlocksIterator;
		inputIterator.init(inputText, this.encodeBlocksSize);
		
		keyIterator = new StringBlocksIterator;
		keyIterator.init(key, this.encodeBlocksSize);
		
		var subdata = null;
		while ((subdata = inputIterator.current())) {
			var x = subdata.charCodeAt(0);
			
			// If we are at the end of the key, then move to the
			// begin.
			if(keyIterator.current() === null) {
				keyIterator.reset();
			}
			
			var y = keyIterator.current().charCodeAt(0);
			
			// Apply the xor operation.
			var result = x ^ y;
			
			// Store the result in the output string
			outputText += String.fromCharCode(result);
			
			CryptoConsole.logArrayAsBin([x, y, result], 'input, output, result');
			this.sendCallback(this.onAfterIteration);
			
			inputIterator.next();
			keyIterator.next();
		}
    }
    
    return outputText;
}

