angular
	.module('pages.faq')
	.controller('FaqCtrl', FaqController);

FaqController.$inject = [
	'$scope'
];

function FaqController($scope) {
    console.log('faq');
}