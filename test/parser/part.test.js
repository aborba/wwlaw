var assert = require('assert')
var Part = require('../../parser/part');

describe('Part', function() {

    var part = new Part('Parte I')

    describe('#Part("Parte I")', function() {
        it('should return values for "Parte I" and "undefined" for epigraph', function() {
            assert.equal(part.type, 'part')
            assert.equal(part.header, 'Parte')
            assert.equal(part.nr, 'I')
            assert.equal(typeof part.epigraph, 'undefined')
        })
    })

    var part2 = new Part('Parte I Epígrafe da parte 1')
    
    describe('#Part("Parte I Epígrafe da parte 1")', function() {
        it('should return values for "Parte I Epígrafe da parte 1"', function() {
            assert.equal(part2.type, 'part')
            assert.equal(part2.header, 'Parte')
            assert.equal(part2.nr, 'I')
            assert.equal(part2.epigraph, 'Epígrafe da parte 1')
        })
    })
    
    var part3 = new Part('Parte I')
    part3.add('Epígrafe da parte 1')
    
    describe('#Part("Parte I").add("Epígrafe da parte 1")', function() {
        it('should return values for "Parte I Epígrafe da parte 1"', function() {
            assert.equal(part3.type, 'part')
            assert.equal(part3.header, 'Parte')
            assert.equal(part3.nr, 'I')
            assert.equal(part3.epigraph, 'Epígrafe da parte 1')
        })
    })
    
    describe('#Part.matches("Parte I")', function() {
        it('should return true for "Parte I"', function() {
            assert.equal(Part.matches('Parte I'), true)
        })
    })
   
    describe('#Part.matches(" paRte ii ")', function() {
        it('should return true for " paRte ii "', function() {
            assert.equal(Part.matches(' paRte ii '), true)
        })
    })
   
    describe('#Part.matches("Parte 1")', function() {
        it('should return false for "Parte 1"', function() {
            assert.equal(Part.matches('Parte 1'), false)
        })
    })
   
})
