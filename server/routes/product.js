const express = require("express");
const multer = require("multer");
const router = express.Router();

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

module.exports = router;
