angular
	.module('pages.landing')
	.controller('LandingCtrl', LandingController);

LandingController.$inject = [
	'$scope'
];

function LandingController($scope) {
    console.log('landing');
}