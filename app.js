var fs = require('fs')
var Dispatcher = require('./parser/dispatcher')
var Book = require('./parser/book'),
	Part = require('./parser/part'),
	Title = require('./parser/title'),
	Chapter = require('./parser/chapter'),
	Section = require('./parser/section'),
	Subsection = require('./parser/subsection'),
	Article = require('./parser/article'),
	Li_1 = require('./parser/li_1'),
	Li_a = require('./parser/li_a'),
	Li_i = require('./parser/li_i')

function readLines(input, parse, extract, output) {
    var buffer = '';

    input.on('data', function(data) {
        buffer += data;
        var eol = buffer.indexOf('\n');
        while (eol > -1) {
            var line = buffer.substring(0, eol);
            buffer = buffer.substring(eol + 1);
            //console.log('processed: ' + line)
            parse(line);
            eol = buffer.indexOf('\n');
        }
    });

    input.on('end', function() {
        if (buffer.length > 0) parse(buffer);
        var json = extract().replace(/\,\"inner\"\:\[\]/g, '')
        json = json.replace(/\,\"inner\"\:\[\]/g, '')
        output(json)
    });

}

var docOrdering = ['book','part','title','chapter','section','subsection','article']

var articlesOrdering = { layers:['li_1','li_a','li_i'], comments:'comments' }

var workflow = []
workflow['start']      = ['book','part','title','chapter','section','article']
workflow['book']       = ['part','title','chapter','section','article']
workflow['part']       = ['title','chapter','section','article']
workflow['title']      = ['chapter','section','article']
workflow['chapter']    = ['section','article']
workflow['section']    = ['subsection','article']
workflow['subsection'] = ['article']
workflow['article']    = ['book','part','title','chapter','section','subsection','article']

var instances = {
    book: Book,
    part: Part,
    title: Title,
    chapter: Chapter,
    section: Section,
    subsection: Subsection,
    article: Article,
    li_1: Li_1,
    li_a: Li_a,
    li_i: Li_i,
}

// RUN

var dispatcher = new Dispatcher(docOrdering, articlesOrdering, workflow, instances)
//readLines(fs.createReadStream('./ccp-a.txt', 'utf8'),
readLines(process.stdin.setEncoding('utf8'),
    dispatcher.parseLine.bind(dispatcher),
    dispatcher.getJSON.bind(dispatcher),
    function(value) { if (value) process.stdout.write(value) }
)

/*
cls && node app.js < ccp-a.txt
 */