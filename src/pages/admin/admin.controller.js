angular
	.module('pages.admin')
	.controller('AdminCtrl', AdminController);

/**
 * @ngdoc controller
 * @name pages.admin:AdminCtrl
 *
 * @requires $scope
 * @requires service.user
 *
 * @description
 * AdminCtrl for the admin page
 */
AdminController.$inject = [
	'$scope',
    'user'
];

function AdminController($scope, user) {

    user.getAll().then(function (data) {
        var allUsers = data.plain();

        // todo see last added users
        $scope.pendingUsers = allUsers.filter(function (value) {
            return value.accepted === 0;
        }).slice(0,4);
    });
}