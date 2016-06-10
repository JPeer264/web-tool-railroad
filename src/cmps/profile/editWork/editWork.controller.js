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

    job.getAll().then(function(data) {
        $scope.jobs = data.plain();
    });

    company.getAll().then(function(data) {
        $scope.companies = data.plain();
    })

    $scope.editWork=function(){
        //$scope.user.fileUpload=$scope.picFile;
        var fd = new FormData();
        fd.append("company_id",$scope.user.company_id);
        fd.append("job_id",$scope.user.job_id);
        user.update($scope.currentUser.id, fd).then(function(date){
            if($scope.user.job_id==1)
            {
                $scope.canChangeJob=true;
            }

            if($scope.user.company_id==1)
            {
                $scope.canChangeCompany=true;
            }
        });
        $('#editWork').foundation('close');
        $scope.picFile=null;

    }

    $scope.close=function (){
        $scope.picFile=null;
    }
}