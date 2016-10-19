(function () {
  'use strict';

  angular.module('main').controller('HeaderController', ['$scope', 'SystemService', HeaderController]);
  /**
   * Controller for header ui component
   * @param $scope
   * @param {SystemService} systemService
   * @constructor
   */
  function HeaderController($scope, systemService) {
    $scope.changeCustomer = function (customerId) {
      systemService.data.customerId = customerId;
    };
  }
})();
