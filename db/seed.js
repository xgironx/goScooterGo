var mongoose  = require("./connection");
var seedData  = require("./seeds");

var scooter = mongoose.model("scooter");

scooter.remove({}).then(function(){
  scooter.collection.insert(seedData).then(function(){
    process.exit();
  });
});
