var npCmsApp = angular.module('npCmsApp', ['ngMaterial', 'ngRoute', 'ngResource']);

npCmsApp.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('light-green')
      .warnPalette('red');
});

npCmsApp.config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);
