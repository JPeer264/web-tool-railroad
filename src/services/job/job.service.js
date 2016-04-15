/**
 * @ngdoc service 
 *
 * @name service.job
 *
 * @requires $rootScope
 * @requires Restangular
 */
angular
    .module('service.job')
    .service('job', job);

job.$inject = [
    '$rootScope',
    'Restangular'
];

function job($rootScope, Restangular) {
    
    /**
     * @ngdoc method
     *
     * @name service.job#get
     *
     * @methodOf service.job
     *
     * @description 
     * Get a specific job
     *
     * @param {Object} id - the id from the job
     *
     * @returns {Promise} returns promise
     */
    this.get = function(id) {

    }

    /**
     * @ngdoc method
     *
     * @name service.job#getAll
     *
     * @methodOf service.job
     *
     * @description 
     * Get all jobs
     *
     * @returns {Promise} returns promise
     */
    this.getAll = function() {

    }

    /**
     * @ngdoc method
     *
     * @name service.job#create
     *
     * @methodOf service.job
     *
     * @description 
     * Creates a new job based on the formData
     *
     * @param {Object} formData - the given formData of a form
     *
     * @returns {Promise} returns promise
     */
    this.create = function(formData) {

    }

    /**
     * @ngdoc method
     *
     * @name service.job#update
     *
     * @methodOf service.job
     *
     * @description 
     * Updates a specific job based on a form with to updated content 
     * if the job is hisself
     *
     * @param {Object} id       - the id from the job
     * @param {Object} formData - the given formData of a form
     */
    this.update = function(id, formData) {

    }

    /**
     * @ngdoc method
     *
     * @name service.job#delete
     * @private
     * @methodOf service.job
     *
     * @description 
     * Deletes a specific job if the job is an superadmin
     *
     * @param {Object} id - the id from the job
     */
    this.delete = function(id) {

    }
}