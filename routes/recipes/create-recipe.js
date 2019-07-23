const express = require("express");
const router = express.Router();
const Recipes = require("../../models/Recipe");
const Cooks = require("../../models/Cook")

/* SHOWING THE PAGE FOR CREATING A NEW RECIPE */

router.get("/",(req,res,next) => {
  Cooks.find({})
    .then((cooks)=> {
      res.render("recipes/create-recipe", {cooks});
    })
    .catch((err)=> {
      res.send(err)
    })
})

/* CREATING A NEW RECIPE */

router.post("/", (req,res,next) => {

  let newRecipe = {
    title: req.body.title,
    level: req.body.level,
    cuisine: req.body.cuisine,
    dishType: req.body.dishType,  
    image: req.body.image,
    duration: req.body.duration,
    creator: req.body.creator,
    created: req.body.created,
    ingredients: []
  }

  const entries = Object.entries(req.body)
  for (const [key,value] of entries) {
    if (key.includes("ingredient")) {
      newRecipe.ingredients.push(value)
    }
  }  

  Recipes.create(newRecipe)
    .then(recipe=>{
      console.log("recipe created")
      res.redirect("/recipes")
    })
    .catch(err=>{
      res.send(err)
    })
})

module.exports = router;