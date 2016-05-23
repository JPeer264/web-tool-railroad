angular
    .module('admin.inviteUser')
    .controller('InviteUserCtrl', InviteUserController);

/**
 * @ngdoc controller
 * @name cmps.admin:InviteUserCtrl
 *
 * @requires $scope
 * @requires service.user
 * @requires service.company
 *
 * @description
 * InviteUserCtrl for the inviteUser directive
 */
InviteUserController.$inject = [
    '$scope',
    'user',
    'company'
];

function InviteUserController($scope, user, company) {

    $scope.inviteUser = function () {
        user.create($scope.invite).then(function (data) {
            console.log(data.plain());
        });
    }

    company.getAll().then(function (data) {
        $scope.companies = data.plain();
    });

}
