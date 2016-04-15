angular
	.module('pages.admin')
	.controller('AdminCtrl', AdminController);

AdminController.$inject = [
	'$scope'
];

function AdminController($scope) {
    console.log('admin');
}