const express = require("express");
const router = express.Router();
const Cooks = require("../models/Cook")

router.get("/create-cook", (req,res,next)=> {
  res.render("create-cook");
})

router.post("/create-cook", (req,res,next)=> {
  const {name, bio} = req.body;
  Cooks.create({name,bio})
    .then(cook =>{
      res.redirect("/create")
    })
})

module.exports = router;