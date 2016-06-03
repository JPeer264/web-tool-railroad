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
     * @name logout
     * @methodOf cmps.page:UserbarCtrl
     *
     * @description
     * call the auth.logout() service
     */
    $scope.logout = function() {
        auth.logout();
    }

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

    /**
     * @ngdoc method
     * @name isLoggedIn
     * @methodOf cmps.page:UserbarCtrl
     *
     * @description
     * call the auth.logout() service and check logged in status
     *
     * @return {Boolean} auth.isAuthorized()
     */
    $scope.isLoggedIn = function() {
        return auth.isAuthorized();
    }
}
