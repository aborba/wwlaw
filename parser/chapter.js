var HeaderSection = require('./headerSection')

class Chapter extends HeaderSection {
	constructor(textLine) {
		super(textLine, 'chapter')
	}
}

module.exports = Chapter
