polygoat
========

[![Build Status](https://img.shields.io/travis/sonnyp/polygoat/master.svg?style=flat-square)](https://travis-ci.org/sonnyp/polygoat/branches)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

![logo](./logo.png)

polygoat is a tool to make functions support both callback and promise styles.

* very small, < 30 lines of code
* no promise support/polyfill required
* simple, hack-free
* Node.js and browsers
* fast, see [benchmark](#benchmark)

# Getting started


`npm install polygoat`

----

```javascript
var pg = require('polygoat');
```

or

```xml
<script src="node_modules/polygoat/index.js"></script>
```
```javascript
var pg = window.polygoat
```

# Usage

```js
// wrap an asynchronous function with polygoat
function hybridReaddir (path, callback) {
  return pg(function (done) {
    fs.readdir(path, done)
  }, callback)
}

// hybridReaddir can be used as a promise
hybridReaddir('/').then(console.log)

// or with a callback
hybridReaddir('/', console.log)

// or with async/await via Babel
// https://ponyfoo.com/articles/understanding-javascript-async-await
async () => {
  console.log('listing...')
  console.log(await hybridReaddir('/'))
  console.log('done')
}()

// you can also pass the Promise implementation of your choice
var bluebird = require('bluebird')

function hybridReaddir (path, callback) {
  return pg(function (done) {
    fs.readdir(path, done)
  }, callback, bluebird)
}

hybridReaddir() instanceof bluebird // true
```

# Error handling

polygoat never throws, it passes exceptions to your callback so you don't have to.

```javascript
function delay (time, cb) {
  // do NOT throw before return pg(...)
  // in fact; do not write any code before
  return pg(function (done) {
    // inside you can throw all you want
    if (typeof time !== 'number') {
      throw new Error(time + ' is not a number')
    }
    setTimeout(done, time)
  }, cb)
}

// delay never throws and will callback with the error instead
delay('1000', function (err) {
  if (err) {
    console.log(err.toString()) // prints "Error: 1000 is not a number"
    console.log(err.stack) // for the stack trace
  }
})

// same when used as a promise but it shouldn't be much of a surprise
delay('1000').catch(function (err) {
  console.log(err.toString()) // prints "Error: 1000 is not a number"
  console.log(err.stack) // for the stack trace
})
```

# Example

See [example.js](https://github.com/sonnyp/polygoat/blob/master/example.js)

# Benchmark

See [benchmark](https://github.com/sonnyp/polygoat/tree/master/benchmark)

# Test

```
npm install standard
npm test
```

[Goat icon](https://thenounproject.com/term/goat/301185/) by [Agne Alesiute](https://thenounproject.com/grrrauf) from [the Noun Project](https://thenounproject.com)
