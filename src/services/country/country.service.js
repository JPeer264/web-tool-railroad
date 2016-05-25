/**
 * @ngdoc service
 * @name service.country
 *
 * @requires $rootScope
 * @requires Restangular
 * @requires $httpParamSerializer
 */
angular
    .module('service.country')
    .service('country', country);

country.$inject = [
    '$rootScope',
    'Restangular',
    '$httpParamSerializer'
];

function country($rootScope, Restangular, $httpParamSerializer) {
    var _promiseCache = {
        get: {}, // saves the id of every saved person
    }

    /**
     * @ngdoc method
     * @name service.country#get
     * @methodOf service.country
     *
     * @description
     * Get a specific country
     *
     * @param {Object} id - the id from the country
     *
     * @returns {Promise} returns promise
     */
    this.get = function(id) {
        if (!_promiseCache.get[id]) {
            _promiseCache.get[id] = Restangular.one('country', id).get();
        }

        return _promiseCache.get[id];
    }

    /**
     * @ngdoc method
     * @name service.country#getAll
     * @methodOf service.country
     *
     * @description
     * Get all countries
     *
     * @returns {Promise} returns promise
     */
    this.getAll = function() {
        if (!_promiseCache.current) {
            _promiseCache.current = Restangular.all('country').getList();
        }

        return _promiseCache.current;
    }
}