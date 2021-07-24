import express from "express";
import { useRoutes } from "./routes";
import { useMiddlewares } from "./middlewares";
import { useSwagger } from "@/main/config/swagger";

const app = express();

useSwagger(app);
useMiddlewares(app);
useRoutes(app);

export { app };
