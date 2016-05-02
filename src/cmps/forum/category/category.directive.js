angular
    .module('forum.category')
    .directive('category', categoryDirective);

/**
 * @ngdoc directive
 * @name cmps.forum:category
 *
 * @replace true
 *
 * @description 
 * Generates a single category component
 */
function categoryDirective() {
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        controller: 'CategoryCtrl',
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'cmps/forum/category/category.html',
        replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function(scope, iElm, iAttrs, controller) {

        }
    };
};
