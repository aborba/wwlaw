'use srict'

var HeaderSection = require('./headerSection'),
	tools = require('./tools')

class Chapter extends HeaderSection {
	constructor(textLine) {
		super(textLine, 'chapter')
	}
}

Chapter.matches = (textLine) => {
	return tools.checkType(textLine, {tokens:['capítulo','capitulo'], numbering:tools.isRoman} )
}

module.exports = Chapter
