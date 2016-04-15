angular
	.module('pages.rules')
	.controller('RulesCtrl', RulesController);

RulesController.$inject = [
	'$scope'
];

function RulesController($scope) {
    console.log('rules');
}