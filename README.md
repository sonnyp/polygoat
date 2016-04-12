polygoat
========

Make a JavaScript function support both promise and callback styles.

[![Build Status](https://img.shields.io/travis/sonnyp/polygoat/master.svg?style=flat-square)](https://travis-ci.org/sonnyp/polygoat/branches)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

This is great if you want to offer your users the choice between the two. It is also an elegant way to support older platforms without Promise support and let the users decide if they want to add a Promise polyfill.

# Setup


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
  pg(function (done) {
    doSomethingAsync(done)
  }, callback)
}

// myFunction can now be used with promise style
myFunction('foo', 'bar').then(console.log)

// or callback style
myFunction('foo', 'bar', console.log)

// you can also pass the Promise implementation you wish polygoat to use
var bluebird = require('bluebird')

function myFunction (some, arg, callback) {
  pg(function (done) {
    doSomethingAsync(done)
  }, callback, bluebird)
}
```



# Example

See [example.js](https://github.com/sonnyp/polygoat/blob/master/example.js)

# Test

```
npm install standard
npm test
```
