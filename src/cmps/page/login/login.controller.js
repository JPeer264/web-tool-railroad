angular
    .module('page.login')
    .controller('LoginCtrl', loginController);

/**
 * @ngdoc object
 * @name component.LoginCtrl
 *
 * @requires $scope
 * @requires auth
 * @requires $window
 * @requires $cookies
 * @requires COOKIE
 *
 * @description
 * Hello App controller
 */
loginController.$inject = [
    '$scope',
    'auth',
    '$window',
    '$cookies',
    'COOKIE',
];

function loginController($scope, auth, $window, $cookies, COOKIE) {

    /**
     * call the auth.login() service and set token if it not fail
     */
    $scope.login = function() {

        auth.login($scope.user).then(function (data) {

            $cookies.put(COOKIE.TOKEN, data.token);  
            $window.location.assign('/');
        }, function (data) {
            // function for errors
            if (data.status === 401) {
                $scope.error = 'ERROR_WRONG_CREDENTIALS';
            }
        });
    }
}