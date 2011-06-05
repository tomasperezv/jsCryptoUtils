/**
 * @package    cryptoUtils
 * @module     core.Algorithm
 * @author     tom@0x101.com
 */

/**
 * It uses the constructor paradigm with an hybrid approach for inheritance.
 * @class Algorithm
 */
function Algorithm() {
	/**
	 * @const ABSTRACT_METHOD_MESSAGE 
	 */
	this.ABSTRACT_METHOD_MESSAGE = 'Method not implemented';

	/**
	 * @var {function} onBeforeIteration
	 *
	 * Callback for each iteration of the algorithm, before to apply it.
	 */
	this.onBeforeIteration = null;

	/**
	 * @var {function} onAfterIteration
	 *
	 * Callback for each iteration on the algorithm, after we apply it.
	 */
	this.onAfterIteration = null;

	/**
	 * @var encodeBlocksSize
	 *
	 * The length of the blocks that we get from the initial string, for
	 * encoding.
	 */
	this.encodeBlocksSize = 1;

	/**
	 * @var decodeBlocksSize
	 *
	 * The length of the blocks that we get from the initial string, for
	 * decoding.
	 */
	this.decodeBlocksSize = 1;

	this.setOnBeforeIteration = function(callback) {
		this.onBeforeIteration = callback;
	}
	
	this.setOnAfterIteration = function(callback) {
		this.onAfterIteration = callback;
	}

	this.sendCallback = function(callback) {
		if (typeof callback !== 'undefined' && typeof callback === 'function') {
			callback();
		}
	}
}

/**
 * Abstract methods 
 */
Algorithm.prototype.encode = function() {
	throw new Error(this.ABSTRACT_METHOD_MESSAGE);
}

Algorithm.prototype.decode = function() {
	throw new Error(this.ABSTRACT_METHOD_MESSAGE);
}

