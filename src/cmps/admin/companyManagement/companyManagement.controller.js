angular
    .module('admin.companyManagement')
    .controller('CompanyManagementCtrl', CompanyManagementController);

/**
 * @ngdoc controller
 * @name cmps.admin:CompanyManagementCtrl
 *
 * @requires $scope
 * @requires service.company
 * @requires service.country
 * @requires service.user
 *
 * @description
 * CompanyManagementCtrl for the companyManagement directive
 */
CompanyManagementController.$inject = [
    '$scope',
    'company',
    'country',
    'user'
];

function CompanyManagementController($scope, company, country, user) {
    var cU = $scope.currentUser;
    $scope.isChangeCompany = undefined;

    company.getAll().then(function (data) {
        var companies = data.plain();

        // just return the own company of a companyadmin
        if (cU.role_id >= 3) {
            $scope.companies = companies.filter(function (value, key) {
                if (value.id === cU.company_id) {
                    return true;
                }

                return false;
            });


            return;
        }
        $scope.companies = companies;
    });

    country.getAll().then(function (data) {
        $scope.countries = data.plain();
    });

    $scope.editCompany = function(id) {
        user.getAll({'company\[\]': [id]}).then(function (data) {
            $scope.users = data.plain();
        });

        $scope.manageCompany = $scope.companies.filter(function (value) {
            if (value.id === id) {
                return true;
            }

            return false;
        })[0];

        $scope.isChangeCompany = true;
    }

    $scope.updateCompany = function(id) {
        company.update(id, $scope.manageCompany).then(function (data) {
            angular.forEach($scope.companies, function (key, value) {
                if (value.id === $scope.manageCompany.id) {
                    $scope.companies[key] = $scope.manageCompany;
                }
            });

            $('#company-management-edit').foundation('close');
        });
    }

    $scope.addCompany = function() {
        $scope.manageCompany = null;
        user.getAll().then(function (data) {
            $scope.users = data.plain();

        });


        $scope.isChangeCompany = false;
    }

    $scope.addNewCompany = function() {
        company.create($scope.manageCompany).then(function (data) {
            // find right country and add it
            $scope.manageCompany.country = $scope.countries.filter(function (value) {
                if ($scope.manageCompany.country_id == value.id) {
                    return true;
                }

                return false;
            })[0];

            $scope.companies.unshift($scope.manageCompany);
            $scope.manageCompany.id = $scope.companies.length;

            $('#company-management-edit').foundation('close');
        });
    }
}
