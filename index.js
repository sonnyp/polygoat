;(function (global) {
  'use strict'

  function polygoat (fn, cb, Promise) {
    if (typeof cb === 'function') {
      fn(cb)
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

  function goatifyAll (obj) {
    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {
        var v = obj[k]
        if (typeof v === 'function') { // FIXME IIRC this fails on old browsers
          obj[k] = goatify(v)
        }
      }
    }
    return obj
  }

  polygoat.goatify = goatify
  polygoat.goatifyAll = goatifyAll

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = polygoat
  } else {
    window.polygoat = polygoat
  }
}(typeof global !== 'undefined' ? global : this))
