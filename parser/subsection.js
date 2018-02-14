var HeaderSection = require('./headerSection')
var tools = require('./tools')

class Subsection extends HeaderSection {
	constructor(textLine) {
		super(textLine, 'subsection')
	}
}

Subsection.is = (value) => {
	return tools.checkType(value, {tokens:['subsecção','subseccao','sub-secção','sub-seccao'], numbering:tools.isRoman} )
}

module.exports = Subsection
