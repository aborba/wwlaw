var HeaderSection = require('./headerSection')

class Book extends HeaderSection {
	constructor(textLine) {
		super(textLine, 'book')
	}
}

module.exports = Book
