angular
    .module('forum.addTopic')
    .directive('addTopic', addTopicDirective);


/**
 * @ngdoc directive
 * @name cmps.forum:addTopic
 *
 * @description
 * Should pop up if the button "add topic" is clicked.
 */
function addTopicDirective() {
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {}, // {} = isolate, true = child, false/undefined = no change
        controller: 'AddTopicCtrl',
        controllerAs: 'addTopicCtrl',
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'cmps/forum/addTopic/addTopic.html',
        replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs) {},
        link: function(scope, iElm, iAttrs, controller) {
            $('.reveal-overlay').remove();
            var elem = new Foundation.Reveal($('#addTopic'));
        }
    };
};
