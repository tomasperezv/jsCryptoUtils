/**
 * @package    cryptoUtils
 * @module     test.TestSuiteManager
 * @author     tom@0x101.com
 */

/**
 * @class TestSuiteManager
 */
 var TestSuiteManager = {

	/**
	 * @const ALGORITHMS
	 */
	ALGORITHMS: 0,

	/**
	 * @const CORE
	 */
	CORE: 1,

	/**
	 * Used by runAllSuites, to know what suites do we want to execute.
	 * @var activeSuites
	 */
	activeSuites: [this.ALGORITHMS], 

	/**
	 * @var suites
	 */
	suites: [],

	/**
	 * @param {Integer} suiteId
	 * @param {Object} testCase
	 * @param {Object} testSuiteClass
	 */
	addTestCase: function(suiteId, testCase, testSuiteClass) {
		if (typeof this.suites[suiteId] === 'undefined') {
			// Create the test suite
			this.suites[suiteId] = new testSuiteClass;
		}
		this.suites[suiteId].add(testCase);
	}, 

	/**
	 * @return {Boolean} true if there is at least one suite to execute
	 */
	prepareAllSuites: function(testRunner) {

		// Only run suites if there is at least one valid
		var runSuites = false;

		for (var suiteId in this.activeSuites) {
			if (typeof this.suites[suiteId] !== 'undefined') {
				testRunner.add(this.suites[suiteId].items[0]);
				runSuites = true;
			}
		}
		return runSuites;
	},

	runAllSuites: function(testRunner) {
		if (this.prepareAllSuites(testRunner)) {
			testRunner.run();
		}
	}
};

