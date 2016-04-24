angular
	.module('pages.error')
	.controller('ErrorCtrl', ErrorController);

/**
 * @ngdoc controller
 * @name pages.error:ErrorCtrl
 *
 * @requires $scope
 *
 * @description
 * ErrorCtrl for the error page
 */
ErrorController.$inject = [
	'$scope',
    'Restangular'
];

function ErrorController($scope, Restangular) {

}