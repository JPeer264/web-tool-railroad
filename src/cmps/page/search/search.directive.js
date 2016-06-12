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
                var chosen = "";

                $("#results").hover(function(){
                    $('#results li').removeClass('selected');
                });

                $("#search").keydown(function(e) {
                    if (e.keyCode == 40) { // down
                        if(chosen === "") {
                            chosen = 0;
                        } else if((chosen+1) < $('#results li').length) {
                            chosen++;
                        }
                        $('#results li').removeClass('selected');
                        $('#results li:eq('+chosen+')').addClass('selected');
                        $('#results').animate({
                            scrollTop: $('#results li:eq('+chosen+')').position().top + $("#results").scrollTop()
                        }, 10);
                        return false;
                    }
                    if (e.keyCode == 38) { // up
                        if(chosen === "") {
                            chosen = 0;
                        } else if(chosen > 0) {
                            chosen--;
                        }
                        $('#results li').removeClass('selected');

                        $('#results li:eq('+chosen+')').addClass('selected');
                        $('#results').animate({
                            scrollTop: $('#results li:eq('+chosen+')').position().top + $("#results").scrollTop()
                        }, 10);
                        return false;
                    }
                    if(e.keyCode==13){
                        console.log($('#results li:eq('+chosen+')'));
                        $('#results li:eq('+chosen+') a').trigger('click');
                    }
                });


            }
        };
};
