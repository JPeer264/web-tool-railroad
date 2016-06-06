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

    vm.listJob = [];
    vm.listCompany = [];
    vm.everyone = false;
    vm.currentUser = $scope.$root.currentUser;
    vm.currentId = $state.params.id;
    vm.triggeredTopic = false;

    job.getAll().then(function(data) {
        vm.jobs = data.plain();
    });

    company.getAll().then(function(data) {
        vm.companies = data.plain();
    });

    vm.toggleJob = function (job, list) {
        var idx = vm.listJob.indexOf(job);

        if (idx > -1) {
            vm.listJob.splice(idx, 1);
        } else {
            vm.listJob.push(job);
        }
    };

    vm.toggleCompany = function (company, list) {
        var idx = vm.listCompany.indexOf(company);

        if (idx > -1) {
            vm.listCompany.splice(idx, 1);
        } else {
            vm.listCompany.push(company);
        }
    };

    vm.checkAll = function () {
        vm.everyone = vm.everyone ? false : true;
    };

    vm.addTopic = function(){
        var subcategory = $scope.$parent.subcategoryCmps.subcategory;

        vm.job = [];
        vm.company = [];

        if (vm.everyone) {
            angular.forEach(vm.jobs, function (jobValue, key) {
                vm.job.push(jobValue.id);
            });

            angular.forEach(vm.companies, function (companyValue, key) {
                vm.company.push(companyValue.id);
            });
        } else {
            angular.forEach(vm.listJob, function (jobValue, key) {
                vm.job.push(jobValue.id);
            });

            angular.forEach(vm.listCompany, function (companyValue, key) {
                vm.company.push(companyValue.id);
            });
        }

        vm.params={
            "job\[\]": vm.job,
            "company\[\]": vm.company
        };

        topic.create($state.params.id,vm.newTopic , vm.params ).then(function(data) {
            // prepare and add new subcategory to $scope.subcategory
            vm.newTopic.topic_id = data.topic_id;
            vm.newTopic.user    = vm.currentUser;
            vm.newTopic.user_id = vm.currentUser.id;

            subcategory.topic.push(vm.newTopic);

            // reset requirements
            vm.listJob      = [];
            vm.listCompany  = [];
            vm.newTopic     = null;
            vm.checkAll.selected = false;

            vm.triggeredTopic = false;
            $('#addTopic').foundation('close');
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
