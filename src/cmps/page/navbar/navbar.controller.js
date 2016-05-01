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
 * @requires $state
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
    '$state',
];

function NavbarController($scope, auth, $window, $cookies, COOKIE, $state) {

    /**
     * @ngdoc method
     * @name logout
     * @methodOf cmps.page:NavbarCtrl
     *
     * @description
     * call the auth.logout() service
     */
    $scope.logout = function() {
        auth.logout();
    }

    /**
     * @ngdoc property
     * @name $state
     * @propertyOf cmps.page:NavbarCtrl
     *
     * @description
     * The $state object
     */
    $scope.$state = $state;
}
