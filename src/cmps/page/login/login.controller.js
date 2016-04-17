angular
    .module('page.login')
    .controller('LoginCtrl', loginController);

loginController.$inject = [
    '$scope',
    'user'
];

function loginController($scope, user) {
    $scope.login = function() {
        user.login($scope.user);
    }
}