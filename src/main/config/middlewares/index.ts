import { Express } from "express";

import { cors } from "./cors/cors";
import { bodyParser } from "./body-parser/body-parser";

const useMiddlewares = (app: Express) => {
  app.use(bodyParser);
  app.use(cors);
};

export { useMiddlewares };
