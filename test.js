'use strict'

var pg = require('.')
var assert = require('assert')

function testResolve (some, arg, cb) {
  return pg(function (done) {
    setTimeout(function () {
      done(null, 'yeah!')
    }, 10)
  }, cb)
}

testResolve('foo', 'bar', function (err, res) {
  assert.strictEqual(err, null)
  assert.strictEqual(res, 'yeah!')
})

testResolve('foo', 'bar').then(function (res) {
  assert.strictEqual(res, 'yeah!')
})

testResolve('foo', 'bar').catch(function () {
  assert.fail('promise should not have rejected')
})

function testReject (cb) {
  return pg(function (done) {
    setTimeout(function () {
      done('error!!')
    }, 10)
  }, cb)
}

testReject(function (err, res) {
  assert.strictEqual(err, 'error!!')
  assert.strictEqual(res, undefined)
})

testReject().then(function () {
  assert.fail('promise should not have fulfilled')
})

testReject().catch(function (err) {
  assert.strictEqual(err, 'error!!')
})
