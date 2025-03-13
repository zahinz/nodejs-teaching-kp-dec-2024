import { Router } from "express";
import userController from "../controllers/user.js";

const appRouter = Router();

appRouter.post("/register", userController.register);
appRouter.post("/login", userController.login);

export default appRouter;
