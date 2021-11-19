const express = require("express");
const app = express();
// const port = process.env.PORT || 5000;
const config = require("./config/key");
const { User } = require("./models/User");
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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// register

app.post("/api/register", (req, res) => {
  const user = new User(req.body);
  return res.status(200).json({ success: true });

  // user.save((err, userInfo) => {
  //   if (err) return res.json({ success: false, err });
  //   return res.status(200).json({ success: true });
  // });
});

const port = 5000;
app.listen(port, () => console.log(`localhost:${port}`));
