import request from "supertest";
import { app } from "../../app";

describe("SignUp Routes", () => {
  test("Should return an account on success", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        name: "César",
        email: "cesar.felp982@gmail.com",
        password: "123",
        passwordConfirmation: "123",
      })
      .expect(200);
  });
});
