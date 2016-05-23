angular
    .module('page.adminNavbar')
    .controller('AdminNavbarCtrl', AdminNavbarController);

/**
 * @ngdoc controller
 * @name cmps.page:AdminNavbarCtrl
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
