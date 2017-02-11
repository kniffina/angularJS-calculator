(function() {
    "use strict";

    angular
        .module("calculator")
        .factory("solveFactory", solveFactory);

    function solveFactory() {
        return {
            getAnswer: getAnswer,
            _breakDown: _breakDown,
            _solveProblem: _solveProblem,
            _calculating: _calculating,
            _solveEquation: _solveEquation,
            _multiplicationOrDivision: _multiplicationOrDivision,
            _alterArrays: _alterArrays,
            _isOperator: _isOperator,
            _checkNegatives: _checkNegatives
        };

        function getAnswer(problem) {
            var tempString = "";
            var tempString2 = "";

            //set two empty arrays which will be used to hold the history of the problems
            var questionHistory = new Array();
            var answerHistory = new Array();

            for(var i = 0; i < problem.length; i++) {
                if(problem[i] === " ") {
                    //do nothing or ignore this space
                }
                else {//create a new array without the spaces
                    tempString = tempString + problem[i];
                    tempString2 = tempString2 + problem[i];
                }
            }
            var returnValue = _breakDown(tempString, tempString2);

            //not used currently and will need to return data to controller to be saved each time called
            questionHistory.push(problem);
            answerHistory.push(returnValue); //push

            console.log("Question History: " + questionHistory);
            console.log("Answer History: " + answerHistory);

            return returnValue;
        }

        function _breakDown(tempString, problem) {
            var numbers = new Array();
            var operators = new Array();

            var number = "";

            for (var i = 0; i < problem.length; i++) {
                //if inside of the problem we find an operator add it to the operators array
                if (_isOperator(problem[i]) === true) {

                    //we want to account for negative numbers so additional functionality is needed
                    var isNegative = _checkNegatives(i, tempString); //if checks value before it by using temp string, if value before it is operator, adds -to number
                    if(isNegative === true) {
                        number = number + problem[i]; //since operator before it, we know that it is negative and can add the negative to front of number
                    }
                    else {
                        //it is a standard operator and can push it onto the operators array
                        operators.push(problem[i]);
                        numbers.push(number); //push numbers too because the number has ended
                        number = "";          //reset number to empty string to count next one
                    }

                }
                else
                    number = number + problem[i]; //add to number because not operator so #

            }
            //end for-loop, if there is a number we need to push it onto the numbers array
            numbers.push(number);

            console.log(numbers);
            console.log(operators);


            //we have these two arrays with input entered in correct, now we need to solve the problem
            var answer = _solveProblem(numbers, operators);
            return answer;

        }

        function _solveProblem(numbers, operators) {
            var done = false; //set done to false
            var answer; //this will be used to hold the total

            //loop until we have the final answer (1 ite
            while(numbers.length > 1) {
                answer = _calculating(numbers, operators);
            }
            return answer;
        }

        function _calculating(numbers, operators) {
            var answer, number1, number2, operator, j=0; //variables

            //the calculator has to take into affect multiplication and division first
            for(var i = 0; i < operators.length; i++) {

                var orderOperations = _multiplicationOrDivision(operators[i]);
                if(orderOperations) {
                    operator = operators[i]; //set current operator to the operator we found

                    //an operator will be between numbers so move backwards one and grab the next number
                    number1 = numbers[i];
                    number2 = numbers[i + 1];

                    answer = _solveEquation(number1, number2, operator);

                    //alterArrays to show the changes
                    _alterArrays(numbers, operators, i, answer, i + 1, i);

                    break; //found a * or / so we can exit the loop
                }
            }
            //no more multiplication or division to do
            if(orderOperations === false) {

                number1 = numbers[j];
                number2 = numbers[j + 1];

                operator = operators[j];

                answer = _solveEquation(number1, number2, operator);

                //alterArrays to show the changes
                _alterArrays(numbers, operators, j, answer, j + 1, j);

            }
            return answer; //return answer
        }

        function _solveEquation(number1, number2, operator) {
            console.log("Number1 before parse: " + number1);
            console.log("Number2 before parse: " + number2);
            //convert to floating point integer (wont be needed for all numbers)
            number1 = parseFloat(number1);
            number2 = parseFloat(number2);


           if(operator === "+")
               return number1 + number2;
           else if(operator === "/")
               return number1 / number2;
           else if(operator === "*")
               return number1 * number2;
           else
               return number1 - number2;

        }

        //very simple function to return true if the operator is / or * and false otherwise
        function _multiplicationOrDivision(operator) {
            if(operator === "*" || operator === "/")
                return true;
            else
                return false;
        }

        function _alterArrays(numbers, operators, numberAnswerPosition, answer, numberDelete, operatorPosition) {
            numbers.splice(numberAnswerPosition, 1, answer);
            numbers.splice(numberDelete, 1);
            operators.splice(operatorPosition, 1); //remove the element
        }

        function _isOperator(value) {
            if (value === "*" || value === "/" || value === "+" || value === "-")
                return true;
            else
                return false;
        }

        function _checkNegatives(index, tempString) {
            if(tempString[index] === "-") {

                //if the value before our index is an operator or undefined, then the number should be negative
                if (_isOperator(tempString[index - 1]) === true || tempString[index - 1] === undefined) {
                    return true;
                }
                else
                    return false;
           }
           else
               return false;
        }

    }

})();