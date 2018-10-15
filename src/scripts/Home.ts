export class Home {
    callOwlCarousel() {
        $(".slide-desktop, .slider-mobile").owlCarousel({
            items: 1
        });

        $(".tip-bar-info").owlCarousel({
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                768: {
                    items: 2,
                    nav: true
                },
                1000: {
                    items: 3,
                    nav: false,
                },
                1200: {
                    items: 4,
                    nav: false,
                }
            }
        });
    }

    callOwlCarouselShelfs() {
        // Remove Title VTEX
        $('.prateleira').each(function() {
            $(this).find('h2').remove();
        });

        // Custom Navigation Events
        $(document).on('click', '.owl-item', function () {
            let n = $(this).index();
            $('.owl-wrapper').trigger('owl.goTo', n);
        });

        $(".shelf-spotlight-content .prateleira").owlCarousel({
            center: true,
            nav: true,
            loop: true,
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                768: {
                    items: 1,
                    nav: true
                },
                1000: {
                    items: 5,
                    nav: false,
                },
                1200: {
                    items: 5,
                    nav: false,
                }
            }
        });

        $(".shelf-simple-content .prateleira").owlCarousel({
            nav: true,
            loop: true,
            margin: 30,
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                768: {
                    items: 1,
                    nav: true
                },
                900: {
                    items: 2,
                    nav: true
                },
                1000: {
                    items: 4,
                    nav: false,
                },
                1200: {
                    items: 4,
                    nav: false,
                }
            }
        });
    }
}