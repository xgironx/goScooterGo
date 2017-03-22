                                              // #############################################
                                              // 201703211811L   EL MARTES   JAY
                                              // https://github.com/ga-wdi-lessons/building-a-mean-app/blob/master/angular-walkthrough-annotated.md

var express = require("express");
var parser  = require("body-parser");
var hbs     = require("express-handlebars");
var mongoose= require("./db/connection");

var app     = express();

var scooter = mongoose.model("scooter");

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

app.get("/", function(req, res){
  res.render("scooters");
});

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
  });
});

app.delete("/api/scooters/:name", function(req, res){
  scooter.findOneAndRemove({name: req.params.name}).then(function(){
    res.json({ success: true })
  });
});

app.put("/api/scooters/:name", function(req, res){
  scooter.findOneAndUpdate({name: req.params.name}, req.body.scooter, {new: true}).then(function(scooter){
    res.json(scooter)
  });
});


app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
