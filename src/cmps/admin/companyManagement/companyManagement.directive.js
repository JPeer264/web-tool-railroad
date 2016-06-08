angular
    .module('admin.companyManagement')
    .directive('companyManagement', companyManagementDirective);

/**
 * @ngdoc directive
 * @name cmps.admin:companyManagement
 *
 * @description
 * Generates a single companyManagement component
 */
function companyManagementDirective() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            controller: 'CompanyManagementCtrl',
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'cmps/admin/companyManagement/companyManagement.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs, controller) {
                $('.reveal-overlay').remove();
                var elem = new Foundation.Reveal($('#company-management-edit'));

                $("#name").click(function(){
                    if($scope.companyForm.name.$dirty==true){
                        $scope.companyForm.name.$setValidity("exists", true);
                        $scope.$apply();
                    }
                })
            }
        };
};
