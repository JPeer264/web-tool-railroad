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
    console.log('company');

    company.get($state.params.id).then(function(data) {
        data = data.plain();

        // set default picture for every user in the company
        (data.user).map(function (value, key) {
            return $scope.setDefaultPictureLocation(value);
        });

        $scope.company = data;
    });

}
