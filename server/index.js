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
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

// login

app.post("/api/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "We can not find the email",
      });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "incorrect Password",
        });

      user.generateToken((err, user) => {
        if (err) {
          return res.status(400).send(err, "index generateToken error");
        }
        return res.status(200).json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

const port = 5000;
app.listen(port, () => console.log(`localhost:${port}`));
