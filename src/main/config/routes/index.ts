import { Express, Router } from "express";
import fg from "fast-glob";

const useRoutes = (app: Express) => {
  const router = Router();

  app.use("/api", router);

  fg.sync("**/src/main/config/routes/**/router.ts").map(async file => {
    const { registerRoute } = await import(`../../../../${file}`);

    registerRoute(router);
  });
};

export { useRoutes };
