(function () {
  'use strict';

  angular.module('main').controller('ContentController', ['$scope', 'SystemService', 'CustomerApi', 'DictionaryApi', ContentController]);

  /**
   * Controller for content ui component
   * @param $scope
   * @param {SystemService} systemService
   * @param {CustomerApi} customerApi
   * @param {DictionaryApi} dictionaryApi
   * @constructor
   */
  function ContentController($scope, systemService, customerApi, dictionaryApi) {
    $scope.model = {
      data: {
        dictionaries: {},
        customerId: 98,
        privilege: [
          { id: 1, isOnlyForJural: false, name: 'Очень вежливое общение' },
          { id: 2, isOnlyForJural: true, name: 'Очень ОЧЕНЬ вежливое общение' },
          { id: 3, isOnlyForJural: false, name: 'Называть по имени и отчеству' },
          { id: 4, isOnlyForJural: false, name: 'Возможность нахамить' },
          { id: 5, isOnlyForJural: true, name: 'Возможность потролить' }
        ]
      },
      customer: null
    };

    $scope.onSubmit = function () {
      alert('Сохранено: ' + $scope.model.customer.name);
    };

    $scope.onChangeCustomer = function (newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        customerApi.get({ customerId: newValue }, function (response) {
          if (response.customer.juralTypeId === 1) {
            var bd = response.customer.birthDate;
            response.customer.birthDate = bd.substring(5, 7) + '.' + bd.substring(8, 10) + '.' + bd.substring(0, 4);
          }
          $scope.model.customer = response.customer;
        });
      }
    };

    $scope.onChangeCustomer($scope.model.data.customerId); // для простоты инициализации оставляем так

    $scope.$watch(function () {
      return systemService.data.customerId
    }, $scope.onChangeCustomer);

    dictionaryApi.get({ dictionaryName: 'classes' }, function (response) {
      $scope.model.data.dictionaries.classes = response;
    });

    dictionaryApi.get({ dictionaryName: 'types' }, function (response) {
      $scope.model.data.dictionaries.types = response;
    });
  }
})();