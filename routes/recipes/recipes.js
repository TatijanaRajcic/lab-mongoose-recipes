const express = require("express");
const router = express.Router();
const Recipes = require("../../models/Recipe")
const Cooks = require("../../models/Cook")

/* SHOW ALL RECIPES */

router.get("/recipes", (req, res, next) => {
  Recipes.find({})
    .populate("creator")
    .then(recipes=>{
      res.render("recipes/recipes", {recipes})
    })
    .catch(err=>{
      res.send(err)
    })
})

/* SHOW ONE RECIPE */

router.get("/recipes/:id", (req,res,next)=>{
  let recipeId = req.params.id;
  Recipes.findById(recipeId)
    .populate("creator")
    .then(recipe=>{
      res.render("recipes/recipe-details", {recipe})
    })
    .catch(err=>{
      res.send(err)
    })
})

module.exports = router;
