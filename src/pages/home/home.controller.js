angular
	.module('pages.home')
	.controller('homeCtrl', homeController);

homeController.$inject = [
	'$scope',
    'swaggerService'
];

function homeController($scope, swaggerService) {

    $scope.welcome = 'Welcome to our the railroad museum!';

    swaggerService.data().success(function(data) {
        $scope.swagger = data;
    });
}