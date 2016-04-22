/**
 * @ngdoc service 
 *
 * @name service.company
 *
 * @requires $rootScope
 * @requires Restangular
 * @requires $httpParamSerializer
 */
angular
    .module('service.company')
    .service('company', company);

company.$inject = [
    '$rootScope',
    'Restangular',
    '$httpParamSerializer'
];

function company($rootScope, Restangular, $httpParamSerializer) {
    
    /**
     * @ngdoc method
     *
     * @name service.company#get
     *
     * @methodOf service.company
     *
     * @description 
     * Get a specific company
     *
     * @param {Object} id - the id from the company
     *
     * @returns {Promise} returns promise
     */
    this.get = function(id) {
        return Restangular.one('company', id).get();
    }

    /**
     * @ngdoc method
     *
     * @name service.company#getAll
     *
     * @methodOf service.company
     *
     * @description 
     * Get all companies
     *
     * @returns {Promise} returns promise
     */
    this.getAll = function() {
        return Restangular.all('company').getList();
    }

    /**
     * @ngdoc method
     *
     * @name service.company#create
     *
     * @methodOf service.company
     *
     * @description 
     * Creates a new company based on the formData
     *
     * @param {Object} formData - the given formData of a form
     *
     * @returns {Promise} returns promise
     */
    this.create = function(formData) {
        return Restangular.one('company').customPOST($httpParamSerializer(formData));
    }

    /**
     * @ngdoc method
     *
     * @name service.company#update
     *
     * @methodOf service.company
     *
     * @description 
     * Updates a specific company based on a form with to updated content 
     * if the company is hisself
     *
     * @param {Object} id       - the id from the company
     * @param {Object} formData - the given formData of a form
     */
    this.update = function(id, formData) {
        return Restangular.one('company', id).customPOST($httpParamSerializer(formData));
    }

    /**
     * @ngdoc method
     *
     * @name service.company#delete
     * @private
     * @methodOf service.company
     *
     * @description 
     * Deletes a specific company if the company is an superadmin
     *
     * @param {Object} id - the id from the company
     */
    this.delete = function(id) {
        return Restangular.one('company', id).customDELETE();
    }
}