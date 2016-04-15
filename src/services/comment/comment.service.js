/**
 * @ngdoc service 
 *
 * @name service.comment
 *
 * @requires $rootScope
 * @requires Restangular
 */
angular
    .module('service.comment')
    .service('comment', comment);

comment.$inject = [
    '$rootScope',
    'Restangular'
];

function comment($rootScope, Restangular) {

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

    }
}