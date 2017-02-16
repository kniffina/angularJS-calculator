(function () {
    "use strict";

    angular
        .module("calculator")
        .factory("historyModal", historyModal);

    historyModal.$inject = ["$uibModal"];

    function historyModal($uibModal) {
        return {
            showHistory: showHistory
        };

        function showHistory() {
            var modalInstance = {
                animation: true,
                templateUrl: 'app/historyModal/historyModal.template.html',
                controller: "HistoryModalController",
                controllerAs: "vm"
            };

            $uibModal.open(modalInstance);            
        }

    } //end show history function (service)
})();