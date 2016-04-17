/**
 * @ngdoc service 
 *
 * @name service.authorization
 *
 * @requires $rootScope
 * @requires Restangular
 * @requires $state
 */
angular
    .module('service.authorization')
    .service('authorization', authorization);

authorization.$inject = [
    '$rootScope',
    'Restangular',
    '$state',
    '$window',
    '$cookies',
    'COOKIE'
];

function authorization($rootScope, Restangular, $state, $window, $cookies, COOKIE) {
    var _authenticated = false;

    /**
     * @ngdoc method
     * @name service.authorization#isAuthorized
     * @methodOf service.authorization
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
     * @name service.authorization#check
     * @methodOf service.authorization
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

        if (!token) return;

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
     * @name service.authorization#login
     * @methodOf service.authorization
     *
     * @description 
     * Login a person to receive and store JWT token
     *
     * @param {String} formData the given formData of the login
     * @returns {Promise} Returns a promise with a token
     */
    this.login = function(formData) {
        // todo get token
        // todo store token in $cookie
        // todo store userid in $cookie

        return Restangular;
    }

    /**
     * @ngdoc method
     * @name service.authorization#parseJwt
     * @methodOf service.authorization
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
