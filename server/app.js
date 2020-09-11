require("dotenv").config({ path: "./server/config/.env" });
const express = require("express");
const mongoose = require("mongoose");
const passport = require("./passport/setup");
const cookieSession = require("cookie-session");
const path = require('path');

const app = express();
app.set("trust proxy", 1);


console.log(`git id ${process.env.GITHUB_CLIENT_ID}`);
console.log(`git id ${process.env.GOOGLE_CLIENT_ID}`);

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cookieSession({ maxAge: 24 * 60 * 60 * 1000, keys: ["secret"] }));

//json middleware

// passport oauth middleware
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/grid", require("./routes/grid.routes"));

if (process.env.NODE_ENV === "production") {
  console.log(`in production`);
  app.use("/", express.static(path.join(__dirname, "/../client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const PORT = process.env.PORT;
async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
  } catch (e) {
    console.log(`Server error, message: ${e}`);
    process.exit(1);
  }
}

start();
