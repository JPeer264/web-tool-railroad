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

    user.getAll().then(function (data) {
        var allUsers = data.plain();

        console.log(allUsers.length);

        $scope.pendingUsers = allUsers.filter(function (value) {
            return value.accepted === 0;
        });

        $scope.invitedUsers = allUsers.filter(function (value) {
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

    $scope.decline = function (id) {
        user.delete(id).then(function (data) {
            $scope.pendingUsers = $scope.pendingUsers.filter(function (key) {
                if (key.id === id) {
                    return false;
                }
                return true;
            });
        });
    }
}
