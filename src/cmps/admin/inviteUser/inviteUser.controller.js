angular
    .module('admin.inviteUser')
    .controller('InviteUserCtrl', InviteUserController);

/**
 * @ngdoc controller
 * @name cmps.admin:InviteUserCtrl
 *
 * @requires $scope
 * @requires service.user
 * @requires service.company
 * @requires service.job
 *
 * @description
 * InviteUserCtrl for the inviteUser directive
 */
InviteUserController.$inject = [
    '$scope',
    'user',
    'company',
    'job'
];

function InviteUserController($scope, user, company, job) {

    $scope.inviteUser = function () {
        if ($scope.currentUser.role_id >= 3) {
            $scope.invite.company_id = $scope.currentUser.company_id;
        }

        user.create($scope.invite).then(function (data) {
            data = data.plain();

            // add the new user into the invitedUser scope
            // also get the created id and add it for deleting without reloading
            $scope.invite.id = data.user_id;
            $scope.invitedUsers.push($scope.invite);
            $('#invite-user').foundation('close');
        }).catch(function (data) {
            if(data.status==409){
                $scope.inviteForm.email.$setValidity("exists", false);
            }
        });
    }

    company.getAll().then(function (data) {
        $scope.companies = data.plain();
    });

    job.getAll().then(function (data) {
        $scope.jobs = data.plain();
    });

}
