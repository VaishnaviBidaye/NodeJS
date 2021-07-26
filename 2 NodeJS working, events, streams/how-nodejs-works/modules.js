// console.log(arguments);
// console.log(require('module').wrapper);

// module.exports
const C = require("./test-module-1"); // ./test-module-1 - because it's our own file
const calc1 = new C();
console.log(calc1.add(2, 5));

// exports
// const calc2 = require('./test-module-2');
const { add, multiply, divide } = require("./test-module-2"); // ./test-module-2 - because it's our own file
console.log(multiply(2, 5));

// caching
// caching - module loaded ones and executes only once
// after that call functions from cache memory
require("./text-module-3")();
require("./text-module-3")();
require("./text-module-3")();

// caching op -
// Hello from Modular!
// Log this beautiful text!
// Log this beautiful text!
// Log this beautiful text!
