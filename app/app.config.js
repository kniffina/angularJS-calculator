(function() {
    "use strict";

    angular
        .module("calculator", ["ui.router"])
        .config(configure);

    configure.$inject = ["$stateProvider", "$urlRouterProvider"];

    function configure($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state("/", {
                url: "/",
                templateUrl: "app/calculator/calculator.template.html",
                controller: "CalculatorController",
                controllerAs: "vm"
            });

    }
}());