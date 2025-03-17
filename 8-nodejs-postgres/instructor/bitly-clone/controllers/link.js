import database from "../database/connection.js";
import crypto from "crypto";
import transporter from "../service/email.js";

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

    // notify user of new link via email
    const message = {
      from: "info@bitly-clone.com",
      to: user.email,
      subject: "New link created",
      text: "Hello, you have created a new link",
      html: `
      <div style="background-color: #f0f0f0; padding: 20px;">
        <h1>New Link Created</h1>
        <p>Hello ${user.username}, you have created a new link</p>
        <p>Actual link: ${linkData.actual_link}</p>
        <p>Shortened link: <a href="http://localhost:${process.env.PORT}/${linkData.shortened_link}">http://localhost:${process.env.PORT}/${linkData.shortened_link}</a></p>
      </div>
      `,
    };
    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.error("Error occurred: ", error.message);
        return res.status(500).json({
          message: "Internal server error",
        });
      }
      console.log("Message sent: %s", info.messageId);
    });

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

async function redirectLink(req, res) {
  try {
    const shortenedLink = req.params.shortenedLink;
    const query = `
    SELECT actual_link FROM "Links"
    WHERE shortened_link = $1;
    `;
    const values = [shortenedLink];
    const dbRes = await database.query(query, values);

    const linkNotFound = dbRes.rows.length === 0;
    if (linkNotFound) {
      return res.status(404).json({
        message: "Link not found",
      });
    }

    const linkData = dbRes.rows[0];
    //   EXPLORE update visit count
    return res.redirect(linkData.actual_link);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function deleteLink(req, res) {
  try {
    const linkId = req.params.linkId;
    const user = req.user;
    // check if link exists
    const checkQuery = `
        SELECT * FROM "Links"
        WHERE id = $1 AND created_by = $2;
        `;
    const checkValues = [linkId, user.id];
    const checkRes = await database.query(checkQuery, checkValues);
    const linkNotFound = checkRes.rows.length === 0;
    if (linkNotFound) {
      return res.status(404).json({
        message: "Link not found",
      });
    }

    //   if link exists, delete link
    const query = `
    DELETE FROM "Links"
    WHERE id = $1 AND created_by = $2;
    `;
    const values = [linkId, user.id];
    await database.query(query, values);

    return res.status(200).json({
      message: "Link deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

function viewSingleLink(req, res) {
  // implement view single link function
}

function editLink(req, res) {
  // implement edit link function
}

const linkController = {
  createLink,
  getAllLinks,
  redirectLink,
  deleteLink,
};

export default linkController;
