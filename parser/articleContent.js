require('./prototypeExtensions')

var tools = require('./tools')

var types = ['li_1','li_a','li_i']

const CLNAME = 'ArticleContent'
class ArticleContent {
	constructor(nr, mark, textLine, type) {
		if (! textLine || typeof textLine !== 'string' || textLine.isEmpty()) throw new Error(CLNAME + ': textLine not supplied')
		if (! type || typeof type !== 'string' || type.isEmpty()) throw new Error(CLNAME + ': type not supplied')
		this.nr = nr.clean()
		this.mark = mark
		textLine = textLine.clean()
		this.type = type.clean()
		this.inner = []
	}

	getType() { return this.type }
	getNr() { return this.nr }

	add(obj) {
		if (!obj) return
		this.inner.push(obj)
	}

}

module.exports = ArticleContent