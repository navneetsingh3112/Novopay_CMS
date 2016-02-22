var npCmsLoginApp = angular.module('npCmsLoginApp', ['ngMaterial', 'ngRoute', 'ngResource']);

npCmsLoginApp.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('light-green')
    .warnPalette('red');
});

npCmsLoginApp.config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);
