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


// Setting up a middleware so that I can use the "currentUser" everywhere

app.use(function(req,res,next) {
  /* if the user is logged in */
  /* at login, I called my user currentUser so that's why I need to use req.session.currentUser */
  if (req.session.currentUser){
    /* here, I decide to use the same name on top of res.locals */
    res.locals.currentUser = req.session.currentUser
  } 
  next()
})

// Setting up routes

app.use('/signup', require('./routes/users/signup'));

app.use('/login', require('./routes/users/login'));

app.use("/logout", require("./routes/users/logout"))

app.use("/", require ("./routes/index"))

app.use("/update-recipe", require ("./routes/recipes/update-recipe"))

app.use("/delete-recipe", require ("./routes/recipes/delete-recipe"))

app.use("/cooks", require("./routes/cooks/cooks"))

app.use("/recipes", require ("./routes/recipes/recipes"))


// Limit the access to routes to logged in users

app.use("/create-cook", accessControl, require ("./routes/cooks/create-cook"))

app.use("/create-recipe", accessControl, require ("./routes/recipes/create-recipe"))

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

