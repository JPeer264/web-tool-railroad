angular
    .module('admin.adminUserRequest')
    .directive('adminUserRequest', adminUserRequestDirective);

/**
 * @ngdoc directive
 * @name cmps.admin:adminUserRequest
 *
 * @description
 * Generates a single adminUserRequest component
 */
function adminUserRequestDirective() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: 'AdminUserRequestCtrl',
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'cmps/admin/adminUserRequest/adminUserRequest.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs, controller) {

            }
        };
};
