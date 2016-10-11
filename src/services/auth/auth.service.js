/**
 * @ngdoc service
 * @name service.auth
 *
 * @requires $rootScope
 * @requires Restangular
 * @requires $state
 * @requires $window
 * @requires $cookies
 * @requires CONSTANT
 * @requires $httpParamSerializer
 */
angular
    .module('service.auth')
    .service('auth', auth);

auth.$inject = [
    '$rootScope',
    'Restangular',
    '$state',
    '$window',
    '$cookies',
    'CONSTANT',
    '$httpParamSerializer',
    'user',
    '$location',
    '$q',
    '$timeout',
];

function auth($rootScope, Restangular, $state, $window, $cookies, CONSTANT, $httpParamSerializer, user, $location, $q, $timeout) {
    var _authenticated = false,
        token = Restangular.service('auth/token'),
        self = this;
    var deferred = $q.defer();

    this.authorize = function() {
        if (!self.check()) {
            var add;
            // user is not authenticated. stow the state they wanted before you
            // send them to the signin state, so you can return them when you're done
            $rootScope.returnToState = $rootScope.toState;
            $rootScope.returnToStateParams = $rootScope.toStateParams;

            // if ($rootScope.toState && $rootScope.toState.name !== 'secure.index') {
            //     $location.path('/error');
            //     return;
            // }
            deferred.resolve(_authenticated);

            return deferred.promise.then(function() {

                // if ($location.path() === '/') {
                //     $state.go('landing');
                // } else {
                    $state.go('nologin-landing', {ref: $location.path()});
                // }
            });

            // $window.location.assign('/welcome?ref=' + $location.path());
        }


        return user.setCurrent().then(function() {
            var isAuthenticated = user.isAuthenticated();

            // console.log($rootScope.toState.data);

            if ($rootScope.toState.data.roleLimit && !user.isRightRole($rootScope.toState.data.roleLimit)) {
                if (isAuthenticated) {
                    $state.go('error'); // user is signed in but not authorized for desired state
                } else {
                    // user is not authenticated. stow the state they wanted before you
                    // send them to the signin state, so you can return them when you're done
                    $rootScope.returnToState = $rootScope.toState;
                    $rootScope.returnToStateParams = $rootScope.toStateParams;

                    // now, send them to the signin state so they can log in
                    $state.go('nologin-landing');
                }
            }
        });
    }

    /**
     * @ngdoc method
     * @name service.auth#isAuthorized
     * @methodOf service.auth
     *
     * @description
     * Just return the stored _authenticated value.
     *
     * @returns {Boolean} _authenticated
     */
    this.isAuthorized = function() {
        return _authenticated;
    }

    /**
     * @ngdoc method
     * @name service.auth#check
     * @methodOf service.auth
     *
     * @description
     * Checks if the user is authorized to see a specific page
     * Get the cookie and validate the JWT token
     *
     * @returns {Boolean} same value as _authenticated
     */
    this.check = function() {
        var token = $cookies.get(CONSTANT.COOKIE.TOKEN);
        var payload;
        var timestampNow = Math.floor((new Date()).getTime() / 1000); // divided by 1000 since getTime() gives in ms

        if (!token) {
            _authenticated = false;
            user.setIdentity(undefined);
            user.setAuthenticated(false);
            return false;
        }

        payload = this.parseJwt(token);

        if (payload.exp > timestampNow) {
            _authenticated = true;
            return true;
        }

        $cookies.remove(CONSTANT.COOKIE.TOKEN);
        _authenticated = false;
        user.setIdentity(undefined);
        user.setAuthenticated(false);
        return false;
    }

    /**
     * @ngdoc method
     * @name service.auth#login
     * @methodOf service.auth
     *
     * @description
     * Request a token and saves into $cookies if the token is valid
     * Redirect on successfully login to home
     *
     * @param {String} formData email and password for the requested user
     * @returns {Promise} Returns a promise with a token
     */
    this.login = function(formData) {
        delete Restangular.configuration.defaultHeaders.Authorization;

        return token.post($httpParamSerializer(formData));
    }

    /**
     * @ngdoc method
     *
     * @name service.auth#logout
     *
     * @methodOf service.auth
     *
     * @description
     * Deletes the user token and return to the welcome page
     */
    this.logout = function(redirect) {
        $cookies.remove(CONSTANT.COOKIE.TOKEN);
        $cookies.remove(CONSTANT.COOKIE.USER_ID);

        if (redirect) {
            add = '?ref=' + $location.path();
            $window.location.assign('/welcome?ref=' + $location.path());
        }

        $window.location.assign('.');
    }

    /**
     * @ngdoc method
     * @name service.auth#parseJwt
     * @methodOf service.auth
     *
     * @description
     * Convert the JWT into an object and returns the payload content
     *
     * @returns {Object} payload content from JWT
     */
    this.parseJwt = function(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');

        return JSON.parse($window.atob(base64));
    }
}
