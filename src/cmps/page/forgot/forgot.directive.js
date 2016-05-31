angular
    .module('page.forgot')
    .directive('forgot', forgotDirective);

/**
 * @ngdoc directive
 * @name cmps.page:login
 *
 * @description 
 * Generates a single login component
 */
function forgotDirective() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: 'ForgotCtrl',
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'cmps/page/forgot/forgot.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs, controller) {
                var elem = new Foundation.Reveal($('#changePassword'));

            }
        };
};
