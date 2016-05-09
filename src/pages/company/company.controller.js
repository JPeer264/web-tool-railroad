angular
	.module('pages.company')
	.controller('CompanyCtrl', CompanyController);

/**
 * @ngdoc controller
 * @name pages.profile:ProfileCtrl
 *
 * @requires $scope
 * @requires $state
 * @requires service.user
 * @requires service.company
 *
 * @description
 * ProfileCtrl for the profile page
 */
ProfileController.$inject = [
	'$scope',
    '$state',
    'user',
    'company'
];

function ProfileController($scope, $state, user, company) {
    console.log('company');

    company.get($state.params.id).then(function(data) {
        $scope.company = data.plain();
    });

}
