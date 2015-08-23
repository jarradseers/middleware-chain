/*!
 * Middleware Chain.
 * Main application entry.
 *
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 23/08/2015
 * @license MIT
 */

// Module dependencies.
var middlewareChain = require(__dirname + '/lib/middleware-chain');

// Return middleware chain lib.
module.exports = middlewareChain;