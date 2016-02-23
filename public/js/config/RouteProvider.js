/**
 * Created by Novopay on 23-02-2016.
 */
 npCmsApp.config(['$routeProvider', function ($routeProvider) {
 $routeProvider.when('/partner', {
 templateUrl: './../../views/partners/PartnerView.html',
 docTitle: 'Novopay CMS'
 }).otherwise('/');
 }]);
