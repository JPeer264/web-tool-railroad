angular
    .module('forum.addTopic')
    .controller('AddTopicCtrl', AddTopicController);

/**
 * @ngdoc controller
 * @name cmps.forum:AddTopicCtrl
 *
 * @requires vm
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
    var vm = this;

    vm.jobs = [];
    vm.companies = [];
    vm.everyone = false;
    vm.currentUser = $scope.$root.currentUser;
    vm.currentId = $state.params.id;
    vm.triggeredTopic = false;

    job.getAll().then(function(data) {
        angular.forEach(data.plain(), function (jobValue, key) {
            if(jobValue.id!=1)
                vm.jobs.push(jobValue);
            });
    });

    company.getAll().then(function(data) {
        angular.forEach(data.plain(), function (companyValue, key) {
            if(companyValue.id!=1)
                vm.companies.push(companyValue);
            });
    });

    vm.onChange= function(all){
        if(all){
            angular.forEach(vm.companies, function (companyValue, key) {
                companyValue.selected=true;
            })
            angular.forEach(vm.jobs, function (jobValue, key) {
                jobValue.selected=true;
            })
        }else{
            angular.forEach(vm.jobs, function (jobValue, key) {
                jobValue.selected=false;
            })
            angular.forEach(vm.companies, function (companyValue, key) {
                companyValue.selected=false;
            })
        }
    }

    vm.addTopic = function(){
        vm.triggeredTopic = true;
        var subcategory = $scope.$parent.subcategoryCmps.subcategory;

        vm.job = [];
        vm.company = [];

        angular.forEach(vm.companies, function (companyValue, key) {
            if(companyValue.selected){
                vm.company.push(companyValue.id);
            }
        })
        angular.forEach(vm.jobs, function (jobValue, key) {
            if(jobValue.selected){
                vm.job.push(jobValue.id);
            }
        })
        console.log(vm.job);
        console.log(vm.company);
        vm.params={
            "job\[\]": vm.job,
            "company\[\]": vm.company
        };

        vm.newTopic.description = (vm.newTopic.description).replace(/^\n+/, '').replace(/\n+/g,'\n\n');

        topic.create($state.params.id,vm.newTopic , vm.params ).then(function(data) {
            // prepare and add new subcategory to $scope.subcategory
            vm.newTopic.id = data.topic_id;
            vm.newTopic.user    = vm.currentUser;
            vm.newTopic.user_id = vm.currentUser.id;

            subcategory.topic.push(vm.newTopic);

            // reset requirements
            vm.newTopic     = null;
            vm.onChange(false);

            vm.triggeredTopic = false;
            $('#addTopic').foundation('close');
        }).catch(function (data) {
            if(data.status==409){
                $scope.addTopicForm.title.$setValidity("exists", false);
            }
            vm.triggeredTopic = false;
        });
    };

    vm.close=function () {
        // reset requirements
        vm.newTopic = null;
        vm.listJob = [];
        vm.listCompany = [];
        vm.checkAll.selected=false;
    }
}
