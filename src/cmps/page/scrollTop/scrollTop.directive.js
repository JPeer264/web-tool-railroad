angular
    .module('page.scrollTop')
    .directive('scrollTop', scrollTopDirective);

/**
 * @ngdoc directive
 * @name cmps.page:scrollTop
 *
 * @description
 * Generates a single scrollTop component for
 * the header to log out or manage the useraccout
 */
function scrollTopDirective() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: 'ScrollTopCtrl',
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'cmps/page/scrollTop/scrollTop.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs, controller) {
                var scrollTop;

                $(document).on('click', '#scroll-top', function () {
                    $('body, html').animate({
                        scrollTop: '0px'
                    });
                });

                $(document).on('scroll', function () {
                    setTimeout(function() {
                        // check if the cookie mode is activated
                        if ($('#cookie-info').length !== 0) {
                            return;
                        }

                        scrollTop = $(document).scrollTop();

                        if (scrollTop > 70) {
                            $('#scroll-top').addClass('scale');
                        } else {
                            $('#scroll-top').removeClass('scale');
                        }
                    }, 500);
                });
            }
        };
};
