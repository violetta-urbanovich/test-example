angular.module('MyModule', ['ui.bootstrap', 'MyResources'])
    .controller('MyCtrl', ['$scope', 'SystemService', 'customerApi', 'dictionaryApi', function ($scope, system, customerApi, dictionaryApi) {
      $scope.model = {
        data: {
          dictionaries: {},
          customerId: 98,
          privilege: [
            {id: 1, isOnlyForJural: false, name: 'Очень вежливое общение'},
            {id: 2, isOnlyForJural: true, name: 'Очень ОЧЕНЬ вежливое общение'},
            {id: 3, isOnlyForJural: false, name: 'Называть по имени и отчеству'},
            {id: 4, isOnlyForJural: false, name: 'Возможность нахамить'},
            {id: 5, isOnlyForJural: true, name: 'Возможность потролить'},
          ]
        },
        customer: null
      };

      dictionaryApi.get({dictionaryName: 'classes'}, function (loadedData) {
        $scope.model.data.dictionaries.classes = loadedData;
      });

      dictionaryApi.get({dictionaryName: 'types'}, function (loadedData) {
        $scope.model.data.dictionaries.types = loadedData;
      });

      $scope.onSubmit = function () {
        alert('Сохранено: ' + $scope.model.customer.name);
      };

      $scope.onChangeCustomer = function (n, o) {
        if (n && n !== o) {
          customerApi.get({customerId: n}, function (loadedData) {
            if (loadedData.customer.juralTypeId === 1) {
              var bd = loadedData.customer.birthDate;
              loadedData.customer.birthDate = bd.substring(5, 7) + '.' + bd.substring(8, 10) + '.' + bd.substring(0, 4);
            }

            $scope.model.customer = loadedData.customer;
          });
        }
      };

      $scope.$watch(function () {return system.data.customerId}, $scope.onChangeCustomer);

      $scope.onChangeCustomer($scope.model.data.customerId); // для простоты инициализации оставляем так
    }])
    .controller('HeaderCtrl', ['$scope', 'SystemService', function ($scope, system) {
      $scope.changeCustomer = function (customerId) {
        system.data.customerId = customerId;
      };
    }])
    .service('SystemService', function () {
      this.data = {
        customerId: null
      };
    })
    .filter('byJuralType', function () {
      return function (items, juralTypeId) {
        if (angular.isDefined(juralTypeId)) {
          items = items.filter(function (value) {
            return juralTypeId === 1 ? (value.isOnlyForJural ? false : true) : true;
          });
        }
        return items;
      };
    });

angular.module('MyResources', ['ngResource'])
    .factory('customerApi', function ($resource) {
      return $resource('/api/customers/:customerId');
    })
    .factory('dictionaryApi', function ($resource) {
      return $resource('/api/dictionaries/:dictionaryName', {}, {
        get: {method:'GET', isArray:true}
      });
    });