angular
    .module('forum.topic')
    .controller('TopicCmpsCtrl', TopicCmpsController);

/**
 * @ngdoc controller
 * @name cmps.forum:TopicCmpsCtrl
 *
 * @requires $scope
 * @requires $state
 * @requires topic
 *
 * @description
 * TopicCmpsCtrl for the topic directive
 */
TopicCmpsController.$inject = [
    '$scope',
    '$state',
    'topic'
];

function TopicCmpsController($scope, $state, topic) {
    $scope.resolvedTopics = false;

    /**
     * @ngdoc property
     * @name $scope.topicId
     * @propertyOf cmps.forum:TopicCmpsCtrl
     *
     * @description
     * Receives the topic from the url /topic/:id
     */
    $scope.topicId = $state.params.id;

    /**
     * @ngdoc property
     * @name $scope.topic
     * @propertyOf cmps.forum:TopicCmpsCtrl
     *
     * @description
     * Receives the topic from the url /topic/:id
     */
    topic.get($scope.topicId).then(function (data) {
        $scope.resolvedTopics = true;
        $scope.topic = data.plain();
        console.log(data.plain());
    });

}