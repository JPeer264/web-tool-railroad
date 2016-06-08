angular
    .module('page.forgot')
    .controller('ForgotCtrl', ForgotController);

/**
 * @ngdoc controller
 * @name cmps.page:ForgotCtrl
 *
 * @requires $scope
 * @requires service.user
 *
 * @description
 * Hello App controller
 */
ForgotController.$inject = [
    '$scope',
    'user'
];

function ForgotController($scope, user) {


    /**
     * @ngdoc method
     * @name forgot
     * @methodOf cmps.page:ForgotCtrl
     *
     * @description
     * send email to get new password
     */
    $scope.forgot=function(){
        user.forgot($scope.user).then( function (data){
            $scope.user=null;
            $('#changePassword').foundation('close');

        }).catch(function (data) {
            // function for errors
            console.log(data);
            if(data.status==403){
                $scope.forgotForm.email.$setValidity("allowed", false);
            }
            if(data.status==404){
                $scope.forgotForm.email.$setValidity("notExist", false);
            }
            $scope.isInProgress = false;

        });

    }

    $scope.close=function (){
        $scope.user=null;
    }

}
