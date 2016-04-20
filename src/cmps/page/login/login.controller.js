angular
    .module('page.login')
    .controller('LoginCtrl', loginController);

loginController.$inject = [
    '$scope',
    'user'
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
function loginController($scope, user) {

    /**
     * call the user.login() service
     */
    $scope.login = function() {
        user.login($scope.user);
    }
}