var inspect = require('util').inspect

var text = [
    ' ',
    ' Parte       I ',
    ' ',
    'Âmbito de aplicação'
]

// AUXILIARY FUNCTIONS

Array.prototype.contains = function(obj) {return this.indexOf(obj) > -1 }
String.prototype.clean = function() {return this.trim().replace(/[\s\t]+/,' ') }
String.prototype.isEmpty = function(value) {
	if (this.length === 0) return true
	var clean = this.clean();
	return clean === '' || clean === ' '
}

function isRoman(value) {return (/[IVXLCDM]+/i).test(value) }
function isNumeral(value) {return (/\d+\.?º/).test(value) }
function roman2arabic(romanNr) {
	if (!romanNr) return
	var res = M = C = X = I = 0;
	for(ch of romanNr) switch (ch.toUpperCase()) {
		case "M": M += 1000; res -= C; C = 0; break;
		case "D": res += M + 500 - C; M = 0; C = 0; break;
		case "C": C += 100; res += M - X; M = 0; X = 0; I = 0; break;
		case "L": res += M + C + 50 - X; M = 0; C = 0; X = 0; I = 0; break;
		case "X": X += 10; res += M + C - I; M = 0; C = 0; I = 0; break;
		case "V": res += M + C + X + 5 - I; M = 0; C = 0; X = 0; I = 0; break;
		case "I": I += 1; res += M + C + X; M = 0; C = 0; X = 0; break;
		default: return 0;
	}
	return res + M + C + X + I;
}

function isOfType(value, tokens, isType) { // "Parte I", ["parte"], isRoman
	if (! value || typeof value !== 'string') return false
	var parts = value.clean().split(' ')
	var tokensLc = typeof tokens === 'string' ? [(tokens.toLowerCase())] : tokens.map(function(val) {return val.toLowerCase(); });
	return parts.length === 2
		&& tokensLc.contains(parts[0].toLowerCase())
		&& isType(parts[1])
}

var createInstance = function(str) {
	var arr = str.split(".");
	var instance = (window || this);
	for (var i = 0, len = arr.length; i < len; i++)
		instance = instance[arr[i]];
	if (typeof instance !== "function")
		throw new Error("function not found");
	return instance;
};

var pushStack = function(stack, obj) {
	var baseLevel = getLevel(statuses, obj.type)
	if (stack.length === 0 || baseLevel === getLevel(statuses, stack[0].type)) {
		stack.push(obj)
		return
	}
	while (getLevel(statuses, stack[stack.length - 1].type) >= baseLevel) {
		var aux = stack.pop()
		stack[stack.length - 1].lines.push(aux)
	}
	if (obj.type === 'Comments')
		stack[stack.length - 1].addComment(obj.line)
	else
		stack.push(obj)
}

// MATCHERS
var matchCheckers = []
matchCheckers['Livro'] = (value) => {return isOfType(value, "livro", isRoman) ? 'Livro' : false }
matchCheckers['Parte'] = (value) => {return isOfType(value, "parte", isRoman) ? 'Parte' : false }
matchCheckers['Titulo'] = (value) => {return isOfType(value, ["titulo", "título"], isRoman) ? 'Titulo' : false }
matchCheckers['Capitulo'] = (value) => {return isOfType(value, ["capitulo", "capítulo"], isRoman) ? 'Capitulo' : false }
matchCheckers['Seccao'] = (value) => {return isOfType(value, ["seccao", "secção"], isRoman) ? 'Seccao' : false }
matchCheckers['Subseccao'] = (value) => {return isOfType(value, ["subseccao", "sub-seccao", "subsecção", "sub-secção"], isRoman) ? 'Subseccao' : false }
matchCheckers['Artigo'] = (value) => {return isOfType(value, "artigo", isNumeral) ? 'Artigo' : false }
matchCheckers['Li1'] = (value) => {return /^\d+/.test(value.clean()) ? 'Li1' : false }
matchCheckers['LiA'] = (value, status, lastTag) => {
	if (! (status && lastTag)) return false
	var val = value.clean()
	if (! /^[a-z]+.?\s.*/.test(val)) return false
	var word = val.replace(/(\w+)(.*)/i, '$1').toLowerCase()
	if (word === 'a' && status !== 'Li1') return false
	if (isRoman(word) && status === 'LiA' && ! ['h', 'u', 'v', 'k', 'b', 'c', 'l'].contains(lastTag)) return false
	if (isRoman(word) && status === 'LiI' && roman2arabic(word) === roman2arabic(lastTag) + 1) return false
	return 'LiA'
}
matchCheckers['LiI'] = (value, status, lastTag) => {
	var val = value.clean()
	var word = val.replace(/(\w+)(.*)/i, '$1').toLowerCase()
	if (roman2arabic(word) === roman2arabic(lastTag) + 1) return 'LiI'
	var tmp = (/^(?:[IVXLCDM])+\.\s.*/i).test(val)
	return (status !== 'Comments' && (/^(?:[IVXLCDM])+\.\s.*/i).test(val))  ? 'LiI' : false
}
matchCheckers['Comments'] = (value, status, lastTag) => {
	return ['Li1', 'LiA', 'LiI', 'Comments'].contains(status) ? 'Comments' : false
}

