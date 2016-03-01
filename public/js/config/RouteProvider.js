
 npCmsApp.config(['$routeProvider', function ($routeProvider) {
 $routeProvider.when('/partner', {
 templateUrl: './../../views/partners/PartnerView.html',
 docTitle: 'Novopay CMS'
 }).otherwise('/');
 }]);
