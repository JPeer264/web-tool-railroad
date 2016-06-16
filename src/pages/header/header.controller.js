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
    // set the header to fixed or not on tablet and computer
    var setHeaderToFixed = true;

    // dirty but fast - no directive - don't do @ home
    var elem = new Foundation.Interchange($('#logo').find('img'));
    var $viewheader = $('.view-header');
    var $header = $('#header');
    var em = $(window).width() / 16;
    var $googleBanner;

    $(window).resize(function() {
        setTimeout(function() {
            setHeaderFixed();
        }, 500);
    });

    setTimeout(function() {
        setHeaderFixed();
    }, 800);

    function setHeaderFixed() {
        var $main = $('.view-main');
        var bodyTop = $('body').css('top');
        var height = $header.outerHeight(true);
        em = $(window).width() / 16;

        if (!setHeaderToFixed) {
            return;
        }

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

    // uncomment following function if angular-translate is activated
    activateGoogleTranslate();

    function activateGoogleTranslate () {
        var $gw; //google widget
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

        // check if the another or a new language isset
        // and set the header to a new fixed position
        $(document).on('change', 'select.goog-te-combo', function () {
            closeGoogleBar();
            waitGoogleBarLoad(function() {
                var bodyTop = $('body').css('top');

                if (em > 40) {
                    $viewheader.css({
                        'top': bodyTop
                    });
                }
            });
        });

        closeGoogleBar();

        // set the header new if the google bar gets removed
        // also set the $googleBanner to overflow scroll - for mobile
        function closeGoogleBar() {
            waitGoogleBarLoad(function() {
                var $iframe = $('.goog-te-banner-frame').contents();
                var $closeButton = $iframe.find('.goog-close-link');

                $closeButton.click(function() {
                    setHeaderFixed();
                });

                $iframe.find('.goog-te-banner').css({
                    'overflow-x': 'scroll'
                });
            });
        }

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

        /**
         * function to wait until the google frame bar is opened and laoded
         * clear itself if its loaded longer than 500*20 milliseconds
         *
         * @param {Function}
         */
        function waitGoogleBarLoad(fn) {
            var wait = 0;
            var interval = 500;
            var checkForGoogleBar = setInterval(function() {
                $googleBanner = $('.goog-te-banner-frame');

                if ($googleBanner.length > 0) {
                    fn();

                    clearInterval(checkForGoogleBar);
                }

                // clear interval after 20 times
                if (wait > interval * 20) {
                    clearInterval(checkForGoogleBar);
                }

                wait += interval;
            }, interval);
        }
    }
    // dirty end - should be in directive

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