angular
  .module("goScooter", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    "$locationProvider",
    "$urlRouterProvider",
    Router
  ])
  .factory("Scooter", [
    "$resource",
    Scooter
  ])
  .controller("indexCtrl", [
    "$state",
    "Scooter",
    indexController
  ])
  .controller("showCtrl", [
    "$state",
    "$stateParams",
    "Scooter",
    showController
  ])

  function Router ($stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true)
    $stateProvider
      .state("welcome", {
        url: "/",
        templateUrl: "/assets/js/ng-views/welcome.html"
      })
      .state("index", {
        url: "/scooters",
        templateUrl: "/assets/js/ng-views/index.html",
        controller: "indexCtrl",
        controllerAs: "vm"
      })
      .state("show", {
        url: "/scooters/:name",
        templateUrl: "/assets/js/ng-views/show.html",
        controller: "showCtrl",
        controllerAs: "vm"
      })
    $urlRouterProvider.otherwise("/")
  }

  function Scooter ($resource) {
    return $resource("/api/scooters/:name", {}, {
      update: { method: "PUT" }
    });
  }

  function indexController ($state, Scooter) {
    this.scooters = Scooter.query()
    this.newScooter = new Scooter()
    this.create = function () {
      this.newScooter.$save().then(function(scooter){
        $state.go("show", { name: scooter.name })
      })
    }
  }

  function showController ($state, $stateParams, Scooter) {
    this.scooter = Scooter.get({name: $stateParams.name})
    this.update = function () {
      this.scooter.$update({name: $stateParams.name})
    }
    this.destroy = function () {
      this.scooter.$delete({name: $stateParams.name}).then(function(){
        $state.go("index")
      })
    }
  }
