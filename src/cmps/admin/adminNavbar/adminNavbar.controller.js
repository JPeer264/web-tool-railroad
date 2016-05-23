angular
    .module('admin.adminNavbar')
    .controller('AdminNavbarCtrl', AdminNavbarController);

/**
 * @ngdoc controller
 * @name cmps.admin:AdminNavbarCtrl
 *
 * @requires $scope
 * @requires $cookies
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

function AdminNavbarController($scope, $state) {

}
