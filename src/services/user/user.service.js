/**
 * @ngdoc service
 * @name service.user
 *
 * @requires $rootScope
 * @requires Restangular
 * @requires $httpParamSerializer
 * @requires $cookies
 * @requires CONSTANT
 * @requires $q
 */
angular
    .module('service.user')
    .service('user', user);

user.$inject = [
    '$rootScope',
    'Restangular',
    '$httpParamSerializer',
    '$cookies',
    'CONSTANT',
    '$q',
];


function user($rootScope, Restangular, $httpParamSerializer, $cookies, CONSTANT, $q) {
    // cache all promises - private
    var _identity = undefined;
    var _authenticated = false;
    var _promiseCache = {
        get: {}, // saves the id of every saved person
    }

    this.isIdentityResolved = function() {
        return angular.isDefined(_identity);
    }

    this.setIdentity = function(identity) {
        _identity = identity;
    }

    this.isAuthenticated = function() {
        return _authenticated;
    }

    this.setAuthenticated = function(boo) {
        _authenticated = boo;
    }

    this.isRightRole = function(roleLimit) {
        if (!_authenticated || !_identity.role_id) return false;

        // should pass if there should be a userrole
        if (roleLimit === 0) return true;

        return _identity.role_id <= roleLimit;
    }

    /**
     * @ngdoc method
     * @name service.user#getCurrent
     * @methodOf service.user
     *
     * @description
     * Get the ID and Name from the logged in user
     *
     * @returns {Promise} promise for the current user
     */
    this.getCurrent = function() {
        var currentUserId = $cookies.get(CONSTANT.COOKIE.USER_ID);

        if (!_promiseCache.current) {
            _promiseCache.current = this.get(currentUserId);
        }

        return _promiseCache.current;
    }

    /**
     * @ngdoc method
     * @name service.user#currentUser
     * @methodOf service.user
     *
     * @description
     * Data of the current user - run setCurrent() before use
     */
    /**
     * @ngdoc method
     * @name service.user#setCurrent
     * @methodOf service.user
     *
     * @description
     * Set the rootscope of currentUser
     */
    this.setCurrent = function() {
        return (this.getCurrent()).then(function(data) {
            var userdata = data.plain();
            userdata.role = 'user';
            _identity = userdata;
            _authenticated = true;

            $rootScope.currentUser = $rootScope.setDefaultPictureLocation(userdata);
        });
    }

    /**
     * @ngdoc method
     * @name service.user#latestActivity
     * @methodOf service.user
     *
     * @description
     * Get the latest activity
     *
     *
     * @returns {Promise} returns promise
     */
    this.latestActivity = function () {
        return Restangular.one('latest/missed').get();
    }

    /**
     * @ngdoc method
     * @name service.user#latestActivityUser
     * @methodOf service.user
     *
     * @description
     * Get the latest activity by user
     *
     * @param {Object} id - the id from the user
     *
     * @returns {Promise} returns promise
     */
    this.latestActivityUser = function (id) {
        return Restangular.one('latest', id).get();
    }

    /**
     * @ngdoc method
     * @name service.user#get
     * @methodOf service.user
     *
     * @description
     * Get a specific user
     *
     * @param {Object} id - the id from the user
     *
     * @returns {Promise} returns promise
     */
    this.get = function(id) {
        if (!_promiseCache.get[id]) {
            _promiseCache.get[id] = Restangular.one('user', id).get()
        }

        return _promiseCache.get[id];
    }

    /**
     * @ngdoc method
     * @name service.user#getAll
     * @methodOf service.user
     *
     * @description
     * Get all users
     *
     * @returns {Promise} returns promise
     */
    this.getAll = function() {
        if (!_promiseCache.getAll) {
            _promiseCache.getAll = Restangular.all('user').getList();
        }

        return _promiseCache.getAll;
    }

    /**
     * @ngdoc method
     * @name service.user#getAllLimited
     * @methodOf service.user
     *
     * @description
     * Get all users (limited info)
     *
     * @returns {Promise} returns promise
     */
    this.getAllLimited = function() {
        if (!_promiseCache.getAllLimited) {
            _promiseCache.getAllLimited = Restangular.all('userall').getList();
        }

        return _promiseCache.getAllLimited;
    }

    /**
     * @ngdoc method
     * @name service.user#create
     * @methodOf service.user
     *
     * @description
     * Creates a new user based on the formData
     *
     * @param {Object} formData - the given formData of a form
     *
     * @returns {Promise} returns promise
     */
    this.create = function(formData) {
        return Restangular.all('register').customPOST($httpParamSerializer(formData));
    }

   /**
       * @ngdoc method
      * @name service.user#forgot
      * @methodOf service.user
      *
      * @description
      * Creates a new password based on the formData
      *
      * @param {Object} formData - the given formData of a form
      *
      * @returns {Promise} returns promise
      */
     this.forgot = function(formData) {
         return Restangular.all('forgot').customPOST($httpParamSerializer(formData));
     }


    /**
     * @ngdoc method
     * @name service.user#createToken
     * @methodOf service.user
     *
     * @description
     * Updates/Accepts invited user
     *
     * @param {Object} formData - the given formData of a form
     *
     * @returns {Promise} returns promise
     */
    this.createToken = function(formData) {
        return Restangular.one('invite').customPOST($httpParamSerializer(formData));
    }


    /**
     * @ngdoc method
     * @name service.user#update
     * @methodOf service.user
     *
     * @description
     * Updates a specific user based on a form with to updated content
     * if the user is hisself
     *
     * @param {Object} id       - the id from the user
     * @param {Object} formData - the given formData of a form
     */
    this.update = function(id, formData) {
        delete Restangular.configuration.defaultHeaders['Content-Type'];

        return Restangular.one('user', id).withHttpConfig({transformRequest: angular.identity}).customPOST(formData, '', undefined, {'Content-Type': undefined});
    }

    /**
     * @ngdoc method
     * @name service.user#delete
     * @methodOf service.user
     *
     * @description
     * Deletes a specific user if the user is an superadmin
     *
     * @param {Object} id - the id from the user
     */
    this.delete = function(id) {
        return Restangular.one('user', id).customDELETE();
    }

    /**
     * @ngdoc method
     * @name service.user#resetCache
     * @methodOf service.user
     *
     * @description
     * Reset the cache to perform a new request
     *
     * @param {Object} key   - the key of the promiseCache
     * @param {Object} value - the value if the key is an object
     */
    this.resetCache = function (key, value) {
        if (!key) {
            _promiseCache = {
                get: {},
            };
            return;
        }

        if (value) {
            _promiseCache[key][value] = undefined;
            return;
        }

        _promiseCache[key] = undefined;
        return;
    }
}