;(function (global) {
  'use strict'

  function polygoat (fn, cb, Promise) {
    if (cb) {
      try {
        fn(cb)
      } catch (e) {
        cb(e)
      }
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

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = polygoat
  } else {
    window.polygoat = polygoat
  }
}(typeof global !== 'undefined' ? global : this))
