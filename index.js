var objectAssign = require('object-assign')

/**
 * A container for validation information
 * @class
 * @implements {Semigroup} the fantasy land semigroup
 * @param {String} key  
 * @param {Any} value
 */
function ValidationError(key, value) {
    if (!(this instanceof ValidationError)) {
        return new ValidationError(key, value)
    }

    if (key === null || key === undefined) {
        return
    }

    this[key] = value
}

ValidationError.prototype = {

    /**
     * Return the value associated with the key, or undefined if the key does
     * not exist
     * @param  {String} key
     * @return {Any|undefined}
     */
    get: function(key){
        return this[key]
    },

    /**
     * @see Monoid#empty
     * @see https://github.com/fantasyland/fantasy-land#monoid
     * @return {ValidationError}
     */
    empty: function(){
        return ValidationError.of()
    },


    /**
     * Combines the enumerable own-properties of [others] with those of
     * this instance
     * @param  {...ValidationError} others
     * @return {ValidationError}       this instance, mutated.
     */
    concat: function() {
        var newval = ValidationError.of()
        return objectAssign.apply(null, [].concat(newval, this,
            Array.prototype.slice.call(arguments)))
    },

    /**
     * Returns the values associated with this object's enumerable own-properties.
     * @return {Array.<Any>}
     */
    toArray: function() {
        var self = this;
        return Object.keys(this).map(function(key) {
            return self[key]
        })
    },

    /**
     * Returns a bare object containing own-properties of this object
     * @return {Object}
     */
    toObject: function() {
        var self = this;
        return Object.keys(this).reduce(function(obj, key) {
            obj[key] = self[key]
            return obj
        }, Object.create(null))
    },

    toJSON: function() {
        return this.toObject()
    }
}

ValidationError.of = function of (key, value) {
    return new ValidationError(key, value)
}

module.exports = ValidationError
