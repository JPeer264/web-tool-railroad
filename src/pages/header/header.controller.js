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

    // the i18n button (instead of google widget)
    // var elem = new Foundation.Dropdown($('#btn-langChooser'));
    // var preferredLanguage = $('#btn-langChooser [data-lang="' + scope.getPreferredLanguage() + '"]')[0].innerHTML;

    // $('#chosenLanguage').text(preferredLanguage);
    // scope.changeLang(scope.getPreferredLanguage());

    // $('#btn-langChooser a').click(function(e){
    //     e.preventDefault();
    //     var chosenLanguage = $(this).find('li').text();
    //     var langKey = $(this).data('lang');

    //     scope.setPreferredLanguage(langKey);
    //     $('#chosenLanguage').text(chosenLanguage);
    //     $('#btn-langChooser').foundation('close');
    // });
    // the i18n button end
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

        console.log('languageChooserDir', 'transformGoogleTWIdget()');
        var $targetLanguage = $gw.parent();
        var $button = $('.goog-te-combo')[0];
        var $gWidgetInner = $('#google_translate_element .goog-te-gadget');
        var $gWidget = $('#google_translate_element');
        var $span = $gWidgetInner.find('span');

        if ($gWidgetInner.length > 1) {
            for (var i = 1; i < $gWidgetInner.length; i++) {
                console.log($gWidget.children().first().remove());
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