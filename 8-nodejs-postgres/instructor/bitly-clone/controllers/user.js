import database from "../database/connection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../service/email.js";

async function register(req, res) {
  try {
    const data = req.body;

    //   hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(data.password, salt);

    const query = `INSERT INTO "Users" (username, email, password) VALUES ($1, $2, $3) RETURNING *;`;
    const values = [data.username, data.email, hashedPassword];
    const dbRes = await database.query(query, values);

    // send welcome email
    const message = {
      from: "info@bitly-clone.com",
      to: data.email,
      subject: "Welcome to Bitly Clone",
      text: "Hello, welcome to Bitly Clone",
      html: `
      <div style="background-color: #f0f0f0; padding: 20px;">
        <h1>Welcome to Bitly Clone</h1>
        <p>Hello ${data.username}, welcome to Bitly Clone</p>
      </div>
      `,
    };
    // transporter.sendMail(message, (error, info) => {
    //   if (error) {
    //     console.error("Error occurred: ", error.message);
    //   }
    //   console.log("Message sent: %s", info.messageId);
    // });

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
  return res.status(200).json({ message: "Authorized", data: userDb, token });
}

function testPublic(req, res) {
  return res.status(200).json({
    message: "Public route",
  });
}

function testPrivate(req, res) {
  const user = req.user;
  return res.status(200).json({
    message: "Private route",
    user, // IMPORTANT  user data is injected from isAuth middleware
  });
}

const userController = {
  register,
  login,
  testPublic,
  testPrivate,
};

export default userController;
