var HeaderSection = require('./headerSection')

class Part extends HeaderSection {
	constructor(textLine) {
		super(textLine, 'part')
	}
}

module.exports = Part
