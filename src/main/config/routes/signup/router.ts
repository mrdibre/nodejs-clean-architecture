import { Router } from "express";

const registerRoute = (router: Router) => {
  router.post("/signup", (req, res) => {
    res.json({ ok: "ok" });
  });
};

export { registerRoute };
