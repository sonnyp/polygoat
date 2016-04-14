polygoat
========

![logo](./logo.png)

Make a JavaScript function support both promise and callback styles.

[![Build Status](https://img.shields.io/travis/sonnyp/polygoat/master.svg?style=flat-square)](https://travis-ci.org/sonnyp/polygoat/branches)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

While you can use polygoat to promsify/thenify any callback function, it is most useful to library authors. Use it to let the users/consumers of your API decide if they want to use callbacks or promises.

It is also an elegant way to support platforms without promise support and let the users decide if they want to load a polyfill.

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
// wrap and expose your asynchronous function with polygoat
function myFunction (some, arg, callback) {
  return pg(function (done) {
    doSomethingAsync(some, arg, done)
  }, callback)
}

// myFunction can now be used with promise style
myFunction('foo', 'bar').then(console.log)

// or callback style
myFunction('foo', 'bar', console.log)

// you can also pass the Promise implementation you wish polygoat to use
var bluebird = require('bluebird')

function myFunction (callback) {
  return pg(function (done) {
    doSomethingAsync(done)
  }, callback, bluebird)
}

myFunction() instanceof bluebird // true
```

# Example

See [example.js](https://github.com/sonnyp/polygoat/blob/master/example.js)

# Test

```
npm install standard
npm test
```

[Goat icon](https://thenounproject.com/term/goat/301185/) by [Agne Alesiute](https://thenounproject.com/grrrauf) from [the Noun Project](https://thenounproject.com)
