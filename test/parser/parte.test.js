var assert = require('assert')
var Parte = require('../../parser/parte');

describe('Parte', function() {

    var parte = new Parte('Parte I')

    describe('#Parte("Parte I")', function() {
        it('should return values for "Parte I" and "undefined" for epigraph', function() {
            assert.equal(parte.layer, 'Parte')
            assert.equal(parte.type, 'Parte')
            assert.equal(parte.nr, 'I')
            assert.equal(typeof parte.epigraph, 'undefined')
        })
    })

    var parte2 = new Parte('Parte I Epígrafe da parte 1')
    
    describe('#Parte("Parte I Epígrafe da parte 1")', function() {
        it('should return values for "Parte I Epígrafe da parte 1"', function() {
            assert.equal(parte2.layer, 'Parte')
            assert.equal(parte2.type, 'Parte')
            assert.equal(parte2.nr, 'I')
            assert.equal(parte2.epigraph, 'Epígrafe da parte 1')
        })
    })
    
    var parte3 = new Parte('Parte I')
    parte3.add('Epígrafe da parte 1')
    
    describe('#Parte("Parte I").add("Epígrafe da parte 1")', function() {
        it('should return values for "Parte I Epígrafe da parte 1"', function() {
            assert.equal(parte3.layer, 'Parte')
            assert.equal(parte3.type, 'Parte')
            assert.equal(parte3.nr, 'I')
            assert.equal(parte3.epigraph, 'Epígrafe da parte 1')
        })
    })
    
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
   
})