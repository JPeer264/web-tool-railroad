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
                var $gw; //google widget

                $(window).resize(function() {
                    setTimeout(function() {
                        setHeaderFixed();
                    }, 500);
                });
                // dirty end

                // the i18n button (instead of google widget)
                // var elem = new Foundation.Dropdown($('#btn-langChooser'));
                // var preferredLanguage = $('#btn-langChooser [data-lang="' + scope.getPreferredLanguage() + '"]')[0].innerHTML;

                // $('#chosenLanguage').text(preferredLanguage);
                // scope.changeLang(scope.getPreferredLanguage());

                // $('#btn-langChooser a').click(function(e){
                //     e.preventDefault();
                //     var chosenLanguage = $(this).find('li').text();
                //     var langKey = $(this).data('lang');

                //     scope.setPreferredLanguage(langKey);
                //     $('#chosenLanguage').text(chosenLanguage);
                //     $('#btn-langChooser').foundation('close');
                // });
                // the i18n button end
                var reset = false;
                var googleTWidgetExist =  setInterval(function() {
                    $gw = $('.goog-te-combo');

                    // reset interval if google translate widget exist
                    if ($gw.length > 0) {
                        transformGoogleTWIdget();
                        setTimeout(function() {
                            setHeaderFixed();
                        }, 800);
                        clearInterval(googleTWidgetExist);
                    }
                }, 500);

                function transformGoogleTWIdget() {

                    if (reset) return;

                    console.log('languageChooserDir', 'transformGoogleTWIdget()');
                    var $targetLanguage = $gw.parent();
                    var $gWidget = $('#google_translate_element .goog-te-gadget');
                    var $span = $gWidget.find('span');

                    $gw
                        .addClass('cursor-pointer')
                        .parent()
                        .addClass('clearfix');

                    // rewrite the translate widget
                    $gWidget.html('');

                    $gWidget
                        .append($targetLanguage)
                        .append('Powered by <br>')
                        .append($span);

                    reset = true;
                }

                function setHeaderFixed() {
                    var $viewheader = $('.view-header');
                    var $header = $('#header');
                    var $main = $('.view-main');
                    var height = $header.outerHeight(true);
                    var em = $(window).width() / 16;

                    if (em > 40) {
                        $viewheader.css({
                            'position': 'fixed',
                            'width': '100%',
                            'z-index': 999
                        });

                        $main.css({
                            'margin-top': height + 'px'
                        });
                    }

                    if (em <= 40) {
                        $viewheader.css({
                            'position': 'static',
                            'width': '100%'
                        });

                        $main.css({
                            'margin-top': 0
                        });
                    }
                }
            }
        };
};
