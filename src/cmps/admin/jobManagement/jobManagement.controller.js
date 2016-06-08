angular
    .module('admin.jobManagement')
    .controller('JobManagementCtrl', JobManagementController);

/**
 * @ngdoc controller
 * @name cmps.admin:JobManagementCtrl
 *
 * @requires $scope
 * @requires service.job
 *
 * @description
 * JobManagementCtrl for the jobManagement directive
 */
JobManagementController.$inject = [
    '$scope',
    'job'
];

function JobManagementController($scope, job) {

    job.getAll().then(function (data) {
        $scope.jobs = data.plain();
    });

    $scope.addJob = function() {
        $scope.manageJob = null;
        $scope.isChangeJob = false;
    }

    $scope.editJob = function (id) {
        $scope.manageJob = $scope.jobs.filter(function (value) {
            if (value.id === id) {
                return true;
            }

            return false;
        })[0];
        $scope.isChangeJob = true;
    }

    $scope.updateJob = function (id) {
        job.update(id, $scope.manageJob).then(function (data) {
            angular.forEach($scope.jobs, function (key, value) {
                if (value.id === $scope.manageJob.id) {
                    $scope.jobs[key] = $scope.manageJob;
                }
            });

            $('#job-management-edit').foundation('close');
        }).catch(function (data) {
            console.log(data);
            if(data.status==409){
                console.log('init');
                $scope.manageJobForm.title.$setValidity("exists", false);
            }
        });
    }

      $scope.addNewJob = function() {
        job.create($scope.manageJob).then(function (data) {

            $scope.jobs.push($scope.manageJob);
            $scope.manageJob.id = $scope.jobs.length;

            $('#job-management-edit').foundation('close');
        }).catch(function (data) {
            if(data.status==409){
                $scope.manageJobForm.title.$setValidity("exists", false);
            }
        });
    }
}
