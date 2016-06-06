angular
    .module('profile.activityTopic')
    .directive('activityTopic', activityTopicDirective);

/**
 * @ngdoc directive
 * @name cmps.activity:activityTopic
 *
 * @description
 * activity topic info for profile.
 */
function activityTopicDirective() {
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        controller: 'activityTopicCtrl',
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'cmps/profile/activityTopic/activityTopic.html',
        replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs, controller) {

        }
    };
};
