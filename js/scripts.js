// Preloader

$(window).load(function () {
    $('.loader').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
    $('body').delay(350);

});

// Global document ready function

jQuery(document).ready(function ($) {
    // "use strict";
    //check if background-images have been loaded and show single pages
    $('.single-page').bgLoaded({
        afterLoaded: function () {
            showCaption($('.page-container .single-page').eq(0));
        }
    });

    //open page
    $('.single-page').on('click', function (e) {
        e.preventDefault();
        var selectedProject = $(this),
            toggle = !selectedProject.hasClass('is-full-width');
        if (toggle) toggleProject($(this), $('.page-container'), toggle);

    });

    //close page
    $('.page-container .page-close').on('click', function (e) {
        e.preventDefault();
        toggleProject($('.is-full-width'), $('.page-container'), false);

    });

    //scroll to page info
    $('.page-container .page-scroll').on('click', function (e) {
        e.preventDefault();
        $('.page-container').animate({
            'scrollTop': $(window).height()
        }, 500);
    });

    //update title and .page-scroll opacity while scrolling
    $('.page-container').on('scroll', function () {
        window.requestAnimationFrame(changeOpacity);
    });

    function toggleProject(project, container, bool) {
        if (bool) {
            //expand page
            container.addClass('project-is-open');
            project.addClass('is-full-width').siblings('.single-page').removeClass('is-loaded');
        } else {
            //check media query
            var mq = window.getComputedStyle(document.querySelector('.page-container'), '::before').getPropertyValue('content'),
                delay = (mq == 'mobile') ? 100 : 0;

            container.removeClass('project-is-open');
            //fade out page
            project.animate({
                opacity: 0
            }, 800, function () {
                project.removeClass('is-loaded');
                $('.page-container').find('.page-scroll').attr('style', '');
                setTimeout(function () {
                    project.attr('style', '').removeClass('is-full-width').find('.page-title').attr('style', '');
                }, delay);
                setTimeout(function () {
                    showCaption($('.page-container .single-page').eq(0));
                }, 300);
            });
        }
    }

    function changeOpacity() {
        var newOpacity = 1 - ($('.page-container').scrollTop()) / 300;
        $('.page-container .page-scroll').css('opacity', newOpacity);
        $('.is-full-width .page-title').css('opacity', newOpacity);
    }

    function showCaption(project) {
        if (project.length > 0) {
            setTimeout(function () {
                project.addClass('is-loaded');
                showCaption(project.next());
            }, 150);
        }
    }

    // Magnific Popup

    $('.open-portfolio').magnificPopup({
        type: 'inline',
        midClick: true,
        zoom: {
            enabled: true,
            duration: 300, // duration of the effect, in milliseconds
            easing: 'ease-in-out' // CSS transition easing function
        }
    });


    // Mixitup Filter

    $(function notStrict() {
        // Instantiate MixItUp:
        $('#portfolio').mixItUp();
    });


    // Testimonial Slider

    $("#testimonial-slides").owlCarousel({

        navigation: false, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    });

    // Skills Chart

    var options = {
        //segmentShowStroke: false,
        percentageInnerCutout: 70,
        animation: true,
        animationEasing: 'easeOutQuint',
        //animateRotate: false,
        animateScale: true
    };
    var data = {
        skill_frontend: [{
            value: 90,
            color: "#404148"
        }, {
            value: 10,
            color: "#fff"
        }],
        skill_scss: [{
            value: 95,
            color: "#404148"
        }, {
            value: 5,
            color: "#fff"
        }],
        skill_js: [{
            value: 90,
            color: "#404148"
        }, {
            value: 10,
            color: "#fff"
        }],
        skill_php: [{
            value: 90,
            color: "#404148"
        }, {
            value: 10,
            color: "#fff"
        }],
        skill_drupal: [{
            value: 95,
            color: "#404148"
        }, {
            value: 5,
            color: "#fff"
        }],
        skill_wordpress: [{
            value: 95,
            color: "#404148"
        }, {
            value: 5,
            color: "#fff"
        }],
        skill_laravel: [{
            value: 85,
            color: "#404148"
        }, {
            value: 15,
            color: "#fff"
        }],
        skill_devops: [{
            value: 90,
            color: "#404148"
        }, {
            value: 10,
            color: "#fff"
        }],
        skill_linux: [{
            value: 95,
            color: "#404148"
        }, {
            value: 5,
            color: "#fff"
        }]
    };

    var offset = 0;
    $.each(data, function (key, data) {
        var canvas = document.querySelector('#' + key);
        if (canvas) {
            offset += 250;
            setTimeout(function () {
                var ctx = canvas.getContext('2d');
                var chart = new Chart(ctx);
                chart.Doughnut(data, options);
            }, offset);
        }
    });


    // OpenStreetMap via Leaflet
    if ($('#map').length > 0) {
        map = L.map('map', {
            center: [-12.071483, -76.956762],
            zoom: 13,
            scrollWheelZoom: false
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var myIcon = L.divIcon({
            html: `
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#ff4b5c"/>
                </svg>
            `,
            className: 'custom-leaflet-marker',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        L.marker([-12.071483, -76.956762], { icon: myIcon }).addTo(map)
            .bindPopup('<b>Juan Timaná</b><br>Lima , Perú')
            .openPopup();
    }



    // Contact Form

    $('form#contactForm button.submit').click(function () {

        $('#image-loader').fadeIn();

        var contactName = $('#contactForm #contactName').val();
        var contactEmail = $('#contactForm #contactEmail').val();
        var contactMessage = $('#contactForm #contactMessage').val();

        var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail + '&contactMessage=' + contactMessage;

        $.ajax({

            type: "POST",
            url: "inc/sendEmail.php",
            data: data,
            success: function (msg) {

                // Message was sent
                if (msg == 'OK') {
                    $('#image-loader').fadeOut();
                    $('#message-warning').hide();
                    $('#contactForm').fadeOut();
                    $('#message-success').fadeIn();
                }
                // There was an error
                else {
                    $('#image-loader').fadeOut();
                    $('#message-warning').html(msg);
                    $('#message-warning').fadeIn();
                }

            }

        });
        return false;
    });

    // Contact form end


});

/*
 * BG Loaded
 * Copyright (c) 2014 Jonathan Catmull
 * Licensed under the MIT license.
 */
(function ($) {
    $.fn.bgLoaded = function (custom) {
        var self = this;

        // Default plugin settings
        var defaults = {
            afterLoaded: function () {
                this.addClass('bg-loaded');
            }
        };

        // Merge default and user settings
        var settings = $.extend({}, defaults, custom);

        // Loop through element
        self.each(function () {
            var $this = $(this),
                bgImgs = window.getComputedStyle($this.get(0), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "").split(', ');
            $this.data('loaded-count', 0);
            $.each(bgImgs, function (key, value) {
                var img = value.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
                $('<img/>').attr('src', img).load(function () {
                    $(this).remove(); // prevent memory leaks
                    $this.data('loaded-count', $this.data('loaded-count') + 1);
                    if ($this.data('loaded-count') >= bgImgs.length) {
                        settings.afterLoaded.call($this);
                    }
                });
            });

        });
    };
})(jQuery);
