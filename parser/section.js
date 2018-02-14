var HeaderSection = require('./headerSection')
var tools = require('./tools')

class Section extends HeaderSection {
	constructor(textLine) {
		super(textLine, 'section')
	}
}

Section.is = (value) => {
	return tools.checkType(value, {tokens:['secção','seccao'], numbering:tools.isRoman} )
}

module.exports = Section
