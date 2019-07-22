const express = require("express");
const router = express.Router();

/* HOME PAGE */

router.get("/", (req,res,next) => {
  let currentUser = req.session.currentUser;
  res.render("index", {currentUser});
})

module.exports = router;