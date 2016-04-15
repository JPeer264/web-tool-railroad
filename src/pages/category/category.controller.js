angular
	.module('pages.category')
	.controller('CategoryCtrl', CategoryController);

CategoryController.$inject = [
	'$scope'
];

function CategoryController($scope) {
    console.log('category');
}