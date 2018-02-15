var assert = require('assert')
var Article = require('../../parser/article')

describe('Article', function() {
    
    var article = new Article('Artigo 1.º')
    
    describe('#Article("Artigo 1.º")', function() {
        it('should return values for "Artigo 1.º" and "undefined" for epigraph', function() {
            assert.equal(article.type, 'article')
            assert.equal(article.header, 'Artigo')
            assert.equal(article.nr, '1.º')
            assert.equal(typeof article.epigraph, 'undefined')
        })
    })
    
    var article2 = new Article('Artigo 1.º Epígrafe do artigo 1.º')
    
    describe('#Artigo("Artigo 1.º Epígrafe do artigo 1.º")', function() {
        it('should return values for "Artigo 1.º Epígrafe do artigo 1.º"', function() {
            assert.equal(article2.type, 'article')
            assert.equal(article2.header, 'Artigo')
            assert.equal(article2.nr, '1.º')
            assert.equal(article2.epigraph, 'Epígrafe do artigo 1.º')
        })
    })
    
    var article3 = new Article('Artigo 1.º')
    article3.add('Epígrafe do artigo 1.º')
    
    describe('#Article("Artigo 1.º").add("Epígrafe do artigo 1.º")', function() {
        it('should return values for "Artigo 1.º Epígrafe do artigo 1.º"', function() {
            assert.equal(article3.type, 'article')
            assert.equal(article3.header, 'Artigo')
            assert.equal(article3.nr, '1.º')
            assert.equal(article3.epigraph, 'Epígrafe do artigo 1.º')
        })
    })

    var article4 = new Article('Artigo 1.º')
    article4.add('Epígrafe do artigo 1.º')
    article4.add('comentário')
    
    describe('#Artigo("Artigo 1.º").add("Epígrafe do artigo 1.º").add("comentário")', function() {
        it('should return values for "comentário"', function() {
            assert.equal(article4.type, 'article')
            assert.equal(article4.header, 'Artigo')
            assert.equal(article4.nr, '1.º')
            assert.equal(article4.epigraph, 'Epígrafe do artigo 1.º')
            assert.equal(article4.comments.length, 1)
            assert.equal(article4.comments[0], 'comentário')
        })
    })

    describe('#Article.matches("Artigo 1.º")', function() {
        it('should return true for "Artigo 1.º"', function() {
            assert.equal(Article.matches('Artigo 1.º'), true)
        })
    })
    
    describe('#Article.matches(" arTigo 12.º-A ")', function() {
        it('should return true for " arTigo 12.º-A "', function() {
            assert.equal(Article.matches(' arTigo 12.º-A '), true)
        })
    })
    
    describe('#Article.matches("Parte 1")', function() {
        it('should return false for "Parte 1"', function() {
            assert.equal(Article.matches('Parte 1'), false)
        })
    })

})
