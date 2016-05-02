angular
    .module('page.slider')
    .directive('slider', sliderDirective);

/**
 * @ngdoc directive
 * @name cmps.page:slider
 *
 * @description 
 * Generates a single slider component
 */
function sliderDirective() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: 'SliderCtrl',
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'cmps/page/slider/slider.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs, controller) {
                var elem = new Foundation.Orbit($('.orbit'));
            }
        };
};
