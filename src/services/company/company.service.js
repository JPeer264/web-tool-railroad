/**
 * @ngdoc service
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
    var _promiseCache = {
        get: {}, // saves the id of every saved person
    }

    /**
     * @ngdoc method
     * @name service.company#get
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
        if (!_promiseCache.get[id]) {
             _promiseCache.get[id] = Restangular.one('company', id).get();
        }

        return _promiseCache.get[id];
    }

    /**
     * @ngdoc method
     * @name service.company#getAll
     * @methodOf service.company
     *
     * @description
     * Get all companies
     *
     * @returns {Promise} returns promise
     */
    this.getAll = function() {
        if (!_promiseCache.getAll) {
            _promiseCache.getAll = Restangular.all('company').getList();
        }

        return _promiseCache.getAll;
    }

        /**
     * @ngdoc method
     * @name service.company#getAllLimited
     * @methodOf service.company
     *
     * @description
     * Get all companies (limited info)
     *
     * @returns {Promise} returns promise
     */
    this.getAllLimited = function() {
        if (!_promiseCache.getAllLimited) {
            _promiseCache.getAllLimited = Restangular.all('companyall').getList();
        }

        return _promiseCache.getAllLimited;
    }

    /**
     * @ngdoc method
     * @name service.company#create
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
        delete Restangular.configuration.defaultHeaders['Content-Type'];

        return Restangular.one('company').withHttpConfig({transformRequest: angular.identity}).customPOST(formData, '', undefined, {'Content-Type': undefined});
    }

    /**
     * @ngdoc method
     * @name service.company#update
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
        delete Restangular.configuration.defaultHeaders['Content-Type'];

        return Restangular.one('company', id).withHttpConfig({transformRequest: angular.identity}).customPOST(formData, '', undefined, {'Content-Type': undefined});
    }

    /**
     * @ngdoc method
     * @name service.company#delete
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

    /**
     * @ngdoc method
     * @name service.company#resetCache
     * @methodOf service.company
     *
     * @description
     * Reset the cache to perform a new request
     *
     * @param {Object} key   - the key of the promiseCache
     * @param {Object} value - the value if the key is an object
     */
    this.resetCache = function (key, value) {

        if (value) {
            _promiseCache[key][value] = undefined;
            return;
        }

        _promiseCache[key] = undefined;
        return;
    }
}