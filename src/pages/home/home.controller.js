angular
	.module('pages.home')
	.controller('HomeCtrl', HomeController);

/**
 * @ngdoc controller
 * @name pages.home:HomeCtrl
 *
 * @requires $scope
 *
 * @description
 * HomeCtrl for the home page
 */
HomeController.$inject = [
    '$scope',
];

function HomeController($scope) {

    /**
     * @ngdoc property
     * @name $scope.getUser
     * @propertyOf pages.home:HomeCtrl
     *
     * @description
     * example of a property
     */
    $scope.getUser = 'users';

    $scope.testData = ['soda','beer','water','milk','wine','cognac'];
}
