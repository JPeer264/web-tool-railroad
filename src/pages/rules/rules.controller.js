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
	'$scope',
    '$translate',
];

function RulesController($scope, $translate) {

    $translate('TEST_2.NUMMER_1').then(function (translation) {
        console.log('works');
        console.log(translation);
    });
}