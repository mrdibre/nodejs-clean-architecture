import { loginPath } from "./login";
import { schemas } from "./schemas";

const docs = {
  openapi: "3.0.0",
  info: {
    title: "Clean Node API",
    description:
      "API do curso do Mango para realizar enquete entre programadores",
    version: "1.0.0",
  },
  servers: [
    {
      url: "/api",
    },
  ],
  tags: [
    {
      name: "Auth",
    },
  ],
  paths: {
    "/login": loginPath,
  },
  schemas,
};

export { docs };
