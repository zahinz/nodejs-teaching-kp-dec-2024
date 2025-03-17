import database from "../database/connection.js";
import crypto from "crypto";

async function createLink(req, res) {
  const actual_link = req.body.actual_link;
  const user = req.user;

  // basic validation
  if (!actual_link) {
    return res.status(400).json({
      message: "Actual link is required",
    });
  }

  // generate random string for shortened link
  // const randomString = Math.random().toString(36).substring(2, 7);
  const randomString = crypto.randomBytes(3).toString("hex");

  try {
    const query = `
    INSERT INTO "Links" (actual_link, shortened_link, created_by)
    VALUES ($1, $2, $3) 
    RETURNING *;
    `;
    const values = [actual_link, randomString, user.id];
    const dbRes = await database.query(query, values);
    const linkData = dbRes.rows[0];

    return res.status(200).json({
      message: "New link created",
      data: linkData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getAllLinks(req, res) {
  const user = req.user;

  try {
    const query = `
    SELECT * FROM "Links"
    WHERE created_by = $1;
    `;
    const values = [user.id];
    const dbRes = await database.query(query, values);
    const links = dbRes.rows;

    return res.status(200).json({
      message: `${links.length} links found`,
      data: links,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

const linkController = {
  createLink,
  getAllLinks,
};

export default linkController;
