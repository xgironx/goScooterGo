const express = require("express");
const parser  = require("body-parser");
const hbs     = require("express-handlebars");
const mongoose= require("./db/connection");

const app     = express();

const scooter = mongoose.model("scooter");

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));

app.use("/assets", express.static("public"));
// app.use(parser.urlencoded({extended: true}));
app.use(parser.json({extended: true}));


                       // Makes API Routes for Candidates
                      // https://github.com/ga-wdi-lessons/building-a-mean-app/blob/master/angular-walkthrough-annotated.md
                     // Alright, lets review a little bit about what we want to accomplish when building out the Angular side of our application. So far, we still are using express to serve at least one server-side rendered view, that loads and initializes our Angular app. From there, Angular takes over the view templating and routing throughout our SPA. Also, eventually we want our front-end to be able to sync with our back-end in order to persist data throughout our app. How can we do this? **Q**: How did we do this in Rails? By building out our own API, then making ajax requests from the front-end to our API endpoints in order to keep the data in sync.
                              //  Why might it be a good idea to namespace our back-end routes under `api`?
                             // To avoid confusion between routes meant to serve html, and routes whose purpose it is to render our apps data as JSON
app.get("/api/scooters", function(req, res){
  scooter.find({}).then(function(scooters){
    res.json(scooters)
  });
});


app.get("/api/scooters/:name", function(req, res){
  scooter.findOne({name: req.params.name}).then(function(scooter){
    res.json(scooter)
  });
});





app.post("/api/scooters", function(req, res){
  scooter.create(req.body.scooter).then(function(scooter){
    res.json(scooter)
    res.redirect('/scooters/' + scooter.name)
  })
});




app.delete("/api/scooters/:name", function(req, res){
  scooter.findOneAndRemove({name: req.params.name}).then(function(){
    res.json({ success: true })
  });
});

app.put("/api/scooters/:name", function(req, res){
  scooter.findOneAndUpdate({name: req.params.name}, req.body, {new: true}).then(function(scooter){
    res.json(scooter)
  });
});

app.get("/*", function(req, res){
  res.render("scooters");
});

app.listen(app.get("port"), function(){
  console.log("Welcome to my database, I hear everything!");
});
