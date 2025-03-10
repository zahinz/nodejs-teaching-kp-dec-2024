import pg from "pg";
const { Client } = pg;

const database = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// Connect immediately
// This is a promise
// using .then() and .catch() to handle success and error
database
  .connect()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Connection error", err.stack));

export function dbCheck() {
  if (database._connected) {
    console.log("Database is connected");
  } else {
    console.log("Database is not connected");
  }
}

export default database;
