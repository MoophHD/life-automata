require("dotenv").config({ path: "./server/config/.env" });
const express = require("express");
const mongoose = require("mongoose");
const passport = require("./passport/setup");

const app = express();

//json middleware
app.use(express.json({ extended: true }));

// passport oauth middleware
app.use(passport.initialize());

// routes
app.use(express.json({ extended: true }));
app.use("/api/auth", require("./routes/auth.routes"));

app.get("/", (req, res) => {
  res.send("Server");
});

app.get("/api/test", (req, res) => {
  res.json({message: "stuff test"});
});

app.get("/test", (req, res) => {
  res.json({message: "stuff test"});
});

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
