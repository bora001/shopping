const express = require("express");
const app = express();
// const port = process.env.PORT || 5000;
const config = require("./config/key");
const { User } = require("./models/User");
const { auth } = require("./middleware/Auth");
const cookieParser = require("cookie-parser");
const { Product } = require("./models/Product");

const mongoose = require("mongoose");
app.use(cookieParser());

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
app.use("/api/product", require("./routes/product"));
app.use("/upload", express.static("upload"));

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
        if (err) return res.status(400).send(err);
        return res.status(200).json({
          loginSuccess: true,
          token: user.token,
        });
      });
    });
  });
});

// auth
app.post("/api/auth", (req, res) => {
  let token = req.body.token;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });
    return res.json({ user });
  });
});

//menu
app.post("/api/:menu", (req, res) => {
  let search = req.body.search;
  Product.find({ option: search }).exec((err, products) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, newproduct: true, products });
  });
});

//cart
app.post("/api/product/cart", (req, res) => {
  let body = Object.assign({}, req.body);
  let cart = delete body.userId;
  console.log(req.body);
  console.log(body);

  User.findOneAndUpdate(
    { _id: req.body.userId },
    { $push: { cart: body } },
    (err, update) => {
      return res.status(200).send({ success: true });
    }
  );
});

app.post("/api/product/cart/delete", (req, res) => {
  console.log(req.body._id);
  console.log(req.body.ProductId);

  User.findOneAndUpdate(
    { _id: req.body._id },
    { $pull: { cart: { ProductId: req.body.ProductId } } },
    (err, update) => {
      return res.status(200).send({ success: true });
    }
  );
});

const port = 5000;
app.listen(port, () => console.log(`localhost:${port}`));
