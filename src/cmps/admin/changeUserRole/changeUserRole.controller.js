angular
    .module('admin.changeUserRole')
    .controller('ChangeUserRoleCtrl', ChangeUserRoleController);

/**
 * @ngdoc controller
 * @name cmps.admin:ChangeUserRoleCtrl
 *
 * @requires $scope
 * @requires service.user
 * @requires service.company
 * @requires service.job
 *
 * @description
 * ChangeUserRoleCtrl for the changeUserRole directive
 */
ChangeUserRoleController.$inject = [
    '$scope',
    'user',
    'role'
];

function ChangeUserRoleController($scope, user, role) {

    $scope.userToEdit = $scope.user;

    role.getAll().then(function(data){
        $scope.roles=data.plain();
    });

    $scope.editUser = function () {
        var fd = new FormData();
        fd.append("role_id", $scope.userToEdit.role_id);

        user.update($scope.userToEdit.id, fd).then(function (data) {
            $('#change-user-role').foundation('close');

        });
    }
}
