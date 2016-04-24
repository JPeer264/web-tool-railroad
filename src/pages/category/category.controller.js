angular
	.module('pages.category')
	.controller('CategoryCtrl', CategoryController);

/**
 * @ngdoc controller
 * @name pages.category:CategoryCtrl
 *
 * @requires $scope
 *
 * @description
 * CategoryCtrl for the category page
 */
CategoryController.$inject = [
	'$scope'
];

function CategoryController($scope) {
    console.log('category');
}