require('./prototypeExtensions')

var tools = require('./tools')

var types = ['book','part','title','chapter','section','subsection','article']

var headerTypes = []
headerTypes['book'] = ['livro']
headerTypes['part'] = ['parte']
headerTypes['title'] = ['titulo','título']
headerTypes['chapter'] = ['capitulo','capítulo']
headerTypes['section'] = ['seccao','secção']
headerTypes['subsection'] = ['subseccao','subsecção','sub-seccao','sub-secção']
headerTypes['article'] = ['artigo']

var numberTypes = []
numberTypes['book'] = tools.isRoman
numberTypes['part'] = tools.isRoman
numberTypes['title'] = tools.isRoman
numberTypes['chapter'] = tools.isRoman
numberTypes['section'] = tools.isRoman
numberTypes['subsection'] = tools.isRoman
numberTypes['article'] = tools.isNumeral

const CLNAME = 'HeaderSection'
class HeaderSection {

	constructor(textLine, type) {
		if (! textLine || typeof textLine !== 'string' || textLine.isEmpty()) throw new Error(CLNAME + ': textLine not supplied')
		if (! type || typeof type !== 'string' || type.isEmpty()) throw new Error(CLNAME + ': type not supplied')
		this.type = type.clean()
		textLine = textLine.clean()
		var parts = textLine.split(' ', 2)
		if (parts.length < 2) throw new Error(CLNAME + '/' + this.type + ': ' + 'Invalid parameter textLine')
		this.type = parts[0]
		this.nr = parts[1]
		this.separator = ''
		var remain = textLine.slice(parts[0].concat(' ').concat(parts[1]).concat(' ').length)
		if (remain.length === 0) return
		this.epigraph = remain
		this.inner = []
	}

	getType() { return this.type }

	add(obj) {
		if (!obj) return
		if (typeof obj === 'string') {
			obj = obj.clean()
			if (obj.isEmpty()) return
			this.epigraph = obj
			return
		}
		this.inner.push(obj)
	}

}

module.exports = HeaderSection
