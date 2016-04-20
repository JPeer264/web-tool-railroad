/**
 * @ngdoc directive
 *
 * @name component.languageChooser
 *
 * @description 
 * Generates a single languageChooser component
 */
angular
    .module('page.languageChooser')
    .directive('languageChooser', languageChooserDirective);


function languageChooserDirective() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: 'LanguageChooserCtrl',
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'cmps/page/languageChooser/languageChooser.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs, controller) {
                
            }
        };
};
