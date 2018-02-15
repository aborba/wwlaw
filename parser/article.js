var HeaderSection = require('./headerSection')
var tools = require('./tools')

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
	
	isInArticle() { return true }

}

Article.matches = (textLine) => {
	return tools.checkType(textLine, {tokens:'artigo', numbering:tools.isNumeral} )
}

module.exports = Article
