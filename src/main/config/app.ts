import express from "express";
import { useRoutes } from "./routes";
import { useMiddlewares } from "./middlewares";

const app = express();

useMiddlewares(app);
useRoutes(app);

export { app };
