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
 * @requires service.country
 *
 * @description
 * editProfileCtrl for the editProfile directive
 */
editProfileController.$inject = [
    '$scope',
    'user',
    'job',
    'country',
];

function editProfileController($scope,user,job, country) {

    job.getAll().then(function(data) {
        $scope.jobs = data.plain();
        console.log($scope.jobs);
    });

    country.getAll().then(function(data) {
        $scope.countries = data.plain();
        console.log($scope.countries);
    });

    $scope.editProfile=function(){
        //$scope.user.fileUpload=$scope.picFile;
        var fd = new FormData();
        fd.append("firstname",$scope.user.firstname);
        fd.append("lastname",$scope.user.lastname);
        fd.append("password", $scope.user.passwordNew);
        fd.append("city",$scope.user.city);
        fd.append("address",$scope.user.address);
        fd.append("email",$scope.user.email);
        fd.append("birthday", (new Date($scope.user.birthday)).toISOString().slice(0,10));
        fd.append("Twitter",$scope.user.Twitter);
        fd.append("LinkedIn",$scope.user.LinkedIn);
        fd.append("Facebook",$scope.user.Facebook);
        fd.append("Xing",$scope.user.Xing);
        fd.append('fileUpload', $scope.picFile);
        console.log(fd);
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
