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
    $scope.triggeredCompany = false;

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
        $scope.triggeredCompany = true;

        var fd = new FormData();
        fd.append("name",$scope.manageCompany.firstname);
        fd.append("website",$scope.manageCompany.website);
        fd.append("phonenumber",$scope.manageCompany.phonenumber);
        fd.append("country_id",$scope.manageCompany.country_id);
        fd.append("city",$scope.manageCompany.city);
        fd.append("address",$scope.manageCompany.address);
        fd.append("email",$scope.manageCompany.email);
        fd.append("administrator",$scope.manageCompany.administrator);
        fd.append("Twitter",$scope.manageCompany.Twitter);
        fd.append("LinkedIn",$scope.manageCompany.LinkedIn);
        fd.append("Facebook",$scope.manageCompany.Facebook);
        fd.append("pinterest",$scope.manageCompany.pinterest);
        fd.append("flickr",$scope.manageCompany.flickr);
        fd.append("youtube",$scope.manageCompany.youtube);
        fd.append("instagram",$scope.manageCompany.instagram);
        fd.append('fileUpload', $scope.picFile);
        company.update(id, fd).then(function (data) {
            angular.forEach($scope.companies, function (key, value) {
                if (value.id === $scope.manageCompany.id) {
                    $scope.companies[key] = $scope.manageCompany;
                }
            });

            $scope.triggeredCompany = false;
            $('#company-management-edit').foundation('close');
            $scope.picFile = null;
        }).catch(function (data) {
            if(data.status==409){
                $scope.companyForm.name.$setValidity("exists", false);
            }
            $scope.triggeredCompany = false;

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
        $scope.triggeredCompany = true;

        var fd = new FormData();
        fd.append("name",$scope.manageCompany.firstname);
        fd.append("website",$scope.manageCompany.website);
        fd.append("phonenumber",$scope.manageCompany.phonenumber);
        fd.append("country_id",$scope.manageCompany.country_id);
        fd.append("city",$scope.manageCompany.city);
        fd.append("address",$scope.manageCompany.address);
        fd.append("email",$scope.manageCompany.email);
        fd.append("administrator",$scope.manageCompany.administrator);
        fd.append("Twitter",$scope.manageCompany.Twitter);
        fd.append("LinkedIn",$scope.manageCompany.LinkedIn);
        fd.append("Facebook",$scope.manageCompany.Facebook);
        fd.append("pinterest",$scope.manageCompany.pinterest);
        fd.append("flickr",$scope.manageCompany.flickr);
        fd.append("youtube",$scope.manageCompany.youtube);
        fd.append("instagram",$scope.manageCompany.instagram);
        fd.append('fileUpload', $scope.picFile);

        company.create(fd).then(function (data) {
            // find right country and add it
            $scope.manageCompany.country = $scope.countries.filter(function (value) {
                if ($scope.manageCompany.country_id == value.id) {
                    return true;
                }

                return false;
            })[0];

            $scope.companies.unshift($scope.manageCompany);
            $scope.manageCompany.id = $scope.companies.length;
            $scope.triggeredCompany = false;

            $('#company-management-edit').foundation('close');
        }).catch(function (data) {
            if(data.status==409){
                $scope.companyForm.name.$setValidity("exists", false);
            }
            $scope.triggeredCompany = false;

        });
    }
}
