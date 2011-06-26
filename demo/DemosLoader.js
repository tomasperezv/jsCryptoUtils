/**
 * @package    cryptoUtils
 * @module     demos
 * @author     tom@0x101.com
 * @version    0.01
 */

/**
 * Store the algorithms definition.
 */
var Algorithms = {

	/**
	 * Identifiers of the HTML elements
	 */
	ALG_NAME: 'alg_name',
	ALG_ENCODE: 'alg_func1',
	ALG_DECODE: 'alg_func2',
	ALG_INPUT: 'alg_input',
	ALG_INPUT_LABEL : 'alg_input_label',
	ALG_OUTPUT : 'alg_output',
	ALG_INPUT_TYPE_TEXTAREA : 'alg_input_textarea',
	ALG_INPUT_TYPE_SUBMIT : 'alg_input_submit',
	ALG_INPUT_NAME : 'alg_input_name',
	
	/*
	 * For every different algorithm we add here a new entry, with
	 * the name of the methods and the type of input.
	 */
	definitions: {
		'base64': {
			ALG_NAME : 'Base64',
			ALG_ENCODE : 'encode',
			ALG_DECODE : 'decode',
			ALG_INPUT: [
				{
					ALG_INPUT_NAME: 'text',		
					ALG_INPUT_LABEL: 'Input text',		
					ALG_INPUT_TYPE: 'textarea'
				}
			]
		},
	
		'basic xor': {
			ALG_NAME : 'Xor',
			ALG_ENCODE : 'encode',
			ALG_DECODE : 'encode',
			ALG_INPUT: [
				{
					ALG_INPUT_NAME: 'text',		
					ALG_INPUT_LABEL: 'Input text',		
					ALG_INPUT_TYPE: 'textarea'
				},
	
				{
					ALG_INPUT_NAME: 'key',
					ALG_INPUT_LABEL: 'key',		
					ALG_INPUT_TYPE: 'submit'
				}	
			]	
		}	
	}
};
	
/**
 * Generates dynamically a demo of the different algorithms. 
 */
DemosLoader = {
	
	MAIN_CONTENT_ID: 'demoContent',
	ALGORITHM_CONTENT_ID: 'algorithmContent',
	SELECT_ID: 'algorithmSelector',
	UNDEFINED_ALGORITHM: -1,
	
	_getAlgorithmSelected: function () {
		var algorithm = this.UNDEFINED_ALGORITHM;
		var algorithmSelect = document.getElementById(this.SELECT_ID);
		if (algorithmSelect!==null) {
			algorithm = algorithmSelect.value;
		}
		return algorithm;
	},
	
	init: function () {
		CryptoConsole.enableDebug();
		// display the algorithm selector
		var contentStr = htmlGenerator.generateSelect(this.SELECT_ID, Algorithms.definitions, [['onchange','DemosLoader.loadAlgorithm();']], [this.UNDEFINED_ALGORITHM, 'undefined algorithm']);
		htmlGenerator.inject(this.MAIN_CONTENT_ID, contentStr);
	},
	
	loadAlgorithm: function () {
	
		var algorithm = this._getAlgorithmSelected();
	
		if (algorithm !== this.UNDEFINED_ALGORITHM) {
			var algorithmContentHTML = '';
	
			if (typeof Algorithms.definitions[algorithm] !== 'undefined') {
	
				definition = Algorithms.definitions[algorithm];   
	
				algorithmContentHTML = '';
				algorithmContentHTML += definition.ALG_NAME;
	
				for(var inputPos in definition.ALG_INPUT) {
					var input = definition.ALG_INPUT[inputPos];
					algorithmContentHTML += htmlGenerator.generateDiv('', input.ALG_INPUT_LABEL); 
					
					switch(input.ALG_INPUT_TYPE) {
						case 'submit':
							algorithmContentHTML += htmlGenerator.genericTag('input', input.ALG_INPUT_NAME); 
							algorithmContentHTML += htmlGenerator.genericClosingTag('input');
							break;

						case 'textarea':
							algorithmContentHTML += htmlGenerator.generateTextarea(input.ALG_INPUT_NAME); 
							break;
					}
				}
	
				algorithmContentHTML += htmlGenerator.generateDiv('', htmlGenerator.generateTextarea(Algorithms.ALG_OUTPUT));
				algorithmContentHTML += htmlGenerator.genericTag('div');
				algorithmContentHTML += htmlGenerator.genericTag('input', '', [['type', 'button'], ['onclick', 'DemosLoader.encode();'], ['value', 'encode']]);
				algorithmContentHTML += htmlGenerator.genericTag('input', '', [['type','button'],['onclick','DemosLoader.decode();'],['value','decode']]);
	
				algorithmContentHTML += htmlGenerator.genericClosingTag('div');
	
			} else {
				CryptoConsole.log('undefined algorithm', cryptoConsole.LOG_LEVEL_ERROR);
			}
			
			htmlGenerator.inject(this.ALGORITHM_CONTENT_ID, algorithmContentHTML);
		}
	},
	
	encode: function() {
		this._runAlgorithm(true);
	},
	
	decode: function() {
		this._runAlgorithm(false);	
	},
	
	_runAlgorithm: function (encodeMode) {
	
		var algorithm = this._getAlgorithmSelected();
	
		if (algorithm !== this.UNDEFINED_ALGORITHM) {
	    
			if (typeof Algorithms.definitions[algorithm] !== 'undefined') {
				var definition = Algorithms.definitions[algorithm];

				var encodeIns = 'var algorithm = ';
				// Instantiate the algorithm
				encodeIns += 'new ' + definition.ALG_NAME + '()'; 
				eval(encodeIns);

				// Call to the method
				encodeIns = 'var output = algorithm.';
		
				if(encodeMode) {
				    encodeIns += definition.ALG_ENCODE +'(';
				} else {
				    encodeIns += definition.ALG_DECODE +'(';
				}
		
				var firstInput = true;
				for(var inputPos in definition.ALG_INPUT) {
		
					var inputId = definition.ALG_INPUT[inputPos].ALG_INPUT_NAME;
					var input = document.getElementById(inputId);
		
					if(!firstInput) {
						encodeIns += ', ';
					}
		
					encodeIns += '"' + input.value+ '"';
		
					firstInput = false;
				}
		
				encodeIns += ');';
		
				CryptoConsole.log(encodeIns);
				eval(encodeIns);
		
				document.getElementById(Algorithms.ALG_OUTPUT).value = output;
			}
		}
	}
};
