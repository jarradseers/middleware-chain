# Middleware Chain

[![CI](https://github.com/jarradseers/middleware-chain/actions/workflows/ci.yml/badge.svg)](https://github.com/jarradseers/middleware-chain/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/middleware-chain.svg)](https://www.npmjs.com/package/middleware-chain)

Chain your node.js functions. Middleware Chain runs an array of synchronous or asynchronous functions in order, passing each one a shared context and a `next` callback, much as express handles middleware. Small, with no dependencies.

It works well with [consign](https://www.npmjs.com/package/consign) for autoloading the functions.

## Installation

```bash
$ npm install middleware-chain
```

## Usage

```
chain([context], chain);
```

```js
const chain = require('middleware-chain');

chain([one, two, three]);

// Optionally pass in a context
const app = { hello: 'world' };
chain(app, [one, two, three]);
```

Each function is called with `(context, next)`. Call `next()` to move on to the next function, now or later; a function that never calls it ends the chain.

| Parameter | Description |
|---|---|
| `context` | Optional object passed to every function in the chain. Defaults to `{}`. Throws if it is not an object. |
| `chain` | Required array of functions, called in order. Nested arrays are flattened. Throws if it is not an array. |

`chain` returns the context. The array you pass in is not modified, so the same array can be run again, including while an earlier run is still going.

## Full example

```js
const chain = require('middleware-chain');
const app = { main: 'Hello' };

function one(context, next) {
  setTimeout(() => {
    context.one = 'Hello';
    console.log('Hello from one', context);
    next();
  }, 1000);
}

function two(context, next) {
  setTimeout(() => {
    context.two = 'Hello';
    console.log('Hello from two', context);
    next();
  }, 1000);
}

function three(context) {
  setTimeout(() => {
    context.three = 'Hello';
    console.log('Hello from three', context);
  }, 1000);
}

chain(app, [one, two, three]);
```

Output:

```
Hello from one { main: 'Hello', one: 'Hello' }
Hello from two { main: 'Hello', one: 'Hello', two: 'Hello' }
Hello from three { main: 'Hello', one: 'Hello', two: 'Hello', three: 'Hello' }
```

There are more in the [examples folder](examples): nested chains, parallel chains, mixed synchronous and asynchronous functions, and loading the functions with consign.

## Tests

```bash
$ npm install
$ npm test
```

## License

[MIT](LICENSE)
