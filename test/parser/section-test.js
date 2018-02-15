var assert = require('assert')
var Section = require('../../parser/section');

describe('Section', function() {
    
    var section = new Section('Secção I')
    
    describe('#Section("Secção I")', function() {
        it('should return values for "Secção I" and "undefined" for epigraph', function() {
            assert.equal(section.type, 'section')
            assert.equal(section.header, 'Secção')
            assert.equal(section.nr, 'I')
            assert.equal(typeof section.epigraph, 'undefined')
        })
    })
    
    var section2 = new Section('Secção I Epígrafe da secção 1')
    
    describe('#Section("Secção I Epígrafe da secção 1")', function() {
        it('should return values for "Parte I Epígrafe da secção 1"', function() {
            assert.equal(section2.type, 'section')
            assert.equal(section2.header, 'Secção')
            assert.equal(section2.nr, 'I')
            assert.equal(section2.epigraph, 'Epígrafe da secção 1')
        })
    })
    
    var section3 = new Section('Secção I')
    section3.add('Epígrafe da secção 1')
    
    describe('#Section("Secção I").add("Epígrafe da secção 1")', function() {
        it('should return values for "Parte I Epígrafe da secção 1"', function() {
            assert.equal(section3.type, 'section')
            assert.equal(section3.header, 'Secção')
            assert.equal(section3.nr, 'I')
            assert.equal(section3.epigraph, 'Epígrafe da secção 1')
        })
    })

    describe('#Section.matches("Secção I")', function() {
        it('should return true for "Secção I"', function() {
            assert.equal(Section.matches('Secção I'), true)
        })
    })
    
    describe('#Section.matches(" seCÇãO ii ")', function() {
        it('should return true for " seCÇãO ii "', function() {
            assert.equal(Section.matches(' seCÇãO ii '), true)
        })
    })
    
    describe('#Section.matches("Secção 1")', function() {
        it('should return false for "Secção 1"', function() {
            assert.equal(Section.matches('Secção 1'), false)
        })
    })

})
