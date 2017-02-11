///<reference path="~/references/angular.js"/>
///<reference path="~/references/angular-mocks.js"/>
///<reference path="~/references/angular-ui-router.js"/>
///<reference path="~/lib/jasmine-2.5.2/boot.js"/>
///<reference path="~/lib/jasmine-2.5.2/console.js"/>
///<reference path="~/lib/jasmine-2.5.2/jasmine-html.js"/>
///<reference path="~/lib/jasmine-2.5.2/jasmine.js"/>  
///<reference path="~/app/app.config.js"/>

//under test
///<reference path="~/app/calculator/calculator.factory.js"/>

describe("solveFactory", function() {
    
    beforeEach(module("calculator"));//load the service's module

    //instantiate service
    var solveFactory, $rootScope, $scope;

    beforeEach(inject(function(_solveFactory_) {
        solveFactory = _solveFactory_;
    }));
    //clean up
    afterEach(function () { });

    describe("getAnswer", function () {

        it("should return NaN if there is a bad value passed to the service", function() {
            //test that if a bad value is passed NaN is returned
            var result = solveFactory.getAnswer("1 * * 2 + 3");

            expect(result).toEqual(NaN);
        });

        it("should solve the problem if there are no syntax issues", function () {
            //give result the answer from solveFactory method getAnswer
            var result = solveFactory.getAnswer("1 * -20 / 2 + 5");

            //and see if it matches what the value should be
            expect(result).toEqual(-5);
        });
    });

    describe("_breakDown", function() {
        it("should push the values / operators onto their arrays properly and return answer", function () {
            //should take two strings and push the values onto their arrays and get answer back
            var result = solveFactory._breakDown("1+2*-3", "1+2*-3");

            expect(result).toEqual(-5);
        });
    });

    describe("_solveProblem", function () {
        it("should take two arrays and return answer based on whats inside", function() { 
            //check that the right answer is returned from the _solveProblem (based off _breakdown above)
            var result = solveFactory._solveProblem(["1","2","-3"], ["+", "*"]);

            //similar to the last function we are still just returning an answer from this equation
            expect(result).toEqual(-5);
        });
    });

    describe("_calculating", function() {
       it("should do the same as _solveProblem (so it will be the same test, different numbers)", function() {
           //should evaluate to 5 * 10 / 2
           var result = solveFactory._solveProblem(["5", "10", "2"], ["*", "/"]);

           //similar to the last function we are still just returning an answer from this equation
           expect(result).toEqual(25);
       });
    });

    describe("_solveEquation", function () {

        it("should add the two numbers together based on '+' operator", function () {
            //passed in 3 arguments, 2 numbers and 1 operator to solve
           var result = solveFactory._solveEquation(5, -10, "+"); //should be 5 + -10 

           expect(result).toEqual(-5);
        });

        it("should subtract the two numbers together based on '-' operator", function () {
            //passed in 3 arguments, 2 numbers and 1 operator to solve
            var result = solveFactory._solveEquation(-5, -15, "-"); //should be -5 - -15 which would be -5 + 15

            expect(result).toEqual(10);
        });

        it("should multiply the two numbers together based on '*' operator", function () {
            //passed in 3 arguments, 2 numbers and 1 operator to solve
            var result = solveFactory._solveEquation(3, 2, "*"); //should be 3 * 2

            expect(result).toEqual(6);
        });

        it("should divide the two numbers together based on '/' operator", function () {
            //passed in 3 arguments, 2 numbers and 1 operator to solve
            var result = solveFactory._solveEquation(-10, 5, "/"); //should be -10 / 5

            expect(result).toEqual(-2);
        });
    });

    describe("_multiplicationOrDivision", function () {

        it("should return true if a * or / is passed in, signifying multiplication or division", function () {
            //pass in an operator and expect true to be returned
           var result = solveFactory._multiplicationOrDivision("*");

           expect(result).toEqual(true);
        });

        it("should return false if an operator or number NOT '*' '/'", function() {
            //pass in a number and check to make sure false is returned
            var result = solveFactory._multiplicationOrDivision(8);

            expect(result).toEqual(false);
        });
    });

    describe("_alterArrays", function () {

       it("should remove the elements from the positions of the arrays that are both passed in respectively", function() {
           //create two arrays that represent the ones that have been implemented for 'numbers' and 'operators'
           var numbers = ["2", "-3", "10"];
           var operators = ["*", "+"]; //there will aways be 1 less operator

           //call _alterArrays function with the values passed in and random (but within range) indexes
           solveFactory._alterArrays(numbers, operators, -0, "-6", 1, 0);

           //we took away 2 and -3 and used the operator to multiply to give us -6 going back into the array
           expect(numbers).toEqual(["-6", "10"]); 
           expect(operators).toEqual(["+"]); //we already used the operator and there is no leftovers, so only + left

       });
    });

    describe("_isOperator", function () {

        it("should return true if an operator is passed in to the function", function () {
            //pass in an operator and check to make sure it returns true
            var result = solveFactory._isOperator("-");

            expect(result).toEqual(true);
        });

        it("should return false if a non-operator is passed in (usually a number)", function() {
            //pass in a number and check to make sure it returns false
            var result = solveFactory._isOperator(90);

            expect(result).toEqual(false);
        });
    });

    describe("_checkNegatives", function() {
       
        it("should return false if the array and index position of that array is NOT '-'", function() {
            //index position will be the '+' and should return false
            var string = "1+2-3";
            var result = solveFactory._checkNegatives(1, string);

            expect(result).toEqual(false);
        });

        it("should return false if the index in the array is a number", function() {
            //index in the array is 8, should return false
            var string = "1-2+8-5";
            var result = solveFactory._checkNegatives(4, string);

            expect(result).toEqual(false);
        });

        it("should return false if the value before '-' is a number", function () {
            //since 1 is before '-' it can be evaluated as a normal operator
            var string = "1-2+3";
            var result = solveFactory._checkNegatives(1, string);

            expect(result).toEqual(false);
        });

        it("should return true if the value before '-' is an operator, indicating a negative number", function () {
            //check the '-' and since '*' is before it, the function should return true
            var string = "1*-3";
            var result = solveFactory._checkNegatives(2, string);

            expect(result).toEqual(true);
        });

        it("should return true if the value in front of the - is undefined (when negative number is first number", function() {
            //put negative number first
            var string = "-2*3+5";
            var result = solveFactory._checkNegatives(0, string);

            expect(result).toEqual(true);
        });

    });
});