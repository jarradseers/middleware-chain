/*!
 * Middleware Chain.
 * Consign middleware example usage.
 *
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 23/08/2015
 * @license MIT
 */

module.exports = function(app) {

  this.run = function(context, next) {
    setTimeout(function() {
      context.two = 'Hello';
      console.log('Hello from two', context);
      return next();
    }, 1000);
  }

  // Return this module.
  return this;

};