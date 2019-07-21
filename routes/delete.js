const express = require("express");
const router = express.Router();
const Recipes = require("../models/Recipe");

router.get("/delete/:id", (req,res,next) => {
  let recipeToDelete = req.params.id;
  Recipes.findByIdAndRemove(recipeToDelete)
  .then(recipe=>{
    res.redirect("/recipes");
  })
})

module.exports = router;