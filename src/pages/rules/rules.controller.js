angular
	.module('pages.rules')
	.controller('RulesCtrl', RulesController);

/**
 * @ngdoc controller
 * @name pages.rules:RulesCtrl
 *
 * @requires $scope
 *
 * @description
 * RulesCtrl for the rules page
 */
RulesController.$inject = [
	'$scope'
];

function RulesController($scope) {
    console.log('rules');
}