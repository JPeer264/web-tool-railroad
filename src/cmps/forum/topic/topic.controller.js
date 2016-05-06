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

    /**
     * @ngdoc property
     * @name $scope.topicId
     * @propertyOf forum.subcategory:TopicCmpsCtrl
     *
     * @description
     * Receives the topic from the url /topic/:id
     */
    $scope.topicId = $state.params.id;

    /**
     * @ngdoc property
     * @name $scope.topic
     * @propertyOf forum.topic:TopicCmpsCtrl
     *
     * @description
     * Receives the topic from the url /topic/:id
     */
    topic.get($scope.topicId).then(function (data) {
        $scope.topic = data.plain();
    });

}