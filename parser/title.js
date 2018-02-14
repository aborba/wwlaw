var HeaderSection = require('./headerSection')

class Title extends HeaderSection {
	constructor(textLine) {
		super(textLine, 'title')
	}
}

module.exports = Title
