var mongoose  = require("./connection");
var seedData  = require("./seeds");

var Scooter = mongoose.model("Scooter");

Scooter.remove({}).then(function(){
  Scooter.collection.insert(seedData).then(function(){
    process.exit();
  });
});
