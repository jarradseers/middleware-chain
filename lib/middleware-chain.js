/*!
 * Middleware Chain.
 * Chain your node.js middleware / functions.
 *
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 23/08/2015
 * @license MIT
 */

/**
 * Flatten nested arrays into a new array.
 *
 * @param {array} list
 * @returns {array}
 */

function flatten(list) {
  return list.reduce(
    (flat, item) => flat.concat(Array.isArray(item) ? flatten(item) : item),
    []
  );
}

/**
 * Middleware Chain module.
 *
 * @param {object} context optional, passed to every function in the chain
 * @param {array} chain functions to call in order
 * @returns {object} the context
 */

module.exports = function middlewareChain(context, chain) {
  if (!chain) {
    chain = context;
    context = {};
  }

  // Context should be an object.
  if (typeof context !== 'object' || context === null || Array.isArray(context)) {
    throw new Error('Context must be an object.');
  }

  // Chain should be an array.
  if (!Array.isArray(chain)) {
    throw new Error('Chain must be an array.');
  }

  // Work on a copy, so the array passed in can be used again.
  const queue = flatten(chain);

  /**
   * Call the next function in the chain.
   */

  function next() {
    const middleware = queue.shift();

    if (typeof middleware === 'function') {
      middleware(context, next);
    }
  }

  // Start the chain.
  next();

  return context;
};
