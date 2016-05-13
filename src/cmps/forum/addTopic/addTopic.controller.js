angular
    .module('forum.addTopic')
    .controller('AddTopicCtrl', AddTopicController);

/**
 * @ngdoc controller
 * @name cmps.forum:AddTopicCtrl
 *
 * @requires $scope
 *
 * @description
 * AddTopicCtrl for the addTopic directive
 */
AddTopicController.$inject = [
    '$scope',
    'job',
    'company',
];

function AddTopicController($scope, job, company) {

    $( "a" ).click(function( event ) {
        event.preventDefault();
    });

    $scope.listJob=[];
    $scope.listCompany=[];
    $scope.everyone=false;
    $scope.jobsVisible=[];
    $scope.companiesVisible=[];


    job.getAll().then(function(data) {
        $scope.jobs = data.plain();

            company.getAll().then(function(data) {
                $scope.companies = data.plain();
                if($scope.currentUser.role_id==1||$scope.currentUser.role_id==2){
                    $scope.jobsVisible=$scope.jobs;
                    $scope.companiesVisible=$scope.companies;
                }else if($scope.currentUser.role_id==3){
                    $scope.jobsVisible.push($scope.currentUser.job);
                    $scope.jobsVisible.push($scope.currentUser.job);
                    //$scope.companiesVisible=$scope.currentUser.company;
                }else {
                    $scope.jobsVisible.push($scope.currentUser.job);
                    //$scope.companiesVisible=$scope.currentUser.company;
                }
              console.log($scope.jobsVisible);
            });

    });





      $scope.toggleJob = function (job, list) {

        var idx = $scope.listJob.indexOf(job);
            if (idx > -1) {
              $scope.listJob.splice(idx, 1);
            }
            else {
              $scope.listJob.push(job);
            }
            console.log($scope.listJob);
        };

      $scope.toggleCompany = function (company, list) {
        var idx = $scope.listCompany.indexOf(company);
            if (idx > -1) {
              $scope.listCompany.splice(idx, 1);
            }
            else {
              $scope.listCompany.push(company);
            }
            console.log($scope.listCompany);

        };

        $scope.checkAll = function () {
            if($scope.everyone){
                $scope.everyone=false;
            }else{
                $scope.everyone=true;
            }

            console.log($scope.everyone);
         };



         /*    angular.forEach($scope.jobs, function(job, key) {
                   $scope.listJob.push(job);
                 });
                 console.log( $scope.listJob);

                 angular.forEach($scope.companies, function(company, key) {
                       $scope.listCompany.push(company);
                     });
                     console.log( $scope.listCompany);
                     */
}
