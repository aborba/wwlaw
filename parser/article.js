var HeaderSection = require('./headerSection')
var inspect = require('util').inspect

class Article extends HeaderSection {

	constructor(textLine) {
		super(textLine, 'article')
		this.comments = []
	}

	add(obj) {
		if (!obj) return
		if (typeof obj === 'string' && typeof this.epigraph === 'string') {
			this.comments.push(obj)
			return
		}
		super.add(obj)
	}

}

module.exports = Article
