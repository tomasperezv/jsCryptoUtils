/**
 * Unit testing for Base64 implementation. Based on yui 3, js unit testing FW. 
 *
 * @package    cryptoUtils
 * @module     test.base64
 * @author     tom@0x101.com
 * @see http://developer.yahoo.com/yui/3/test
 */
YUI.add('jscu-test', function(Y) {

	YUI().use("test", function (Y) {
	
		// Alias for the test suite manager
		//var testSuiteManager = Y.cryptoUtils.testSuiteManager;
	
		/**
		 * Implementation of the case test for base64 algorithm.
		 * @author tom@0x101.com 
		 */
		var base64Test = new Y.Test.Case({
		
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
			}
	
		});
	
		// Add the test case to the algorithms suite
		TestSuiteManager.addTestCase(TestSuiteManager.ALGORITHMS, base64Test, Y.Test.Suite);

	});
});

