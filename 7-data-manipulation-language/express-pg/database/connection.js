import pg from "pg";
const { Client } = pg;

const database = new Client({
  user: "zahin",
  password: "",
  host: "127.0.0.1",
  port: 5432,
  database: "bitly-clone",
});

export function checkDatabaseConnection() {
  database.connect((err) => {
    if (err) {
      console.error("Database connection error", err.stack);
      process.exit(1);
    } else {
      console.log("Database connected");
    }
  });
}

export default database;
