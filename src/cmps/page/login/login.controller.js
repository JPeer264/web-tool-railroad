angular
    .module('page.login')
    .controller('LoginCtrl', loginController);

loginController.$inject = [
    '$scope',
    'auth'
];

/**
 * @ngdoc object
 * @controller
 * @name component.LoginCtrl
 * @requires $scope
 * @requires $translate
 *
 * @description
 * Hello App controller
 */
function loginController($scope, auth) {

    /**
     * call the auth.login() service
     */
    $scope.login = function() {
        auth.login($scope.user);
    }
}