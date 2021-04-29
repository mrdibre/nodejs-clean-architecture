import { Express } from "express";
import { bodyParser } from "./body-parser/body-parser";

const useMiddlewares = (app: Express) => {
  app.use(bodyParser);
};

export { useMiddlewares };
