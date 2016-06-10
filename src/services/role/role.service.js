/**
 * @ngdoc service
 * @name service.role
 *
 * @requires $rootScope
 * @requires Restangular
 * @requires $httpParamSerializer
 */
angular
    .module('service.role')
    .service('role', role);

role.$inject = [
    '$rootScope',
    'Restangular',
    '$httpParamSerializer'
];

function role($rootScope, Restangular, $httpParamSerializer) {
    var _promiseCache = {
        get: {}, // saves the id of every saved person
    }
    /**
     * @ngdoc method
     * @name service.role#getAll
     * @methodOf service.role
     *
     * @description
     * Gets all the roles
     *
     *
     * @returns {Promise} returns promise
     */
    this.getAll = function() {
        if (!_promiseCache.getAll) {
            _promiseCache.getAll = Restangular.all('role').getList();
        }

        return _promiseCache.getAll;
    }
}
