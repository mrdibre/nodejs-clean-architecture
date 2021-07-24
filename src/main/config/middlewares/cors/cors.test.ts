import request from "supertest";
import { app } from "@/main/config/app";
import { cors } from "@/main/config/middlewares/cors/cors";

describe("CORS Middleware", () => {
  test("Should enable CORS", async () => {
    app.get("/test_cors", cors, (req, res) => res.send());

    await request(app)
      .get("/test_cors")
      .expect("access-control-allow-origin", "*")
      .expect("access-control-allow-methods", "*")
      .expect("access-control-allow-headers", "*");
  });
});
