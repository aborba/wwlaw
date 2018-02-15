'use srict'

var HeaderSection = require('./headerSection'),
	tools = require('./tools')

class Title extends HeaderSection {
	constructor(textLine) {
		super(textLine, 'title')
	}
}

Title.matches = (textLine) => {
	return tools.checkType(textLine, {tokens:['título','titulo'], numbering:tools.isRoman} )
}

module.exports = Title