var layersOrganization = [
    {layer:'Livro',depth:10},
    {layer:'Parte',depth:20},
    {layer:'Titulo',depth:30},
    {layer:'Capitulo',depth:40},
    {layer:'Seccao',depth:50},
    {layer:'Subseccao',depth:60},
    {layer:'Artigo',depth:70}
]
var articleOrganization = [
    {layer:'Comments',depth:110},
    {layer:'Li1',depth:110},
    {layer:'LiA',depth:120},
    {layer:'LiI',depth:130}
]
var docOrganization = layersOrganization.concat(articleOrganization)

var doc = []

// PARTE
var Parte = function (textLine) {
    this.layer = 'Parte'
    if (! textLine || textLine.isEmpty()) throw new Error(this.layer + ': ' + 'textLine not supplied')
	textLine = textLine.clean()
    var parts = textLine.split(' ', 2)
    if (parts.length < 2) throw new Error(this.layer + ': ' + 'Invalid parameter textLine')
	this.type = parts[0]
    this.nr = parts[1]
    var remain = textLine.slice(parts[0].concat(' ').concat(parts[1]).length)
    if (remain.length === 0) return
	this.epigraph = textLine.replace(/^(\w+\s+\w+\s+)(.*)/, '$2').replace(/[\s\t]+/g, ' ')
	this.inner = []
	this.separator = ''
}
Parte.prototype.addTextLine = function(textLine) {
    if (textLine.isEmpty()) return
    if (! this.epigraph || this.epigraph.isEmpty()) {
        this.epigraph = textLine.clean()
        return
    }
    var matcher = matchCheckers[sectionType]
    if (! matcher) return false
    var match = matcher(textLine)
    if (! match) return false
    if (inner[this.type].contains(textLine)) this.epigraph = textLine
}
Parte.prototype.addTextLine = function(textLine) {if (textLine) this.epigraph = textLine }
Parte.prototype.addInner = function(stuff) {if (stuff && this.inner) this.inner.push(stuff) }
Parte.is = function(line) {return isOfType(line, "parte", isRoman) }

// SECTION
var Section = function (textLine, layer, separator) {
    if (! textLine) throw new Error("Invalid parameter textLine")
	textLine = (textLine || '').trim()
	this.layer = layer
	this.clazz = textLine.replace(/^(\w+)(.*)/, '$1')
	this.nr = textLine.replace(/^(\w+\s+)(\d+\.º)(\s+.*)/, '$2')
	this.epigraph = textLine.replace(/^(\w+\s+\w+\s+)(.*)/, '$2').replace(/[\s\t]+/g, ' ')
	this.inner = []
	this.separator = separator || ''
}
Section.prototype.addTextLine = function(textLine) {
    if (textLine.isEmpty()) return
    if (! this.epigraph || this.epigraph.isEmpty()) {
        this.epigraph = textLine.clean()
        return
    }
    var matcher = matchCheckers[sectionType]
    if (! matcher) return false
    var match = matcher(textLine)
    if (! match) return false
    if (inner[this.type].contains(textLine)) this.epigraph = textLine
}
Section.prototype.addTextLine = function(textLine) {if (textLine) this.epigraph = textLine }
Section.prototype.addInner = function(stuff) {if (stuff && this.inner) this.inner.push(stuff) }

// ARTICLE
var Article = function (line, type, separator) {
	line = (line || '').trim()
	this.type = 'Artigo'
	this.clazz = line.replace(/^(\w+)(.*)/, '$1')
	this.nr = line.replace(/^(\w+\s+)(\d+\.º)(\s+.*)/, '$2')
	this.epigraph = line.replace(/^(\w+\s+\d+\.º\s+)(.*)/, '$2').replace(/[\s\t]+/g, ' ')
	this.inner = []
	this.comments = []
	this.separator = separator || ''
}
Article.prototype.setEpigraph = function(line) {if (line) this.epigraph = line }
Article.prototype.addInner = function(line) {if (line && this.lines) this.lines.push(typeof line === 'string' ? new Line(line) : line) }
Article.prototype.addComment = function(line) {if (line && typeof line === 'string' && this.comments) this.comments.push(line) }

module.exports=Parte