/**
 * Created by Novopay on 24-02-2016.
 */
npCmsApp.controller('HeaderController', ['$scope','$timeout', '$mdSidenav',
    function($scope, $timeout, $mdSidenav){
    var headerScope = this;

    $scope.toggleLeft = buildToggler('left');
    $scope.isOpenLeft = function(){
        return $mdSidenav('left').isOpen();
    };

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
        var timer;

        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function() {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }

    function buildToggler(navID) {
        return function() {
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    //
                });
        }
    }
        $scope.close = function () {
            $mdSidenav('left').close()
                .then(function () {
                    //
                });
        };
}]);