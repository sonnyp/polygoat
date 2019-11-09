"use strict";

var benchmark = require("benchmark");
var pg = require(".");
var bluebird = require("bluebird");

function notAsync(cb) {
  cb();
}

function polygotFun(cb) {
  return pg(function(done) {
    notAsync(done);
  }, cb);
}

function promiseFun() {
  return new Promise(function(resolve, reject) {
    notAsync(resolve);
  });
}

function callbackFun(cb) {
  notAsync(cb);
}

var promisified = bluebird.promisify(callbackFun);

var callSuite = new benchmark.Suite("call time");
callSuite
  .add("polygoat promise", function() {
    polygotFun().then(function() {});
  })
  .add("polygoat callback", function() {
    polygotFun(function() {});
  })
  .add("plain promise", function() {
    promiseFun().then(function() {});
  })
  .add("plain callback", function() {
    callbackFun(function() {});
  })
  .add(
    "bluebird promisified (eval on Node.js, closure on browser)",
    function() {
      promisified().then(function() {});
    }
  )
  .on("cycle", function(event) {
    console.log(String(event.target));
  })
  .on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  });

var creationSuite = new benchmark.Suite("function creation");
creationSuite
  .add("polygoat", function() {
    return function(cb) {
      return pg(function(done) {
        notAsync(done);
      }, cb);
    };
  })
  .add("callback", function() {
    return function(cb) {
      notAsync(cb);
    };
  })
  .add("promise", function() {
    return new Promise(function(resolve, reject) {
      notAsync(resolve);
    });
  })
  .add("bluebird promisify (eval on Node.js, closure on browser)", function() {
    return bluebird.promisify(function(cb) {
      notAsync(cb);
    });
  })
  .on("cycle", function(event) {
    console.log(String(event.target));
  })
  .on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  });

// not using async: false because the process would run out of memory
console.log(callSuite.name);
callSuite.run({ async: true }).on("complete", function() {
  console.log("\n" + creationSuite.name);
  creationSuite.run({ async: true });
});
