angular
    .module('page.userbar')
    .controller('UserbarCtrl', UserbarController);

/**
 * @ngdoc controller
 * @name cmps.page:UserbarCtrl
 *
 * @requires $scope
 * @requires service.auth
 * @requires $window
 * @requires $cookies
 * @requires COOKIE
 * @requires $location
 *
 * @description
 * Hello App controller
 */
UserbarController.$inject = [
    '$scope',
    'auth',
    '$location',
];

function UserbarController($scope, auth, $location) {
    /**
     * @ngdoc method
     * @name admin
     * @methodOf cmps.page:UserbarCtrl
     *
     * @description
     * go to admin page
     */
    $scope.admin=function(){
        $location.path( '/admin' );
    }
}
