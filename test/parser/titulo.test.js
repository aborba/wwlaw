var assert = require('assert')
var Titulo = require('../../parser/titulo');

describe('Titulo', function() {

    var titulo = new Titulo('Título I')

    describe('#Titulo("Título I")', function() {
        it('should return values for "Título I" and "undefined" for epigraph', function() {
            assert.equal(titulo.layer, 'Titulo')
            assert.equal(titulo.type, 'Título')
            assert.equal(titulo.nr, 'I')
            assert.equal(typeof titulo.epigraph, 'undefined')
        })
    })

    var titulo2 = new Titulo('Título I Epígrafe do título 1')
    
    describe('#Titulo("Título I Epígrafe do título 1")', function() {
        it('should return values for "Título I Epígrafe do título 1"', function() {
            assert.equal(titulo2.layer, 'Titulo')
            assert.equal(titulo2.type, 'Título')
            assert.equal(titulo2.nr, 'I')
            console.log(titulo2.epigraph)
            assert.equal(titulo2.epigraph, 'Epígrafe do título 1')
        })
    })
    
    var titulo3 = new Titulo('Título I')
    titulo3.add('Epígrafe do título 1')
    
    describe('#Titulo("Título I").add("Epígrafe do título 1")', function() {
        it('should return values for "Título I Epígrafe do título 1"', function() {
            assert.equal(titulo3.layer, 'Titulo')
            assert.equal(titulo3.type, 'Título')
            assert.equal(titulo3.nr, 'I')
            assert.equal(titulo3.epigraph, 'Epígrafe do título 1')
        })
    })
    
    describe('#Titulo.is("Título I")', function() {
        it('should return true for "Título I"', function() {
            assert.equal(Titulo.is('Título I'), true)
        })
    })
   
    describe('#Titulo.is(" tÍTulo ii ")', function() {
        it('should return true for " tÍTulo ii "', function() {
            assert.equal(Titulo.is(' tÍTulo ii '), true)
        })
    })
   
    describe('#Titulo.is("Título 1")', function() {
        it('should return false for "Título 1"', function() {
            assert.equal(Titulo.is('Título 1'), false)
        })
    })
   
})
