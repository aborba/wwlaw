require('./prototypeExtensions')

var tools = require('./tools')

function Titulo (textLine) {
    this.layer = 'Titulo'
    if (! textLine || textLine.isEmpty()) throw new Error(this.layer + ': ' + 'textLine not supplied')
	textLine = textLine.clean()
    var parts = textLine.split(' ', 2)
    if (parts.length < 2) throw new Error(this.layer + ': ' + 'Invalid parameter textLine')
	this.type = parts[0]
    this.nr = parts[1]
	this.separator = ''
	var remain = textLine.slice(parts[0].concat(' ').concat(parts[1]).concat(' ').length)
    if (remain.length === 0) return
	this.epigraph = remain
	this.inner = []
}
Titulo.prototype.add = function(obj) {
	if (!obj) return
	if (typeof obj === 'string') {
		obj = obj.clean()
		if (obj.isEmpty()) return
		this.epigraph = obj
		return
	}
	this.inner.push(obj)
}
Titulo.is = function(value) {
	return tools.isOfType(value, ['titulo','título'], tools.isRoman)
}

module.exports = Titulo
