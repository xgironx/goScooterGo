                                    // #############################################
                                    // 201703211811L   EL MARTES   JAY
                                    // https://github.com/ga-wdi-lessons/building-a-mean-app/blob/master/angular-walkthrough-annotated.md

var mongoose  = require("mongoose");

var scooterSchema = new mongoose.Schema( { name: String, year: Number } );

mongoose.model("scooter", scooterSchema);

mongoose.connect("mongodb://localhost/scooter");

module.exports = mongoose;
