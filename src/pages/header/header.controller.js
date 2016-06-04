angular
    .module('pages.header')
    .controller('HeaderCtrl', HeaderController);

/**
 * @ngdoc controller
 * @name pages.header:HeaderCtrl
 *
 * @requires $scope
 * @requires service.user
 * @requires service.auth
 *
 * @description
 * HeaderCtrl for the header page
 */
HeaderController.$inject = [
    '$scope',
    'user',
    'auth',
    '$timeout'
];

function HeaderController($scope, user, auth, $timeout) {

    // dirty but fast - no directive - don't do @ home
    var elem = new Foundation.Interchange($('#logo').find('img'));

    jQuery(document).ready(function($) {
        $timeout(function() {
            setHeaderFixed();
        }, 800);

        $(window).resize(function() {
            $timeout(function() {
                setHeaderFixed();
            }, 500);
        });
    });

    function setHeaderFixed() {
        var $viewheader = $('.view-header');
        var $header = $('#header');
        var $main = $('.view-main');
        var height = $header.outerHeight(true);
        var em = $(window).width() / 16;

        if (em > 40) {
            $viewheader.css({
                'position': 'fixed',
                'width': '100%',
                'z-index': 999
            });

            $main.css({
                'margin-top': height + 'px'
            });
        }

        if (em <= 40) {
            $viewheader.css({
                'position': 'static',
                'width': '100%'
            });

            $main.css({
                'margin-top': 0
            });
        }
    }
    // dirty end

    /**
     * @ngdoc method
     * @name isLoggedIn
     * @methodOf pages.header:HeaderCtrl
     *
     * @description
     * call the auth.logout() service and check logged in status
     *
     * @return {Boolean} auth.isAuthorized()
     */
    $scope.isLoggedIn = function() {
        return auth.isAuthorized();
    }

}