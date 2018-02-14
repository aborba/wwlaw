var HeaderSection = require('./headerSection')

class Section extends HeaderSection {
	constructor(textLine) {
		super(textLine, 'section')
	}
}

module.exports = Section
