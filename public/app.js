var npCmsApp = angular.module('npCmsApp', ['ngMaterial']);

npCmsApp.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('orange');
});
