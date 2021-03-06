(function() {
    "use strict";

    angular
        .module("calculator")
        .controller("CalculatorController", CalculatorController);

    CalculatorController.$inject = ["solveFactory", "historyModal", "$timeout", "$window", "$uibModal"];

    function CalculatorController(solveFactory, historyModal, $timeout, $window, $uibModal) {
        var vm = this;
        vm.solveFactory = solveFactory;
        vm.bindData = bindData;
        vm.getHistory = getHistory;
      

        //set calculate to empty string
        clearData();

        //bind data takes in the value from the click event and figures out what to do next
        function bindData(value) {
            var whatToDo = determineNext(value);

            //designed to create space for user experience
            if (whatToDo === 0)
                vm.solveFactory.calculate = vm.solveFactory.calculate + " " + value + " ";

            //user hit "enter" so call the CalculatorService to do the math with the entire string and put it into display
            else if(whatToDo === 1)
               calculateProblem();

            //user entered clear, so set string to ''
            else if (whatToDo === 2)
                clearData();

            //user entered a number and can simply be attached to the end of the string
            else
                vm.solveFactory.calculate = vm.solveFactory.calculate + value;

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
            vm.solveFactory.calculate = "";
        }

        //create isOperator to possible use at a later date and save space
        function isOperator(value) {
            if (value === "*" || value === "/" || value === "+" || value === "-")
                return true;
            else
                return false;
        }

        function calculateProblem() {
            //store answer from solveFactory service
            var showAnswer = solveFactory.getAnswer(vm.solveFactory.calculate);

            //if it is not a string or number then produce error
            if (showAnswer === "NaN" || showAnswer === undefined) {

                //use timeout to display error message if syntax is incorrect
                vm.solveFactory.calculate = "Error with your syntax. Please review, and re-enter data.";
                $timeout(function() {
                        clearData();
                    },
                    2000);
            } else {
                vm.solveFactory.calculate = showAnswer;
            }
        }

        //getHistory calles the historyModal service and allows the factory to take care of the rest
        function getHistory() {
            historyModal.showHistory();
        }
    
    }
}());