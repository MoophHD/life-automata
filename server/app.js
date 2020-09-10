require("dotenv").config({ path: "./server/config/.env" });
const express = require("express");
const mongoose = require("mongoose");
const passport = require("./passport/setup");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const app = express();
app.set("trust proxy", 1);

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

const PORT = process.env.PORT;
async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
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
