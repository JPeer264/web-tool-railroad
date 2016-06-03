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
];

function LoginController($scope, auth, $window, $cookies, CONSTANT, $location) {

    /**
     * @ngdoc method
     * @name login
     * @methodOf cmps.page:LoginCtrl
     *
     * @description
     * call the auth.login() service and set token if it not fail
     */
    $scope.login = function() {

        auth.login($scope.user).then(function (data) {
            $cookies.put(CONSTANT.COOKIE.TOKEN, data.token);
            $cookies.put(CONSTANT.COOKIE.USER_ID, data.user.id);
            $window.location.assign('/');
        }, function (data) {
            // function for errors
            if (data.status === 401 || data.status === 403) {
                $scope.error = data.data.error;
                $scope.user=null;
            }
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
