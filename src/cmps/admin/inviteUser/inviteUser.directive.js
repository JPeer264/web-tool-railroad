angular
    .module('admin.inviteUser')
    .directive('inviteUser', inviteUserDirective);

/**
 * @ngdoc directive
 * @name cmps.admin:inviteUser
 *
 * @description
 * Generates a single inviteUser component
 */
function inviteUserDirective() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: 'InviteUserCtrl',
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'cmps/admin/inviteUser/inviteUser.html',
            replace: true,
            transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function(scope, iElm, iAttrs, controller) {
                $('.reveal-overlay').remove();
                var elem = new Foundation.Reveal($('#inviteUser'));
            }
        };
};
