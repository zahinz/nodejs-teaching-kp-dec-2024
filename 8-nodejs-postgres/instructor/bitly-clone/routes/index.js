import { Router } from "express";
import userController from "../controllers/user.js";
import isAuthenticated from "../middleware/isAuth.js";
import linkController from "../controllers/link.js";

const appRouter = Router();

appRouter.post("/register", userController.register);
appRouter.post("/login", userController.login);

// test routes for authorization
appRouter.get("/public", userController.testPublic);
appRouter.get("/private", isAuthenticated, userController.testPrivate);

// links routes
appRouter.get("/links", isAuthenticated, linkController.getAllLinks);
appRouter.post("/links", isAuthenticated, linkController.createLink);
appRouter.delete("/links/:linkId", isAuthenticated, linkController.deleteLink);

// redirect route
appRouter.get("/:shortenedLink", linkController.redirectLink);

export default appRouter;
