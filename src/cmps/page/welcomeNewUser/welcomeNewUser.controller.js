angular
    .module('page.welcomeNewUser')
    .controller('WelcomeNewUserCtrl', WelcomeNewUserController);

/**
 * @ngdoc controller
 * @name cmps.page:WelcomeNewUserCtrl
 *
 * @requires $scope
 * @requires $cookies
 * @requires CONSTANT
 *
 * @description
 * Hello App controller
 */
WelcomeNewUserController.$inject = [
    '$scope',
    '$cookies',
    'CONSTANT',
];

function WelcomeNewUserController($scope, $cookies, CONSTANT) {

}
