(function($) {
    $.fn.menumaker = function(options) {

        var cssmenu = $(this);
        var settings = $.extend({
            title: "Menu",
            format: "dropdown",
            sticky: false
        }, options);

        return this.each(function() {
            cssmenu.before('<div class="flex flex-start show-for-small-only"><div id="menu-hamburger">' + settings.title + '</div></div>');
            $("#menu-hamburger").on('click', function(){
                $(this).toggleClass('menu-opened');
                var mainmenu = cssmenu.find('ul');
                if (mainmenu.hasClass('open')) {
                    mainmenu.slideUp().removeClass('open');
                }
                else {
                    mainmenu.slideDown().addClass('open');

                    if (settings.format === "dropdown") {
                        mainmenu.find('ul').slideDown();
                    }
                }
            });

            cssmenu.find('li ul').parent().addClass('has-sub');

            multiTg = function() {
                cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
                cssmenu.find('.submenu-button').on('click', function() {
                    $(this).toggleClass('submenu-opened');
                    if ($(this).siblings('ul').hasClass('open')) {
                        $(this).siblings('ul').removeClass('open').slideUp();
                    }
                    else {
                        $(this).siblings('ul').addClass('open').slideDown();
                    }
                });
            };

            if (settings.format === 'multitoggle') multiTg();
            else cssmenu.addClass('dropdown');

            if (settings.sticky === true) cssmenu.css('position', 'fixed');

            resizeFix = function() {
                var em = $(window).width() / 16;

                if (em > 40) {
                    cssmenu.find('ul').show();
                }

                if (em <= 40) {
                    cssmenu.find('ul').hide().removeClass('open');
                }
            };
            resizeFix();
            return $(window).on('resize', resizeFix);

        });
    };
})(jQuery);