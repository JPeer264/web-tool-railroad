angular
    .module('pages.header')
    .controller('HeaderCtrl', HeaderController);

HeaderController.$inject = [
    '$scope',
    '$translate'
];

function HeaderController($scope, $translate) {

    /**
     * @param key {String} - language code; e.g. en-US
     *
     * changes the language to a specific one
     * stored in "i18n/locale-*.json"
     */
    $scope.changeLang = function (key) {
        $translate.use(key).then(function (key) {
            console.log("Language changed to " + key + ".");
        }, function (key) {
            console.log("Something went wrong.");
        });
    };

}