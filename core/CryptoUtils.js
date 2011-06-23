/**
 * @package    cryptoUtils
 * @module     utils.main
 * @author     tom@0x101.com
 * @version    0.01
 */

var CryptoUtils = {

	/**
	 * @const FIX_STRING_SUFFIX
	 */
	FIX_STRING_SUFFIX: ' ',

	/**
	 * Add n extra characters to a string.
	 *
	 * @author tom@0x101.com 
	 * @visibility {private}
	 * @param {String} str
	 * @param {Integer} numExtraChars
	 * @return {String}
	 */
	_addExtraChars: function(str, numExtraChars) {
		for (var i=0;i<numExtraChars;i++) {
			str += this.FIX_STRING_SUFFIX;
		}
		return str;
	},

	/**
	 * Fixes the length of a string adding extra characters to let process the
	 * string in blocks of 'blocksSize' length.
	 *
	 * @author tom@0x101.com 
	 * @visibility {public}
	 * @param {String} str
	 * @param {Integer} blocksSize
	 * @return {string}
	 */
	fixStringLength: function(str, blocksSize) {
		var output = '';
		if (typeof(str) === 'string') {
			output = str;
			var strLen = str.length;
			var mod = (strLen % blocksSize);
			var div = Math.floor(strLen / blocksSize);
			if (mod != 0) {
				var extraChars = (blocksSize*(div+1))-strLen;
				output = this._addExtraChars(str, extraChars); 
			}
		}
		return output;
	},

	/**
	 * Fast trim implementation
	 * @see http://blog.stevenlevithan.com/archives/faster-trim-javascript
	 *
	 * @author tom@0x101.com 
	 * @visibility {public}
	 * @param {String} str
	 * @return {string}
	 */
	trim: function(str) {
		var	str = str.replace(/^\s\s*/, ''),
			ws = /\s/,
			i = str.length;
		while (ws.test(str.charAt(--i)));
		return str.slice(0, i + 1);
	},
	
	/**
	 * Reverses an array, by creating a copy of it. Native implementation of
	 * reverse cannot be used, since this implementation modifies the original
	 * array.
	 *
	 * @author mjesun@hotmail.com
	 * @visibility {public}
	 * @param {Array} array
	 * @return {Array}
	 */
	reverse: function(array) {
		reversed = [];
		
		for (var i = array.length; i--; ) {
			reversed.push(array[i]);
		}
		
		return reversed;
	},
	
	/**
	 * Transform an integer number into a set of bytes representing it in
	 * memory, using little-endian codification. Result can be get in
	 * big-endian if reverse is set to true.
	 *
	 * @author mjesun@hotmail.com
	 * @visibility {public}
	 * @param {Number} num
	 * @param {Boolean} reverse
	 * @return {String}
	 */
	toBytes: function(num, reverse) {
		var bytes = [];
		var chr = String.fromCharCode;
		
		do {
			bytes.push(chr(num & 0xFF));
			num = Math.floor(num / 0x100);
		} while (num);
		
		return (reverse? this.reverse(bytes) : bytes).join('');
	},
		
	/**
	 * Given a set of bytes, it transforms it to a number, using little-endian
	 * order, or big-endian if reverse is set to true.
	 *
	 * @author mjesun@hotmail.com
	 * @visibility {public}
	 * @param {String} str
	 * @param {Boolean} reverse
	 * @return {Number}
	 */
	toNumber: function(str, reverse) {
		var number = 0;
		var length = str.length;
		
		if (reverse) {
			for (var i = 0; i < length; i++) {
				number = number << 8 | (0xFF & str.charCodeAt(i));
			}
		} else {
			for (var i = length; i >= 0; i--) {
				number = number << 8 | (0xFF & str.charCodeAt(i));	
			}
		}
		
		return number;
	},
	
	/**
	 * Transforms a stream of bytes into an array, where every position of the
	 * array holds the hexadecimal value of the corresponding byte.
	 *
	 * @author mjesun@hotmail.com
	 * @visibility {public}
	 * @param {String} str
	 * @return {Array}
	 */
	toHex: function(str) {
		var array = [];
		var length = str.length;
		
		for (i = 0; i < length; i++) {
			array[i] = str.charCodeAt(i).toString(16).toUpperCase();
		}
		
		return array;
	}
}
