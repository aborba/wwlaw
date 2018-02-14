var HeaderSection = require('./headerSection')
var tools = require('./tools')

class Book extends HeaderSection {
	constructor(textLine) {
		super(textLine, 'book')
	}
}

Book.is = (textLine) => {
	return tools.checkType(textLine, {tokens:'livro', numbering:tools.isRoman} )
}

module.exports = Book
