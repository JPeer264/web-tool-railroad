angular
    .module('admin.editCompany')
    .controller('EditCompanyCtrl', EditCompanyController);

/**
 * @ngdoc controller
 * @name cmps.admin:EditCompanyCtrl
 *
 * @requires $scope
 * @requires service.user
 * @requires service.company
 * @requires service.job
 *
 * @description
 * EditCompanyCtrl for the editCompany directive
 */
EditCompanyController.$inject = [
    '$scope',
    'user',
    'company',
    'job',
    'country'
];

function EditCompanyController($scope, user, company, job, country) {
    country.getAll().then(function (data) {
        $scope.countries = data.plain();
    });

    user.getAll({'company\[\]': [$scope.company.id]}).then(function (data) {
        $scope.users = data.plain();
    });

    $scope.updateCompany = function(id) {
        company.update(id, $scope.company).then(function (data) {
            company.resetCache('get', id);
            company.resetCache('getAll');

            $('#company-edit').foundation('close');
        }).catch(function (data) {
            if(data.status==409){
                $scope.companyForm.name.$setValidity("exists", false);
            }
        });
    }
}
