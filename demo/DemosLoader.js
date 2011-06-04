/**
 * @package    cryptoUtils
 * @module     demos
 * @author     tom@0x101.com
 * @version    0.01
 */

/**
 * Store the algorithms definition.
 */
var algorithms = {

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
			ALG_NAME : 'base64',
			ALG_ENCODE : 'base64.encode',
			ALG_DECODE : 'base64.decode',
			ALG_INPUT: [
				{
					ALG_INPUT_NAME: 'text',		
					ALG_INPUT_LABEL: 'Input text',		
					ALG_INPUT_TYPE: 'textarea'
				}
			]
		},
	
		'basic xor': {
			ALG_NAME : 'basic xor',
			ALG_ENCODE : 'xor.encode',
			ALG_DECODE : 'xor.encode',
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
}

var demosLoader = {

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
		cryptoConsole.enableDebug();
		// display the algorithm selector
		var contentStr = htmlGenerator.generateSelect(this.SELECT_ID, algorithms.definitions, [['onchange','demosLoader.loadAlgorithm();']], [this.UNDEFINED_ALGORITHM, 'undefined algorithm']);
		htmlGenerator.inject(this.MAIN_CONTENT_ID, contentStr);
	},
    
	loadAlgorithm: function () {
	
		var algorithm = this._getAlgorithmSelected();

		if (algorithm !== this.UNDEFINED_ALGORITHM) {
			var algorithmContentHTML = '';

			if (typeof algorithms.definitions[algorithm] !== 'undefined') {

				definition = algorithms.definitions[algorithm];   

				algorithmContentHTML = '';
				algorithmContentHTML += definition.ALG_NAME;

				for(inputPos in definition.ALG_INPUT) {
					var input = definition.ALG_INPUT[inputPos];
					algorithmContentHTML += htmlGenerator.generateDiv('', input.ALG_INPUT_LABEL); 
					
					switch(input.ALG_INPUT_TYPE) {
						case 'submit': {
							algorithmContentHTML += htmlGenerator.genericTag('input', input.ALG_INPUT_NAME); 
							algorithmContentHTML += htmlGenerator.genericClosingTag('input');
							break;
						}
						case 'textarea': {
							algorithmContentHTML += htmlGenerator.generateTextarea(input.ALG_INPUT_NAME); 
							break;
						}
					}
				}
    
				algorithmContentHTML += htmlGenerator.generateDiv('', htmlGenerator.generateTextarea(algorithms.ALG_OUTPUT));
				algorithmContentHTML += htmlGenerator.genericTag('div');
				algorithmContentHTML += htmlGenerator.genericTag('input', '', [['type', 'button'], ['onclick', 'demosLoader.encode();'], ['value', 'encode']]);
				algorithmContentHTML += htmlGenerator.genericTag('input', '', [['type','button'],['onclick','demosLoader.decode();'],['value','decode']]);

				algorithmContentHTML += htmlGenerator.genericClosingTag('div');
	
			} else {
				cryptoConsole.log('undefined algorithm', cryptoConsole.LOG_LEVEL_ERROR);
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
	    
			if (typeof algorithms.definitions[algorithm] !== 'undefined') {
				var definition = algorithms.definitions[algorithm];
		
				var encodeIns = 'var output = ';
		
				if(encodeMode) {
				    encodeIns += definition.ALG_ENCODE +'(';
				} else {
				    encodeIns += definition.ALG_DECODE +'(';
				}
		
				var firstInput = true;
				for(inputPos in definition.ALG_INPUT) {
		
					var inputId = definition.ALG_INPUT[inputPos].ALG_INPUT_NAME;
					var input = document.getElementById(inputId);
		
					if(!firstInput) {
							encodeIns += ', ';
					}
		
					encodeIns += '"' + input.value+ '"';
		
					firstInput = false;
				}
		
				encodeIns += ');'
		
				cryptoConsole.log(encodeIns);
				eval(encodeIns);
		
				document.getElementById(algorithms.ALG_OUTPUT).value = output;
			}
		}
    }
}
