var mongoose  = require("mongoose");

var ScooterSchema = new mongoose.Schema( { name: String, year: Number } );

mongoose.model("scooter", scooterSchema);

mongoose.connect("mongodb://localhost/scooter");

module.exports = mongoose;
