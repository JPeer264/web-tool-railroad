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
    'company',
    'CONSTANT'
];

function ProfileController($scope, $state, user, company, CONSTANT) {
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
        data = data.plain();

        // set default picture for every user in the company
        (data.company.user).map(function (value, key) {
            return $scope.setDefaultPictureLocation(value);
        });

        $scope.user = $scope.setDefaultPictureLocation(data);
    });


}
