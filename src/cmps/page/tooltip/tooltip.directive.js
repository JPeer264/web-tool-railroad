angular
    .module('page.tooltip')
    .directive('tooltip', screenTipDirective);

/**
 * @ngdoc directive
 * @name cmps.page:tooltip
 *
 * @restrict AE
 *
 * @description 
 * Generates a single tooltip component
 */
function screenTipDirective() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: 'TooltipCtrl',
            controllerAs: 'tool',
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'cmps/page/tooltip/tooltip.html',
            replace: true,
            transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function(scope, iElm, iAttrs, controller) {

                if (iAttrs.type) {
                    scope.getType(iAttrs.type).then(function(data) {
                        // scope.content = data.description;
                        $('[data-toggle="tooltip"][type=' + iAttrs.type + ']')
                            .attr('data-title', data.title)
                            .attr('data-content', data.description)
                            .popover();
                    });
                }

            }
        };
};
