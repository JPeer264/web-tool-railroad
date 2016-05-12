angular
	.module('pages.signup')
	.controller('SignupCtrl', SignupController);

/**
 * @ngdoc controller
 * @name pages.signup: SignupCtrl
 *
 * @requires $scope
 *
 * @description
 * SignupCtrl for the signup page
 */
SignupController.$inject = [
	'$scope'
];

function SignupController($scope) {
    console.log('signup');
}
