const express = require("express");
const multer = require("multer");
const router = express.Router();
const { Product } = require("../models/Product");

//api/product

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}` + `${file.originalname}`);
  },
});

let upload = multer({ storage }).single("file");

router.post("/", (req, res) => {
  const product = new Product(req.body);
  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/image", (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.json({ success: false, err });
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/getlist", (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  if (Object.keys(req.body)[2] === undefined) {
    //normal (main)
    Product.find()
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true, products });
      });
  } else {
    if (Object.keys(req.body)[2] === "menu") {
      //menu selected
      let search = req.body.menu;

      Product.find({ option: search }).exec((err, products) => {
        if (err) return res.status(400).send(err);
        return res
          .status(200)
          .json({ success: true, newproduct: true, products });
      });
    } else if (Object.keys(req.body)[2] === "search") {
      //search
      let search = req.body.search;

      Product.find()
        .find({ $text: { $search: `${search}` } })
        .exec((err, products) => {
          if (err) return res.status(400).send(err);
          return res
            .status(200)
            .json({ success: true, newproduct: true, products });
        });
    }
  }
});

module.exports = router;
