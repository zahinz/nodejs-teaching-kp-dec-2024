import database from "../database/connection.js";

const query = `
CREATE TABLE IF NOT EXISTS "Links" (
    id SERIAL PRIMARY KEY,
    actual_link TEXT,
    shortened_link VARCHAR(120) UNIQUE,
    visitor_count INTEGER DEFAULT 0,
    created_by INTEGER,
    FOREIGN KEY (created_by) REFERENCES "Users"(id)
);
`;

async function createLinkTable() {
  try {
    // RESOLVE
    //  resolve the promise if the async operation is successful
    const dbRes = await database.query(query);
    // console.log(dbRes);
    console.log("Table Links created successfully");
  } catch (error) {
    // REJECT
    //  reject the promise if the async operation fails
    console.error("Error creating Links table");
    console.error(error);
  } finally {
    //   SETTLE
    //  resolve the promise if the async operation is successful or fail
    console.log("function createLinkTable() done");
  }
}

export default createLinkTable;
