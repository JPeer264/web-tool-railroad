/**
 * @ngdoc service
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
     * @name service.comment#create
     * @methodOf service.comment
     *
     * @description
     * Creates a new comment based on the formData
     *
     * @param {Object} formData - the given formData of a form
     *
     * @returns {Promise} returns promise
     */
    this.create = function(id, formData) {
        delete Restangular.configuration.defaultHeaders['Content-Type'];

        return Restangular.one('topic', id).one('comment').withHttpConfig({transformRequest: angular.identity}).customPOST(formData, '', undefined, {'Content-Type': undefined});
    }
}
