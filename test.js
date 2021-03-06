'use strict'

const assert = require('assert')
const isIterator = require('is-iterator')
const values = require('.')

describe('valuesIterator()', function () {
  it('should iterate Array values', function () {
    const i = values(['a', 'b'])
    assert(isIterator(i))
    assert.strictEqual(i.next().value, 'a')
    assert.strictEqual(i.next().value, 'b')
    assert.strictEqual(i.next().done, true)
  })

  it('should return an iterator as-is', function () {
    let i = ['a', 'b'][Symbol.iterator]()
    assert(isIterator(i))
    i = values(i)
    assert(isIterator(i))
    assert.strictEqual(i.next().value, 'a')
    assert.strictEqual(i.next().value, 'b')
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate Map values', function () {
    const i = values(new Map([['key', 'value']]))
    assert(isIterator(i))
    assert.strictEqual(i.next().value, 'value')
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate values of a custom Map class', function () {
    class MyMap {
      values () { return ['value'] }
    }
    assert.strictEqual(values(new MyMap()).next().done, true)
    const i = values(new MyMap(), {maps: MyMap})
    assert(isIterator(i))
    assert.strictEqual(i.next().value, 'value')
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate values of a custom Map class referenced by name string', function () {
    class MyMap {
      values () { return ['value'] }
    }
    assert.strictEqual(values(new MyMap()).next().done, true)
    const i = values(new MyMap(), {maps: 'MyMap'})
    assert(isIterator(i))
    assert.strictEqual(i.next().value, 'value')
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate Object values', function () {
    const i = values({key: 'value'})
    assert(isIterator(i))
    assert.strictEqual(i.next().value, 'value')
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate inherited Object property values if `inObj` is true', function () {
    function A () {}
    A.prototype.key = 'value'
    const a = Array.from(values(new A(), {inObj: true}))
    assert.strictEqual(a.length, 1)
    assert(a.some(v => v === 'value'))
  })

  it('should iterate non-enumerable Object prop values if `reflectObj` is true', function () {
    const obj = {}
    Object.defineProperty(obj, 'key', {value: 'value', enumerable: false})
    assert.strictEqual(Array.from(values(obj)).length, 0)
    const a = Array.from(values(obj, {reflectObj: true}))
    assert.strictEqual(a.length, 1)
    assert(a.some(v => v === 'value'))
  })

  it('should iterate Set values', function () {
    const i = values(new Set(['a', 'b']))
    assert(isIterator(i))
    assert.strictEqual(i.next().value, 'a')
    assert.strictEqual(i.next().value, 'b')
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate String characters', function () {
    const i = values('hi')
    assert(isIterator(i))
    assert.strictEqual(i.next().value, 'h')
    assert.strictEqual(i.next().value, 'i')
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate Typed Array values', function () {
    const i = values(new Int32Array(new ArrayBuffer(4)))
    assert.strictEqual(i.next().value, 0)
    assert.strictEqual(i.next().done, true)
  })

  it('should return an empty iterator for undefined', function () {
    const i = values()
    assert(isIterator(i))
    assert.strictEqual(i.next().done, true)
  })

  it('should return an empty iterator for null', function () {
    const i = values(null)
    assert(isIterator(i))
    assert.strictEqual(i.next().done, true)
  })

  it('should return an empty iterator for a number', function () {
    const i = values(123)
    assert(isIterator(i))
    assert.strictEqual(i.next().done, true)
  })

  it('should return an empty iterator for a symbol', function () {
    const i = values(Symbol.iterator)
    assert(isIterator(i))
    assert.strictEqual(i.next().done, true)
  })

  it('should support the bind operator', function () {
    const i = values.call(['test'])
    assert.strictEqual(i.next().value, 'test')
    assert.strictEqual(i.next().done, true)
  })
})
