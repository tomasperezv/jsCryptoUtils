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
	}
}
