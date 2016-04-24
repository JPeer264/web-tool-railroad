/**
 * @ngdoc service 
 *
 * @name service.comment
 *
 * @requires $rootScope
 * @requires Restangular
 * @requires $httpParamSerializer
 */
angular
    .module('service.comment')
    .service('comment', comment);

comment.$inject = [
    '$rootScope',
    'Restangular',
    '$httpParamSerializer'
];

function comment($rootScope, Restangular, $httpParamSerializer) {

    /**
     * @ngdoc method
     *
     * @name service.comment#create
     *
     * @methodOf service.comment
     *
     * @description 
     * Creates a new comment based on the formData
     *
     * @param {Object} formData - the given formData of a form
     *
     * @returns {Promise} returns promise
     */
    this.create = function(formData) {
        return Restangular.one('company').customPOST($httpParamSerializer(formData));
    }
}