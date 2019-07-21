const express = require("express");
const router = express.Router();
const Recipes = require("../models/Recipe");

/* PAGE FOR UPDATING A RECIPE */

router.get("/update/:id", (req,res,next) => {
  let recipeToUpdate = req.params.id;

  Recipes.findById(recipeToUpdate)
  .then(recipe=>{
    let levels = [[recipe.level === "Easy Peasy", "Easy Peasy"], 
                  [recipe.level === "Amateur Chef", "Amateur Chef"],
                  [recipe.level === "UltraPro Chef", "UltraPro Chef"]]
    res.render("update", {recipe, levels});
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
    created: req.body.created
  }

  let ingredients = [];
  const entries = Object.entries(req.body)
  for (const [key,value] of entries) {
    if (key.includes("ingredient")) {
      ingredients.push(value)
    }
  }  
  updateRecipe.ingredients = ingredients;

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