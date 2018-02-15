'use srict'

require('./prototypeExtensions')

var tools = require('./tools')

const CLNAME = 'HeaderSection'

class HeaderSection {

	constructor(textLine, type) {
		if (! textLine || typeof textLine !== 'string' || textLine.isEmpty()) throw new Error(CLNAME + ': textLine not supplied')
		if (! type || typeof type !== 'string' || type.isEmpty()) throw new Error(CLNAME + ': type not supplied')
		this.type = type.clean()
		textLine = textLine.clean()
		var parts = textLine.split(' ', 2)
		if (parts.length < 2) throw new Error(CLNAME + '/' + this.type + ': ' + 'Invalid parameter textLine')
		this.header = parts[0]
		this.nr = parts[1]
		this.separator = ''
		var remain = textLine.slice(parts[0].concat(' ').concat(parts[1]).concat(' ').length)
		if (remain.length === 0) return
		this.epigraph = remain
		this.inner = []
	}

	getType() { return this.type }

	isPending() { return typeof this.epigraph ? 'epigraph' : undefined }

	isInArticle() { return false }

	add(obj) {
		if (!obj) return
		if (typeof obj === 'string') {
			obj = obj.clean()
			if (obj.isEmpty()) return
			this.epigraph = obj
			return
		}
		if (! this.inner) this.inner = []
		this.inner.push(obj)
	}

}

module.exports = HeaderSection
