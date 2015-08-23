/*!
 * Chain.
 * Nested async example usage.
 *
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 23/08/2015
 * @license MIT
 */

// Module dependencies.
var chain = require(__dirname + '/../')
  , mocha = require('mocha')
  , assert = require('assert')
;

/**
 * Function One.
 * Example function, logs 'hello' and currect context.
 *
 * @param {Object} context Current context object.
 * @param {Function} next Next middleware in chain.
 */

function one(context, next) {
  setTimeout(function() {
    context.one = 'Hello';
    return next();
  }, 1);
}

/**
 * Function Two.
 * Example function, logs 'hello' and currect context.
 *
 * @param {Object} context Current context object.
 * @param {Function} next Next middleware in chain.
 */

function two(context, next) {
  setTimeout(function() {
    context.two = 'Hello';
    return next();
  }, 1);
}

/**
 * Function Three.
 * Example function, logs 'hello' and currect context.
 *
 * @param {Object} context Current context object.
 * @param {Function} next Next middleware in chain.
 */

function three(context, next) {
  setTimeout(function() {
    context.three = 'Hello';
    return next();
  }, 1);
}

/**
 * Counter Function.
 * Simple counter function, updates the context object.
 *
 * @param {Object} context Current context object.
 * @param {Function} next Next middleware in chain.
 */

function counter(context, next) {
  context.counter++;
  return next();
}

/**
 * Unit tests.
 */

describe('Context', function() {

  it("should error when passed in a function", function() {
    return assert.throws(function() {
      chain(function() {}, []);
    }, function(err) {
      return 'Context must be an object.' === err.message;
    });
  });

  it("should error when passed in an array", function() {
    return assert.throws(function() {
      chain([], []);
    }, function(err) {
      return 'Context must be an object.' === err.message;
    });
  });

  it("should error when passed in a string", function() {
    return assert.throws(function() {
      chain("test", []);
    }, function(err) {
      return 'Context must be an object.' === err.message;
    });
  });

  it("shouldn't error when passed in an object", function() {
    chain({ hello: 'there' }, []);
  });

  it("should execute syncronous examples and build up context", function() {
    var context = { counter: 0 };
    chain(context, [ counter, counter, counter ]);
    return assert.equal(context.counter, 3);
  });

});

describe('Chain', function() {

  it("should error when passed in a function", function() {
    return assert.throws(function() {
      chain({}, function() {});
    }, function(err) {
      return 'Chain must be an array.' === err.message;
    });
  });

  it("should error when passed in an object", function() {
    return assert.throws(function() {
      chain({}, {});
    }, function(err) {
      return 'Chain must be an array.' === err.message;
    });
  });

  it("should error when passed in a string", function() {
    return assert.throws(function() {
      chain({}, "test");
    }, function(err) {
      return 'Chain must be an array.' === err.message;
    });
  });

  it("shouldn't error when passed in an array", function() {
    chain({}, []);
  });

  it("shouldn't error when passed in as a single parameter", function() {
    chain([]);
  });

  it("should execute asyncronous examples, building up context", function (done) {
    chain([one, two, three, function(context, next) {
      assert.deepEqual(context, {
        one: 'Hello', two: 'Hello', three: 'Hello'
      });
      done();
    }]);
  });

});

