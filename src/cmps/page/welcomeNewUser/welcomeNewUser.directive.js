angular
    .module('page.welcomeNewUser')
    .directive('welcomeNewUser', welcomeNewUser);

/**
 * @ngdoc directive
 * @name cmps.page:welcomeNewUser
 *
 * @description
 * Generates a single welcomeNewUser component
 */
function welcomeNewUser() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: 'WelcomeNewUserCtrl',
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'cmps/page/welcomeNewUser/welcomeNewUser.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs, controller) {

            }
        };
};
