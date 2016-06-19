angular
    .module('profile.editWork')
    .controller('editWorkCtrl', editWorkController);

/**
 * @ngdoc controller
 * @name cmps.profile:editWorkCtrl
 *
 * @requires $scope
 * @requires service.user
 * @requires service.job
 * @requires service.company
 *
 * @description
 * editProfileCtrl for the editProfile directive
 */
editWorkController.$inject = [
    '$scope',
    'user',
    'job',
    'company',
];

function editWorkController($scope,user,job, company) {
    $scope.triggeredWork = false;

    job.getAll().then(function(data) {
        $scope.jobs = data.plain();
    });

    company.getAll().then(function(data) {
        $scope.companies = data.plain();
    })

    $scope.editWork=function(){
        $scope.triggeredWork = true;

        var fd = new FormData();
        fd.append("company_id",$scope.user.company_id);
        fd.append("job_id",$scope.user.job_id);
        user.update($scope.user.id, fd).then(function(data){

            if($scope.user.job_id === 1) {
                $scope.canChangeJob = true;
            } else {
                $scope.canChangeJob = false;
            }

            if($scope.user.company_id === 1) {
                $scope.canChangeCompany = true;
            } else {
                $scope.canChangeCompany = false;
            }

            $('#edit-work').foundation('close');
            $scope.triggeredWork = false;
            $scope.picFile = null;
        },function (data) {
            $scope.triggeredWork = false;

        });

    }

    $scope.close=function (){
        $scope.picFile=null;
    }
}
