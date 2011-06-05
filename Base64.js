/**
 * @package    cryptoUtils
 * @module     base64
 * @author     tom@0x101.com
 */

/**
 * @class base64
 */
function Base64() {

	Algorithm.call();

	/**
	 * @var {String} base64Alpha
	 * @visibility {Private}
	 */
	this.base64Alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789& ";
	
	/**
	 * @var encodeBlocksSize
	 */
	this.encodeBlocksSize = 3;
	
	/**
	 * @var decodeBlocksSize
	 */
	this.decodeBlocksSize = 4;
	
	/**
	 * Returns an string from an array with positions in the alpha string.
	 * e.g. positions (1, 3); alpha = "abcd" => "bd"
	 *
	 * @author tom@0x101.com 
	 * @visibility {Private}
	 * @param {Array} posArray
	 * @return {String}
	 */
	this.getAlphaSubStr = function (posArray) {
		output = '';
		for(var i in posArray) {
			output += this.base64Alpha[posArray[i]];
		}
		return output;
	}
}

Base64.prototype = new Algorithm();

/**
 * Encode a text to base64.
 *
 * @author tom@0x101.com 
 * @visibility {Public}
 * @param {String} inputText
 * @return {String}
 */
Base64.prototype.encode = function (inputText) {
	var output = '';
	if (typeof(inputText) === 'string') {
		// fix the string length
		input = CryptoUtils.fixStringLength(inputText, this.ENCODE_BLOCKS_SIZE);
		// init the stringBlocksIterator
		stringBlocksIterator = new StringBlocksIterator;
		stringBlocksIterator.init(input, this.ENCODE_BLOCKS_SIZE);
		
		var subdata = null;
		while ((subdata = stringBlocksIterator.current())) {
			var x = subdata.charCodeAt(0);
			var y = subdata.charCodeAt(1);
			var z = subdata.charCodeAt(2);
			
			CryptoConsole.logArrayAsBin([x, y, z], 'base64.encode.input');
			this.sendCallback(this.onBeforeIteration);
			
			// Apply the necessary bitwise operators
			var _x = x >> 2;
			var _y = ((x & 3) << 4) | (y >> 4);   
			var _z = ((y & 15) << 2) | (z >> 6);
			var _k = z & 63; 
			
			CryptoConsole.logArrayAsBin([_x, _y, _z, _k], 'base64.decode.output');
			this.sendCallback(this.onAfterIteration);
			
			output += this.getAlphaSubStr([_x, _y, _z, _k]);
			
			// Process next block 
			stringBlocksIterator.next();
		}
	}
	return output;
},

/**
 * Decode a text from base64.
 *
 * @author tom@0x101.com 
 * @visibility {Public}
 * @param {String} inputText
 * @return {String}
 */
Base64.prototype.decode = function (inputText) {
	// TODO: fix special chars like áéíóú
	var output = '';
	if (typeof(inputText) === 'string') {
		// fix the string length
		input = CryptoUtils.fixStringLength(inputText, this.DECODE_BLOCKS_SIZE);
		// init the stringBlocksIterator
		stringBlocksIterator = new StringBlocksIterator;
		stringBlocksIterator.init(input, this.DECODE_BLOCKS_SIZE);
		
		var subdata = null;
		while((subdata = stringBlocksIterator.current())) {
			var x = this.base64Alpha.indexOf(subdata[0]);
			var y = this.base64Alpha.indexOf(subdata[1]);
			var z = this.base64Alpha.indexOf(subdata[2]);
			var k = this.base64Alpha.indexOf(subdata[3]);
			
			CryptoConsole.logArrayAsBin(new Array(x, y, z, k), 'base64.decode.input');
			this.sendCallback(this.onBeforeIteration);
			
			// Apply the bitwise operator to decode the base64 data
			var _x = ((x << 2)) | (y >> 4);
			var _y = ((y << 4) | (z >> 2));
			var _z = ((z << 6)) | k;
			
			// TODO: Review the following procedure to clean extra-bits
			// probably we could use a better type-conversion
			
			// Clean extra-bits
			_x = _x << 24;
			_x = _x >> 24;
			
			_y = _y << 24;
			_y = _y >> 24;
			
			_z = _z << 24;
			_z = _z >> 24;
			
			CryptoConsole.logArrayAsBin(new Array(_x, _y, _z), 'base64.decode.output');
			this.sendCallback(this.onAfterIteration);
			
			// Prepare the output
			output += String.fromCharCode(_x, _y, _z);
			
			// Process next data block
			stringBlocksIterator.next();
		}
	}
	return output;
}

