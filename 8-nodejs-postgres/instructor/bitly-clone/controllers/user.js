import database from "../database/connection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function register(req, res) {
  try {
    const data = req.body;

    //   hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(data.password, salt);

    const query = `INSERT INTO "Users" (username, email, password) VALUES ($1, $2, $3) RETURNING *;`;
    const values = [data.username, data.email, hashedPassword];
    const dbRes = await database.query(query, values);

    // explore query possibilities to check if user already exists by email or username, after check then create user
    return res.status(201).json(dbRes.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function login(req, res) {
  // AUTHENTICATION
  // search email in database
  const body = req.body;
  const querySearchUserByEmail = `SELECT * FROM "Users" WHERE email = $1;`;
  const values = [body.email];
  const dbRes = await database.query(querySearchUserByEmail, values);

  // if email not found, return error 404
  const userNotFound = dbRes.rowCount === 0;
  if (userNotFound) {
    // early return
    return res.status(404).json({
      message: "User not found",
    });
  }

  // if email found, compare password
  const userDb = dbRes.rows[0];
  //   const passwordMatch = userDb.password === body.password;
  const passwordMatch = bcrypt.compareSync(body.password, userDb.password);
  // if password is incorrect, return error 401
  if (!passwordMatch) {
    // early return
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  // if password is correct, generate jwt token
  //  inject user id into jwt token
  const jwtSecret = process.env.JWT_SECRET;
  const token = jwt.sign({ userId: userDb.id }, jwtSecret);
  console.log(token);
  return res.status(200).json({ message: "Authorized", data: userDb, token });
}

const userController = {
  register,
  login,
};

export default userController;
