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

  it('should iterate Object values', function () {
    const i = values({key: 'value'})
    assert(isIterator(i))
    assert.strictEqual(i.next().value, 'value')
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate Set values', function () {
    const i = values(new Set(['a', 'b']))
    assert(isIterator(i))
    assert.strictEqual(i.next().value, 'a')
    assert.strictEqual(i.next().value, 'b')
    assert.strictEqual(i.next().done, true)
  })

  it('should iterate Typed Array values', function () {
    const i = values(new Int32Array(new ArrayBuffer(4)))
    assert.strictEqual(i.next().value, 0)
    assert.strictEqual(i.next().done, true)
  })

  it('should support the bind operator', function () {
    const i = values.call(['test'])
    assert.strictEqual(i.next().value, 'test')
    assert.strictEqual(i.next().done, true)
  })
})
