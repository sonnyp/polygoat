;(function () {
  'use strict'

  var benchmark
  var pg
  var bluebird

  if (typeof module !== 'undefined' && module.exports) {
    benchmark = require('benchmark')
    pg = require('..')
    bluebird = require('bluebird')
  } else {
    benchmark = window.Benchmark
    pg = window.polygoat
    bluebird = window.Promise.noConflict()
  }

  function polygotDelay (time, cb) {
    return pg(function (done) {
      setTimeout(cb, time)
    }, cb)
  }

  function promiseDelay (time) {
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, time)
    })
  }

  function callbackDelay (time, cb) {
    setTimeout(function () {
      cb()
    }, time)
  }

  var promisified = bluebird.promisify(callbackDelay)

  var time = 10

  var callSuite = new benchmark.Suite('call time')
  callSuite
  .add('polygoat promise', function () {
    polygotDelay(time).then(function () {})
  })
  .add('polygoat callback', function () {
    polygotDelay(time, function () {})
  })
  .add('plain promise', function () {
    promiseDelay(time).then(function () {})
  })
  .add('plain callback', function () {
    callbackDelay(time, function () {})
  })
  .add('bluebird promisified (eval on Node.js, closure on browser)', function () {
    promisified(time).then(function () {})
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })

  var creationSuite = new benchmark.Suite('function creation')
  creationSuite.add('polygoat', function () {
    return function (time, cb) {
      return pg(function (done) {
        setTimeout(cb, time)
      }, cb)
    }
  })
  .add('callback', function () {
    return function (time, cb) {
      setTimeout(function () {
        cb()
      }, time)
    }
  })
  .add('promise', function () {
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, time)
    })
  })
  .add('bluebird promisify (eval on Node.js, closure on browser)', function () {
    return bluebird.promisify(function (time, cb) {
      setTimeout(cb, time)
    })
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })

  // not using async: false because the process would run out of memory
  console.log(callSuite.name)
  callSuite
  .run({'async': true})
  .on('complete', function () {
    console.log('\n' + creationSuite.name)
    creationSuite.run({'async': true})
  })
}())
