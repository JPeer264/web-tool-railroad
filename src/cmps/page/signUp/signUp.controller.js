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
    console.log($scope.token);
    $scope.signup= function(){
        if($scope.token){
            console.log('init');
            user.createToken($scope.user).then( function (data){
                console.log("user updated");
            });
        }else{
            user.create($scope.user).then( function (data){
                console.log("user created");
            });
        }
        $scope.user=null;
        $location.path( '/welcome' );

    }
    $scope.back = function(){
        $location.path( '/welcome' );
    }
}
