'use srict'

var HeaderSection = require('./headerSection'),
	tools = require('./tools')

class Section extends HeaderSection {
	constructor(textLine) {
		super(textLine, 'section')
	}
}

Section.matches = (textLine) => {
	return tools.checkType(textLine, {tokens:['secção','seccao'], numbering:tools.isRoman} )
}

module.exports = Section
