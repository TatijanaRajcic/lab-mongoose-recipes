// Requiring packages
const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser')
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cookieParser = require('cookie-parser');
const app = express();

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


// configuring express session
app.use(session({
  secret: 'super secret',
  resave: false,
  saveUninitialized: true,
}))

app.use(cookieParser());


// Setting up hbs (+helper)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
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

// THE ROUTES ORDER MATTERS !!! IF WE SET SESSIONS AND CONDITIONS ON WHICH PAGE THE USER CAN ACCESS OR NOT
const signupRouter = require('./routes/users/signup')
app.use('/', signupRouter);

const loginRouter = require('./routes/users/login')
app.use('/', loginRouter);

const logoutRouter = require("./routes/users/logout")
app.use("/", logoutRouter)

const indexRouter = require ("./routes/index")
app.use("/", indexRouter)

const updateRecipeRouter = require ("./routes/recipes/update-recipe")
app.use("/", updateRecipeRouter)

const deleteRecipeRouter = require ("./routes/recipes/delete-recipe")
app.use("/", deleteRecipeRouter)

const cooksRouter = require("./routes/cooks/cooks")
app.use("/", cooksRouter)

const recipesRouter = require ("./routes/recipes/recipes")
app.use("/", recipesRouter)


// Limit the access to routes to logged in users

const createCookRouter = require ("./routes/cooks/create-cook")
app.use("/", accessControl, createCookRouter)

const createRecipeRouter = require ("./routes/recipes/create-recipe")
app.use("/", accessControl, createRecipeRouter)

function accessControl(req, res, next) { 
  if (req.session.currentUser) { // <== if there's user in the session (user is logged in)
    next();  // ==> go to the next route ...
  } else {                      
    res.redirect("/login");         
  }                                 
}


// Establish connection
app.listen(3000, () => console.log("My Recipes project is running"));


// Exporting the app
module.exports = app;

