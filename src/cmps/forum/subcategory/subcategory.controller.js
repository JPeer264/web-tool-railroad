angular
    .module('forum.subcategory')
    .controller('SubcategoryCmpsCtrl', SubcategoryCmpsController);
/**
 * @ngdoc controller
 * @name cmps.forum:SubcategoryCmpsCtrl
 *
 * @requires $scope
 * @requires service.subcategory
 *
 * @description
 * SubcategoryCmpsCtrl for the subcategory directive
 */
SubcategoryCmpsController.$inject = [
    '$scope',
    'subcategory'
];

function SubcategoryCmpsController($scope, subcategory) {

    /**
     * @ngdoc property
     * @name $scope.subcategory
     * @propertyOf cmps.forum:SubcategoryCmpsCtrl
     *
     * @description
     * Async - Receives one specific subcategory as object
     */
    subcategory.get($scope.subcategoryId).then(function (data) {
        $scope.subcategory = data.plain();
    });

}