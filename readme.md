# values-iterator

Returns an iterator of the values of an Array, Iterator, Object, Map, Set, or Typed Array. Useful for when you need the values of a collection object but aren’t sure what type of collection you’ll be given.

## Installation

Requires [Node.js](https://nodejs.org/) 7.0.0 or above.

```bash
npm i values-iterator
```

## API

The module exports a single function.

### Parameter

Bindable: `c` (Array, Iterator, Object, Map, Set, or Typed Array)

### Return Value

An iterator which yields values from the collection.

## Examples

### Arrays

```javascript
const values = require('values-iterator')

const i = values(['a', 'b'])
i.next().value // 'a'
i.next().value // 'b'
i.next().done // true

// Supports the bind operator
['a', 'b']::values()
```

### Iterators

```javascript
const values = require('values-iterator')

function * gen () {
  yield 'a'
  yield 'b'
}

const i = values(gen())
i.next().value // 'a'
i.next().value // 'b'
i.next().done // true
```

### Maps

```javascript
const values = require('values-iterator')

const map = new Map()
map.set('key', 'value')

const i = values(map)
i.next().value // 'value'
i.next().done // true
```

### Objects

```javascript
const values = require('values-iterator')

const i = values({key: 'value'})
i.next().value // 'value'
i.next().done // true

// Supports the bind operator
const obj = {key: 'value'}
obj::values()
```

### Sets

```javascript
const values = require('values-iterator')

const set = new Set()
set.add('first')
set.add('second')

const i = values(set)
i.next().value // 'first'
i.next().value // 'second'
i.next().done // true
```

### Typed Arrays

```javascript
const values = require('values-iterator')

const typedArray = new Int32Array(new ArrayBuffer(4))

const i = values(typedArray)
i.next().value // 0
i.next().done // true
```

## Related

* [entries-iterator](https://github.com/lamansky/entries-iterator)
* [entries-array](https://github.com/lamansky/entries-array)
* [keys-iterator](https://github.com/lamansky/keys-iterator)
* [keys-array](https://github.com/lamansky/keys-array)
* [values-array](https://github.com/lamansky/values-array)
