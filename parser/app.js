'use strict'

//var fs = require('fs') // uncomment for debug
var Dispatcher = require('./dispatcher')

var Book = require('./book'),
	Part = require('./part'),
	Title = require('./title'),
	Chapter = require('./chapter'),
	Section = require('./section'),
	Subsection = require('./subsection'),
	Article = require('./article'),
	Li_1 = require('./li_1'),
	Li_a = require('./li_a'),
	Li_i = require('./li_i')

function readLines(input, parse, extract, output) {
    var buffer = ''
    input.on('data', function(data) {
        buffer += data;
        var eol = buffer.indexOf('\n');
        while (eol > -1) {
            var line = buffer.substring(0, eol);
            buffer = buffer.substring(eol + 1);
            parse(line);
            eol = buffer.indexOf('\n');
        }
    })
    input.on('end', function() {
        if (buffer.length > 0) parse(buffer);
        var json = extract()
        json = json.replace(/\,\"inner\"\:\[\]/g, '').replace(/\,\"comments\"\:\[\]/g, '')
        output(json)
    })
}

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

// RUN

var dispatcher = new Dispatcher(sectionsVector, articlesStructure, workflow, classesMap)
//readLines(fs.createReadStream('./ccp-a.txt', 'utf8'), // uncomment for debug
readLines(process.stdin.setEncoding('utf8'), // comment for debug
    dispatcher.parseLine.bind(dispatcher),
    dispatcher.getJSON.bind(dispatcher),
    function(value) { if (value) process.stdout.write(value) }
)

/*
cls && node app.js < ccp-a.txt
 */