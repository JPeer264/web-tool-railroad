angular
	.module('pages.home')
	.controller('HomeCtrl', HomeController);

/**
 * @ngdoc object
 * @name pages.HomeCtrl
 * @requires $scope
 * @requires user
 * @requires auth
 *
 * @description
 * HomeCtrl for the Home Component
 */
HomeController.$inject = [
    '$scope',
    'user'
];

function HomeController($scope, user) {

    /**
     * get the userdata from cookie
     */
    user.getAll().then(function(data) {
        var users = data.plain();

        $scope.getUser = users;
    });
}
