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
 * @requires $httpParamSerializer

 * @description
 * AddTopicCtrl for the addTopic directive
 */
AddTopicController.$inject = [
    '$scope',
    'job',
    'company',
    'topic',
    '$state',
    '$httpParamSerializer',
];

function AddTopicController($scope, job, company, topic, $state,$httpParamSerializer) {

    $( "a" ).click(function( event ) {
        event.preventDefault();
    });

    $scope.listJob=[];
    $scope.listCompany=[];
    $scope.everyone=false;



    job.getAll().then(function(data) {
        $scope.jobs = data.plain();
    });

    company.getAll().then(function(data) {
        $scope.companies = data.plain();

      console.log($scope.jobsVisible);
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
             $scope.job=[];
             $scope.company=[];

             if($scope.everyone){
                 angular.forEach( $scope.jobs, function(job, key) {
                         $scope.job.push(job.id);
                       });
                 angular.forEach( $scope.companies, function(company, key) {
                     $scope.company.push(company.id);
                 });
             }else{
                 angular.forEach( $scope.listJob, function(job, key) {
                         $scope.job.push(job.id);
                       });
                 angular.forEach( $scope.listCompany, function(company, key) {
                     $scope.company.push(company.id);
                 });
             }

             $scope.params={"job\[\]": $scope.job,
                            "company\[\]": $scope.company};
                 topic.create($state.params.id,$scope.topic , $scope.params ).then(function(data) {
                 console.log("created");
                 $scope.topic.user = $scope.currentUser;
                 $scope.topic.user_id=$scope.currentUser.id;
                 $scope.subcategory.topic.push($scope.topic);
                 $scope.listJob=[];
                 $scope.listCompany=[];
                 $scope.topic=null;
                 for(var i=0; i < $scope.listJob.length; i++) {
                       $scope.listJob[i].selected = false;
                   }
                 for(var i=0; i < $scope.listCompany.length; i++) {
                         $scope.listCompany[i].selected = false;
                }
                $scope.checkAll.selected=false;

             });
              $('#addTopic').foundation('close');
         }

         $scope.close=function (){
             $scope.topic=null;
             $scope.listJob=[];
             $scope.listCompany=[];
             for(var i=0; i < $scope.jobs.length; i++) {
                   $scope.jobs[i].selected = false;
               }
             for(var i=0; i < $scope.companies.length; i++) {
                     $scope.companies[i].selected = false;
            }
            $scope.checkAll.selected=false;
         }

}
