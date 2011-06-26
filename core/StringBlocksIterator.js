/**
 * @package    cryptoUtils
 * @module     utils.stringBlocksIterator
 * @author     tom@0x101.com
 */

var StringBlocksIterator = function() {

	/**
	 * Private members
	 */
	var _str = null;
	var _blocksSize = 0;
	var _pos = 0;
	var _len = 0;

	return {
		/**
		 * @param {string} str
		 * @param {int} blocksSize
		 * @return void
		 */
		init: function(str, blocksSize) {
		    // init the internal vars
		    _str = str;
		    _blocksSize = blocksSize;
		    // set the pos pointer to the initial position
		    _pos = 0;
		    // we only need to calculate the string length once
		    _len = _str.length;
		},
		
		/**
		 * @return void
		 */
		reset: function() {
		    _pos = 0;
		},

		/**
		 * @return {string|null}
		 */
		current: function() {
		    var output = null;
		    if(this._validPos()) {
			    output = _str.substr(_pos, _blocksSize);
		    }
		    return output;
		},

		/**
		 * @return {string|null}
		 */
		next: function() {
			var output = null;
		    if(this._hasNext()) {
				// modify the pointer
				_pos += _blocksSize;
				output = this.current();
		    } else {
				_pos = -1;
		    }
		    return output;
		},

		/**
		 * @return {string|null}
		 */
		prev: function() {
			var output = null;
			if(this._hasPrev()) {
				// modify the pointer
			    _pos -= _blocksSize;
			    output = this.current();
		    } else {
				 _pos = -1;
		    }
			return output;
		},

		_validPos: function() {
			return (_pos>=0);
		},

		_hasNext: function() {
		    var hasNext = false;
		    if(this._validPos()) {
			    hasNext = (_pos+_blocksSize)<=_len;
		    }
		    return hasNext;
		},

		_hasPrev: function() {
		    var hasPrev = false;
		    if(this._validPos()) {
			    hasPrev = (_pos-_blocksSize)>0;
		    }
		    return hasPrev;
		}
	};
};

