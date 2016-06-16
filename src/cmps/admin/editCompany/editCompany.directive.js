angular
    .module('admin.editCompany')
    .directive('editCompany', editCompanyDirective);

/**
 * @ngdoc directive
 * @name cmps.admin:editCompany
 *
 * @description
 * Generates a single editCompany component
 */
function editCompanyDirective() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: 'EditCompanyCtrl',
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'cmps/admin/editCompany/editCompany.html',
            replace: true,
            transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs, controller) {
                $('.reveal-overlay').find('#company-edit').parent().remove();
                var elem = new Foundation.Reveal($('#company-edit'));
            }
        };
};
