angular
    .module('admin.inviteUser')
    .controller('InviteUserCtrl', InviteUserController);

/**
 * @ngdoc controller
 * @name cmps.admin:InviteUserCtrl
 *
 * @requires $scope
 * @requires service.user
 *
 * @description
 * InviteUserCtrl for the inviteUser directive
 */
InviteUserController.$inject = [
    '$scope',
    'user'
];

function InviteUserController($scope, user) {

    $scope.inviteUser = function () {
        user.create({email: $scope.invite.email}).then(function (data) {
            console.log(data.plain());
        });
    }

}
