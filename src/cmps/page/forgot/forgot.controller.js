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
            console.log("password changed");
            $scope.user=null;
        });
        $('#changePassword').foundation('close');

    }

    $scope.close=function (){
        $scope.user=null;
    }

}
