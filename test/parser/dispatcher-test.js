var assert = require('assert')
var Dispatcher = require('../../parser/dispatcher')
var sampleText = require('../../sampleText')
var Book = require('../../parser/book'),
	Part = require('../../parser/part'),
	Title = require('../../parser/title'),
	Chapter = require('../../parser/chapter'),
	Section = require('../../parser/section'),
	Subsection = require('../../parser/subsection'),
	Article = require('../../parser/article'),
	Li_1 = require('../../parser/li_1'),
	Li_a = require('../../parser/li_a'),
	Li_i = require('../../parser/li_i')

// DISPATCHER PARAMETERS

var sectionsVector = ['book','part','title','chapter','section','subsection','article']

var articlesStructure = { vector:['li_1','li_a','li_i'], comments:'comments' }

var workflow = []
	workflow['start']      = ['book','part','title','chapter','section','article']
	workflow['book']       = ['part','title','chapter','section','article']
	workflow['part']       = ['title','chapter','section','article']
	workflow['title']      = ['chapter','section','article']
	workflow['chapter']    = ['section','article']
	workflow['section']    = ['subsection','article']
	workflow['subsection'] = ['article']
	workflow['article']    = ['book','part','title','chapter','section','subsection','article']

var classesMap = {
	book:Book, part:Part, title:Title, chapter:Chapter, section:Section, subsection:Subsection, article:Article,
	li_1:Li_1, li_a:Li_a, li_i:Li_i
}
	
describe('Dispatcher', function() {
    
	var dispatcher = new Dispatcher(sectionsVector, articlesStructure, workflow, classesMap)
	var parseLine = dispatcher.parseLine.bind(dispatcher)
	for (var line of sampleText.text) parseLine(line)
	var getJSON = dispatcher.getJSON.bind(dispatcher)
	var json = getJSON()

    describe('#Dispatcher(sectionsVector, articlesStructure, matchCheckers, workflow)', function() {
        it('should parse text corretly into objects', function() {
            assert.equal(json, '[{"type":"part","header":"Parte","nr":"I","separator":"","epigraph":"Âmbito de aplicação"}]')
        })
    })
    
})
