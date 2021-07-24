import { Express } from "express";
import { serve, setup } from "swagger-ui-express";

import { docs } from "./docs";
import { noCache } from "@/main/config/middlewares/no-cache/no-cache";

const useSwagger = (app: Express) => {
  app.use("/docs", noCache, serve, setup(docs));
};

export { useSwagger };
