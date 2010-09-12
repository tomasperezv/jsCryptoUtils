var myBase64 = {

	/*
	 * @var _alpha
	 */
	_base64Alpha: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789& ",
	
	/*
	 * @const ENCODE_BLOCKS_SIZE
	 */
	ENCODE_BLOCKS_SIZE: 3,
	
	
	/*
	 * @const DECODE_BLOCKS_SIZE
	 */
	DECODE_BLOCKS_SIZE: 4,
	
	/*
	 * @param string inputText
	 * @return string
	 */
	encode: function(inputText) {
		var output = '';
		if(typeof(inputText)==='string') {
			// fix the string length
			input = cryptoUtils.fixStringLength(inputText, this.ENCODE_BLOCKS_SIZE);
			// init the stringBlocksIterator
			stringBlocksIterator.init(input, this.ENCODE_BLOCKS_SIZE);
			while((subdata = stringBlocksIterator.current())) {
				var x = subdata.charCodeAt(0);
				var y = subdata.charCodeAt(1);
				var z = subdata.charCodeAt(2);
				
				// Apply the necessary bitwise operators
				var _x = x >> 2;
				var _y = ((x & 3) << 4) | (y >> 4);   
				var _z = ((y & 15) << 2) | (z >> 6);
				var _k = z & 63; 

				output += this._getAlphaSubStr(new Array(_x, _y, _z, _k));

				// Process next block 
				stringBlocksIterator.next();
			}
		}
		return output;
	},

	/*
	 * @param string inputText
	 * @return string
	 */
	decode: function(inputText) {
	},
	
	_getAlphaSubStr: function(posArray) {
		output = '';
		for(var i in posArray) {
			output += this._base64Alpha[posArray[i]];
		}
		return output;
	}
}
