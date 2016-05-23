angular
    .module('page.adminNavbar')
    .directive('adminNavbar', adminNavbarDirective);

/**
 * @ngdoc directive
 * @name cmps.page:adminNavbar
 *
 * @description
 * Generates a single adminNavbar component
 */
function adminNavbarDirective() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: 'AdminNavbarCtrl',
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'cmps/page/adminNavbar/adminNavbar.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs, controller) {
                $('#adminNavbar').menumaker({'title': ''});
            }
        };
};
