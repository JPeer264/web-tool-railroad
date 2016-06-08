angular
	.module('pages.home')
	.controller('HomeCtrl', HomeController);

/**
 * @ngdoc controller
 * @name pages.home:HomeCtrl
 *
 * @requires $scope
 * @requires service.user
 *
 * @description
 * HomeCtrl for the home page
 */
HomeController.$inject = [
    '$scope',
    'user'
];

function HomeController($scope, user) {

    user.latestActivity().then(function (data) {
        data = data.plain();

        $scope.latestComments = (data.latest_comments).slice(0,3);
        $scope.latestTopics = data.latest_topics;
    });

}
