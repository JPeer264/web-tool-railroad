angular
	.module('pages.profile')
	.controller('ProfileCtrl', ProfileController);

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
    console.log('profile');


    /**
     * @ngdoc property
     * @name $scope.user
     * @propertyOf pages.profile:ProfileCtrl
     *
     * @description
     * get the user from params
     */
    user.get($state.params.id).then(function(data) {
        $scope.user = data.plain();
        company.get($scope.user.company_id).then(function(data) {
            $scope.company = data.plain();
        });
    });


}
