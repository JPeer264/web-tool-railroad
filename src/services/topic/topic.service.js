/**
 * @ngdoc service 
 * @name service.topic
 *
 * @requires $rootScope
 * @requires Restangular
 * @requires $httpParamSerializer
 */
angular
    .module('service.topic')
    .service('topic', topic);

topic.$inject = [
    '$rootScope',
    'Restangular',
    '$httpParamSerializer'
];

function topic($rootScope, Restangular, $httpParamSerializer) {
    
    /**
     * @ngdoc method
     * @name service.topic#get
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
        return Restangular.one('topic', id).get();
    }

    /**
     * @ngdoc method
     * @name service.topic#getAllBySubcategory
     * @methodOf service.topic
     *
     * @description 
     * Get all topics - maybe we do not need it -> subcategory.get(id)
     *
     * @param {Object} category_id - the id from the subcategory
     *
     * @returns {Promise} returns promise
     */
    this.getAllBySubcategory = function(category_id) {
        // return Restangular.all('subcategory', category_id).getList();
    }

    /**
     * @ngdoc method
     * @name service.topic#create
     * @methodOf service.topic
     *
     * @description 
     * Creates a new topic based on the formData and subcategory
     *
     * @param {Object} id       - the subcategory id
     * @param {Object} formData - the given formData of a form
     *
     * @returns {Promise} returns promise
     */
    this.create = function(id, formData) {
        return Restangular.one('subcategory', id).one('topic').customPOST($httpParamSerializer(formData));
    }

    /**
     * @ngdoc method
     * @name service.topic#update
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
        return Restangular.one('topic', id).customPOST($httpParamSerializer(formData));
    }

    /**
     * @ngdoc method
     * @name service.topic#delete
     * @methodOf service.topic
     *
     * @description 
     * Deletes a specific topic if the topic is an superadmin
     *
     * @param {Object} id - the id from the topic
     */
    this.delete = function(id) {
        return Restangular.one('topic', id).customDELETE();
    }   
}