import express from "express";
import { useMiddlewares } from "./middlewares";

const app = express();

useMiddlewares(app);

export { app };
