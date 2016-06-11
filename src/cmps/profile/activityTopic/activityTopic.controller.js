angular
    .module('profile.activityTopic')
    .controller('activityTopicCtrl', activityTopicController);

/**
 * @ngdoc controller
 * @name cmps.profile:activityCtrl
 *
 * @requires $scope
 *
 * @description
 * ActivityCtrl for the Activity directive
 */
activityTopicController.$inject = [
    '$scope',
];

function activityTopicController($scope) {
    var em;

    shortenText();

    function shortenText() {
        em = $(window).width() / 16;
        var text = $scope.topic.title;

        // todo shorten text
    }

}
