angular
    .module('page.languageChooser')
    .controller('LanguageChooserCtrl', languageChooserController);

/**
 * @ngdoc object
 * @name pages.HeaderCtrl
 * @requires $scope
 * @requires $translate
 *
 * @description
 * HeaderCtrl for the Header Component
 */
languageChooserController.$inject = [
    '$scope',
    '$translate'
];

function languageChooserController($scope, $translate) {

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