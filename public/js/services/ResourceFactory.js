/**
 * Created by Novopay on 23-02-2016.
 */
npCmsApp.constant('RESOURCES', function(){
    var resource = 'cms/';
    return {
        CMS: {
            AGENTS: resource + 'partner/agents',
            FILTER: resource + 'partner/pings'
        }

    }
}());

npCmsApp.factory('ResourceFactory', ['$resource', 'RESOURCES', function ($resource, RESOURCES) {
    return {
        Agents: {
            View: $resource(RESOURCES.CMS.AGENTS),
            Filter: $resource(RESOURCES.CMS.FILTER)
        }
    }
}]);