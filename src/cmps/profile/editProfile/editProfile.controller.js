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
 * @requires service.company
 *
 * @description
 * editProfileCtrl for the editProfile directive
 */
editProfileController.$inject = [
    '$scope',
    'user',
    'job',
    'country',
    'company',
];

function editProfileController($scope,user,job, country, company) {

    job.getAll().then(function(data) {
        $scope.jobs = data.plain();
    });

    company.getAll().then(function(data) {
        $scope.companies = data.plain();
    });

    country.getAll().then(function(data) {
        $scope.countries = data.plain();
    });

    $scope.editProfile=function(){
        //$scope.user.fileUpload=$scope.picFile;
        var fd = new FormData();
        fd.append("firstname",$scope.user.firstname);
        fd.append("lastname",$scope.user.lastname);
        if($scope.user.passwordNew){
            fd.append("password", $scope.user.passwordNew);
        }
        fd.append("city",$scope.user.city);
        fd.append("address",$scope.user.address);
        fd.append("email",$scope.user.email);
        if($scope.user.birthdayNew){
            fd.append("birthday", (new Date($scope.user.birthdayNew)).toISOString().slice(0,10));
        }
        fd.append("Twitter",$scope.user.Twitter);
        fd.append("LinkedIn",$scope.user.LinkedIn);
        fd.append("Facebook",$scope.user.Facebook);
        fd.append("Xing",$scope.user.Xing);
        fd.append('fileUpload', $scope.picFile);
        user.update($scope.currentUser.id, fd).then(function(date){
        });
        $('#edit-profile').foundation('close');
        $scope.picFile=null;

    }

    $scope.close=function (){
        $scope.picFile=null;
    }
}
