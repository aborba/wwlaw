var ArticleContent = require('./articleContent')
var tools = require('./tools')

class Li_a extends ArticleContent {
	constructor(textLine) {
		if (! textLine || typeof textLine !== 'string') throw new Error(CLNAME + ': textLine not supplied');
		textLine = textLine.clean()
		var nr = textLine.replace(/^(\w+)(.\s.*)$/, '$1')
		var mark = textLine.replace(/^(\w+)(.)(\s.*)$/, '$2')
		var text = textLine.replace(/^(\w+)(.\s)(.*)$/, '$3')
		super(nr, mark, text, 'li_a')
	}
}

Li_a.is = (textLine, status, lastTag) => {
	if (! textLine) return false
	if (status === 'article' && lastTag === 'start') return true
	return /^\D.\s.*/.test(textLine) && ! tools.isRoman(textLine.replace(/^(\w+)(.?\s.*)$/, '$1'))
}

module.exports = Li_a
