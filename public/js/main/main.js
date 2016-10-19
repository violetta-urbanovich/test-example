(function () {
  'use strict';

  angular.module('main', ['translate', 'resource'])
    .service('SystemService', SystemService)
    .filter('byJuralType', JuralTypeFilter);

  /**
   * @return {Function}
   * @constructor
   */
  function JuralTypeFilter() {
    return function (items, juralTypeId) {
      if (angular.isDefined(juralTypeId)) {
        items = items.filter(function (value) {
          return juralTypeId !== 1 || !value.isOnlyForJural ;
        });
      }
      return items;
    };
  }

  /**
   * @constructor
   */
  function SystemService() {
    this.data = {
      customerId: null
    };
  }
})();
