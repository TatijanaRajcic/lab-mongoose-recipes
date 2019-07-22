const express = require("express");
const router = express.Router();
const Recipes = require("../../models/Recipe");

/* DELETING ONE RECIPE */

router.get("/delete-recipe/:id", (req,res,next) => {
  let recipeToDelete = req.params.id;
  Recipes.findByIdAndRemove(recipeToDelete)
    .then(recipe=>{
      console.log("recipe deleted")
      res.redirect("/recipes");
    })
    .catch(err=>{
      res.send(err)
    })
})

module.exports = router;