const express = require("express");
const parser  = require("body-parser");
const hbs     = require("express-handlebars");
const mongoose= require("./db/connection");

const app     = express();

const Scooter = mongoose.model("Scooter");

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));
app.use("/assets", express.static("public"));
app.use(parser.json({extended: true}));

app.get("/api/scooters", function(req, res){
  Scooter.find({}).then(function(scooters){
    res.json(scooters)
  });
});

app.get("/api/scooters/:name", function(req, res){
  Scooter.findOne({name: req.params.name}).then(function(scooter){
    res.json(scooter)
  });
});

app.post("/api/scooters", function(req, res){
  Scooter.create(req.body).then(function(scooter){
    res.json(scooter)
  })
});

app.delete("/api/scooters/:name", function(req, res){
  Scooter.findOneAndRemove({name: req.params.name}).then(function(){
    res.json({ success: true })
  });
});

app.put("/api/scooters/:name", function(req, res){
  Scooter.findOneAndUpdate({name: req.params.name}, req.body, {new: true}).then(function(scooter){
    res.json(scooter)
  });
});

app.get("/*", function(req, res){
  res.render("scooters");
});

app.listen(app.get("port"), function(){
  console.log("Welcome to my database, I hear everything!");
});
