const express = require("express");
const app = express();
// const port = process.env.PORT || 5000;
const config = require("./config/key");
const mongoose = require("mongoose");

mongoose
  .connect(config.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("This is Shopping Page 🎈"));
app.get("/api/test", (req, res) => res.send("this is test"));

const port = 5000;
app.listen(port, () => console.log(`localhost:${port}`));
