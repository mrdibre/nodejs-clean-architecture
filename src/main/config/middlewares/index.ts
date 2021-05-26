import { Express } from "express";

import { cors } from "./cors/cors";
import { bodyParser } from "./body-parser/body-parser";
import { contentType } from "./content-type/content-type";

const useMiddlewares = (app: Express) => {
  app.use(bodyParser);
  app.use(cors);
  app.use(contentType);
};

export { useMiddlewares };
