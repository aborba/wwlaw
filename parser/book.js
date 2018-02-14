var HeaderSection = require('./headerSection')
var tools = require('./tools')

class Book extends HeaderSection {
	constructor(textLine) {
		super(textLine, 'book')
	}
}

Book.is = (value) => {
	return tools.checkType(value, {tokens:'livro', numbering:tools.isRoman} )
}

module.exports = Book
