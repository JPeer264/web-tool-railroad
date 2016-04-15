/**
 * @ngdoc service 
 *
 * @name service.type
 *
 * @requires $rootScope
 * @requires Restangular
 */
angular
    .module('service.type')
    .service('type', type);

type.$inject = [
    '$rootScope',
    'Restangular'
];

function type($rootScope, Restangular) {
    
    /**
     * @ngdoc method
     *
     * @name service.type#get
     *
     * @methodOf service.type
     *
     * @description 
     * Get a specific type
     *
     * @param {Object} id - the id from the type
     *
     * @returns {Promise} returns promise
     */
    this.get = function(id) {

    }

    /**
     * @ngdoc method
     *
     * @name service.type#create
     *
     * @methodOf service.type
     *
     * @description 
     * Creates a new type based on the formData
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
     * @name service.type#update
     *
     * @methodOf service.type
     *
     * @description 
     * Updates a specific type based on a form with to updated content 
     * if the type is hisself
     *
     * @param {Object} id       - the id from the type
     * @param {Object} formData - the given formData of a form
     */
    this.update = function(id, formData) {

    }

    /**
     * @ngdoc method
     *
     * @name service.type#delete
     * @private
     * @methodOf service.type
     *
     * @description 
     * Deletes a specific type if the type is an superadmin
     *
     * @param {Object} id - the id from the type
     */
    this.delete = function(id) {

    }
}