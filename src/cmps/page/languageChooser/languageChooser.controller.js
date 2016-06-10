angular
    .module('page.languageChooser')
    .controller('LanguageChooserCtrl', LanguageChooserController);

/**
 * @ngdoc controller
 * @name cmps.page:LanguageChooserCtrl
 *
 * @requires $scope
 * @requires $translate
 * @requires $cookies
 * @requires CONSTANT
 *
 * @description
 * LanguageChooserCtrl for the languageChooser Component
 */
LanguageChooserController.$inject = [
    '$scope',
    '$translate',
    '$cookies',
    'CONSTANT',
    'tmhDynamicLocale'
];

function LanguageChooserController($scope, $translate, $cookies, CONSTANT, tmhDynamicLocale) {
    console.log('languageChooserCtrl', 'aufruf');
    /**
     * @ngdoc method
     * @name changeLang
     * @methodOf cmps.page:LanguageChooserCtrl
     *
     * @description
     * changes the language to a specific one
     * stored in "i18n/locale-*.json"
     *
     * @param {String} langKey language code; e.g. en-US
     */
    $scope.changeLang = function (langKey) {
        $translate.use(langKey).then(function (langKey) {
            tmhDynamicLocale.set(langKey);
            $scope.setPreferredLanguage(langKey);
        });
    };

    /**
     * @ngdoc method
     * @name getPreferredLanguage
     * @methodOf cmps.page:LanguageChooserCtrl
     *
     * @description
     * get the set preferred language
     *
     * @return {String} Value of prefLanguage cookie
     */
    $scope.getPreferredLanguage = function() {
        return $cookies.get(CONSTANT.COOKIE.PREFLANGUAGE) || 'en-us';
    }

    /**
     * @ngdoc method
     * @name setPreferredLanguage
     * @methodOf cmps.page:LanguageChooserCtrl
     *
     * @description
     * changes the language to a specific one
     * stored in "i18n/locale-*.json"
     *
     * @param {String} langKey e.g. 'en_US'
     */
    $scope.setPreferredLanguage = function(langKey) {
        var expireDate = new Date();
        expireDate.setMonth(expireDate.getMonth() + 24);

        $cookies.put(CONSTANT.COOKIE.PREFLANGUAGE, langKey, {'expires': expireDate});
    }

}
