/**
 * htmlGenerator, a JS object used to generate dynamically HTML content.
 *
 * @package    cryptoUtils
 * @module     demos.htmlGenerator
 * @author     tom@0x101.com
 * @version    0.01
 */

var htmlGenerator = {

	/**
	 * @const WRITE_MODE_OVERWRITE
	 */
	WRITE_MODE_OVERWRITE: 1,

	/**
	 * @const WRITE_MODE_APPEND
	 */
	WRITE_MODE_APPEND: 2,
	
	/**
	 * @const WRITE_MODE_PREPEND
	 */
	WRITE_MODE_PREPEND: 3,

	/**
	 * @const INTERNAL_SEPARATOR
	 */
	INTERNAL_SEPARATOR: ' ',
	
	/**
	 * @const TAG_BEGIN
	 */
	TAG_BEGIN: '<',

	/**
	 * @const TAG_END
	 */
	TAG_END: '>',

	/**
	 * @const TAG_CLOSING
	 */
	TAG_CLOSING: '/',
	
	/**
	 * @const ATTR_ID
	 */
	ATTR_ID: 'id',

	/**
	 * @const TAG_DIV
	 */
	TAG_DIV: 'div', 

	/**
	 * @const TAG_TEXTAREA
	 */
	TAG_TEXTAREA: 'textarea', 

	/**
	 * @const TAG_OPTION
	 */
	TAG_OPTION: 'option',

	/**
	 * @const TAG_SELECT
	 */
	TAG_SELECT: 'select', 

	/**
	 * @string textAreaId
	 * @array extraAttributes
	 */
	generateSelect: function(selectId, options, extraAttributes, firstElement) {

		var html = this.genericTag(this.TAG_SELECT, selectId, extraAttributes);

		var inFirstElement = true;
	
		for (var optionPos in options) {

			if (typeof(firstElement) !== 'undefined' && inFirstElement) {
				html += this.genericTag(this.TAG_OPTION, '', [['value', firstElement[0]]]);
				html += firstElement[1];
				html += this.genericClosingTag(this.TAG_OPTION);
				inFirstElement = false;
			}

			html += this.genericTag(this.TAG_OPTION, '', [['value', optionPos]]);
			html += optionPos;
			html += this.genericClosingTag(this.TAG_OPTION);
		}

		html += this.genericClosingTag(this.TAG_SELECT);
		return html;
	}, 

	/**
	 * @string textAreaId
	 * @array extraAttributes
	 */
	generateTextarea: function(textareaId, extraAttributes) {
		var html = this.genericTag(this.TAG_TEXTAREA, textareaId, extraAttributes);
		html += this.genericClosingTag(this.TAG_TEXTAREA);	
		return html;
	},

	/**
	 * @string divId
	 * @string content
	 * @return string
	 */
	generateDiv: function(divId, content) {
		var html = this.genericTag(this.TAG_DIV, divId);
		
		if ( typeof(content) !== 'undefined') {
			html += content;
		}

		html += this.genericClosingTag(this.TAG_DIV);

		return html;
	},

	/**
	 * Private function used to generate generic HTML tags.
	 *
	 * @tagName string
	 * @tagId string
	 * @extraAttributes array [[attrName, value], ...]
	 * @return string A string with the HTML content.
	 */
	genericTag: function(tagName, tagId, extraAttributes) {
		var html = '';
		
		if (typeof(tagName) !== 'undefined') {
			
			html = this.TAG_BEGIN + tagName + this.INTERNAL_SEPARATOR;

			if ( typeof(tagId) !== 'undefined') {
				html += this.ATTR_ID + '="' + tagId + '"' + this.INTERNAL_SEPARATOR; 
			}

			if ( typeof(extraAttributes) !== 'undefined') {
				var numExtraAttributes = extraAttributes.length;
				for (var i=0;i<numExtraAttributes;i++) {
					var attributes = extraAttributes[i];
					html += attributes[0] + '="' + attributes[1] + '"' + this.INTERNAL_SEPARATOR; 
				}
			}
			
			html += this.TAG_END;
		}

		return html;
	}, 

	/**
	 * @string tagName
	 * @return string
	 */
	genericClosingTag: function(tagName) {
		var html = '';
		
		if ( typeof(tagName) !== 'undefined') {
			html += this.TAG_BEGIN + this.TAG_CLOSING + tagName + this.TAG_END;
		}

		return html;
	},

	/**
	 * Injects HTML content.
	 *
	 * @targetId string
	 * @html string contains the html content that we want to inject
	 * @writeMode int defined the write mode that we want to apply: overwrite, 
	 * prepend or append.
	 * @return void
	 */
	inject: function(targetId, html, writeMode) {

		// We want to apply overwrite as default
		if (typeof(writeMode)==='undefined') {
			var writeMode = this.WRITE_MODE_OVERWRITE;
		}

		if (typeof(targetId)!=='undefined') {
			var element = document.getElementById(targetId);

			if (element!==null) {
				// Injects the html
				switch (writeMode) {
					case this.WRITE_MODE_OVERWRITE:
						element.innerHTML = html;
						break;

					case this.WRITE_MODE_APPEND:
						element.innerHTML += html;
						break;

					case this.WRITE_MODE_PREPEND:
						element.innerHTML = html + element.innerHTML;
						break;
				}
			}
		}
	}
};
