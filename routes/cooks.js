const express = require("express");
const router = express.Router();
const Cooks = require("../models/Cook");
const Recipes = require("../models/Recipe");

router.get("/cooks", (req,res,next)=>{
  Cooks.find({})
    .then(cooks=>{
      res.render("cooks",{cooks})
    })
})

router.get("/cooks/:id", (req,res,next) => {
  let cookId = req.params.id;
  Cooks.findById(cookId)
    .then(cook => {
      Recipes.find({creator:cook}) 
        .then(recipes=>{
          res.render("cook-details", {cook, recipes})
        })
    })
})

module.exports = router;