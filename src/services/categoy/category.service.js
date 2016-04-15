/**
 * @ngdoc service 
 *
 * @name service.category
 *
 * @requires $rootScope
 * @requires Restangular
 */
angular
    .module('service.category')
    .service('category', category);

category.$inject = [
    '$rootScope',
    'Restangular'
];

function category($rootScope, Restangular) {
    
    /**
     * @ngdoc method
     *
     * @name service.category#getAll
     *
     * @methodOf service.category
     *
     * @description 
     * Get all categories
     *
     * @returns {Promise} returns promise
     */
    this.getAll = function() {

    }

    /**
     * @ngdoc method
     *
     * @name service.category#create
     *
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

    }

    /**
     * @ngdoc method
     *
     * @name service.category#update
     *
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

    }

    /**
     * @ngdoc method
     *
     * @name service.category#delete
     *
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

    }
}