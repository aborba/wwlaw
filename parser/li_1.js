var ArticleContent = require('./articleContent')
var tools = require('./tools')

class Li_1 extends ArticleContent {
	constructor(textLine) {
		super(nr, mark, textLine, 'li_1')
	}
}

Li_1.is = (textLine, status, lastTag) => {
	if (! textLine) return false
	if (status === 'article' && lastTag === 'start') return true
	return /^\d\s?.\s.*/.test(textLine)
}

module.exports = Li_1
