import database from "../database/connection.js";

const query = `
CREATE TABLE IF NOT EXISTS "Users" (
    id SERIAL PRIMARY KEY,
    email  VARCHAR(120) UNIQUE,
    username  VARCHAR(120) UNIQUE,
    password VARCHAR(120)
);
`;

const query1 = `
ALTER TABLE "Users"
ADD COLUMN IF NOT EXISTS "nickname" VARCHAR(120);
`;

async function createUserTable() {
  try {
    // RESOLVE
    //  resolve the promise if the async operation is successful
    const dbRes = await database.query(query);
    const dbRes1 = await database.query(query1);
    // console.log(dbRes);
    console.log("Table Users created successfully");
  } catch (error) {
    // REJECT
    //  reject the promise if the async operation fails
    console.error("Error creating Users table");
    console.error(error);
  } finally {
    //   SETTLE
    //  resolve the promise if the async operation is successful or fail
    console.log("function createUserTable() done");
  }
}

export default createUserTable;
