/**
 * @ngdoc service 
 * @name service.category
 *
 * @requires $rootScope
 * @requires Restangular
 * @requires $httpParamSerializer
 */
angular
    .module('service.category')
    .service('category', category);

category.$inject = [
    '$rootScope',
    'Restangular',
    '$httpParamSerializer'
];

function category($rootScope, Restangular, $httpParamSerializer) {
    // cache all promises - private
    var _promiseCache = {};

    /**
     * @ngdoc method
     * @name service.category#getAll
     * @methodOf service.category
     *
     * @description 
     * Get all categories
     *
     * @returns {Promise} returns promise
     */
    this.getAll = function() {

        if (!_promiseCache.getAll) {
            _promiseCache.getAll = Restangular.all('category').getList();
        } 
        
        return _promiseCache.getAll;
    }

    /**
     * @ngdoc method
     * @name service.category#create
     * @methodOf service.category
     *
     * @description 
     * Creates a new category based on the formData
     *
     * @param {Object} formData - the given formData of a form
     *
     * @returns {Promise} returns promise
     */
    this.create = function(formData) {
        return Restangular.one('category').customPOST($httpParamSerializer(formData));
    }

    /**
     * @ngdoc method
     * @name service.category#update
     * @methodOf service.category
     *
     * @description 
     * Updates a specific category based on a form with to updated content
     *
     * @param {Object} id       - the id from the category
     * @param {Object} formData - the given formData of a form
     *
     * @returns {Promise} returns promise
     */
    this.update = function(id, formData) {
        return Restangular.one('category', id).customPOST($httpParamSerializer(formData));
    }

    /**
     * @ngdoc method
     * @name service.category#delete
     * @methodOf service.category
     *
     * @description 
     * Deletes a specific category if the user is an superadmin
     *
     * @param {Object} id - the id from the category
     *
     * @returns {Promise} returns promise
     */
    this.delete = function(id) {
        return Restangular.one('category', id).customDELETE();
    }
}