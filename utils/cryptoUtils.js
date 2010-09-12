/**
 * @package    cryptoUtils
 * @module     utils.main
 * @author     tom@0x101.com
 * @version    0.01
 */

var cryptoUtils = {

	FIX_STRING_PREFIX: ' ',

	_addExtraChars: function(str, extraChars) {
		for(var i=0;i<extraChars;i++) {
			str += this.FIX_STRING_PREFIX;
		}
		return str;
	},

	/**
	 * @param {string} str
	 * @param {int} blocksSize
	 * @return {string}
	 */
	fixStringLength: function(str, blocksSize) {
		var output = '';
		if(typeof(str) === 'string') {
			output = str;
			var strLen = str.length;
			var mod = (strLen % blocksSize);
			var div = Math.floor(strLen / blocksSize);
			if(mod != 0) {
				var extraChars = (blocksSize*(div+1))-strLen;
				output = this._addExtraChars(str, extraChars); 
			}
		}
		return output;
	}
}
