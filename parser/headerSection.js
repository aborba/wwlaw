require('./prototypeExtensions')

var tools = require('./tools')

var layers = ['Livro','Parte','Titulo','Capitulo','Seccao','Subseccao','Artigo']

var sectionTypes = []
sectionTypes['Livro'] = ['livro']
sectionTypes['Parte'] = ['parte']
sectionTypes['Titulo'] = ['titulo','título']
sectionTypes['Capitulo'] = ['capitulo','capítulo']
sectionTypes['Seccao'] = ['seccao','secção']
sectionTypes['Subseccao'] = ['subseccao','subsecção','sub-seccao','sub-secção']
sectionTypes['Artigo'] = ['artigo']

var numberTypes = []
numberTypes['Livro'] = tools.isRoman
numberTypes['Parte'] = tools.isRoman
numberTypes['Titulo'] = tools.isRoman
numberTypes['Capitulo'] = tools.isRoman
numberTypes['Seccao'] = tools.isRoman
numberTypes['Subseccao'] = tools.isRoman
numberTypes['Artigo'] = tools.isNumeral

class HeaderSection {

	constructor(textLine, layer) {
		if (! textLine || typeof textLine !== 'string' || textLine.isEmpty()) throw new Error('HeaderSection: textLine not supplied')
		if (! layer || typeof layer !== 'string' || layer.isEmpty()) throw new Error('HeaderSection: layer not supplied')
		this.layer = layer.clean()
		textLine = textLine.clean()
		var parts = textLine.split(' ', 2)
		if (parts.length < 2) throw new Error('HeaderSection/' + this.layer + ': ' + 'Invalid parameter textLine')
		this.type = parts[0]
		this.nr = parts[1]
		this.separator = ''
		var remain = textLine.slice(parts[0].concat(' ').concat(parts[1]).concat(' ').length)
		if (remain.length === 0) return
		this.epigraph = remain
		this.inner = []
	}

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

	accepts(line) {
		return true
	}
	
}

function sectionType (value) {
	for (var layer in layers) {
		var res = tools.checkType(value, {tokens:sectionTypes[layer],numbering:numberTypes[layer]})
	}
}

module.exports = HeaderSection