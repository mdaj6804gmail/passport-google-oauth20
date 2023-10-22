import express from "express";
import passport from "passport";

const route = express.Router();

route.get("/", async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

route.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
route.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/auth",
  })
);
export default route;
