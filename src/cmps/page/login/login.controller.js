angular
    .module('page.login')
    .controller('LoginCtrl', LoginController);

/**
 * @ngdoc controller
 * @name cmps.page:LoginCtrl
 *
 * @requires $scope
 * @requires service.auth
 * @requires $window
 * @requires $cookies
 * @requires CONSTANT
 * @requires $location
 *
 * @description
 * Hello App controller
 */
LoginController.$inject = [
    '$scope',
    'auth',
    '$window',
    '$cookies',
    'CONSTANT',
    '$location',
    '$interval'
];

function LoginController($scope, auth, $window, $cookies, CONSTANT, $location, $interval) {

    $scope.isInProgress = false;

    /**
     * @ngdoc method
     * @name login
     * @methodOf cmps.page:LoginCtrl
     *
     * @description
     * call the auth.login() service and set token if it not fail
     */
    $scope.login = function() {
        $scope.wrongPassword = false;
        $scope.isInProgress = true;

        auth.login($scope.user).then(function (data) {
            $cookies.put(CONSTANT.COOKIE.TOKEN, data.token);
            $cookies.put(CONSTANT.COOKIE.USER_ID, data.user.id);
            $window.location.assign('/');
        }).catch(function (data) {
            // function for errors
            $scope.isInProgress = false;
            $scope.loginForm.password.$setValidity("correctPassword", false);

        });
    }

    /**
     * @ngdoc method
     * @name signup
     * @methodOf cmps.page:LoginCtrl
     *
     * @description
     * go to signup page
     */
    $scope.signup=function(){
        $location.path( '/signup' );
    }

}
