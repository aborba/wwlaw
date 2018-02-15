var ArticleContent = require('./articleContent')
var tools = require('./tools')

const CLNAME = 'Li_a'
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

Li_a.matches = (textLine, lastTag) => {
	if (! textLine) return false
	if (lastTag === 'start') return true
	var lead = textLine.replace(/^(\w+)(.?\s.*)$/, '$1').toLowerCase()
	if (lead === 'i' && lastTag !== 'h') return false
	if ((lead === 'i' && lastTag === 'h') ||
		(lead === 'd' && lastTag === 'c') ||
		(lead === 'm' && lastTag === 'l') ||
		(lead === 'x' && lastTag === 'v')) return true
	if (tools.isRoman(lead) && tools.isRoman(lastTag)) return false
	return /^\D.\s.*/.test(textLine) //&& ! tools.isRoman(textLine.replace(/^(\w+)(.?\s.*)$/, '$1'))
}

module.exports = Li_a
