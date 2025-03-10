import express from "express";
import database, { dbCheck } from "./database/connection.js";

const env = process.env.NODE_ENV;
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbCheck();

app.post("/register", async function (req, res) {
  try {
    const data = req.body;
    const query = `INSERT INTO "Users" (username, email, password) VALUES ($1, $2, $3) RETURNING *;`;
    const values = [data.username, data.email, data.password];
    const dbRes = await database.query(query, values);

    // explore query possibilities to check if user already exists by email or username, after check then create user
    return res.status(201).json(dbRes.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.listen(port, function () {
  console.log(`Server is running on port ${port}.`);
  console.log(`Environment: ${env}`);
});
