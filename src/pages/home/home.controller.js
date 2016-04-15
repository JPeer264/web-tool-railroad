angular
	.module('pages.home')
	.controller('HomeCtrl', HomeController);

HomeController.$inject = [
	'$scope'
];

function HomeController($scope) {

    // swaggerService.data().success(function(data) {
    //     $scope.swagger = data;
    // });
}