/*!
 * Middleware Chain.
 * Test entry.
 *
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 23/08/2015
 * @license MIT
 */

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const chain = require('../');

const later = (name) => (context, next) => {
  setTimeout(() => {
    context[name] = 'Hello';
    next();
  }, 1);
};

const one = later('one');
const two = later('two');
const three = later('three');

function counter(context, next) {
  context.counter++;
  next();
}

describe('Context', () => {

  for (const [name, value] of [['a function', () => {}], ['an array', []], ['a string', 'test'], ['null', null]]) {
    test(`should error when passed ${name}`, () => {
      assert.throws(() => chain(value, []), { message: 'Context must be an object.' });
    });
  }

  test('should accept an object', () => {
    chain({ hello: 'there' }, []);
  });

  test('should default to an empty object', (t, done) => {
    chain([(context) => {
      assert.deepEqual(context, {});
      done();
    }]);
  });

  test('should be passed to every function and returned', () => {
    const context = { counter: 0 };

    assert.equal(chain(context, [counter, counter, counter]), context);
    assert.equal(context.counter, 3);
  });

});

describe('Chain', () => {

  for (const [name, value] of [['a function', () => {}], ['an object', {}], ['a string', 'test']]) {
    test(`should error when passed ${name}`, () => {
      assert.throws(() => chain({}, value), { message: 'Chain must be an array.' });
    });
  }

  test('should accept an empty array, with or without a context', () => {
    chain({}, []);
    chain([]);
  });

  test('should run asynchronous functions in order, building up context', (t, done) => {
    chain([one, two, three, (context) => {
      assert.deepEqual(Object.keys(context), ['one', 'two', 'three']);
      done();
    }]);
  });

  test('should mix synchronous and asynchronous functions', (t, done) => {
    chain({ counter: 0 }, [counter, one, counter, (context) => {
      assert.deepEqual(context, { counter: 2, one: 'Hello' });
      done();
    }]);
  });

  test('should stop when a function does not call next', () => {
    const context = { counter: 0 };

    chain(context, [counter, () => {}, counter]);

    assert.equal(context.counter, 1);
  });

  test('should stop at an item that is not a function', () => {
    const context = { counter: 0 };

    chain(context, [counter, 'not a function', counter]);

    assert.equal(context.counter, 1);
  });

  test('should not modify the array, so it can be used again', () => {
    const list = [counter, counter];
    const context = { counter: 0 };

    chain(context, list);
    chain(context, list);

    assert.equal(list.length, 2);
    assert.equal(context.counter, 4);
  });

  test('should flatten nested arrays', () => {
    const context = { counter: 0 };

    chain(context, [counter, [counter, [counter, counter]], counter]);

    assert.equal(context.counter, 5);
  });

  test('should run separate chains in parallel', (t, done) => {
    const finished = [];
    const end = (context) => {
      finished.push(context);
      if (finished.length === 2) {
        assert.notEqual(finished[0], finished[1]);
        assert.deepEqual(finished[0], finished[1]);
        done();
      }
    };

    chain([one, two, end]);
    chain([one, two, end]);
  });

  test('should allow a chain inside a chain', (t, done) => {
    chain({ outer: true }, [one, (context, next) => {
      chain({ inner: true }, [three, (nested) => {
        assert.deepEqual(nested, { inner: true, three: 'Hello' });
        next();
      }]);
    }, (context) => {
      assert.deepEqual(context, { outer: true, one: 'Hello' });
      done();
    }]);
  });

});
