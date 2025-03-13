import jwt from "jsonwebtoken";
import database from "../database/connection.js";

async function isAuthenticated(req, res, next) {
  try {
    // check for header authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // get token from header
    const token = authHeader.split(" ")[1];

    // if no token, return error 401
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // verify token
    const jwtSecret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, jwtSecret, function (err, d) {
      if (err) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
      return d;
    });

    const userId = decoded.userId;

    // run sql query to get user data
    const query = `SELECT id, username, email FROM "Users" WHERE id = $1;`;
    const values = [userId];
    const dbRes = await database.query(query, values);

    //   check if user not found
    const userNotFound = dbRes.rowCount === 0;
    if (userNotFound) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const userData = dbRes.rows[0];

    //   check if user exists
    if (!userData) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    //   inject user data into request object IMPORTANT
    req.user = userData;

    //   call next function
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export default isAuthenticated;
