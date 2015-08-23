/*!
 * Chain.
 * Nested async example usage.
 *
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 23/08/2015
 * @license MIT
 */

// Module dependencies.
var chain = require(__dirname + '/../');

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
    console.log('Hello from one', context);
    return next();
  }, 1000);
}

/**
 * Function Two.
 * Example function, logs 'hello' and currect context.
 * Calls a new nested chain.
 *
 * @param {Object} context Current context object.
 * @param {Function} next Next middleware in chain.
 */

function two(context, next) {
  setTimeout(function() {
    context.two = 'Hello';
    console.log('Hello from two', context);
    chain({ nested: 'Hello' }, [ one, three ]);
    return next();
  }, 1000);
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
    console.log('Hello from three', context);
  }, 1000);
}

// Chain all three functions, passes in initial context.
chain({ main: 'Hello' }, [ one, two, three ]);