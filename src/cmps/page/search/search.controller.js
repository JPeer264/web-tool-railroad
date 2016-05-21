angular
    .module('page.search')
    .controller('SearchCtrl', SearchController);

/**
 * @ngdoc controller
 * @name cmps.page:SearchCtrl
 *
 * @requires $scope
 * @requires user
 *
 * @description
 * SearchCtrl for the search directive
 */
SearchController.$inject = [
    '$scope',
    'user',
];

function SearchController($scope, user) {
    user.getAll().then(function (data) {
        $scope.users = data.plain();
    });
    
}
