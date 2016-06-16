angular
    .module('admin.changeUserRole')
    .directive('changeUserRole', changeUserRoleDirective);

/**
 * @ngdoc directive
 * @name cmps.admin:changeUserRole
 *
 * @description
 * Generates a single changeUserRole component
 */
function changeUserRoleDirective() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: 'ChangeUserRoleCtrl',
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'cmps/admin/changeUserRole/changeUserRole.html',
            replace: true,
            transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs, controller) {
                $('.reveal-overlay').find('#change-user-role').parent().remove();
                var elem = new Foundation.Reveal($('#change-user-role'));
            }
        };
};
