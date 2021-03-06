'use srict'

var ArticleContent = require('./articleContent'),
	tools = require('./tools')

const CLNAME = 'Li_1'

class Li_1 extends ArticleContent {
	constructor(textLine) {
		if (! textLine || typeof textLine !== 'string') throw new Error(CLNAME + ': textLine not supplied');
		textLine = textLine.clean()
		var nr = textLine.replace(/^(\d+)(\s?.\s.*)$/, '$1')
		var mark = textLine.replace(/^(\d+)(\s?.)(\s.*)$/, '$2')
		var text = textLine.replace(/^(\d+)(\s?.\s)(.*)$/, '$3')
		if (mark === nr) nr = mark = ''
		super(nr, mark, text, 'li_1')
	}
}

Li_1.matches = (textLine, lastTag) => {
	if (! textLine) return false
	if (lastTag === 'start') return true
	return /^\d\s?.\s.*/.test(textLine)
}

module.exports = Li_1
