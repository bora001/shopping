const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    maxlength: 50,
  },
  desc: {
    type: String,
  },
  price: {
    type: Number,
  },
  option: {
    type: String,
  },
  sold: {
    type: Number,
    default: 0,
  },
  view: {
    type: Number,
    default: 0,
  },
  Image: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
