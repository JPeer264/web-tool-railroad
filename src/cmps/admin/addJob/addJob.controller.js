angular
    .module('admin.addJob')
    .controller('AddJobCtrl', AddJobController);

/**
 * @ngdoc controller
 * @name cmps.admin:AddJobCtrl
 *
 * @requires $scope
 * @requires service.job
 *
 * @description
 * AddJobCtrl for the addJob directive
 */
AddJobController.$inject = [
    '$scope',
    'job'
];

function AddJobController($scope, job) {

    $scope.addJob = function() {
        job.create($scope.addJobForm).then(function (data) {

            $scope.jobs.push($scope.addJobForm);
            $scope.addJobForm.id = $scope.jobs.length;

            $('#add-job').foundation('close');
        });
    }
}
