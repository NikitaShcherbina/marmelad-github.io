(function($) {
    'use strict';
    var $window = $(window);
    var $document = $(document);
    function preloading() {
        var percentage = 0;
        var i = 0;
        function timer() {
            var str = ++i + "%";
            $('#status').text(str);
            if (i === 100)
                clearInterval(timerId);
        }
        var timerId = setInterval(timer, 30);
        var $loadLine = $('#load-line');
        $loadLine.animate({
            width: "+=" + 100 + "%"
        }, 2500, function() {
            var $preloader = $('#preloader');
            $preloader.animate({
                opacity: 0
            }, 700, function() {
                $preloader.remove();
            });
        });
        return true;
    }
    $document.on('ready', function(e) {
        preloading();
    });
    $(window).on('load', function(e) {
        var $clickfunc = $(".navigation li a");
        $clickfunc.on('click', function() {
            $clickfunc.removeClass("active").not($clickfunc).add(this).toggleClass("active");
        });
    });
    $("a.scrollto").on('click', function() {
        var elementClick = $(this).attr("href")
        var destination = $(elementClick).offset().top;
        $("html:not(:animated),body:not(:animated)").animate({
            scrollTop: destination
        }, 700);
        return false;
    });
    if ($('div').is('.cover-box')) {
        $('.cover-box').imagefill({
            throttle: 100 / 60
        });
    }
    $('.show-menu-btn').on('click', function() {
        $(this).toggleClass('open');
        $('.overlay-menu').toggleClass('active');
        $('body').toggleClass('menu-opened');
        return false;
    });
    $(window).keydown(function(e) {
        if ($('.overlay-menu').hasClass('active')) {
            if (e.which === 27) {
                $('.show-menu-btn').removeClass('open');
                $('.overlay-menu').removeClass('active');
                $('body').removeClass('menu-opened');
            }
        }
    });
    $('.navigation-mobile li a').on('click', function() {
        $('.show-menu-btn').removeClass('open');
        $('.overlay-menu').removeClass('active');
        $('body').removeClass('menu-opened');
        return false;
    });
    $('.form-trigger').on('click', function() {
        $(this).toggleClass('is-clicked');
        $('.popup-forma').toggleClass('is-active');
        return false;
    });
    $('.popup-close').on('click', function() {
        $('.form-trigger').removeClass('is-clicked');
        $('.popup-forma').removeClass('is-active');
        return false;
    });
    $('.popup-forma__cover').on('click', function() {
        $('.form-trigger').removeClass('is-clicked');
        $('.popup-forma').removeClass('is-active');
        return false;
    });
    $(window).keydown(function(e) {
        if ($('.popup-forma').hasClass('is-active')) {
            if (e.which === 27) {
                $('.form-trigger').removeClass('is-clicked');
                $('.popup-forma').removeClass('is-active');
            }
        }
    });
    $(document).ready(function() {
        new WOW().init();
        var carousel = $("#carousel");
        carousel.owlCarousel({
        items: 2,
        margin: 5,
        navigation : true,
        navigationText : [" "," "],
        itemsDesktop:      [1400, 2],
        itemsDesktopSmall: [900, 1],
        itemsTablet:       [770, 1],
        itemsMobile:       [768, 1],
        });
        var show = true;
        var countbox = "#about";
        $(window).on("scroll load resize", function() {
            if (!show)
                return false;
            var w_top = $(window).scrollTop();
            var e_top = $(countbox).offset().top;
            var w_height = $(window).height();
            var d_height = $(document).height();
            var e_height = $(countbox).outerHeight();
            if (w_top + 300 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
                $(".spincrement").spincrement({
                    thousandSeparator: "",
                    duration: 1000
                });
                show = false;
            }
        });
        $(".noUi-tooltip").after("<div class='line-slider'></div><div class='line-slider1'></div><div class='line-slider2'></div>");
    });
}
)(jQuery);
