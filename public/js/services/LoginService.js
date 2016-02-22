/**
 * Created by Novopay on 22-02-2016.
 */
npCmsLoginApp.constant('RESOURCES', function(){
    var resource = 'cms/';
    return {
        LOGIN_MANAGEMENT: {
            LOGIN: resource + 'auth/login'
        }

    }
}());

npCmsLoginApp.factory('LoginService', ['$resource', 'RESOURCES', function ($resource, RESOURCES) {
    return {
        LoginManagement: {
            Login: $resource(RESOURCES.LOGIN_MANAGEMENT.LOGIN)
        }
    }
}]);