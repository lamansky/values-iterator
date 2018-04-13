# values-iterator

Returns an iterator of the values of an Array, Iterator, Object, Map, Set, or Typed Array. Useful for when you need the values of a collection object but aren’t sure what type of collection you’ll be given.

## Installation

Requires [Node.js](https://nodejs.org/) 7.0.0 or above.

```bash
npm i values-iterator
```

## API

The module exports a single function.

### Parameters

1. Bindable: `c` (Array, iterator, Object, Map, Set, string, or Typed Array)
2. Object argument:
    * Optional: `arrays` / `maps` / `sets` (array, class, or string): A class that should be treated as equivalent to `Array`/`Map`/`Set` (respectively), the string name of such a class, or an array of such classes/strings.
    * Optional: `inObj` (boolean): Whether or not to act like the “in” operator by including inherited Object property values. Only takes effect if `c` is an Object (i.e. not another recognized type). Defaults to `false`.
    * Optional: `reflectObj` (boolean): Whether or not to use reflection to include non-enumerable Object property values. Only takes effect if `c` is an Object (i.e. not another recognized type). Defaults to `false`.

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

#### Inherited Object Properties

Include Object property values from the prototype chain by setting `inObj` to `true`:

```javascript
const values = require('values-iterator')

function Cls () {}
Cls.prototype.key = 'value'

const i = values(new Cls(), {inObj: true})
i.next().value // 'value'
i.next().done // true
```

#### Non-Enumerable Object Properties

Include non-enumerable Object property values by setting `reflectObj` to `true`:

```javascript
const values = require('values-iterator')

const obj = {}
Object.defineProperty(obj, 'key', {value: 'value', enumerable: false})

const i = values(obj, {reflectObj: true})
i.next().value // 'value'
i.next().done // true
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

### Strings

`values-iterator` will treat a string like a character array.

```javascript
const values = require('values-iterator')

const i = keys('hi')
i.next().value // 'h'
i.next().value // 'i'
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
* [prop-values](https://github.com/lamansky/prop-values)
* [values-array](https://github.com/lamansky/values-array)
