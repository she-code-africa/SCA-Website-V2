// partner slider
$(document).ready(function() {
    $('.customer-logos').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: false,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 3
            }
        }]
    });

    $('.counter_items').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: false,
        dots: true,
        pauseOnHover: false,
        responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 425,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
    $('.testimonials').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000,
        arrows: false,
        dots: true,
        pauseOnHover: false

    });
});
// partner slider end