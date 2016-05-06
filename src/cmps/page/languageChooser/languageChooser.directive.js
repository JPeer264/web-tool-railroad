angular
    .module('page.languageChooser')
    .directive('languageChooser', languageChooserDirective);

/**
 * @ngdoc directive
 * @name cmps.page:languageChooser
 *
 * @description 
 * Generates a single languageChooser component
 */
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
            link: function(scope, iElm, iAttrs, controller) {                
                var elem = new Foundation.Dropdown($('#btn-langChooser'));
                var preferredLanguage = $('#btn-langChooser [data-lang="' + scope.getPreferredLanguage() + '"]')[0].innerHTML;

                $('#chosenLanguage').text(preferredLanguage); 
                scope.changeLang(scope.getPreferredLanguage());             

                $('#btn-langChooser a').click(function(e){
                    e.preventDefault();
                    var chosenLanguage = $(this).text();
                    var langKey = $(this).data('lang');

                    scope.setPreferredLanguage(langKey);
                    $('#chosenLanguage').text(chosenLanguage);
                    $('#btn-langChooser').foundation('close');
                });
            }
        };
};
