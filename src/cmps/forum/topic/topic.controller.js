angular
    .module('cmps.topic')
    .controller('topicCtrl', topicController);

topicController.$inject = [
    '$scope',
    'swaggerService'
];

function topicController($scope, swaggerService) {

    swaggerService.data().success(function(data) {
        $scope.swagger = data;
    });
}