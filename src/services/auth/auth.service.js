/**
 * @ngdoc service 
 * @name service.auth
 *
 * @requires $rootScope
 * @requires Restangular
 * @requires $state
 * @requires $window
 * @requires $cookies
 * @requires COOKIE
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
    'COOKIE',
    '$httpParamSerializer'
];

function auth($rootScope, Restangular, $state, $window, $cookies, COOKIE, $httpParamSerializer) {
    var _authenticated = false,
        token = Restangular.service('auth/token');

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
        var token = $cookies.get(COOKIE.TOKEN);
        var payload;
        var timestampNow = Math.floor((new Date()).getTime() / 1000); // divided by 1000 since getTime() gives in ms

        if (!token) {
            _authenticated = false;
            return false;
        }

        payload = this.parseJwt(token);

        if (payload.exp > timestampNow) {
            _authenticated = true;
            return true;
        }

        $cookies.remove(COOKIE.TOKEN);
        _authenticated = false;
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
    this.logout = function() {
        $cookies.remove(COOKIE.TOKEN);
        $window.location.assign('/');
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
