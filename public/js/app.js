                      // #############################################
                      // 201703211811L   EL MARTES   JAY
                      // https://github.com/ga-wdi-lessons/building-a-mean-app/blob/master/angular-walkthrough-annotated.md
                      // In public/js/app.js: We need to define a new state, controller, template, and support the query for show


angular
  .module("scooter",  [ "ui.router",      "ngResource" ])
  .config(                [ "$stateProvider", "$locationProvider", "$urlRouterProvider", Router ])
                              //   to add our apps Index functionality for candidates:
                              //  Steps:
                              //  Create and define a new "Candidate" factory
                              //  Pass your factory as an argument to the index controller and use it to fetch all candidates
  .factory(                                            "scooter", [ "$resource",   scooter ])
  .controller("indexCtrl", [ "$state",                 "scooter",                  indexController ])
  .controller("showCtrl",  [ "$state", "$stateParams", "scooter",                  showController ])
                              //   add the functionality so a candidate can "concede". // // Steps: // // Modify the "concede" button in show.html to run an update method on click // Define an update method in your showCtrl in app.js // Pass in $state to your show controller than use it to redirect the user to the index root after deletion


  function Router ($stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true)
    $stateProvider
      .state("welcome",   { url: "/",               templateUrl: "/assets/js/ng-views/welcome.html" })
      .state("index",     { url: "/scooters",       templateUrl: "/assets/js/ng-views/index.html",        controller: "indexCtrl",  controllerAs: "vm" })
                              // add support for the Show Route by defining another state. Steps: Create a new state definition for show Delete views/show.hbs and create a template to be rendered when we are at our show state Define a new controller for show, make the appropriate query and display the correct data in the view
                              // In public/js/app.js: We need to define a new state, controller, template, and support the query for show
      .state("show",      { url: "/scooters/:name", templateUrl: "/assets/js/ng-views/show.html",         controller: "showCtrl",   controllerAs: "vm" })
    $urlRouterProvider.otherwise("/")
  }

  function scooter ($resource) {
    return $resource("/scooters/:name", {}, {
      update: { method: "PUT" }
    });
  }

                              // Update the index controller to add a definition for our create method // It should persist the new candidate to the database // Take the user to the new candidates show page after it is saved
  function indexController ($state, scooter) {
    this.scooters = scooter.query()
    this.newScooter = new scooter()
    this.create = function () {
      this.newscooter.$save().then(function(scooter){
        $state.go("show", { name: scooter.name })     //show the scooter i just created
      })
    }
  }

  function showController ($state, $stateParams, scooter) {
    this.scooter = scooter.get({name: $stateParams.name})
    this.update = function () {
      this.scooter.$update({name: $stateParams.name})
    }
    this.destroy = function () {
      this.scooter.$delete({name: $stateParams.name}).then(function(){
        $state.go("index")
      })
    }
  }
