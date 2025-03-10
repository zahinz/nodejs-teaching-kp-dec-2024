import createUserTable from "./user.js";
import createLinkTable from "./link.js";

async function initializeModels() {
  await createUserTable();
  await createLinkTable();
  process.exit();
}

initializeModels();
