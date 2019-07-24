const express = require("express");
const router = express.Router();
const Recipes = require("../../models/Recipe")

/* ONLY LOGGED IN USERS CAN ACCESS THE RECIPES */

/* router.use((req, res, next) => { 
  if (req.session.currentUser) { // <== if there's user in the session (user is logged in)
  debugger  
  next();  // ==> go to the next route ...
  } else {
    debugger                          
    res.redirect("/login");         
  }                                 
});  */

/* SHOW ALL RECIPES */

router.get("/", (req, res, next) => { // ... which is this one
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

router.get("/:id", (req,res,next)=>{
  let recipeId = req.params.id;
  Recipes.findById(recipeId)
    .populate("creator")
    .then(recipe=>{
      res.locals.navcolor = true;
      res.locals.footercolor = true;

      res.render("recipes/recipe-details", {recipe})
    })
    .catch(err=>{
      res.send(err)
    })
})

module.exports = router;
