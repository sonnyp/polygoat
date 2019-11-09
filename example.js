(function() {
  "use strict";

  var pg;

  // Node.js, browserify, ...
  if (typeof module !== "undefined" && module.exports) {
    pg = require("./index"); // require('polygoat') for you
    // browsers
  } else {
    pg = window.polygoat;
  }

  //
  // without polygoat, callback style only
  //
  function delay(time, cb) {
    setTimeout(cb, time);
  }

  delay(1000, function() {
    console.log("without polygoat");
  });

  //
  // with polygoat, callback and promise styles
  //
  function delay(time, cb) {
    return pg(done => setTimeout(done, time), cb);
  }

  delay(1000, function() {
    console.log("with polygoat, callback style");
  });

  delay(1000).then(function() {
    console.log("with polygoat, promise style");
  });

  (async () => {
    await delay(1000);
    console.log("with polygoat, async/await");
  })();
})();
