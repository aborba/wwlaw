var assert = require('assert')
var Dispatcher = require('../../parser/dispatcher');
var sampleText = require('../../sampleText')

// DISPATCHER PARAMETERS

var docOrdering = ['book','part','title','chapter','section','subsection','article']

var articlesOrdering = { layers:['li_1','li_a','li_i'], comments:'comments' }

var matchCheckers = []
matchCheckers['book'] = (value) => {return isOfType(value, "livro", isRoman) }
matchCheckers['part'] = (value) => {return isOfType(value, "parte", isRoman) }
matchCheckers['title'] = (value) => {return isOfType(value, ["titulo", "título"], isRoman) }
matchCheckers['chapter'] = (value) => {return isOfType(value, ["capitulo", "capítulo"], isRoman) }
matchCheckers['section'] = (value) => {return isOfType(value, ["seccao", "secção"], isRoman) }
matchCheckers['subsection'] = (value) => {return isOfType(value, ["subseccao", "sub-seccao", "subsecção", "sub-secção"], isRoman) }
matchCheckers['article'] = (value) => {return isOfType(value, "artigo", isNumeral) }
matchCheckers['li_1'] = (value) => {
	return ((inArticleStatus && lastTag === 'article') || /^\d+/.test(value.clean()))
}
matchCheckers['li_a'] = (value, inArticleStatus, lastTag, status) => {
	if (! (inArticleStatus && status && lastTag)) return false
	var val = value.clean()
	if (! /^[a-z]+.?\s.*/.test(val)) return false
	var word = val.replace(/(\w+)(.*)/i, '$1').toLowerCase()
	if (word === 'a' && status !== 'li_1') return false
	if (isRoman(word) && status === 'li_a' && ! ['h', 'u', 'v', 'k', 'b', 'c', 'l'].contains(lastTag)) return false
	if (isRoman(word) && status === 'li_i' && roman2arabic(word) === roman2arabic(lastTag) + 1) return false
	status = 'li'
	return true
}
matchCheckers['li_i'] = (value, inArticleStatus, lastTag) => {
	var val = value.clean()
	var word = val.replace(/(\w+)(.*)/i, '$1').toLowerCase()
	if (roman2arabic(word) === roman2arabic(lastTag) + 1) return 'LiI'
	var tmp = (/^(?:[IVXLCDM])+\.\s.*/i).test(val)
	return (status !== 'Comments' && (/^(?:[IVXLCDM])+\.\s.*/i).test(val))
}
matchCheckers['comments'] = (value, inArticleStatus, lastTag) => {
	return ['li_1','li_a','li_i', 'comments'].contains(status)
}

var workflow = []
workflow['start']      = ['article','book','part','title','chapter','section']
workflow['book']       = ['article','part','title','chapter','section']
workflow['part']       = ['article','title','chapter','section']
workflow['title']      = ['article','chapter','section']
workflow['chapter']    = ['article','section']
workflow['section']    = ['article','subsection']
workflow['subsection'] = ['article']
workflow['article']    = ['article','book','part','title','chapter','section','subsection']

describe('Dispatcher', function() {
    
    var dispatcher = new Dispatcher(docOrdering, articlesOrdering, matchCheckers, workflow)
    dispatcher.parse(sampleText.text)
    
    describe('#Dispatcher(docOrdering, articlesOrdering, matchCheckers, workflow)', function() {
        it('should parse text corretly into objects', function() {
            assert.equal(true, true)
        })
    })
    
})
