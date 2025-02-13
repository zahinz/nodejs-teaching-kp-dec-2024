// console.log("core modules");
const fs = require("node:fs");
const path = require("node:path");

// EXAMPLE 1
const contentToWrite = "Hello, Data!";
// this will work only on mac but not on windows
// const fileName = "data/thisisdata.txt";
// this will work on all OS due to path.join
const fileName = path.join("data", "thisisdata-path.txt");

fs.writeFile(fileName, contentToWrite, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("File written successfully");
  }
});

// EXAMPLE 2
// const users = ["Zahin", "Ali", "Rahim", "Karim"];

// users.forEach((user, index) => {
//   const contentToWrite = `Hello, ${user}!`;
//   const fileName = `users/${index + 1}-${user.toLowerCase()}.txt`;

//   fs.writeFile(fileName, contentToWrite, function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("File written successfully");
//     }
//   });
// });
