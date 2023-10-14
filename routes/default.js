const express = require("express");
const router = express.Router();

router.get("/index", function (req, res) {
  res.render("index");
});

router.get("/about", function (req, res) {
  res.render("about"); //alternative for sendFile Method
});

module.exports = router;
