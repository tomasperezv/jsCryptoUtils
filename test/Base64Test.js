/**
 * Unit testing for Base64 implementation. Based on yui 3, js unit testing FW. 
 *
 * @package    cryptoUtils
 * @module     test.base64
 * @author     tom@0x101.com
 * @see http://developer.yahoo.com/yui/3/test
 */
YUI().use('test', function (Y) {

	// Initialize the namespace
	Y.namespace("cryptoUtils.test");

	/**
	 * Implementation of the case test for base64 algorithm.
	 * @author tom@0x101.com 
	 */
	Y.cryptoUtils.test.base64Test = new Y.Test.Case({
	
		name: "Test Base64 Algorithm",
		
		setUp : function () {
		    this.data = { 
				input : "Base 64 encoding",
				// TODO: Merge the input for special chars with the normal input when the implementation is fixed.
				specialCharsInput : "áéíóúñ",
				output : "qMfZzsa2ncbLBMnVzgLUzYaG"
			};
			this.base64 = new Base64();
		},
		
		tearDown : function () {
		    delete this.data;
		},
		
		testEncode: function () {
		    Y.Assert.areEqual(this.base64.encode(this.data.input), this.data.output);
		},

		testDecode: function () {
		    Y.Assert.areEqual(this.base64.decode(this.data.output), this.data.input);
		},

		/**
		 * TODO: This needs to be fixed. 
		 * @author tom@0x101.com 
		 */
		testSpecialCharacters: function () {
		    Y.Assert.areEqual(this.base64.encode(this.data.specialCharsInput), this.data.output);
		},

	});

	// TODO: The suite generation and the run of the tests will be moved from here.
	// Create a test suite.
	Y.cryptoUtils.test.AlgorithmsSuite = new Y.Test.Suite("Test the implementation of the algorithms.");
	Y.cryptoUtils.test.AlgorithmsSuite.add(Y.cryptoUtils.test.base64Test);

	// Prepare and run the tests suite
	Y.Test.Runner.add(Y.cryptoUtils.test.AlgorithmsSuite);
	Y.Test.Runner.run();

});

