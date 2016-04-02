angular
	.module('pages.home')
	.controller('homeCtrl', homeController);

homeController.$inject = [
	'$scope',
    'swaggerService'
];

function homeController($scope, swaggerService) {

    swaggerService.data().success(function(data) {
        $scope.swagger = data;
    });

}