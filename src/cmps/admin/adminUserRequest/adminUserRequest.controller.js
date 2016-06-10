angular
    .module('admin.adminUserRequest')
    .controller('AdminUserRequestCtrl', AurController);

/**
 * @ngdoc controller
 * @name cmps.admin:AdminUserRequestCtrl
 *
 * @requires $scope
 * @requires service.user
 * @requires service.role
 *
 * @description
 * AdminUserRequestCtrl for the adminUserRequest directive
 */
AurController.$inject = [
    '$scope',
    'user',
    'role'
];

function AurController($scope, user, role) {
    var cU = $scope.currentUser;
 
    if($scope.currentUser.role_id==1){
        $scope.superAdmin=true;
    }


    role.getAll().then(function(data){
        $scope.roles=data.plain();
    });

    user.getAll().then(function (data) {
        var allUsers = data.plain();
        var fiteredUsers = allUsers;

        // just make for admin accessible for all
        // console.log(role_id === 2);
        if (parseInt(cU.role_id) >= 3) {
            fiteredUsers = allUsers.filter(function (value, key) {
                if (value.company_id === cU.company_id) {
                    return true;
                }

                return false;
            });
        }

        $scope.pendingUsers = fiteredUsers.filter(function (value) {
            return parseInt(value.accepted) === 0;
        });

        $scope.invitedUsers = fiteredUsers.filter(function (value) {
            return parseInt(value.accepted) === 1;
        });

        $scope.acceptedUsers = allUsers.filter(function (value, key) {
            return parseInt(value.accepted) === 2;
        });
    });

    $scope.changeUser= function(id){
        $scope.userToEdit = $scope.acceptedUsers.filter(function (value) {
            if (value.id === id) {
                return true;
            }

            return false;
        })[0];
    }

    $scope.editUser = function () {
        var fd = new FormData();
        fd.append("role_id", $scope.userToEdit.role_id);

        user.update($scope.userToEdit.id, fd).then(function (data) {
            $('#editUser').foundation('close');

        }).catch(function (data) {
        });
    }


    $scope.accept = function (id) {
        var formData = new FormData();
        formData.append('accepted', '2');

        user.update(id, formData).then(function (data) {
            $scope.pendingUsers = $scope.pendingUsers.filter(function (key) {
                if (key.id === id) {
                    $scope.acceptedUsers.unshift(key);
                    return false;
                }
                return true;
            });
        });
    }

    $scope.decline = function (id, scopeTarget) {
        var $toUpdatedScope = $scope.pendingUsers;

        user.delete(id).then(function (data) {

            if (scopeTarget === 'invited') {
                $scope.invitedUsers = $scope.invitedUsers.filter(function (key) {
                    if (key.id === id) {
                        return false;
                    }
                    return true;
                });
                return;
            }

            $scope.pendingUsers = $scope.pendingUsers.filter(function (key) {
                if (key.id === id) {
                    return false;
                }
                return true;
            });
        });
    }
}
