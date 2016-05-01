/**
 * @ngdoc service 
 * @name service.user
 *
 * @requires $rootScope
 * @requires Restangular
 * @requires $httpParamSerializer
 * @requires $cookies
 */
angular
    .module('service.user')
    .service('user', user);

user.$inject = [
    '$rootScope',
    'Restangular',
    '$httpParamSerializer',
    '$cookies'
];


function user($rootScope, Restangular, $httpParamSerializer, $cookies) {
    // cache all promises - private
    var _promiseCache = {
        get: {}, // saves the id of every saved person
    }

    /**
     * @ngdoc method
     * @name service.user#currentUser
     * @methodOf service.user
     *
     * @description 
     * Data of the current user - run setCurrent() before use
     */
    $rootScope.currentUser = '';

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
        // todo get userid from JWT token
        if (!_promiseCache.current) {
            _promiseCache.current = this.get(2);
        }

        return _promiseCache.current;
    }

    /**
     * @ngdoc method
     * @name service.user#setCurrent
     * @methodOf service.user
     *
     * @description 
     * Set the rootscope of currentUser
     */
    this.setCurrent = function() {
        (this.getCurrent()).then(function(data) {
            $rootScope.currentUser = data.plain();
        });
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
        return Restangular.one('user', id).get();
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
        return Restangular.all('user').getList();
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
        return Restangular.one('user', id).customPOST($httpParamSerializer(formData));
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
}