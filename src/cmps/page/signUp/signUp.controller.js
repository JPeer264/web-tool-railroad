angular
    .module('page.signUp')
    .controller('SignUpCtrl', SignUpController);

/**
 * @ngdoc controller
 * @name cmps.page:SignUpCtrl
 *
 * @requires $scope
 * @requires $location
 * @requires $state
 * @requires service.job
 * @requires service.company
 * @requires service.user
 * @requires service.country
 *
 * @description
 * SignUpCtrl for the signUp directive
 */
SignUpController.$inject = [
    '$scope',
    '$location',
    '$state',
    'job',
    'company',
    'user',
    'country',
];

function SignUpController($scope, $location, $state, job, company, user, country) {

    $scope.user=[];
    job.getAll().then(function(data) {
        $scope.jobs = data.plain();
    });

    company.getAll().then(function(data) {
        $scope.companies = data.plain();
    });

    country.getAll().then(function(data) {
        $scope.countries = data.plain();
    });

    $scope.token=$state.params.token;
    if($scope.token){
        $scope.hide=false;
        $scope.user.invite_token=$state.params.token;
    }else{
        $scope.hide=true;
    }
    $scope.signup= function(){
        if($scope.token){
            user.createToken($scope.user).then( function (data){
                $scope.user=null;
                $location.path( '/welcome' );
            }).catch(function (data) {
                // function for errors
                if(data.status==403){
                    if(data.data.error=="The token has expired")
                    {
                        $scope.signupForm.email.$setValidity("tokenExpired", false);
                    }else{
                        $scope.signupForm.email.$setValidity("allowed", false);
                    }
                }
                if(data.status==401){
                        $scope.signupForm.email.$setValidity("correctPassword", false);
                }
                if(data.status==400){
                    $scope.signupForm.email.$setValidity("token", false);
                }
                $scope.isInProgress = false;
            });
        }else{
            user.create($scope.user).then( function (data){
                $scope.user=null;
                $location.path( '/welcome' );
            }).catch(function (data) {
                // function for errors
                if(data.status==409){
                    $scope.signupForm.email.$setValidity("exists", false);
                }

                $scope.isInProgress = false;

            });
        }
       

    }
    $scope.back = function(){
        $location.path( '/welcome' );
    }
}
