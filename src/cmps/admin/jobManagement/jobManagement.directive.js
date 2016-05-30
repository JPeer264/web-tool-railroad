angular
    .module('admin.jobManagement')
    .directive('jobManagement', jobManagementDirective);

/**
 * @ngdoc directive
 * @name cmps.admin:jobManagement
 *
 * @description
 * Generates a single jobManagement component
 */
function jobManagementDirective() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: 'CompanyManagementCtrl',
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'cmps/admin/jobManagement/jobManagement.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs, controller) {
                var elem = new Foundation.Reveal($('#company-management-edit'));
            }
        };
};
