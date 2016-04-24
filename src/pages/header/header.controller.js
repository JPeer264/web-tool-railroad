angular
    .module('pages.header')
    .controller('HeaderCtrl', HeaderController);

HeaderController.$inject = [
    '$scope',
    'user',
    'auth'
];

/**
 * @ngdoc object
 * @name pages.HeaderCtrl
 * @requires $scope
 * @requires user
 * @requires auth
 *
 * @description
 * HeaderCtrl for the Header Component
 */
function HeaderController($scope, user, auth) {

    /**
     * call the auth.logout() service
     */
    $scope.logout = function() {
        auth.logout();
    }

    /**
     * call the user.logout() service
     *
     * @return {Boolean}
     */
    $scope.isLoggedIn = function() {
        return auth.isAuthorized();
    }

}