angular
    .module('page.search')
    .controller('SearchCtrl', SearchController);

/**
 * @ngdoc controller
 * @name cmps.page:SearchCtrl
 *
 * @requires $scope
 * @requires user
 * @requires company
 *
 * @description
 * SearchCtrl for the search directive
 */
SearchController.$inject = [
    '$scope',
    'user',
    'company',
];

function SearchController($scope, user, company, $location) {

    $scope.profiles=[];
    user.getAllLimited().then(function (data) {
        $scope.users=data.plain();
        company.getAllLimited().then(function (data) {
            $scope.companies=data.plain();
            $scope.profiles=$scope.users.concat($scope.companies);
        });
    });

}
