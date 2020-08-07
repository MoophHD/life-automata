const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({path:"./server/config/.env"});

const app = express();
app.use(express.json({ extended: true }));

app.get("*", (req, res) => {
  res.send("Server");
})
console.log(process.env.PORT)
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
