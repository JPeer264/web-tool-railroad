angular
	.module('pages.admin')
	.controller('AdminCtrl', AdminController);

/**
 * @ngdoc controller
 * @name pages.admin:AdminCtrl
 *
 * @requires $scope
 *
 * @description
 * AdminCtrl for the admin page
 */
AdminController.$inject = [
	'$scope'
];

function AdminController($scope) {
    console.log('admin');
}