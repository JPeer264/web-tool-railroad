angular
    .module('page.languageChooser')
    .controller('LanguageChooserCtrl', LanguageChooserController);

/**
 * @ngdoc controller
 * @name cmps.page:LanguageChooserCtrl
 *
 * @requires $scope
 * @requires $translate
 *
 * @description
 * LanguageChooserCtrl for the languageChooser Component
 */
LanguageChooserController.$inject = [
    '$scope',
    '$translate'
];

function LanguageChooserController($scope, $translate) {

    /**
     * @ngdoc method
     * @name changeLang
     * @methodOf cmps.page:LanguageChooserCtrl
     *
     * @description
     * changes the language to a specific one
     * stored in "i18n/locale-*.json"
     *
     * @param {String} key language code; e.g. en-US
     */
    $scope.changeLang = function (key) {
        $translate.use(key).then(function (key) {
            console.log("Language changed to " + key + ".");
        }, function (key) {
            console.log("Something went wrong.");
        });
    };

}
