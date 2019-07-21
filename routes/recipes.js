const express = require("express");
const router = express.Router();
const Recipes = require("../models/Recipe")

router.get("/recipes", (req, res, next) => {
  Recipes.find({})
  .then(recipes=>{
    res.render("recipes", {recipes})
  })
  .catch(err=>{
    console.log(err)
  })
})

router.get("/recipes/:id", (req,res,next)=>{
  let recipeId = req.params.id;
  Recipes.findById(recipeId)
  .then(recipe=>{
    res.render("recipe", {recipe})
  })
})

module.exports = router;
