(function () {
  'use strict'

  module.exports = function polygoat (fn, cb, promise) {
    if (cb) {
      fn(function (err, res) {
        cb(err, res)
      })
    } else {
      var P = promise || Promise
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
}())
