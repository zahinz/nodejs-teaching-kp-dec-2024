// console.log("this is a local module");

// const constant = require("./constant.js");
// const math = require("./math.js");
// DESTRUCTURING
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const { pi, lightSpeed, gravity } = require("./constant.js");
const { add, subtract, multiply, divide } = require("./math.js");

console.log("pi", pi);
console.log("lightSpeed", lightSpeed);
console.log("gravity", gravity);

console.log("add", add(1, 2));
console.log("subtract", subtract(1, 2));
console.log("multiply", multiply(1, 2));
console.log("divide", divide(1, 2));
