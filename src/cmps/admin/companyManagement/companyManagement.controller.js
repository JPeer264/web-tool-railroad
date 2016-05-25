angular
    .module('admin.companyManagement')
    .controller('CompanyManagementCtrl', CompanyManagementController);

/**
 * @ngdoc controller
 * @name cmps.admin:CompanyManagementCtrl
 *
 * @requires $scope
 * @requires service.company
 * @requires service.user
 *
 * @description
 * CompanyManagementCtrl for the companyManagement directive
 */
CompanyManagementController.$inject = [
    '$scope',
    'company',
    'user'
];

function CompanyManagementController($scope, company, user) {
    $scope.isChangeCompany = undefined;

    company.getAll().then(function (data) {
        $scope.companies = data.plain();
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
        user.getAll().then(function (data) {
            $scope.users = data.plain();
        console.log($scope.users);
        });


        $scope.isChangeCompany = false;
    }

    $scope.addNewCompany = function() {
        company.create($scope.manageCompany).then(function (data) {
            $scope.manageCompany.id = $scope.companies.length;
            console.log($scope.companies);
            console.log($scope.manageCompany);
            // $scope.companies.push($scope.manageCompany);
        });
    }
}
