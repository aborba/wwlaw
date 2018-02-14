var HeaderSection = require('./headerSection')
var tools = require('./tools')

class Part extends HeaderSection {
	constructor(textLine) {
		super(textLine, 'part')
	}
}

Part.is = (value) => {
	return tools.checkType(value, {tokens:'parte', numbering:tools.isRoman} )
}

module.exports = Part
