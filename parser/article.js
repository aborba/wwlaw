var Section = require('./section')
var inspect = require('util').inspect

class Article extends Section {

	constructor(textLine, layer) {
		super(textLine, layer)
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
