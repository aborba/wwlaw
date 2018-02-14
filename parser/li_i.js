var ArticleContent = require('./articleContent')
var tools = require('./tools')

class Li_a extends ArticleContent {
	constructor(textLine) {
		super(nr, mark, textLine, 'li_1')
	}
}

Li_a.is = (textLine, status, lastTag) => {
	if (! textLine) return false
	if (status === 'article' && lastTag === 'start') return true
	return /^\D.\s.*/.test(textLine) && tools.isRoman(textLine.replace(/^(\w+)(.?\s.*)$/, '$1'))
}

module.exports = Li_a
