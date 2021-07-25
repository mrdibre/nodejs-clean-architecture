import { paths } from "./paths";
import { schemas } from "./schemas";
import { components } from "./components";

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
  license: {
    name: "GPL-3.0-or-later",
    url: "https://spdx.org/licenses/GPL-3.0-or-later.html",
  },
  paths,
  schemas,
  components,
};

export { docs };
