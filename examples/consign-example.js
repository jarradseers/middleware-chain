/*!
 * Middleware Chain.
 * Basic consign example usage.
 *
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 23/08/2015
 * @license MIT
 */

// Module dependencies.
var chain = require(__dirname + '/../')
  , consign = require('consign')
  , app = { name: 'my-app' }
;

// Load middleware using consign.
consign().include('middleware').into(app);

// Chain all three functions.
chain([
  app.middleware.one.run,
  app.middleware.two.run,
  app.middleware.three.run
]);