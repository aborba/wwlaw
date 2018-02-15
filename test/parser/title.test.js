var assert = require('assert')
var Title = require('../../parser/title');

describe('Title', function() {

    var title = new Title('Título I')

    describe('#Title("Título I")', function() {
        it('should return values for "Título I" and "undefined" for epigraph', function() {
            assert.equal(title.type, 'title')
            assert.equal(title.header, 'Título')
            assert.equal(title.nr, 'I')
            assert.equal(typeof title.epigraph, 'undefined')
        })
    })

    var title2 = new Title('Título I Epígrafe do título 1')
    
    describe('#Title("Título I Epígrafe do título 1")', function() {
        it('should return values for "Título I Epígrafe do título 1"', function() {
            assert.equal(title2.type, 'title')
            assert.equal(title2.header, 'Título')
            assert.equal(title2.nr, 'I')
            console.log(title2.epigraph)
            assert.equal(title2.epigraph, 'Epígrafe do título 1')
        })
    })
    
    var title3 = new Title('Título I')
    title3.add('Epígrafe do título 1')
    
    describe('#Title("Título I").add("Epígrafe do título 1")', function() {
        it('should return values for "Título I Epígrafe do título 1"', function() {
            assert.equal(title3.type, 'title')
            assert.equal(title3.header, 'Título')
            assert.equal(title3.nr, 'I')
            assert.equal(title3.epigraph, 'Epígrafe do título 1')
        })
    })
    
    describe('#Title.matches("Título I")', function() {
        it('should return true for "Título I"', function() {
            assert.equal(Title.matches('Título I'), true)
        })
    })
   
    describe('#Title.matches(" tÍTulo ii ")', function() {
        it('should return true for " tÍTulo ii "', function() {
            assert.equal(Title.matches(' tÍTulo ii '), true)
        })
    })
   
    describe('#Title.matches("Título 1")', function() {
        it('should return false for "Título 1"', function() {
            assert.equal(Title.matches('Título 1'), false)
        })
    })
   
})
