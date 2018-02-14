var HeaderSection = require('./headerSection')

class Subsection extends HeaderSection {
	constructor(textLine) {
		super(textLine, 'subsection')
	}
}

module.exports = Subsection
