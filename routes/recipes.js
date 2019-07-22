const express = require("express");
const router = express.Router();
const Recipes = require("../models/Recipe")
const Cooks = require("../models/Cook")

/* SHOW ALL RECIPES */

router.get("/recipes", (req, res, next) => {
  Recipes.find({})
    .populate("creator")
    .then(recipes=>{
      res.render("recipes", {recipes})
    })
    .catch(err=>{
      console.log(err)
    })
})

/* SHOW ONE RECIPE */

router.get("/recipes/:id", (req,res,next)=>{
  let recipeId = req.params.id;
  Recipes.findById(recipeId)
    .populate("creator")
    .then(recipe=>{
      res.render("recipe", {recipe})
    })
})

module.exports = router;
