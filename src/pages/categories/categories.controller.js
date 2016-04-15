angular
	.module('pages.categories')
	.controller('CategoriesCtrl', CategoriesController);

CategoriesController.$inject = [
	'$scope'
];

function CategoriesController($scope) {
    console.log('categories');
}