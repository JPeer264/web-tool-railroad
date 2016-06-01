angular
    .module('page.signUp')
    .controller('SignUpCtrl', SignUpController);

/**
 * @ngdoc controller
 * @name cmps.page:SignUpCtrl
 *
 * @requires $scope
 * @requires $location
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
    'job',
    'company',
    'user',
    'country',
];

function SignUpController($scope, $location, job, company, user, country) {

    job.getAll().then(function(data) {
        $scope.jobs = data.plain();
        console.log($scope.jobs);
    });

    company.getAll().then(function(data) {
        $scope.companies = data.plain();
        console.log($scope.companies);
    });

    country.getAll().then(function(data) {
        $scope.countries = data.plain();
        console.log($scope.countries);
    });

    $scope.signup= function(){
        user.create($scope.user).then( function (data){
            console.log("user created");
            $scope.user=null;
            $location.path( '/welcome' );

        });
    }
    $scope.back = function(){
        $location.path( '/welcome' );
    }
}
