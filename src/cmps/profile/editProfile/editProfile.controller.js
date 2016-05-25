angular
    .module('profile.editProfile')
    .controller('editProfileCtrl', editProfileController);

/**
 * @ngdoc controller
 * @name cmps.profile:editProfileCtrl
 *
 * @requires $scope
 * @requires service.user
 * @requires service.job
 *
 * @description
 * editProfileCtrl for the editProfile directive
 */
editProfileController.$inject = [
    '$scope',
    'user',
    'job',
];

function editProfileController($scope,user,job) {

    job.getAll().then(function(data) {
        $scope.jobs = data.plain();
        console.log($scope.jobs);
    });


    $scope.editProfile=function(){
        $scope.user.fileUpload=$scope.picFile;
         var fd = new FormData();
        fd.append('fileUpload', $scope.picFile);
        user.update($scope.currentUser.id, fd).then(function(date){
                console.log("updated");
        });
        $('#editProfile').foundation('close');
        $scope.picFile=null;

    }

    $scope.close=function (){
        $scope.picFile=null;
    }
}
