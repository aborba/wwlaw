'use srict'

var HeaderSection = require('./headerSection'),
	tools = require('./tools')

class Part extends HeaderSection {
	constructor(textLine) {
		super(textLine, 'part')
	}
}

Part.matches = (textLine) => {
	return tools.checkType(textLine, {tokens:'parte', numbering:tools.isRoman} )
}

module.exports = Part
