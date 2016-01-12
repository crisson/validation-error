var chai = require('chai');
var len = require('object-size');

var expect = chai.expect

describe('ValidationError', function() {
    it('may be instantiated via new operator')
    it('may be created via function application')

    describe('.concat', function() {
        it('returns an instanceof ValidationError')
        it('includes key-value pairs from other object')
        it('overwrites existing key-value pairs')
        it('does not clober dissimilar key-value pairs')
    });

    describe('.toArray', function() {
        it('returns an instance of Array')
        it('returns an empty array of there are no values')
        it('contains all values from this instance of ValidationError')
    });

    describe('.toObject', function() {
        it('returns an empty object if there are no values')
        it('returns an object containing all key-value pairs')
    });

    describe('.toJSON', function() {
        it('returns an empty object if there are no values')
        it('returns an object containing all key-value pairs')
    });    
});