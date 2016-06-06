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
    '$state',
    'subcategory',
];

function SubcategoryCmpsController($scope, $state, subcategory) {
    var vm = this;

    vm.resolvedSubcategories = false;

    /**
     * @ngdoc property
     * @name $scope.subcategory
     * @propertyOf cmps.forum:SubcategoryCmpsCtrl
     *
     * @description
     * Async - Receives one specific subcategory as object
     */
    subcategory.get($state.params.id).then(function (data) {
        vm.resolvedSubcategories = true;
        vm.subcategory = data.plain();
    });
}