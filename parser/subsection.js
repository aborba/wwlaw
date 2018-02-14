var HeaderSection = require('./headerSection')
var tools = require('./tools')

class Subsection extends HeaderSection {
	constructor(textLine) {
		super(textLine, 'subsection')
	}
}

Subsection.matches = (textLine) => {
	return tools.checkType(textLine, {tokens:['subsecção','subseccao','sub-secção','sub-seccao'], numbering:tools.isRoman} )
}

module.exports = Subsection
