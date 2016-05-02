angular
	.module('pages.subcategory')
	.controller('SubcategoryCtrl', SubcategoryController);

/**
 * @ngdoc controller
 * @name pages.subcategory:SubcategoryCtrl
 *
 * @requires $scope
 * @requires $state
 *
 * @description
 * SubcategoryCtrl for the subcategory page
 */
SubcategoryController.$inject = [
	'$scope',
    '$state',
];

function SubcategoryController($scope, $state) {

    /**
     * @ngdoc property
     * @name $scope.subcategoryId
     * @propertyOf pages.subcategory:SubcategoryCtrl
     *
     * @description
     * Receives the subcategory from the url /category/:id
     */
    $scope.subcategoryId = $state.params.id;

}