# Middleware Chain
  
  Chain your node.js functions.

  Middleware Chain allows you to simply chain your syncronous / asyncronous middleware functions. It works in a very similar way to how express handles middleware.

  Works really well using the [consign](https://www.npmjs.com/package/consign) module to autoload your scripts.

## Usage

```
chain([context], chain);
```

```js
var chain = require('middleware-chain');

chain([ one, two, three ]);

// Optionally pass in context
var app = { hello: 'world' };
chain(app, [ one, two, three ]);
```

Please check out the [examples](examples) or [test folder](test) for more!

## Installation

```bash
$ npm install middleware-chain
```

## Features

  * Chain functions / middleware
  * Works with both asyncronous and syncronous functions
  * Brings structure to scripts with a lot of callbacks
  * Allows modifiable flow
  * Ability to pass in initial context
  * Chains are nestable
  * Ability for parrallel chains
  * Test driven
  * Fast, Light-weight with no external dependencies

## Context parameter

  The optional context object is passed in as the first parameter, it can be an object containing anything you'd like to access throughout your middleware chain.

## Chain parameter

  The chain parameter is required, it's an array containing functions to be called in order.

## Tests

  To run the test suite, first install the dependencies, then run `npm test`:

  ```bash
  $ npm install
  $ npm test
  ```

## Full Example

```js
var chain = require('middleware-chain')
  , app = { main: 'Hello' }
;

function one(context, next) {
  setTimeout(function() {
    context.one = 'Hello';
    console.log('Hello from one', context);
    return next();
  }, 1000);
}

function two(context, next) {
  setTimeout(function() {
    context.two = 'Hello';
    console.log('Hello from two', context);
    return next();
  }, 1000);
}

function three(context, next) {
  setTimeout(function() {
    context.three = 'Hello';
    console.log('Hello from three', context);
  }, 1000);
}

chain(app, [ one, two, three ]);
```

### Output

```bash
Hello from one, { main: 'Hello', one: 'Hello' }
Hello from two, { main: 'Hello', one: 'Hello', two: 'Hello' }
Hello from three, { main: 'Hello', one: 'Hello', two: 'Hello', three: 'Hello' }
```

## License

  [MIT](LICENSE)