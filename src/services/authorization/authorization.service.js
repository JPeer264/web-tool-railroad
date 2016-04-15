/**
 * @ngdoc service 
 *
 * @name service.authorization
 *
 * @requires $rootScope
 * @requires Restangular
 * @requires $state
 */
angular
    .module('service.authorization')
    .service('authorization', authorization);

authorization.$inject = [
    '$rootScope',
    'Restangular',
    '$state'
];

function authorization($rootScope, Restangular, $state) {
    
    /**
     * @ngdoc method
     *
     * @name service.authorization#check
     *
     * @methodOf service.authorization
     *
     * @description 
     * Checks if the user is authorized to see a specific page
     *
     * @returns {string} What do I return // return type and description
     */
    this.check = function() {
        // todo check if user isset 
        // if not return to following
        // IMPORTANT NOTE: $state needs a time to load
        // $state.go('landing');
    }
}