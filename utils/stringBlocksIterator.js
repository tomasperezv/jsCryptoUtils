var stringBlocksIterator = {

	_str: null,
	_blocksSize: 0,
	_pos: 0,
	_len: 0,

	/*
	 * @param string str
	 * @param int blockSize
	 * @return void
	 */
	init: function(str, blocksSize) {
		// init the internal vars
		this._str = str;
		this._blocksSize = blocksSize;
		// set the pos pointer to the initial position
		this._pos = 0;
		// we only need to calculate the string length once
		this._len = this._str.length;
	},

	_validPos: function() {
		return (this._pos>=0);
	},
	
	_hasNext: function() {
		var hasNext = false;
		if(this._validPos()) {
			hasNext = (this._pos+this._blocksSize)<=this._len;
		}
		return hasNext;
	},

	_hasPrev: function() {
		var hasPrev = false;
		if(this._validPos()) {
			hasPrev = (this._pos-this._blocksSize)>0;
		}
		return hasPrev;
	},

	/*
	 * @return string|null
	 */
	current: function() {
		var output = null;
		if(this._validPos()) {
			output = this._str.substr(this._pos, this._blocksSize);
		}
		return output;
	},
	
	/*
	 * @return string|null
	 */
	next: function() {
		var output = null;
		if(this._hasNext()) {
			// modify the pointer
			this._pos += this._blocksSize;
			output = this.current();
		} else {
			this._pos = -1;
		}
		return output;
	},

	/*
	 * @return string|null
	 */
	prev: function() {
		var output = null;
		if(this._hasPrev()) {
			// modify the pointer
			this._pos -= this._blocksSize;
			output = this.current();
		} else {
			this._pos = -1;
		}
		return output;
	}
}
