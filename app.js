// Requiring packages
const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser')

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// General settings
const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);
const app = express();

// Setting up hbs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Add a helper that I need for hbs
hbs.registerHelper("inc", function(value, options) {
  return parseInt(value) + 1;
});

// Setting up public folder
app.use(express.static(path.join(__dirname, 'public')));

// Setting up partials
hbs.registerPartials(__dirname + '/views/partials');

// Setting up bodyparser
app.use(bodyParser.urlencoded({ extended: false }))

// Setting up routes
const indexRouter = require ("./routes/index")
app.use("/", indexRouter)

const createRecipeRouter = require ("./routes/recipes/create-recipe")
app.use("/", createRecipeRouter)

const recipesRouter = require ("./routes/recipes/recipes")
app.use("/", recipesRouter)

const updateRecipeRouter = require ("./routes/recipes/update-recipe")
app.use("/", updateRecipeRouter)

const deleteRecipeRouter = require ("./routes/recipes/delete-recipe")
app.use("/", deleteRecipeRouter)

const createCookRouter = require ("./routes/cooks/create-cook")
app.use("/", createCookRouter)

const cooksRouter = require("./routes/cooks/cooks")
app.use("/", cooksRouter)

// Establish connection
app.listen(3000, () => console.log("My Recipes project is running"));

// Exporting the app
module.exports = app;
