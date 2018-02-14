var HeaderSection = require('./headerSection')
var tools = require('./tools')

class Title extends HeaderSection {
	constructor(textLine) {
		super(textLine, 'title')
	}
}

Title.is = (textLine) => {
	return tools.checkType(textLine, {tokens:['título','titulo'], numbering:tools.isRoman} )
}

module.exports = Title
