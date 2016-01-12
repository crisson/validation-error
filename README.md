# validation-error [![Build Status](https://travis-ci.org/crisson/validation-error.svg?branch=master)](https://travis-ci.org/crisson/validation-error)

A useful error container.  It works well with [monet](https://github.com/cwmyers/monet.js)'s `Validation` applicative functor, but it may be used as a standalone library as well.  For an example of its use with monet, checkout [validation-example](https://github.com/crisson/validation-example).

## Install

```sh
$ npm install --save validation-error
```


## Usage

```js
var ValidationError = require('validation-error');

var ve = ValidationError.of("username", "username is invalid"); // preferred
// OR ValidationError("username", "username is invalid") 
// OR new ValidationError("username", "username is invalid")

// concatenate other validation errors 
var ve = ValidationError.of("username", "username is invalid");
var ve1 = ValidationError.of("email", "email is invalid")
var ve2 = ve.concat(ve1)
//=> object containg {username: "username is invalid, email: "email is invalid")

```

Review [tests](index-test.js) for a complete specification.

## Interoperability
<a href="https://github.com/fantasyland/fantasy-land"><img width="82" height="82" alt="Fantasy Land" src="https://raw.github.com/puffnfresh/fantasy-land/master/logo.png"></a>

Conforms to the [Fantasy Land](https://github.com/fantasyland/fantasy-land) `Semigroup` and `Monoid`  interfaces.

## API

### .get(key)

Return the value associated with the key, or undefined if the key does not exist

### .empty()

Returns the zero for this Monoid.

### .concat(source, [source, ...])

Assigns enumerable own keys of `source` objects to a new `ValidationError` object and returns it. Additional `source` objects will overwrite previous ones.  The current instance is not mutated.

### .toArray()

Returns the values associated with this object's enumerable own-properties.

### .toObject()

Returns a bare object containing enumerable own-properties of this object

### .toJSON()

Returns a bare object containing enumerable own-properties of this object

## License

MIT © Crisson Jno-Charles
