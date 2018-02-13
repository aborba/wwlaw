var assert = require('assert')
var Article = require('../../parser/article');

describe('Article', function() {
    
    var artigo = new Article('Artigo 1.º', 'Artigo')
    
    describe('#Artigo("Artigo 1.º", "Artigo")', function() {
        it('should return values for "Artigo 1.º" and "undefined" for epigraph', function() {
            assert.equal(artigo.layer, 'Artigo')
            assert.equal(artigo.type, 'Artigo')
            assert.equal(artigo.nr, '1.º')
            assert.equal(typeof artigo.epigraph, 'undefined')
        })
    })
    
    var artigo2 = new Article('Artigo I Epígrafe do artigo 1.º', 'Artigo')
    
    describe('#Artigo("Artigo I Epígrafe do artigo 1.º", "Artigo")', function() {
        it('should return values for "Artigo I Epígrafe do artigo 1.º"', function() {
            assert.equal(artigo2.layer, 'Artigo')
            assert.equal(artigo2.type, 'Artigo')
            assert.equal(artigo2.nr, 'I')
            assert.equal(artigo2.epigraph, 'Epígrafe do artigo 1.º')
        })
    })
    
    var artigo3 = new Article('Artigo I', 'Artigo')
    artigo3.add('Epígrafe do artigo 1.º')
    
    describe('#Artigo("Artigo I", "Artigo").add("Epígrafe do artigo 1.º")', function() {
        it('should return values for "Artigo I Epígrafe do artigo 1.º"', function() {
            assert.equal(artigo3.layer, 'Artigo')
            assert.equal(artigo3.type, 'Artigo')
            assert.equal(artigo3.nr, 'I')
            assert.equal(artigo3.epigraph, 'Epígrafe do artigo 1.º')
        })
    })

    var artigo4 = new Article('Artigo I', 'Artigo')
    artigo4.add('Epígrafe do artigo 1.º')
    artigo4.add('comentário')
    
    describe('#Artigo("Artigo I", "Artigo").add("Epígrafe do artigo 1.º").add("comentário")', function() {
        it('should return values for "comentário"', function() {
            assert.equal(artigo4.layer, 'Artigo')
            assert.equal(artigo4.type, 'Artigo')
            assert.equal(artigo4.nr, 'I')
            assert.equal(artigo4.epigraph, 'Epígrafe do artigo 1.º')
            assert.equal(artigo4.comments.length, 1)
            assert.equal(artigo4.comments[0], 'comentário')
        })
    })

    
    /*
    describe('#Parte.is("Parte I")', function() {
        it('should return true for "Parte I"', function() {
            assert.equal(Parte.is('Parte I'), true)
        })
    })
    
    describe('#Parte.is(" paRte ii ")', function() {
        it('should return true for " paRte ii "', function() {
            assert.equal(Parte.is(' paRte ii '), true)
        })
    })
    
    describe('#Parte.is("Parte 1")', function() {
        it('should return false for "Parte 1"', function() {
            assert.equal(Parte.is('Parte 1'), false)
        })
    })
    */
})
