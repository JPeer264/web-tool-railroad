angular
    .module('forum.addComment')
    .directive('addComment', addCommentDirective);

/**
 * @ngdoc directive
 * @name cmps.forum:addComment
 *
 * @description
 * Pop up at the end from the topic to add a new comment.
 */
function addCommentDirective() {
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {}, // {} = isolate, true = child, false/undefined = no change
        controller: 'AddCommentCtrl',
        controllerAs: 'addCommentCtrl',
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'cmps/forum/addComment/addComment.html',
        replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs, controller) {
            $('.reveal-overlay').remove();
            var elem = new Foundation.Reveal($('#addComment'));
        }
    };
};
