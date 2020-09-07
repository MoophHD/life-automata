const router = require("express").Router();

const auth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "No authorization" });
  }
};

router.get("/", auth, (req, res) => {
  res.status(201).json(req.user);
});

module.exports = router;
