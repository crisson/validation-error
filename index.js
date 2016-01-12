var objectAssign = require('object-assign')

function ValidationError(key, value) {
    if (!(this instanceof ValidationError)) {
        return new ValidationError(key, vlaue)
    }

    if (key === null || key === undefined) {
        return
    }

    this[key] = value
}

ValidationError.prototype = {
    /**
     * Combines the enumerable own-properties of [other] with those of
     * this instance
     * @param  {ValidationError} other
     * @return {ValidationError}       this instance, mutated.
     */
    concat: function(other) {
        return objectAssign.assign(this, other)
    },

    /**
     * Returns the values associated with this-objects enumerable own-properties.
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
