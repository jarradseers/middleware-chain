/*!
 * Chain.
 * Mixed async / sync example usage.
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
 * Contains some syncronous code that will execute seperately.
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
  console.log('Hi from one', context);
}

/**
 * Function Two.
 * Example function, logs 'hello' and currect context.
 * This function is syncronous.
 *
 * @param {Object} context Current context object.
 * @param {Function} next Next middleware in chain.
 */

function two(context, next) {
  context.two = 'Hello';
  console.log('Hello from two', context);
  console.log('Hi from two', context);
  return next();
}

/**
 * Function Three.
 * Example function, logs 'hello' and currect context.
 *
 * @param {Object} context Current context object.
 * @param {Function} next Next middleware in chain.
 */

function three(context, next) {
  console.log('Hi from three', context);
  setTimeout(function() {
    context.three = 'Hello';
    console.log('Hello from three', context);
  }, 1000);
}

// Chain all three functions.
chain([ one, two, three ]);