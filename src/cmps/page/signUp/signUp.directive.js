angular
    .module('page.signUp')
    .directive('signUp', signUpDirective);

/**
 * @ngdoc directive
 * @name cmps.page:signUp
 *
 * @description 
 * Generates a single signUp component
 */
function signUpDirective() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: 'SignUpCtrl',
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'cmps/page/signUp/signUp.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs, controller) {
                $("#email").click(function(){
                    if($scope.signupForm.email.$dirty==true){
                        $scope.signupForm.email.$setValidity("exists", true);
                        $scope.signupForm.email.$setValidity("allowed", true);
                        $scope.signupForm.email.$setValidity("correctPassword", true);
                        $scope.signupForm.email.$setValidity("tokenExpired", true);
                        $scope.signupForm.email.$setValidity("token", true);
                        $scope.$apply();
                    }
                });
            }
        };
};
