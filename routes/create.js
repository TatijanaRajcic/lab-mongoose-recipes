const express = require("express");
const router = express.Router();
const Recipes = require("../models/Recipe");

/* PAGE FOR CREATING A NEW RECIPE */

router.get("/create", (req,res,next) => {
  res.render("create");
})

/* CREATING A NEW RECIPE */

router.post("/create", (req,res,next) => {

  let newRecipe = {
    title: req.body.title,
    level: req.body.level,
    cuisine: req.body.cuisine,
    dishType: req.body.dishType,  
    image: req.body.image,
    duration: req.body.duration,
    creator: req.body.creator,
    created: req.body.created
  }

  let ingredients = [];
  const entries = Object.entries(req.body)
  for (const [key,value] of entries) {
    if (key.includes("ingredient")) {
      ingredients.push(value)
    }
  }  
  newRecipe.ingredients = ingredients;

  Recipes.create(newRecipe)
    .then(recipe => {
      res.redirect("/recipes")
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router;