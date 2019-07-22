const express = require("express");
const router = express.Router();
const Cooks = require("../../models/Cook");
const Recipes = require("../../models/Recipe");

/* SHOW ALL COOKS */

router.get("/cooks", (req,res,next)=>{
  Cooks.find({})
    .then(cooks=>{
      res.render("cooks/cooks",{cooks})
    })
    .catch(err=>{
      res.send(err)
    })
})

/* SHOW ONE COOK'S DETAILED PAGE */

router.get("/cooks/:id", (req,res,next) => {
  let cookId = req.params.id;
  Cooks.findById(cookId)
    .then(cook => {
      Recipes.find({creator:cook}) 
        .then(recipes=>{
          res.render("cooks/cook-details", {cook, recipes})
        })
        .catch(err=>{
          res.send(err)
        })
    })
    .catch(err=>{
      res.send(err)
    })
})

module.exports = router;