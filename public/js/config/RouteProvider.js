npCmsLoginApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: './../../views/Login.html',
        docTitle: 'Novopay CMS'
    }).otherwise('/');
}]);