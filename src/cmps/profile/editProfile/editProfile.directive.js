angular
    .module('profile.editProfile')
    .directive('editProfile', editProfileDirective);

/**
 * @ngdoc directive
 * @name cmps.profile:editProfile
 *
 * @description
 * Pop up to edit profile.
 */
function editProfileDirective() {
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        controller: 'editProfileCtrl',
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'cmps/profile/editProfile/editProfile.html',
        replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs, controller) {
            $('.reveal-overlay').find('#edit-profile').parent().remove();
            var elem2 = new Foundation.Reveal($('#edit-profile'));
        }
    };
};
