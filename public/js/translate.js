(function () {
  'use strict';

  angular.module('translate', ['pascalprecht.translate'])
    .config(['$translateProvider', 'Languages', TranslateConfiguration])
    .constant('Languages', new Languages());
  /**
   * @param $translateProvider
   * @param {Languages} languages
   * @constructor
   */
  function TranslateConfiguration($translateProvider, languages) {
    $translateProvider.useStaticFilesLoader({
      prefix: 'locales/',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage(languages.RU);
    $translateProvider.useCookieStorage();
    $translateProvider.use(languages.RU);
  }

  /**
   * @constructor
   */
  function Languages() {
    return { RU: 'ru_RU' };
  }

})();
