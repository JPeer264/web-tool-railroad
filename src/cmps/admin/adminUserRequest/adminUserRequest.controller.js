angular
    .module('admin.adminUserRequest')
    .controller('AdminUserRequestCtrl', AurController);

/**
 * @ngdoc controller
 * @name cmps.admin:AdminUserRequestCtrl
 *
 * @requires $scope
 *
 * @description
 * AdminUserRequestCtrl for the adminUserRequest directive
 */
AurController.$inject = [
    '$scope',
    'user'
];

function AurController($scope, user) {
    var cU = $scope.currentUser;

    user.getAll().then(function (data) {
        var allUsers = data.plain();
        var fiteredUsers = allUsers;

        // just make for admin accessible for all
        // console.log(role_id === 2);
        if (cU.role_id >= 3) {
            fiteredUsers = allUsers.filter(function (value, key) {
                if (value.company_id === cU.company_id) {
                    return true;
                }

                return false;
            });
        }

        $scope.pendingUsers = fiteredUsers.filter(function (value) {
            return value.accepted === 0;
        });

        $scope.invitedUsers = fiteredUsers.filter(function (value) {
            return value.accepted === 1;
        });

        $scope.acceptedUsers = allUsers.filter(function (value, key) {
            return value.accepted === 2;
        });
    });

    $scope.accept = function (id) {
        var formData = new FormData();
        formData.append('accepted', 2);

        user.update(id, formData).then(function (data) {
            console.log(data.plain());

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
