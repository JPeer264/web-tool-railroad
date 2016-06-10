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
    var $gw; //google widget
    $(window).resize(function() {
        setTimeout(function() {
            setHeaderFixed();
        }, 500);
    });

    // dirty end

    var googleTWidgetExist =  setInterval(function() {
        $gw = $('.goog-te-combo');

        // reset interval if google translate widget exist
        if ($gw.length > 0) {
            transformGoogleTWIdget();

            setTimeout(function() {
                setHeaderFixed();
            }, 800);

            clearInterval(googleTWidgetExist);
        }
    }, 500);

    function transformGoogleTWIdget() {
        var $targetLanguage = $gw.parent();
        var $button = $('.goog-te-combo')[0];
        var $gWidgetInner = $('#google_translate_element .goog-te-gadget');
        var $gWidget = $('#google_translate_element');
        var $span = $gWidgetInner.find('span');

        if ($gWidgetInner.length > 1) {
            for (var i = 1; i < $gWidgetInner.length; i++) {
                $gWidget.children().first().remove();
            }
        }

        $gw
            .addClass('cursor-pointer')
            .parent()
            .addClass('clearfix');

        // rewrite the translate widget
        $gWidgetInner.html('').append($button)
    }

    function setHeaderFixed() {
        var $viewheader = $('.view-header');
        var $header = $('#header');
        var $main = $('.view-main');
        var bodyTop = $('body').css('top');
        var height = $header.outerHeight(true);
        var em = $(window).width() / 16;

        // todo $watch on body top
        if (em > 40) {
            $viewheader.css({
                'position': 'fixed',
                'width': '100%',
                'z-index': 999,
                'top': bodyTop
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