angular
    .module('profile.activityComment')
    .directive('activityComment', activityCommentDirective);

/**
 * @ngdoc directive
 * @name cmps.activity:activity
 *
 * @description
 * activity info for profile.
 */
function activityCommentDirective() {
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        controller: 'activityCommentCtrl',
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'cmps/profile/activityComment/activityComment.html',
        replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs, controller) {

        }
    };
};
