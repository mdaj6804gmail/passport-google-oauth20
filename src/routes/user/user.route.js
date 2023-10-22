import express from "express";
import User from "../../models/user.model.js";
const route = express.Router();

route.get("/google", async (req, res) => {
  res.send(`<h1>Today : ${new Date()}</h1>`);
});

route.get("/profile", async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const user = await User.findById(req.session.passport.user);
      return res.render("profile", {
        name: user.name,
        photo: user.photoUrl,
        email: user.email,
        id: user.googleId,
      });
    }
    return res.render("login");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

route.get("/", async (req, res) => {
  res.render("login");
});

export default route;
