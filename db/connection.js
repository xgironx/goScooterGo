var mongoose  = require("mongoose");

var ScooterSchema = new mongoose.Schema( { name: String, year: Number } );

mongoose.model("Scooter", ScooterSchema);

mongoose.connect("mongodb://localhost/scooter");

module.exports = mongoose;
