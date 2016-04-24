angular
    .module('page.tooltip')
    .controller('TooltipCtrl', TooltipController);

/**
 * @ngdoc controller
 * @name cmps.page:TooltipCtrl
 *
 * @requires $scope
 * @requires type
 *
 * @description
 * TooltipCtrl for the tooltip directive
 */
TooltipController.$inject = [
    '$scope',
    'type',
];

function TooltipController($scope, type) {

    /**
     * @ngdoc method
     * @name getType
     * @methodOf cmps.page:TooltipController
     *
     * @description
     * get the type data from type service
     *
     * @param {Integer} id the id of the specific type
     *
     * @return {Promise} a type.get() promise
     */
    $scope.getType = function(id) {

        return type.get(id);
    }
}
