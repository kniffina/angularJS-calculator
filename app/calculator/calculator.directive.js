"use strict";

angular
    .module("calculator")
    .directive('useCalculator', useCalculator);

function useCalculator() {
    var directive = {
        link: link,
        templateUrl: 'app/calculator/use-calculator.template.html',
        restrict: 'EA',
    };
    return directive;

    function link(scope, element, attrs) {
        console.log(scope);
        console.log(element);
        console.log(attrs);

    }
}