(function () {
  'use strict';

  angular.module('resource', ['ngResource'])
    .factory('CustomerApi', CustomerApi)
    .factory('DictionaryApi', DictionaryApi);

  /**
   * @param $resource
   * @return {*}
   * @constructor
   */
  function CustomerApi($resource) {
    return $resource('http://localhost/api/customers/:customerId');
  }
  /**
   * @param $resource
   * @return {*}
   * @constructor
   */
  function DictionaryApi($resource) {
    return $resource('http://localhost/api/dictionaries/:dictionaryName', {}, {
      get: { method: 'GET', isArray: true }
    });
  }
})();

