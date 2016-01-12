var chai = require('chai');
var chaiThings = require('chai-things')
var len = require('object-size');
var ValidationError = require('./index')

chai.use(chaiThings)
var expect = chai.expect

describe('ValidationError', function() {
    var key = 'key'
    var value = 'value'

    var ve;

    function createValidationError(){
        ve = ValidationError(key, value)
    }

    

    it('may be instantiated via new operator', function(){
        var ve = new ValidationError(key, value)
        expect(ve).to.be.instanceOf(ValidationError)
    })

    it('may be created via function application', function(){
        var ve = ValidationError(key, value)
        expect(ve).to.be.instanceOf(ValidationError)
    })

    describe('.constructor', function() {
        it('produces an object including the key and value args', function(){
            var ve = ValidationError(key, value)
            expect(ve).to.have.property(key, value)
        })
    });

    describe('.empty', function() {
        beforeEach(createValidationError)
        it('satisfies fantasy-land Monoid left & right identities', function(){
            expect(ve.concat(ve.empty())).to.eql(ve)
            expect(ve.empty().concat(ve)).to.eql(ve)
        })
    });

    describe('.concat', function() {
        beforeEach(createValidationError)

        it('returns a new instanceof ValidationError', function(){
            var ve1 = ValidationError('key1', 'value1')
            var ve2 = ve.concat(ve1)
            expect(ve2).to.be.instanceof(ValidationError)
            expect(ve2).to.not.equal(ve)
            expect(ve2).to.not.equal(ve1)
        })

        it('includes key-value pairs from other object', function(){
            var ve1 = ve.concat(ValidationError('key1', 'value1'))
            expect(ve1).to.have.property('key1', 'value1')
        })

        it('overwrites existing key-value pairs', function(){
            var ve1 = ve.concat(ValidationError(key, 'value1'))
            expect(ve1).to.have.property(key, 'value1')
        })

        it('does not clobber dissimilar key-value pairs', function(){
            var ve1 = ve.concat(ValidationError('key1', 'value1'))
            expect(ve1).to.have.property('key1', 'value1')
            expect(ve1).to.have.property(key, value)
        })

        it('implements the fantasy-land semigroup interface', function(){
            // concat must be associative
            var ve1 = ve.concat(ValidationError('key1', 'value1'))
            var ve2 = ve1.concat(ValidationError('key2', 'value2'))
            expect(ve2).to.have.property('key1', 'value1')
            expect(ve2).to.have.property(key, value)
            expect(ve2).to.have.property('key2', 'value2')

            var ve3 = ve.concat(ValidationError('key1', 'value1').concat(
                ValidationError('key2', 'value2')
            ))
            expect(ve3).to.have.property('key1', 'value1')
            expect(ve3).to.have.property(key, value)
            expect(ve3).to.have.property('key2', 'value2')
        })

    });

    describe('.toArray', function() {
        var ve = ValidationError(key, value)

        it('returns an instance of Array', function(){
            expect(ve.toArray()).to.be.a('array')
        })

        it('returns an empty array of there are no values', function(){
            expect(ValidationError().toArray()).to.be.a('array').be.empty
        })

        it('contains all values from this instance of ValidationError', function(){
            expect(ve.toArray()).to.be.a('array').have.lengthOf(1)
                .include.something(value)
        })

    });

    describe('.toObject', function() {
        it('returns an empty object if there are no values', function(){
            expect(ValidationError().toObject()).to.eql(Object.create(null))
        })

        it('returns an object containing all key-value pairs', function(){
            var obj = Object.create(null)
            obj[key] = value
            expect(ve.toObject()).to.eql(obj)
        })

    });

    describe('.toJSON', function() {
        it('returns an empty object if there are no values', function(){
            expect(ValidationError().toJSON()).to.eql(Object.create(null))
        })

        it('returns an object containing all key-value pairs', function(){
            var obj = Object.create(null)
            obj[key] = value
            expect(ve.toJSON()).to.eql(obj)
        })

    });    

    describe('.get', function() {
        it('returns undefined if the key does not exist', function(){
            expect(ve.get()).to.equal(undefined)
        })

        it('returns value associated with key', function(){
            expect(ve.get(key)).to.equal(value)
        })
    });

    describe('#of', function() {
        it('creates a new instance of ValidationError', function(){
          var ve = ValidationError.of(key, value)
          expect(ve).to.be.instanceOf(ValidationError)      
        })
    });
});