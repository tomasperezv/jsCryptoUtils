/**
 * @package    cryptoUtils
 * @module     demos
 * @authorº     tom@0x101.com
 * @version    0.01
 */

var algorithms = {
    
    ALG_NAME: 'alg_name',
    ALG_ENCODE: 'alg_func1',
    ALG_DECODE: 'alg_func2',
    ALG_INPUT: 'alg_input',
    ALG_INPUT_LABEL : 'alg_input_label',
    ALG_OUTPUT : 'alg_output',
    ALG_INPUT_TYPE_TEXTAREA : 'alg_input_textarea',
    ALG_INPUT_TYPE_SUBMIT : 'alg_input_submit',
    ALG_INPUT_NAME : 'alg_input_name',
    
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

	'xor': {
	    ALG_NAME : 'xor',
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
	var algorithmSelect = document.getElementById(this.SELECT_ID);
	var algorithm = algorithmSelect.value;
	return algorithm;
    },
    
    init: function () {
	cryptoConsole.enableDebug();
	
	// display the algorithm selector
	var contentStr = '<select id="' + this.SELECT_ID + '" onchange="demosLoader.loadAlgorithm();">';
	contentStr += '<option value="' + this.UNDEFINED_ALGORITHM + '">Select algorithm</option>';
	
	for (definitionPos in algorithms.definitions) {
	    contentStr += '<option value="' + definitionPos + '">' + definitionPos + '</option>';
	}
	
	contentStr += '</select>';
	
	var mainContent = document.getElementById(this.MAIN_CONTENT_ID);
	mainContent.innerHTML = contentStr;
    },
    
    loadAlgorithm: function () {
	
	var algorithm = this._getAlgorithmSelected();
	
	if (algorithm !== this.UNDEFINED_ALGORITHM) {
	    var algorithmContent = document.getElementById(this.ALGORITHM_CONTENT_ID);
	    algorithmContent.innerHTML = '';
	    
	    if (typeof algorithms.definitions[algorithm] !== 'undefined') {
		
		definition = algorithms.definitions[algorithm];   
		
		algorithmContent.innerHTML = '';
		algorithmContent.innerHTML += definition.ALG_NAME;
		
		for(inputPos in definition.ALG_INPUT) {
		    var input = definition.ALG_INPUT[inputPos];
		    algorithmContent.innerHTML += '<div>' + input.ALG_INPUT_LABEL + '</div>';
		    
		    switch(input.ALG_INPUT_TYPE) {
			case 'submit': {
			    algorithmContent.innerHTML += '<input type="text" id="' + input.ALG_INPUT_NAME + '" />';
			    break;
			}
			case 'textarea': {
			    algorithmContent.innerHTML += '<textarea id="' + input.ALG_INPUT_NAME + '" ></textarea>';
			    break;
			}
		    }
		}
		    
		algorithmContent.innerHTML += '<div><textarea id="' + algorithms.ALG_OUTPUT + '"></textarea></div>';

		algorithmContent.innerHTML += '<div><input type="button" onclick="demosLoader.encode();" value="encode"></button>';
		algorithmContent.innerHTML += '<input type="button" onclick="demosLoader.decode();" value="decode"></button></div>';
		
	    } else {
		cryptoConsole.log('undefined algorithm', cryptoConsole.LOG_LEVEL_ERROR);
	    }
	    
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
