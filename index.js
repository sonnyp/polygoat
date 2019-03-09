;(function (global) {
  'use strict'

  function polygoat (fn, cb, Promise) {
    if (typeof cb === 'function') {
      fn(cb)
    } else {
      var P = Promise || global.Promise
      return new P(function (resolve, reject) {
        fn(function () {
          var args = [].slice.call(arguments)
          var err = args.shift()
          if (err !== null && err !== undefined) {
            reject(err)
          } else {
            resolve(args.length > 1 ? args : args[0])
          }
        })
      })
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = polygoat
  } else {
    window.polygoat = polygoat
  }
}(typeof global !== 'undefined' ? global : this))
