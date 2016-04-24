/**
 * @ngdoc service 
 * @name service.type
 *
 * @requires $rootScope
 * @requires Restangular
 * @requires $httpParamSerializer
 */
angular
    .module('service.type')
    .service('type', type);

type.$inject = [
    '$rootScope',
    'Restangular',
    '$httpParamSerializer'
];

// cache all promises - private
ßvar _promiseCache = {
    get: {},
}

function type($rootScope, Restangular, $httpParamSerializer) {
    
    /**
     * @ngdoc method
     * @name service.type#get
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

        if (!_promiseCache.get[id]) {
            _promiseCache.get[id] = Restangular.one('type', id).get();
        }

        return _promiseCache.get[id];
    }

    /**
     * @ngdoc method
     * @name service.type#create
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
        return Restangular.all('type').customPOST($httpParamSerializer(formData));
    }

    /**
     * @ngdoc method
     * @name service.type#update
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
        return Restangular.one('type', id).customPOST($httpParamSerializer(formData));
    }

    /**
     * @ngdoc method
     * @name service.type#delete
     * @methodOf service.type
     *
     * @description 
     * Deletes a specific type if the type is an superadmin
     *
     * @param {Object} id - the id from the type
     */
    this.delete = function(id) {
        return Restangular.one('type', id).customDELETE();
    }
}