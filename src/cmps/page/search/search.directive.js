angular
    .module('page.search')
    .directive('search', searchDirective);

/**
 * @ngdoc directive
 * @name cmps.page:search
 *
 * @description
 * Generates a single search component
 */
function searchDirective() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: 'SearchCtrl',
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'cmps/page/search/search.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs, controller) {

                $(document).on('focus', '#search', function() {
                    $('#results').show();
                });

                $(document).on('click', 'body', function() {
                    if ($(':focus').attr('name') === 'search') {
                        $('#results').show();
                    } else {
                        $('#results').hide();
                        $scope.query=null;
                        $scope.$apply();

                    }
                });

            }
        };
};
