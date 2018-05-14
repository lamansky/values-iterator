'use strict'

const emptyIterator = require('empty-iterator')
const is = require('is-instance-of')
const isIterator = require('is-iterator')
const isObject = require('is-object')
const propValues = require('prop-values')
const sbo = require('sbo')
const typedArrays = require('typed-arrays').names()

module.exports = sbo((c, {inObj, arrays = [], maps = [], reflectObj, sets = []} = {}) => {
  if (isIterator(c)) return c
  if (Array.isArray(c) || typeof c === 'string') return c[Symbol.iterator]()
  if (is(c, [arrays, 'Map', maps, 'Set', sets, typedArrays])) return c.values()[Symbol.iterator]()
  if (isObject(c)) return propValues(c, {enumOnly: !reflectObj, own: !inObj})
  return emptyIterator()
})
