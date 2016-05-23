angular
    .module('page.adminNavbar')
    .controller('AdminNavbarCtrl', AdminNavbarController);

/**
 * @ngdoc controller
 * @name cmps.page:AdminNavbarCtrl
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
AdminNavbarController.$inject = [
    '$scope',
    'auth',
    '$window',
    '$cookies',
    'COOKIE',
    '$state',
];

function AdminNavbarController($scope, auth, $window, $cookies, COOKIE, $state) {

}
