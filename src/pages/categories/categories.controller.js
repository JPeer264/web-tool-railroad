angular
	.module('pages.categories')
	.controller('CategoriesCtrl', CategoriesController);

/**
 * @ngdoc controller
 * @name pages.categories:CategoriesCtrl
 *
 * @requires $scope
 * @requires service.category
 *
 * @description
 * CategoriesCtrl for the categories page
 */
CategoriesController.$inject = [
	'$scope',
    'category'
];

function CategoriesController($scope, category) {
    
    category.getAll().then(function(data) {
        $scope.categories = data.plain();
    });

}