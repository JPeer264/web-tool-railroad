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
    'user',
    'company'
];

function HomeController($scope, user, company) {

    /**
     * get the userdata from cookie
     */
    user.get(2).then(function(data) {
        var users = data.plain();

        $scope.getUser = users;
    });

    company.create().then(function(data) {
        console.log(data);
    });
}
