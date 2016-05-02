angular
    .module('forum.subcategory')
    .controller('SubcategoryCmpsCtrl', SubcategoryCmpsController);
/**
 * @ngdoc controller
 * @name cmps.forum:SubcategoryCmpsCtrl
 *
 * @requires $scope
 * @requires service.subcategory
 *
 * @description
 * SubcategoryCmpsCtrl for the subcategory directive
 */
SubcategoryCmpsController.$inject = [
    '$scope',
    'subcategory'
];

function SubcategoryCmpsController($scope, subcategory) {
    console.log('test');
    subcategory.get($scope.subcategoryId).then(function (data) {
        console.log('test');
        $scope.subcategory = data.plain();
    });

}