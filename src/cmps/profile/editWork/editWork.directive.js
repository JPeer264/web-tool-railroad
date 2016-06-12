angular
    .module('profile.editWork')
    .directive('editWork', editWorkDirective);

/**
 * @ngdoc directive
 * @name cmps.profile:editWork
 *
 * @description
 * Pop up to edit work (job and company).
 */
function editWorkDirective() {
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        controller: 'editWorkCtrl',
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'cmps/profile/editWork/editWork.html',
        replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs, controller) {
            $('.reveal-overlay').find('#edit-work').parent().remove();
            var elem = new Foundation.Reveal($('#edit-work'));
        }
    };
};
