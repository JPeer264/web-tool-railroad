/**
 * @ngdoc service 
 * @name service.user
 *
 * @requires $rootScope
 * @requires Restangular
 * @requires $httpParamSerializer
 */
angular
    .module('service.user')
    .service('user', user);

user.$inject = [
    '$rootScope',
    'Restangular',
    '$httpParamSerializer',
];

function user($rootScope, Restangular, $httpParamSerializer) {

    /**
     * @ngdoc method
     * @name service.user#getCurrent
     * @methodOf service.user
     *
     * @description 
     * Get the ID and Name from the logged in user
     *
     * @returns {Object} information about the logged in user
     */
    this.getCurrent = function() {
        // todo get userdata from JWT token
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