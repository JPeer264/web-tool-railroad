angular
    .module('page.navbar')
    .controller('NavbarCtrl', NavbarController);

/**
 * @ngdoc controller
 * @name cmps.page:NavbarCtrl
 *
 * @requires $scope
 * @requires service.auth
 * @requires $window
 * @requires $cookies
 * @requires COOKIE
 *
 * @description
 * Hello App controller
 */
NavbarController.$inject = [
    '$scope',
    'auth',
    '$window',
    '$cookies',
    'COOKIE',
];

function NavbarController($scope, auth, $window, $cookies, COOKIE) {

    /**
     * @ngdoc method
     * @name logout
     * @methodOf pages.page:NavbarCtrl
     *
     * @description
     * call the auth.logout() service
     */
    $scope.logout = function() {
        auth.logout();
    }
}
