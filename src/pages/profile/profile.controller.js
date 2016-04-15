angular
	.module('pages.profile')
	.controller('ProfileCtrl', ProfileController);

ProfileController.$inject = [
	'$scope'
];

function ProfileController($scope) {
    console.log('profile');
}