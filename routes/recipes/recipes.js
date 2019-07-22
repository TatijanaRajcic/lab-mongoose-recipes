const express = require("express");
const router = express.Router();
const Recipes = require("../../models/Recipe")
const Cooks = require("../../models/Cook")

/* ONLY LOGGED IN USERS CAN ACCESS THE RECIPES */

router.use((req, res, next) => { 
  if (req.session.currentUser) { // <== if there's user in the session (user is logged in)
    next();  // ==> go to the next route ...
  } else {                          
    res.redirect("/login");         
  }                                 
}); 

/* SHOW ALL RECIPES */

router.get("/recipes", (req, res, next) => { // ... which is this one
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
