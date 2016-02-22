var npCmsLoginApp = angular.module('npCmsLoginApp', ['ngMaterial']);

npCmsLoginApp.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('orange');
});


$root