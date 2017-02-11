///<reference path="~/references/angular.js"/>
///<reference path="~/references/angular-mocks.js"/>
///<reference path="~/references/angular-ui-router.js"/>
///<reference path="~/lib/jasmine-2.5.2/boot.js"/>
///<reference path="~/lib/jasmine-2.5.2/console.js"/>
///<reference path="~/lib/jasmine-2.5.2/jasmine-html.js"/>
///<reference path="~/lib/jasmine-2.5.2/jasmine.js"/>  
///<reference path="~/app/app.config.js"/>

//add service
///<reference path="~/app/calculator/calculator.factory.js"/>

//under test
///<reference path="~/app/calculator/calculator.controller.js"/>

describe("CalculatorController", function () {
    
    beforeEach(module("calculator"));//load the controller's module

    var $rootScope, $controller, $timeout, $scope; 
       
    //load dependencies into each
    beforeEach(inject(function (_$rootScope_, _$controller_, _$timeout_) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $timeout = _$timeout_;

        $scope = $rootScope.$new();

        //instantiate controller
        $controller("CalculatorController", {
            $scope: $scope,
            $timeout: $timeout
        });
    }));
    //clean up
    afterEach(function () { });

    describe("bindData", function () {

        it("should add space between operators", function () {
            //set vm to the controller
            var vm = $controller('CalculatorController');

            //set result equal to what we expect after bindData called with "-"
            var result = vm.calculate + " - ";
            
            vm.bindData("-"); //call bindData, which will change value of calculate
            
            expect(result).toEqual(vm.calculate);//the two should equal eachother
        });

        it("should have no space when adding numbers", function() {
            //set vm to the controller
            var vm = $controller('CalculatorController');

            var result = vm.calculate + "2";//call result with a number and no spaces

            vm.bindData("2"); //bind data should just add the number, with no spaces

            expect(result).toEqual(vm.calculate);
        });

        it("should clear the data when clearData() is called", function() {
            //set vm to the controller
            var vm = $controller('CalculatorController');

            //test that when bindData gets "c" clearData called and string cleared
            var result = "";
            vm.bindData("c");
            
            //result '' should equal vm.calculate because clearData reset string
            expect(result).toEqual(vm.calculate);
        });

        it("should solve the problem accordingly with a valid syntax", function() {
            //set vm to the controller
            var vm = $controller('CalculatorController');

            var result = 25;//set result to some number

            //set the string to values that should equal 25 if solved correctly 
            vm.calculate = "5 * 2 * 3 - 5";

            vm.bindData("e"); //'e' represents enter or solve problem

            expect(result).toEqual(vm.calculate);
        });

        it("should set calculate to an error string because of bad syntax", function () {
            //set vm to the controller
            var vm = $controller('CalculatorController');

            //set result to errorMessage that will be set to calculate
            var result = "Error with your syntax. Please review, and re-enter data.";

            vm.calculate = "5 * / - * 5"; //set to a string that should be an error
            vm.bindData("e");//pass enter to bindData to solve

            expect(result).toEqual(vm.calculate);
        });
    });
});