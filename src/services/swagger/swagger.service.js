/**
* service.swagger Module
*
* Description
*/
angular.
    module('service.swagger').
    service('swaggerService', swaggerService);

swaggerService.$inject = [
    '$rootScope',
    '$http'
];

function swaggerService($rootScope, $http) {

    this.data = function() {
        return $http({
            method: 'GET',
            url: 'http://petstore.swagger.io/v2/swagger.json'
        });
    };
}