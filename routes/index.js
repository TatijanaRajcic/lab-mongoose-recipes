const express = require("express");
const router = express.Router();

router.get("/", (req,res,next) => {
  res.render("index");
})

module.exports = router;

// difference between res.render and res.redirect?