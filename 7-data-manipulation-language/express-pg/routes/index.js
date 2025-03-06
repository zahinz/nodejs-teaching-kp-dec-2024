import { Router } from "express";
import { getHealth } from "../controllers/health.js";

const appRouter = Router();

appRouter.get("/health", getHealth);

export default appRouter;
