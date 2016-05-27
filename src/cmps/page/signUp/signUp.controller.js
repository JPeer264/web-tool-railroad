angular
    .module('page.signUp')
    .controller('SignUpCtrl', SignUpController);

/**
 * @ngdoc controller
 * @name cmps.page:SignUpCtrl
 *
 * @requires $scope
 * @requires $location
 * @requires job
 * @requires company
 * @requires user
 *
 * @description
 * SignUpCtrl for the signUp directive
 */
SignUpController.$inject = [
    '$scope',
    '$location',
    'job',
    'company',
    'user'
];

function SignUpController($scope, $location, job, company, user) {

    job.getAll().then(function(data) {
        $scope.jobs = data.plain();
        console.log($scope.jobs);
    });

    company.getAll().then(function(data) {
        $scope.companies = data.plain();
        console.log($scope.companies);
    });

    $scope.signup= function(){
        user.create($scope.user).then( function (data){
            console.log("user created");
            console.log(data.plain());
        });
    }
    $scope.back = function(){
        $location.path( '/welcome' );
    }
}
