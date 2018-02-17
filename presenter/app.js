'use strict'

var Handlebars = require('handlebars')
var fs = require('fs')

function bodyFill() {

    Handlebars.registerHelper(
        'if2', function(conditional, options) {
        if (options.hash.desired === options.hash.type) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    Handlebars.registerPartial(
        'injectArticle',
        '            <article class=article>\n'+
        '                <h6>{{header}} {{nr}}: {{epigraph}}</h6>\n'+
        //'{{#inner}}'+
        '{{#if inner}}'+
            '                <ol type="1">\n'+
            '{{#each inner}}'+
                '{{#if id}}'+
                    '                    <li seq="{{nr}}">{{textLine}}\n'+
                '{{else}}'+
                    '                    <li seq="{{nr}}">{{mark}} {{textLine}}\n'+
                    '{{#if inner}}'+
                        '                    <ol type="a">\n'+
                        '{{#inner}}'+
                            '                        <li seq="{{nr}}">{{textLine}}\n'+
                            '{{#if inner}}'+
                                '                        <ol type="i">'+
                                '{{#inner}}'+
                                    '                            <li seq="{{nr}}">{{textLine}}</li>\n'+
                                '{{/inner}}'+
                                '                        </ol>\n'+
                            '{{/if}}'+
                            '                        </li>\n'+
                        '{{/inner}}'+
                        '                    </ol>\n'+
                    '{{/if}}'+
                '{{/if}}'+
                '                    </li>\n'+
                '{{/each}}'+
                '                </ol>\n'+
        '{{/if}}'+
        //'{{/inner}}'+
        '            </article>\n'
    );

    var source = 
    '<div id="content">\n'+
    '{{#this}}'+
    '<section class={{type}}>\n'+ // part
    '    <h2>{{header}} {{nr}}: {{epigraph}}</h2>\n'+
    '{{#inner}}'+
    '{{#if2 type desired="article" type=type}}'+
        '{{> injectArticle}}'+
//    '        <article class={{type}}>\n'+ // article
//    '            <h6>{{header}} {{nr}}: {{epigraph}}</h6>\n'+
//    '        </article>\n'+
    '{{else}}'+
        '    <section class={{type}}>\n'+ // title
        '        <h3>{{header}} {{nr}}: {{epigraph}}</h3>\n'+
        '{{#inner}}'+
        '{{#if2 type desired="article" type=type}}'+
        '{{> injectArticle}}'+
//        '        <article class={{type}}>\n'+ // article
//        '            <h6>{{header}} {{nr}}: {{epigraph}}</h6>\n'+
//        '        </article>\n'+
        '{{else}}'+
        '        <section class={{type}}>\n'+ // chapter
        '            <h4>{{header}} {{nr}}: {{epigraph}}</h4>\n'+
            '{{#inner}}'+
            '{{#if2 type desired="article" type=type}}'+
            '            <article class={{type}}>\n'+ // article
            '                <h6>{{header}} {{nr}}: {{epigraph}}</h6>\n'+
            '            </article>\n'+
            '{{else}}'+
            '            <section class={{type}}>\n'+ // section
            '                <h5>{{header}} {{nr}}: {{epigraph}}</h5>\n'+
                '{{#inner}}'+
                '{{#if2 type desired="article" type=type}}'+
                '                <article class={{type}}>\n'+ // article
                '                    <h6>{{header}} {{nr}}: {{epigraph}}</h6>\n'+
                '                </article>\n'+
                '{{else}}'+
                '                <section class={{type}}>\n'+ // section
                '                    <h55>{{header}} {{nr}}: {{epigraph}}</h55>\n'+
                    '{{#inner}}'+
                    '                    <article class={{type}}>\n'+ // article
                    '                        <h6>{{header}} {{nr}}: {{epigraph}}</h6>\n'+
                    '                    </article>\n'+                    
                    '{{/inner}}'+
                '                </section>\n'+
                '{{/if2}}'+
                '{{/inner}}'+
            '            </section>\n'+
            '{{/if2}}'+
            '{{/inner}}'+
        '        </section>\n'+
        '{{/if2}}'+
        '{{/inner}}'+
        '    </section>\n'+
    '{{/if2}}'+
    '{{/inner}}'+
    '</section>\n'+
    '{{/this}}'+
    '</div>\n'

    var data = JSON.parse(fs.readFileSync('./ccp-a.json', 'utf8'))
    var template = Handlebars.compile(source)
    var result = template(data)
    console.log(result)
}

bodyFill()