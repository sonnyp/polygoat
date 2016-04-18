;(function () {
  'use strict'

  var pg

  // Node.js, browserify, ...
  if (typeof module !== 'undefined' && module.exports) {
    pg = require('./index') // require('polygoat') for you
  // browsers
  } else {
    pg = window.polygoat
  }

  //
  // without polygoat, callback style only
  //
  function delay (time, cb) {
    setTimeout(cb, time)
  }

  delay(1000, function () {
    console.log('without polygoat')
  })

  //
  // with polygoat, callback and promise styles
  //
  function delay (time, cb) { // eslint-disable-line
    return pg(function (done) {
      if (typeof time !== 'number') {
        throw new Error(time + ' is not a number')
      }
      setTimeout(done, time)
    }, cb)
  }

  delay(1000, function () {
    console.log('with polygoat, callback style')
  })

  delay(1000).then(function () {
    console.log('with polygoat, promise style')
  })

  delay('1000', function (err) {
    if (err) {
      console.error(err.stack)
    }
  })

  delay('1000').catch(function (err) {
    console.error(err.stack)
  })
}())
