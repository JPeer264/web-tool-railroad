angular
    .module('pages.header')
    .controller('HeaderCtrl', HeaderController);

HeaderController.$inject = [
    '$scope',
    '$translate',
    'user',
    'auth'
];

/**
 * @ngdoc object
 * @name pages.HeaderCtrl
 * @requires $scope
 * @requires $translate
 * @requires user
 * @requires auth
 *
 * @description
 * HeaderCtrl for the Header Component
 */
function HeaderController($scope, $translate, user, auth) {

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

    /**
     * call the user.logout() service
     */
    $scope.logout = function() {
        user.logout();
    }

    /**
     * call the user.logout() service
     *
     * @return {Boolean}
     */
    $scope.isLoggedIn = function() {
        return auth.isAuthorized();
    }

}