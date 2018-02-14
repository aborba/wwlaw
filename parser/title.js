var HeaderSection = require('./headerSection')
var tools = require('./tools')

class Title extends HeaderSection {
	constructor(textLine) {
		super(textLine, 'title')
	}
}

Title.is = (value) => {
	return tools.checkType(value, {tokens:['título','titulo'], numbering:tools.isRoman} )
}

module.exports = Title
