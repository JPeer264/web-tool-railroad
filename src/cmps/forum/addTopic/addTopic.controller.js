angular
    .module('forum.addTopic')
    .controller('AddTopicCtrl', AddTopicController);

/**
 * @ngdoc controller
 * @name cmps.forum:AddTopicCtrl
 *
 * @requires $scope
 * @requires service.job
 * @requires service.company
 * @requires service.topic
 * @requires $state

 * @description
 * AddTopicCtrl for the addTopic directive
 */
AddTopicController.$inject = [
    '$scope',
    'job',
    'company',
    'topic',
    '$state',
];

function AddTopicController($scope, job, company, topic, $state) {

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
                    $scope.companiesVisible.push($scope.currentUser.company);
                }else {
                    $scope.jobsVisible.push($scope.currentUser.job);
                    $scope.companiesVisible.push($scope.currentUser.company);
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


         $scope.addTopic=function(){
             console.log($state.params.id);
             topic.create($state.params.id,$scope.topic ).then(function(data) {
                 console.log("created");
                 $scope.topic=null;
                 for(var i=0; i < $scope.jobsVisible.length; i++) {
                       $scope.jobsVisible[i].selected = false;
                   }
                 for(var i=0; i < $scope.companiesVisible.length; i++) {
                         $scope.companiesVisible[i].selected = false;
                }
                $scope.checkAll.selected=false;

             });
              $('#addTopic').foundation('close');
         }

         $scope.close=function (){
             $scope.topic=null;
             for(var i=0; i < $scope.jobsVisible.length; i++) {
                   $scope.jobsVisible[i].selected = false;
               }
             for(var i=0; i < $scope.companiesVisible.length; i++) {
                     $scope.companiesVisible[i].selected = false;
            }
            $scope.checkAll.selected=false;
         }
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
