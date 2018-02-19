'use strict'

const is = require('is-instance-of')
const isIterator = require('is-iterator')
const sbo = require('sbo')
const structures = ['Map', 'Set', require('typed-arrays').names()]

module.exports = sbo(c => isIterator(c) ? c : Array.isArray(c) ? c[Symbol.iterator]() : is(c, structures) ? c.values() : Object.values(c)[Symbol.iterator]())
