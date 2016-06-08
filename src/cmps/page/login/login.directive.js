angular
    .module('page.login')
    .directive('login', loginDirective);

/**
 * @ngdoc directive
 * @name cmps.page:login
 *
 * @description
 * Generates a single login component
 */
function loginDirective() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: 'LoginCtrl',
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'cmps/page/login/login.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs, controller) {
                $("#password").click(function(){
                    if($scope.loginForm.password.$dirty==true){
                        $scope.loginForm.password.$setValidity("correctPassword", true);
                        $scope.loginForm.password.$setValidity("accepted", true);
                        $scope.$apply();
                    }

                });
            }
        };
};
