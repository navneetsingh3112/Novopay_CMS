/**
 * Created by Novopay on 23-02-2016.
 */
npCmsApp.constant('RESOURCES', function(){
    var resource = 'cms/';
    return {
        LOGIN_MANAGEMENT: {
            LOGIN: resource + 'auth/login'
        }

    }
}());

npCmsApp.factory('ResourceFactory', ['$resource', 'RESOURCES', function ($resource, RESOURCES) {
    return {
        LoginManagement: {
            Login: $resource(RESOURCES.LOGIN_MANAGEMENT.LOGIN)
        }
    }
}]);