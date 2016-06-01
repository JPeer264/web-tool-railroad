angular
    .module('admin.addJob')
    .directive('addJob', addJobDirective);

/**
 * @ngdoc directive
 * @name cmps.admin:addJob
 *
 * @description
 * Generates a single addJob component
 */
function addJobDirective() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: 'AddJobCtrl',
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'cmps/admin/addJob/addJob.html',
            replace: true,
            transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function(scope, iElm, iAttrs, controller) {
                var elem = new Foundation.Reveal($('#add-job'));
            }
        };
};
