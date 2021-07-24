import request from "supertest";
import { app } from "@/main/config/app";
import { noCache } from "@/main/config/middlewares/no-cache/no-cache";

describe("NoCache Middleware", () => {
  test("Should disabled cache", async () => {
    app.get("/test_no_cache", noCache, (req, res) => res.send());

    await request(app)
      .get("/test_no_cache")
      .expect(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate",
      )
      .expect("Pragma", "no-cache")
      .expect("Expires", "0")
      .expect("Surrogate-Control", "no-store");
  });
});
