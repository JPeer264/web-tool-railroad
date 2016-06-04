angular
    .module('page.navbar')
    .directive('navbar', navbarDirective);

/**
 * @ngdoc directive
 * @name cmps.page:navbar
 *
 * @description
 * Generates a single navbar component
 */
function navbarDirective() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: 'NavbarCtrl',
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'cmps/page/navbar/navbar.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs, controller) {
                $('#hamburger').menumaker({'title': ''});

                var scrollTop;

                $(document).on('scroll', function () {
                    scrollTop = $(document).scrollTop();

                    if (scrollTop > 70) {
                        $('#navbar').addClass('shadow-navbar');
                    } else {
                        $('#navbar').removeClass('shadow-navbar');
                    }
                });
            }
        };
};
