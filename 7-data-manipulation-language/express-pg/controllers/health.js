import database from "../database/connection.js";

export async function getHealth(req, res) {
  try {
    const databaseTimeQuery = await database.query("SELECT NOW()");
    console.log(databaseTimeQuery);
    res.json({ status: "OK", databaseTime: databaseTimeQuery.rows[0].now });
  } catch (error) {
    console.error("Health check failed", error);
    res.status(500).json({ status: "FAILED" });
  }
}
