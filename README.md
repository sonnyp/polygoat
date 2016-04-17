polygoat
========

[![Build Status](https://img.shields.io/travis/sonnyp/polygoat/master.svg?style=flat-square)](https://travis-ci.org/sonnyp/polygoat/branches)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

![logo](./logo.png)

polygoat is a tool to make functions support both callback and promise style.

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
function hybridFunction (path, callback) {
  return pg(function (done) {
    fs.readdir(path, done)
  }, callback)
}

// hybridFunction can be used with promise style
hybridFunction('/').then(console.log)

// or callback style
hybridFunction('/', console.log)

// you can also pass the Promise implementation of your choice
var bluebird = require('bluebird')

function hybridFunction (path, callback) {
  return pg(function (done) {
    fs.readdir(path, done)
  }, callback, bluebird)
}

hybridFunction() instanceof bluebird // true
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
