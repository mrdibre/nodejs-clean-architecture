import express from "express";
import { useRoutes } from "./routes";
import { useMiddlewares } from "./middlewares";

const app = express();

useRoutes(app);
useMiddlewares(app);

export { app };
