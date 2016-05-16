angular
	.module('pages.faq')
	.controller('FaqCtrl', FaqController);

/**
 * @ngdoc controller
 * @name pages.faq:FaqCtrl
 *
 * @requires $scope
 *
 * @description
 * FaqCtrl for the faq page
 */
FaqController.$inject = [
	'$scope'
];

function FaqController($scope) {
    var elem = new Foundation.Accordion($('#faq'));
}