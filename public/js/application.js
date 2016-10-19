(function () {
  angular.module('application', ['ui.bootstrap', 'ngCookies', 'ui.router', 'oc.lazyLoad'])
    .config(['$stateProvider', '$ocLazyLoadProvider', ApplicationConfig]);

  function ApplicationConfig($stateProvider, $ocLazyLoadProvider) {
    $stateProvider.state('main', {
      url: '',
      views: {
        "@": {
          templateUrl: 'js/application-view.html'
        },
        "header@main": {
          templateUrl: 'js/main/header-view.html',
          controller: 'HeaderController',
          controllerAs: 'controller'
        },
        "content@main": {
          templateUrl: 'js/main/content-view.html',
          controller: 'ContentController',
          controllerAs: 'controller'
        }
      },
      resolve: {
        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
          return Promise.all([$ocLazyLoad.load('translate'), $ocLazyLoad.load('resource')])
            .then(function () {
              return $ocLazyLoad.load('main');
            })
            .then(function () {
              return $ocLazyLoad.load('main.controllers');
            });
        }]
      }
    });

    $ocLazyLoadProvider.config({
      'modules': [
        {
          name: 'translate',
          files: ['js/translate.js']
        }, {
          name: 'resource',
          files: ['js/resource.js']
        }, {
          name: 'main',
          files: [
            'js/main/main.js'
          ]
        }, {
          name: 'main.controllers',
          files: [
            'js/main/content-controller.js',
            'js/main/header-controller.js'
          ]
        }
      ]
    });
  }
})();