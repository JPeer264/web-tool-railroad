/**
 * @ngdoc service 
 * @name service.subcategory
 *
 * @requires $rootScope
 * @requires Restangular
 * @requires $httpParamSerializer
 */
angular
    .module('service.subcategory')
    .service('subcategory', subcategory);

subcategory.$inject = [
    '$rootScope',
    'Restangular',
    '$httpParamSerializer'
];

function subcategory($rootScope, Restangular, $httpParamSerializer) {
    
    /**
     * @ngdoc method
     * @name service.subcategory#get
     * @methodOf service.subcategory
     *
     * @description 
     * Get a specific subcategories
     *
     * @param {Object} id - the id from the subcategory
     *
     * @returns {Promise} returns promise
     */
    this.get = function(id) {
        return Restangular.one('subcategory', id).get();
    }

    /**
     * @ngdoc method
     * @name service.subcategory#getAll
     * @methodOf service.subcategory
     *
     * @description 
     * Get all subcategories
     *
     * @returns {Promise} returns promise
     */
    this.getAll = function() {
        return Restangular.all('subcategory').getList();
    }

    /**
     * @ngdoc method
     * @name service.subcategory#create
     * @methodOf service.subcategory
     *
     * @description 
     * Creates a new subcategory based on the formData
     *
     * @param {Object} category_id  - parent category
     * @param {Object} formData     - the given formData of a form
     *
     * @returns {Promise} returns promise
     */
    this.create = function(category_id, formData) {
        return Restangular.one('category', category_id).one('subcategory').customPOST($httpParamSerializer(formData));
    }

    /**
     * @ngdoc method
     * @name service.subcategory#update
     * @methodOf service.subcategory
     *
     * @description 
     * Updates a specific subcategory based on a form with to updated content 
     * if the subcategory is hisself
     *
     * @param {Object} id       - the id from the subcategory
     * @param {Object} formData - the given formData of a form
     */
    this.update = function(id, formData) {
        return Restangular.one('subcategory', id).customPOST($httpParamSerializer(formData));
    }

    /**
     * @ngdoc method
     * @name service.subcategory#delete
     * @methodOf service.subcategory
     *
     * @description 
     * Deletes a specific subcategory if the subcategory is an superadmin
     *
     * @param {Object} id - the id from the subcategory
     */
    this.delete = function(id) {
        return Restangular.one('subcategory', id).customDELETE();
    }
}