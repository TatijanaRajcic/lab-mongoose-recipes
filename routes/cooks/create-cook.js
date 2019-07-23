const express = require("express");
const router = express.Router();
const Cooks = require("../../models/Cook")

/* SHOW RECIPE CREATION PAGE */

router.get("/", (req,res,next)=> {
  res.render("cooks/create-cook");
})

/* CREATE COOK */

router.post("/", (req,res,next)=> {
  const {name, bio} = req.body;
  Cooks.create({name,bio})
    .then(cook=>{
      res.redirect("/create-recipe")
    })
    .catch(err=>{
      res.send(err)
    })
})

module.exports = router;