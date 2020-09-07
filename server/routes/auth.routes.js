const router = require("express").Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/user.model");

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const candidate = await User.findOne({ email, provider: "Local" });
    if (candidate) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPaswword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPaswword });
    await user.save();

    res.status(201).json({ message: "User was Registered" });
  } catch (e) {
    res
      .status(500)
      .json({ message: `Something went wrong while registering: ${e}` });
  }
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/",
    successRedirect: "/",
  }),
  (req, res) => {
    console.log(req.user);
  }
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/",
  }),
  (req, res) => {
    res.send({});
  }
);

module.exports = router;
