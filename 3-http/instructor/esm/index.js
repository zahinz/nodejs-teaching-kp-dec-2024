// import from export default
import constants from "./constants.js";
// import from direct export
// destructuring in import
import { add, subtract, multiply, divide } from "./math.js";

console.log(constants);

console.log(add(1, 2));
console.log(subtract(1, 2));
console.log(multiply(1, 2));
console.log(divide(1, 2));
