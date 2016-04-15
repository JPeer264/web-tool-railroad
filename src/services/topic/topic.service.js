/**
 * @ngdoc service 
 *
 * @name service.topic
 *
 * @requires $rootScope
 * @requires Restangular
 */
angular
    .module('service.topic')
    .service('topic', topic);

topic.$inject = [
    '$rootScope',
    'Restangular'
];

function topic($rootScope, Restangular) {
    
    /**
     * @ngdoc method
     *
     * @name service.topic#get
     *
     * @methodOf service.topic
     *
     * @description 
     * Get a specific topic
     *
     * @param {Object} id - the id from the topic
     *
     * @returns {Promise} returns promise
     */
    this.get = function(id) {

    }

    /**
     * @ngdoc method
     *
     * @name service.topic#getAllBySubcategory
     *
     * @methodOf service.topic
     *
     * @description 
     * Get all topics
     *
     * @param {Object} category_id - the id from the subcategory
     *
     * @returns {Promise} returns promise
     */
    this.getAllBySubcategory = function(category_id) {

    }

    /**
     * @ngdoc method
     *
     * @name service.topic#create
     *
     * @methodOf service.topic
     *
     * @description 
     * Creates a new topic based on the formData
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
     * @name service.topic#update
     *
     * @methodOf service.topic
     *
     * @description 
     * Updates a specific topic based on a form with to updated content 
     * if the topic is hisself
     *
     * @param {Object} id       - the id from the topic
     * @param {Object} formData - the given formData of a form
     */
    this.update = function(id, formData) {

    }

    /**
     * @ngdoc method
     *
     * @name service.topic#delete
     * @private
     * @methodOf service.topic
     *
     * @description 
     * Deletes a specific topic if the topic is an superadmin
     *
     * @param {Object} id - the id from the topic
     */
    this.delete = function(id) {

    }   
}