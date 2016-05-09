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
        $scope.company = data.plain();
    });

}
