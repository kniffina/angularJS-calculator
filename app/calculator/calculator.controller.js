(function() {
    "use strict";

    angular
        .module("calculator")
        .controller("CalculatorController", CalculatorController);

    CalculatorController.$inject = ["solveFactory", "$scope"];

    function CalculatorController(solveFactory, $scope) {
        var vm = this;
        vm.getData = getData;

        //set calculate to empty string
        vm.calculate = "";

        function getData(value) {

            //send the value entered to the bindData
            bindData(value);
        }

        //bindData takes the value passed in from getData click event, and binds it to the
        //  input of the calculator. This is used to create a string that can be evaluated
        function bindData(value) {
            var whatToDo = determineNext(value);

            //designed to create space for user experience
            if (whatToDo === 0)
                vm.calculate = vm.calculate + " " + value + " ";

            //user hit "enter" so call the CalculatorService to do the math with the entire string and put it into display
            else if(whatToDo === 1)
                vm.calculate = solveFactory.getAnswer(vm.calculate);

            //user entered clear, so set string to ''
            else if (whatToDo === 2)
                clearData();

            //user entered a number and can simply be attached to the end of the string
            else
                vm.calculate = vm.calculate + value;

        }

        //createSpace determines if there is an arithmetic call and adds space for user readability
        function determineNext(value) {
           if(isOperator(value) === true)
               return 0;
            else if (value === "e")
                return 1;
            else if (value === "c")
                return 2;
            else
                return 3;

        }

        //simply resets the input so the user can start fresh
        function clearData() {
            vm.calculate = "";
        }

        //create isOperator to possible use at a later date and save space
        function isOperator(value) {
            if(value === "*" || value === "/" || value ==="+" || value === "-")
                return true
            else
                return false
        }


    }
}());