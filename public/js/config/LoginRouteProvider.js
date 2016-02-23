npCmsLoginApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '../../views/login/Login.html',
        docTitle: 'Novopay CMS'
    }).otherwise('/');
}]);