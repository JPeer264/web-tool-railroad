angular
    .module('page.adminUserRequest')
    .controller('AdminUserRequestCtrl', AurController);

/**
 * @ngdoc controller
 * @name cmps.page:AdminUserRequestCtrl
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

        $scope.pendingUsers = allUsers.filter(function (value) {
            return value.accepted === 0;
        });

        $scope.acceptedUsers = allUsers.filter(function (value, key) {
            return value.accepted === 1;
        });
    });

    $scope.accept = function (id) {
        user.update(id, {accepted: 1}).then(function (data) {
            $scope.pendingUsers = $scope.pendingUsers.filter(function (key) {
                if (key.id === id) {
                    $scope.acceptedUsers.unshift(key);
                    return false;
                }
                return true;
            });
        });
    }
}
