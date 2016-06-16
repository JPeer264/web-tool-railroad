angular
	.module('pages.company')
	.controller('CompanyCtrl', CompanyController);

/**
 * @ngdoc controller
 * @name pages.company:CompanyController
 *
 * @requires $scope
 * @requires $state
 * @requires service.user
 * @requires service.company
 *
 * @description
 * CompanyCtrl for the company profile page
 */
CompanyController.$inject = [
	'$scope',
    '$state',
    'user',
    'company'
];

function CompanyController($scope, $state, user, company) {

    var em = $(window).width() / 16;

    $scope.isMobile = em > 40 ? true : false;

    $(window).resize(function() {
        $timeout(function() {
            em = $(window).width() / 16;

            if (em > 40) {
                $scope.isMobile = true;
            }

            if (em <= 40) {
                $scope.isMobile = false;
            }

            $scope.$apply();
        }, 500);
    });

    company.get($state.params.id).then(function(data) {
        data = data.plain();

        // set default picture for every user in the company
        (data.user).map(function (value, key) {
            return $scope.setDefaultPictureLocation(value);
        });

        $scope.company = data;
    });

}
