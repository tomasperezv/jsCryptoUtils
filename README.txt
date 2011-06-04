jsCryptoUtils

Small POC: Javascript library with cryptographic utilities: algorithms and functions.

Modules implemented:

	- Utilities

		- utils.main
		- utils.stringBlocksIterator
		- Base64.encode
		- Base64.decode
		- core.CryptoConsole
		- core.HtmlGenerator
		- demo.DemosLoader

	- Cipher algorithms
	    
		- xor.encode

TODO:

	- Clean code

		- Decouple CryptoConsole from the internal implementation of the
		  algorithms.

	- Utilities

		- Fix special chars in base64 encode/decode process

	- Cipher algorithms

		- skipJack.encode
		- skipJack.decode
		- rc6.encode
		- rc6.decode

	- Hash functions

		- Whirpool
		- SHA-2

Author:

	tom@0x101.com
