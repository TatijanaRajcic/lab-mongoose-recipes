const express = require("express");
const router = express.Router();
const Recipes = require("../models/Recipe");
const Cooks = require("../models/Cook")

/* PAGE FOR UPDATING A RECIPE */

router.get("/update/:id", (req,res,next) => {
  let recipeToUpdate = req.params.id;

  Recipes.findById(recipeToUpdate)
    .populate("creator")
    .then((recipe)=> {
      let levels = [[recipe.level === "Easy Peasy", "Easy Peasy"], 
                    [recipe.level === "Amateur Chef", "Amateur Chef"],
                    [recipe.level === "UltraPro Chef", "UltraPro Chef"]]
      let dishTypes = [[recipe.dishType === "Breakfast", "Breakfast"],
                      [recipe.dishType === "Dish", "Dish"],
                      [recipe.dishType === "Snack", "Snack"],
                      [recipe.dishType === "Drink", "Drink"],
                      [recipe.dishType === "Dessert", "Dessert"],
                      [recipe.dishType === "Other", "Other"]]
      Cooks.find({})
        .then((cooks)=> {
            res.render('update', {recipe, levels, dishTypes, cooks});
        })
    })
    .catch((error)=> {
        next()
    })
})

/* UPDATING A RECIPE */

router.post("/update/:id", (req,res,next) => {

  let updateRecipe = {
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
      updateRecipe.ingredients.push(value)
    }
  }  

  let recipeToUpdate = req.params.id;
  Recipes.findByIdAndUpdate(recipeToUpdate, updateRecipe)
    .then((recipe)=> {
      console.log("recipe updated")
      res.redirect(`/recipes/${req.params.id}`)
    })
    .catch((error)=> {
        next()
    })
})

module.exports = router;