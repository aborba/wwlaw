var HeaderSection = require('./headerSection')
var tools = require('./tools')

class Chapter extends HeaderSection {
	constructor(textLine) {
		super(textLine, 'chapter')
	}
}

Chapter.is = (value) => {
	return tools.checkType(value, {tokens:['capítulo','capitulo'], numbering:tools.isRoman} )
}

module.exports = Chapter
