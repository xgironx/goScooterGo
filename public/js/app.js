                      // #############################################
                      // 201703211811L   EL MARTES   JAY
                      // https://github.com/ga-wdi-lessons/building-a-mean-app/blob/master/angular-walkthrough-annotated.md
                      // In public/js/app.js: We need to define a new state, controller, template, and support the query for show

angular
    .module("scooter", [
      "ui.router",
      "ngResource"
    ])
    .config([
      "$stateProvider",
      Router
    ])
    .factory("scooter", [
      "$resource",
      scooter
    ])
    .controller("indexCtrl", [
      "scooter",
      indexController
    ])
    .controller("showCtrl", [
      "$stateParams",
      "scooter",
      showController
    ])

    function Router ($stateProvider) {
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
    }

    function scooter ($resource) {
      return $resource("/api/scooters/:name", {}, {
        update: { method: "PUT" }
      });
    }

    function indexController (scooter) {
      this.scooters = scooter.query()
    }

    function showController ($stateParams, scooter) {
      this.scooter = scooter.get({name: $stateParams.name})
    }```
