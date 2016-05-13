angular
    .module('forum.addTopic')
    .controller('AddTopicCtrl', AddTopicController);

/**
 * @ngdoc controller
 * @name cmps.forum:AddTopicCtrl
 *
 * @requires $scope
 *
 * @description
 * AddTopicCtrl for the addTopic directive
 */
AddTopicController.$inject = [
    '$scope',
    'job',
    'company',
];

function AddTopicController($scope, job, company) {

    $( "a" ).click(function( event ) {
        event.preventDefault();
    });

    $('button').on('click', function() {
  $('#addTopic').foundation('reveal','open');
});

    job.getAll().then(function(data) {
        $scope.jobs = data.plain();
    });

    company.getAll().then(function(data) {
        $scope.companies = data.plain();
    });
}
