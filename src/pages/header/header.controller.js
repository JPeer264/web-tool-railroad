angular
    .module('pages.header')
    .controller('HeaderCtrl', HeaderController);

/**
 * @ngdoc controller
 * @name pages.header:HeaderCtrl
 *
 * @requires $scope
 * @requires service.user
 * @requires service.auth
 *
 * @description
 * HeaderCtrl for the header page
 */
HeaderController.$inject = [
    '$scope',
    'user',
    'auth',
    '$timeout'
];

function HeaderController($scope, user, auth, $timeout) {

    // dirty but fast - no directive - don't do @ home
    var elem = new Foundation.Interchange($('#logo').find('img'));

    /**
     * @ngdoc method
     * @name isLoggedIn
     * @methodOf pages.header:HeaderCtrl
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