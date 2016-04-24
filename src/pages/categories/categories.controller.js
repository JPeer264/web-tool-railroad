angular
	.module('pages.categories')
	.controller('CategoriesCtrl', CategoriesController);

/**
 * @ngdoc controller
 * @name pages.categories:CategoriesCtrl
 *
 * @requires $scope
 *
 * @description
 * CategoriesCtrl for the categories page
 */
CategoriesController.$inject = [
	'$scope'
];

function CategoriesController($scope) {
    console.log('categories');
}