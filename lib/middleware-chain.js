/*!
 * Middleware Chain.
 * Chain your node.js middleware / functions.
 *
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 23/08/2015
 * @license MIT
 */

// Module dependencies.
var util = require('util');

/**
 * Middleware Chain module.
 * Main middleware chain module export.
 *
 * @param {Object} context Optional initial context object.
 * @param {Array} chain Array of middleware functions to call in order.
 * @exports Chain module
 */

module.exports = function(context, chain) {
  if (!chain) {
    chain = context;
    context = {};
  }

  // Context should be an object.
  if (typeof context !== 'object' || util.isArray(context)) {
    throw new Error('Context must be an object.')
  }

  // Chain should be an array.
  if (!util.isArray(chain)) {
    throw new Error('Chain must be an array.');
  }

  /**
   * Next function.
   * Calls the next middleware in chain.
   */

  function next() {
    var middleware = chain.shift();

    if (middleware && typeof middleware === 'function') {
      middleware.call(this, context, next);
    }

    return this;
  }

  // Start the chain.
  return next();
};