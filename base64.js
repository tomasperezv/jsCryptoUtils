/**
 * @package    cryptoUtils
 * @module     base64
 * @author     tom@0x101.com
 * @version    0.01
 */

/**
 * @class base64
 */
var base64 = {

	/**
	 * @var _base64Alpha
	 */
	_base64Alpha: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789& ",
	
	/**
	 * @const ENCODE_BLOCKS_SIZE
	 */
	ENCODE_BLOCKS_SIZE: 3,
	
	
	/**
	 * @const DECODE_BLOCKS_SIZE
	 */
	DECODE_BLOCKS_SIZE: 4,
	
	/**
	 * @param {string} inputText
	 * @return {string}
	 */
	encode: function (inputText) {
	    var output = '';
	    if (typeof(inputText) === 'string') {
			// fix the string length
			input = cryptoUtils.fixStringLength(inputText, this.ENCODE_BLOCKS_SIZE);
			// init the stringBlocksIterator
			stringBlocksIterator = new StringBlocksIterator;
			stringBlocksIterator.init(input, this.ENCODE_BLOCKS_SIZE);
			
			var subdata = null;
			while ((subdata = stringBlocksIterator.current())) {
			    var x = subdata.charCodeAt(0);
			    var y = subdata.charCodeAt(1);
			    var z = subdata.charCodeAt(2);
			    
			    cryptoConsole.logArrayAsBin([x, y, z], 'base64.encode.input');
	
			    // Apply the necessary bitwise operators
			    var _x = x >> 2;
			    var _y = ((x & 3) << 4) | (y >> 4);   
			    var _z = ((y & 15) << 2) | (z >> 6);
	            var _k = z & 63; 
	
				cryptoConsole.logArrayAsBin([_x, _y, _z, _k], 'base64.decode.output');
	
			    output += this._getAlphaSubStr([_x, _y, _z, _k]);
	
			    // Process next block 
			    stringBlocksIterator.next();
			}
	    }
	    return output;
	},

	/**
	 * @param {string} inputText
	 * @return {string}
	 */
	decode: function (inputText) {
	    // TODO: fix special chars like áéíóú
	    var output = '';
        if (typeof(inputText) === 'string') {
			// fix the string length
			input = cryptoUtils.fixStringLength(inputText, this.DECODE_BLOCKS_SIZE);
			// init the stringBlocksIterator
			stringBlocksIterator = new StringBlocksIterator;
			stringBlocksIterator.init(input, this.DECODE_BLOCKS_SIZE);
		
			var subdata = null;
			while((subdata = stringBlocksIterator.current())) {
				var x = this._base64Alpha.indexOf(subdata[0]);
			    var y = this._base64Alpha.indexOf(subdata[1]);
			    var z = this._base64Alpha.indexOf(subdata[2]);
			    var k = this._base64Alpha.indexOf(subdata[3]);
			    
			    cryptoConsole.logArrayAsBin(new Array(x, y, z, k), 'base64.decode.input');
			    
			    // Apply the bitwise operator to decode the base64 data
			    var _x = ((x << 2)) | (y >> 4);
			    var _y = ((y << 4) | (z >> 2));
			    var _z = ((z << 6)) | k;
			    
			    // TODO: Review the next method to clean extra-bits
			    // probably we can use a better type-conversion
		    
			    // Clean extra-bits
			    _x = _x << 24;
			    _x = _x >> 24;
			    
			    _y = _y << 24;
			    _y = _y >> 24;
			   
			    _z = _z << 24;
			    _z = _z >> 24;

			    cryptoConsole.logArrayAsBin(new Array(_x, _y, _z), 'base64.decode.output');
			    
			    // Prepare the output
			    output += String.fromCharCode(_x, _y, _z);
			    
			    // Process next data block
			    stringBlocksIterator.next();
			}
	    }
        return output;
	},
	
	_getAlphaSubStr: function (posArray) {
		output = '';
		for(var i in posArray) {
			output += this._base64Alpha[posArray[i]];
		}
		return output;
	}
}
