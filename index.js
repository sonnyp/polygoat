;(function (global) {
  'use strict'

  function polygoat (fn, cb, Promise) {
    if (cb) {
      fn(function (err, res) {
        cb(err, res)
      })
    } else {
      var P = Promise || global.Promise
      return new P(function (resolve, reject) {
        fn(function (err, res) {
          if (err !== null && err !== undefined) {
            reject(err)
          } else {
            resolve(res)
          }
        })
      })
    }
  }

  function goatify (fn) {
    return function () {
      var args = Array.prototype.slice.call(arguments)
      var callback = typeof args[args.length - 1] === 'function' ? args.pop() : null
      return polygoat(function (done) {
        args.push(done)
        fn.apply(null, args)
      }, callback)
    }
  }

  polygoat.goatify = goatify

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = polygoat
  } else {
    window.polygoat = polygoat
  }
}(typeof global !== 'undefined' ? global : this))
