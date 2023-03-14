jQuery(document).ready(function () {
    action_menu()
    animationTextBanner()
    changeAnimation()
    add_sliders()
    home_duan_action()
    run_popup()
    scrolly();
    utilities()
    layout_masonry()
    change_select()
    add_fullpage()
    mobile_home_slide1()
    search_scrolltoText()
});

function search_scrolltoText(){
    let key = getUrlParameter('key_s')
    if(key.length){
        decode_key = decodeURI(key).toLowerCase()
        if(jQuery('.fp-section').length){
            jQuery('.fp-section').each(function(i, e){
                if(jQuery(e).text().slice(0, -1).toLowerCase().indexOf(decode_key) >= 0) // val is found
                {
                    jQuery.fn.fullpage.moveTo((jQuery(e).index() + 1))
                    return false;
                }
            })
        }
    }
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

function mobile_home_slide1(){
    if(jQuery('.home').length > 0 && jQuery(window).width() < 769){
        let height = jQuery('.main-navigation').height() + jQuery('.banner_sliders').height()
        jQuery('.home_sec2 .row').css('min-height',jQuery(window).height() - height)
    }
}

function changeAnimation(){
    if(jQuery(window).width() < 1024){
        if(jQuery('.is-animated').length){
            jQuery('.is-animated').each(function(index){
                let nameAnimate = jQuery(this).data('animation'),
                    delayAnimate = jQuery(this).data('delay')
                // stringAnimate =
                // if(!jQuery(this).hasClass('animateLetter')){
                delayAnimate = '.2s'
                // }
                jQuery(this).attr({
                    'data-scrolly-top': nameAnimate + ',delay: ' + delayAnimate,
                    'data-scrolly-down': nameAnimate + ',delay: ' + delayAnimate,
                })
            })
            jQuery('.is-animated').removeClass('is-animated')
        }
    }
}

function change_select() {
    jQuery('.select_option').each(function () {
        var $this = jQuery(this),
            numberOfOptions = jQuery(this).children('option').length
        var val = $this.val();
        $this.addClass('select-hidden')
        $this.wrap('<div class="select"></div>')
        $this.after('<div class="select-styled">' + jQuery(this).find(":selected").text() + '</div>')
        var $styledSelect = $this.next('div.select-styled')
        var $list = jQuery('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect)
        for (var i = 0; i < numberOfOptions; i++) {
            var active = '';
            if (val) {
                if ($this.children('option').eq(i).val() == val) {
                    active = 'active';
                }
            } else {
                if (!i) {
                    active = 'active';
                }
            }
            jQuery('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val(),
                class: active,
            }).appendTo($list)
        }
        var $listItems = $list.children('li')
        $listItems.click(function (e) {
            // e.stopPropagation()
            $styledSelect.text(jQuery(this).text()).removeClass('active')
            if (!jQuery(this).hasClass('active')) {
                $list.children('.active').removeClass('active');
                $styledSelect.children().removeClass('active');
                jQuery(this).addClass('active');
                $this.val(jQuery(this).attr('rel')).trigger('change')
            }
            jQuery(this).parent().fadeOut('fast');

        })
        jQuery(document).click(function () {
            $styledSelect.removeClass('active')
        })
    });

    jQuery(document).delegate('.select-styled', 'click', function () {
        jQuery('.select-styled').not(this).next().fadeOut('fast');
        jQuery(this).next().fadeToggle('fast');
    });
}

function layout_masonry(){
    if(jQuery('.mansory').length && jQuery(window).width()>575){
        setTimeout(() => {
            jQuery('.mansory').masonry({
                itemSelector: '.item',
                gutter: 12,
            });
        }, 500);
    }
}

function utilities(){
    if(jQuery('.list-utilities').length &&  jQuery(window).width() > 575){
        jQuery('.icon-utility').on('click mouseover',function(){
            jQuery('.icon-utility').removeClass('active')
            jQuery(this).addClass('active')
            let content = jQuery(this).data('content'),
                stringHtml = ''
            if (content.length > 0) {
                stringHtml = stringHtml + content
            }

            jQuery('.utilities .round .group_content .content').html(stringHtml)

        })

    }
}

function animationTextBanner(){
    jQuery('.banner_sliders .content p, .group_content .title b').each(function(index){
        let delay = 100,
            delayParent = 0,
            innerText = jQuery(this).text(),
            i = 0,
            new_str = '',
            seq = []
        if(jQuery(this).parents('.is-animated').length){
            let parent = jQuery(this).parents('.is-animated')
            let strDelay = parent.data('delay')
            if(strDelay.length){
                delayParent = strDelay.replace('s','')*1000
            }
        }
        for (let al = 0; al < innerText.length; al++) {
            seq[al] = al;
        }
        for (let j = 0; j < innerText.length; j++) {
            let str = innerText[j];
            if (str != " ") {
                if(str == '\n'){
                    str = '</br>'
                }else{
                    let ad = delayParent + delay * seq[i];
                    i++;
                    str = '<span class="animateLetter is-animated" data-animation="fadeInLeft" data-delay="'+ad+'ms" >' + str + '</span>';
                }
            }
            new_str += str;
        }
        jQuery(this).html(new_str)
    })
}

function run_popup() {
    //close popup
    jQuery('.cd-popup').on('click', function (event) {
        if (jQuery(event.target).is('.cd-popup-close') || jQuery(event.target).is('.cd-popup')) {
            event.preventDefault();
            checkFullpage()
            if(jQuery(this).eq(jQuery('.loading-img')) && jQuery('.home_sec1 .banner_sliders').length){
                jQuery('.banner_sliders').slick('slickGoTo',0)
            }
            setTimeout(() => {
                jQuery(this).removeClass('is-visible');
            }, 300);
        }
    });
    jQuery(document).delegate('.cd-popup-close', 'click', function (event) {
        event.preventDefault();
        checkFullpage()
        if(jQuery(this).parents('.cd-popup').eq(jQuery('.loading-img')) && jQuery('.home_sec1 .banner_sliders').length){
            jQuery('.banner_sliders').slick('slickGoTo',0)
        }
        setTimeout(() => {
            jQuery(this).parents('.cd-popup').removeClass('is-visible');
        }, 300);
    })
    //close popup when clicking the esc keyboard button
    jQuery(document).keyup(function (event) {
        if (event.which == '27') {
            checkFullpage()
            if(jQuery(this).parents('.cd-popup').eq(jQuery('.loading-img')) && jQuery('.home_sec1 .banner_sliders').length){
                jQuery('.banner_sliders').slick('slickGoTo',0)
            }
            setTimeout(() => {
                jQuery('.cd-popup').removeClass('is-visible');
            }, 300);
        }
    });

    function checkFullpage(){
        if(jQuery('#fullpage').length){
            if (jQuery(window).width() < 1200) { // on mobile
                jQuery('html').removeClass('non_scroll')
            } else {
            }
            jQuery.fn.fullpage.setAllowScrolling(true);
        }
    }

}

function home_duan_action(){
    if(jQuery('.home_sec5 .wrap-sliders').length){
        jQuery('.home_sec5 .wrap-sliders .item:first-child').addClass('hover')
        jQuery('.home_sec5 .wrap-sliders .item:not(:first-child)').on('mouseover',function(e){
            jQuery('.home_sec5 .wrap-sliders .item:first-child').removeClass('hover')
            jQuery(this).addClass('hover')
        })
        jQuery('.home_sec5 .wrap-sliders .item:not(:first-child)').on('mouseout',function(){
            jQuery('.home_sec5 .wrap-sliders .item:first-child').addClass('hover')
            jQuery(this).removeClass('hover')
        })
    }
}

function countUp_js(){
    var options = {
        useEasing: true,
        useGrouping: true,
        separator: ".",
        decimal: ","
    };
    var statistics = jQuery(".number span.num");

    // For each Statistic we find, animate it
    statistics.each(function(index) {
        // Find the value we want to animate (what lives inside the p tags)
        var value = jQuery(statistics[index]).data('num');
        // Start animating
        var statisticAnimation = new CountUp(statistics[index], 0, value, 0, 5, options);
        statisticAnimation.start();
    })
}

function action_menu(){
    if(jQuery('.socials').length){
        jQuery('.socials').clone().appendTo(jQuery('.main-nav>.menu'))
    }
    if(!jQuery('body').hasClass('home')){
        // jQuery('.site-logo').appendTo(jQuery('.main-navigation .inside-navigation'))
        jQuery('.site-logo a').attr('href',jQuery('.site-logo a').attr('href')+'?direct=subpage')
        // jQuery('.menu-toggle').on('click',function(){
        //     jQuery('body').toggleClass('menu-active')
        // })
    }

    if(jQuery(window).width() > 1024){
        jQuery('.menu-toggle').on('mouseover',function(){
            if(!jQuery(this).hasClass('hovered')){
                // return
                jQuery('html').addClass('mobile-menu-open')
                jQuery('#site-navigation').addClass('toggled')
                jQuery(this).attr('aria-expanded', true).addClass('hovered')
                jQuery('.wrap-fp-nav').addClass('hiden')
            }
        })

        jQuery('.menu-toggle').on('mouseleave',function(){
            jQuery(this).removeClass('hovered')
        })
    }
}

function add_sliders(){
    jQuery('.banner_sliders').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        jQuery('.banner_sliders .slick-slide[data-slick-index="' + nextSlide + '"]').find(".is-animated").each(function () {
            fc_animate(jQuery(this));
        });
    });
    jQuery('.banner_sliders').slick({
        infinite: !0,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: !0,
        autoplay: !0,
        autoplaySpeed: 5000,
        arrows: !1,
        pauseOnFocus: !1,
        pauseOnHover: !1,
        dots: !0,
        prevArrow: '<div class="arrow prev"></div>',
        nextArrow: '<div class="arrow next"></div>',
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
        touchThreshold: 100,
        responsive: [{
            breakpoint: 1199,
            settings: {
                arrows: false,
                dots: !1,
            }
        }]
    });
    jQuery('.home_sec5 .wrap-sliders').slick({
        infinite: !0,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: !0,
        autoplay: !0,
        autoplaySpeed: 4000,
        arrows: !0,
        pauseOnFocus: !1,
        pauseOnHover: !1,
        prevArrow: '<div class="arrow prev"><span class="lnr lnr-chevron-left"></span></div>',
        nextArrow: '<div class="arrow next"><span class="lnr lnr-chevron-right"></span></div>',
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
        touchThreshold: 100,
        responsive: [{
            breakpoint: 768,
            settings: 'unslick'
        }]
    });

    if(jQuery('.about3 .wrap-sliders').length){
        let quantity = jQuery('.about3 .wrap-sliders .item').length
        let init = quantity - 3
        if(jQuery(window).width() < 992){
            init = quantity - 2
        }
        if(jQuery(window).width() < 576){
            init = quantity - 1
        }
        if(init < 0){
            init = 0
        }

        jQuery('.about3 .wrap-sliders').slick({
            infinite: !1,
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: init,
            autoplay: !1,
            pauseOnFocus: !1,
            pauseOnHover: !1,
            autoplaySpeed: 3000,
            arrows: !0,
            prevArrow: '<div class="arrow arrow_style_ab prev"><span></span></div>',
            nextArrow: '<div class="arrow arrow_style_ab next"><span></span></div>',
            cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
            touchThreshold: 100,
            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },{
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    arrows: !1,
                    dots: !0,
                }
            }]
        });
    }
    jQuery('.utilities_mobile').slick({
        infinite: !1,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: !0,
        mobileFirst: !0,
        pauseOnFocus: !1,
        pauseOnHover: !1,
        autoplaySpeed: 3000,
        arrows: !0,
        prevArrow: '<div class="arrow prev"><span class="lnr lnr-chevron-left"></span></div>',
        nextArrow: '<div class="arrow next"><span class="lnr lnr-chevron-right"></span></div>',
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
        touchThreshold: 100,
        responsive: [{
            breakpoint: 576,
            settings: 'unslick'
        }]
    });
    jQuery('.about8_logos').slick({
        infinite: !0,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: !0,
        pauseOnFocus: !1,
        pauseOnHover: !1,
        autoplaySpeed: 3000,
        arrows: !1,
        prevArrow: '<div class="arrow prev"><span class="lnr lnr-chevron-left"></span></div>',
        nextArrow: '<div class="arrow next"><span class="lnr lnr-chevron-right"></span></div>',
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
        touchThreshold: 100,
        responsive: [{
            breakpoint: 576,
            settings: {
                slidesToShow: 3,
            }
        }]
    });
    jQuery('.about8 .testimonials').slick({
        infinite: !0,
        fade: !0,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnFocus: !1,
        pauseOnHover: !1,
        autoplay: !0,
        autoplaySpeed: 3000,
        arrows: !0,
        prevArrow: '<div class="arrow prev"><span class="lnr lnr-chevron-left"></span></div>',
        nextArrow: '<div class="arrow next"><span class="lnr lnr-chevron-right"></span></div>',
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
        touchThreshold: 100,
        responsive: [{
            breakpoint: 768,
            settings: {
                arrows: !1,
                dots: !0,
            }
        }]
    });
    jQuery('.linhvuc4slide .wrap-videos').slick({
        infinite: !0,
        fade: !0,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnFocus: !1,
        pauseOnHover: !1,
        autoplay: false,
//         autoplaySpeed: 2000,
        arrows: !0,
        prevArrow: '<div class="arrow prev"><span class="lnr lnr-chevron-left"></span></div>',
        nextArrow: '<div class="arrow next"><span class="lnr lnr-chevron-right"></span></div>',
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
        touchThreshold: 100,
        asNavFor: '.linhvuc4slide .wrap-contents',
        // responsive: [{
        //     breakpoint: 768,
        //     settings: 'unslick'
        // }]
    });
    jQuery('.linhvuc4slide .wrap-contents').slick({
        infinite: !0,
        fade: !0,
        slidesToShow: 1,
        pauseOnFocus: !1,
        pauseOnHover: !1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 20000,
        arrows: !1,
        prevArrow: '<div class="arrow prev"><span class="lnr lnr-chevron-left"></span></div>',
        nextArrow: '<div class="arrow next"><span class="lnr lnr-chevron-right"></span></div>',
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
        touchThreshold: 100,
        asNavFor: '.linhvuc4slide .wrap-videos',
        // responsive: [{
        //     breakpoint: 768,
        //     settings: 'unslick'
        // }]
    });
    jQuery('.linhvuc5slide .wrap-videos').slick({
        infinite: !0,
        fade: !0,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: !0,
        pauseOnFocus: !1,
        pauseOnHover: !1,
        autoplaySpeed: 20000,
        arrows: !1,
        prevArrow: '<div class="arrow prev"><span class="lnr lnr-chevron-left"></span></div>',
        nextArrow: '<div class="arrow next"><span class="lnr lnr-chevron-right"></span></div>',
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
        touchThreshold: 100,
        asNavFor: '.linhvuc5slide .wrap-contents',
        // responsive: [{
        //     breakpoint: 768,
        //     settings: 'unslick'
        // }]
    });
    jQuery('.linhvuc5slide .wrap-contents').slick({
        infinite: !0,
        fade: !0,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: !0,
        pauseOnFocus: !1,
        pauseOnHover: !1,
        autoplaySpeed: 20000,
        arrows: !0,
        dots: !0,
        prevArrow: '<div class="arrow prev"><span class="lnr lnr-chevron-left"></span></div>',
        nextArrow: '<div class="arrow next"><span class="lnr lnr-chevron-right"></span></div>',
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
        touchThreshold: 100,
        asNavFor: '.linhvuc5slide .wrap-videos',
        // responsive: [{
        //     breakpoint: 768,
        //     settings: 'unslick'
        // }]
    });
    jQuery('.newshare5 .list-post, .project4 .list-post').slick({
        infinite: !0,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnFocus: !1,
        pauseOnHover: !1,
        autoplay: !1,
        autoplaySpeed: 3000,
        arrows: !0,
        dots: !1,
        prevArrow: '<div class="arrow prev"><span class="lnr lnr-chevron-left"></span></div>',
        nextArrow: '<div class="arrow next"><span class="lnr lnr-chevron-right"></span></div>',
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
        touchThreshold: 100,
        responsive: [{
            breakpoint: 1025,
            settings: {
                arrows: !1,
                dots: !0,
            }
        }]
    });
    jQuery('.slider_inner').slick({
        infinite: !0,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnFocus: !1,
        pauseOnHover: !1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: !1,
        dots: !0,
        draggable: false,
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
        touchThreshold: 100,
    });
    jQuery('.manager1').slick({
        infinite: !1,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: !0,
        pauseOnFocus: !1,
        pauseOnHover: !1,
        autoplaySpeed: 3000,
        speed: 1500,
        arrows: !1,
        dots: !0,
        prevArrow: '<div class="arrow prev"><span class="lnr lnr-chevron-left"></span></div>',
        nextArrow: '<div class="arrow next"><span class="lnr lnr-chevron-right"></span></div>',
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
        touchThreshold: 100,
        responsive: [{
            breakpoint: 1400,
            settings: {
            }
        },{
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },{
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }]
    });
    jQuery('.manager2').slick({
        infinite: !0,
        slidesToShow: 5,
        slidesToScroll: 5,
        pauseOnFocus: !1,
        pauseOnHover: !1,
        speed: 1500,
        autoplay: !0,
        autoplaySpeed: 3000,
        arrows: !0,
        prevArrow: '<div class="arrow prev"><span class="lnr lnr-chevron-left"></span></div>',
        nextArrow: '<div class="arrow next"><span class="lnr lnr-chevron-right"></span></div>',
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
        touchThreshold: 100,
        responsive: [{
            breakpoint: 1400,
            settings: {
                arrows: !1,
                dots: !0,
            }
        },{
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                arrows: !1,
                dots: !0,
            }
        },{
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: !1,
                dots: !0,
            }
        }]
    });
}

function fc_animate(el) {
    el.addClass('animated ' + el.data('animation')).css('animation-delay', el.data('delay'));
    el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        el.removeClass('animated ' + el.data('animation'));
    });
}

function animateSvg(el){
    let path = el.find('polygon')
    el.addClass("animate");
    path.css({
        "stroke-dasharray": "0 0"
    })
    path.each(function() {
        var i = this.getTotalLength();
        jQuery(this).css({
            "stroke-dasharray": i + " " + i
        }),
            jQuery(this).css({
                "stroke-dashoffset": i,
                "stroke-dasharray": i + " " + i
            })
    })
    path.stop().animate({
        "stroke-dashoffset": 0
    }, 1500, "linear", function() {
        el.removeClass("animate").addClass('active')
    })
}

function add_fullpage() {
    if(jQuery('#add_fullpage').length) {
        let listTitle = [],
            listAnchor = []
        jQuery('#fullpage > section').each(function (index, item) {
            let title = jQuery(item).data('title'),
                anchor = jQuery(item).data('anchors'),
                _index = (index < 9) ? ('0' + (index + 1)) : (index + 1)
            listTitle.push(_index);
            listAnchor.push(anchor);
        });

        if (jQuery('#fullpage > footer').length) {
            let title = jQuery('#fullpage > footer').data('title'),
                anchor = jQuery('#fullpage > footer').data('anchors'),
                index = jQuery('#fullpage > footer').index(),
                _index = (index < 9) ? ('0' + (index + 1)) : (index + 1)
            listTitle.push(_index);
            listAnchor.push(anchor);
        }

        jQuery('#fullpage').fullpage({
            //Navigation
            menu: '.landing-menu ul',
            lockAnchors: false,
            anchors: listAnchor,
            navigation: true,
            navigationPosition: 'right',
            navigationTooltips: listTitle,
            showActiveTooltip: true,
            slidesNavigation: true,
            slidesNavPosition: 'left',

            //Scrolling
            css3: true,
            scrollingSpeed: 700,
            autoScrolling: true,
            fitToSection: true,
            fitToSectionDelay: 1000,
            scrollBar: false,
            easing: 'easeInOutCubic',
            easingcss3: 'ease',
            loopBottom: false,
            loopTop: false,
            loopHorizontal: true,
            continuousVertical: false,
            continuousHorizontal: false,
            scrollHorizontally: false,
            interlockedSlides: false,
            dragAndMove: false,
            offsetSections: false,
            resetSliders: false,
            fadingEffect: false,
            normalScrollElements: '#element1, .element2',
            scrollOverflow: false,
            scrollOverflowReset: false,
            scrollOverflowOptions: null,
            touchSensitivity: 15,
            normalScrollElementTouchThreshold: 5,
            bigSectionsDestination: null,

            //Accessibility
            keyboardScrolling: true,
            animateAnchor: true,
            recordHistory: true,

            //Design
            controlArrows: true,
            verticalCentered: true,
            sectionsColor: ['#ccc', '#fff'],
            paddingTop: '0',
            paddingBottom: '0',
            fixedElements: '.main-navigation,.site-header,.wrap-menu,.nav-socials,#popup-form,.icon-popup,#popup-banner,#wpadminbar',
            responsiveWidth: 1024,
            responsiveHeight: 0,
            responsiveSlides: false,
            parallax: false,
            parallaxOptions: {
                type: 'reveal',
                percentage: 62,
                property: 'translate'
            },

            //Custom selectors
            sectionSelector: 'section, footer',
            // slideSelector: '.slide',

            lazyLoading: false,


            //events
            onLeave: function (index, nextIndex, direction) {
                // action slick autoplay
                jQuery(".fp-section:nth-child(" + nextIndex + ")").find(".slick-initialized").each(function () {
                    let optionSlick = jQuery(this).slick('getSlick')
                    if (optionSlick.options.autoplay == true) {
                        jQuery(this).slick('slickPlay')
                    }
                })
                jQuery(".fp-section:nth-child(" + index + ")").find(".slick-initialized").each(function () {
                    let optionSlick = jQuery(this).slick('getSlick')
                    if (optionSlick.options.autoplay == true) {
                        jQuery(this).slick('slickPause')
                    }
                })


                // change color menu
                if (jQuery(window).width() > 1023) {
                    if (jQuery("section:nth-child(" + nextIndex + ")").data('menu') == 'color') {
                        jQuery('body').addClass('menu_color')
                    } else {
                        jQuery('body').removeClass('menu_color')
                    }
                }

                // animation
                if (jQuery(window).width() > 1023) {
                    jQuery(".fp-section:nth-child(" + nextIndex + ")").find(".is-animated").each(function () {
                        fc_animate(jQuery(this))
                    })
                }
                jQuery(".fp-section:nth-child(" + nextIndex + ")").find(".before").each(function () {
                    animateSvg(jQuery(this).find('svg'))
                })
                jQuery(".fp-section:nth-child(" + index + ")").find(".before").each(function () {
                    jQuery(this).find('svg').removeClass('active')
                })

                // if(nextIndex == 1 || nextIndex == 2){
                //     jQuery('#backtotop').hide()
                // }
                // else{
                //     jQuery('#backtotop').show()
                // }

            },
            afterLoad: function (anchorLink, index) {
                if (jQuery(window).width() > 1023) {

                    jQuery(".fp-section:nth-child(" + index + ")").find(".is-animated").each(function () {
                        fc_animate(jQuery(this))
                    })
                }

                jQuery(".fp-section:nth-child(" + index + ")").find(".before").each(function () {
                    animateSvg(jQuery(this).find('svg'))
                })

                jQuery("#fullpage .slick-initialized").each(function (index) {
                    let optionSlick = jQuery(this).slick('getSlick')
                    if (optionSlick.options.autoplay == true) {
                        jQuery(this).slick('slickPause')
                    }
                })

                jQuery(".fp-section:nth-child(" + index + ")").find(".slick-initialized").each(function () {
                    let optionSlick = jQuery(this).slick('getSlick')
                    if (optionSlick.options.autoplay == true) {
                        jQuery(this).slick('slickPlay')
                    }
                })
                if (jQuery('.about2 .content').length) {
                    jQuery(document).delegate('.about2 .content', 'mouseover', function () {
                        jQuery.fn.fullpage.setAllowScrolling(false);
                    })
                    jQuery(document).delegate('.about2 .content', 'mouseout', function () {
                        jQuery.fn.fullpage.setAllowScrolling(true);
                    })
                }
            },
            afterRender: function () {
                if (jQuery('#fp-nav ul').length) {
                    jQuery('body').append('<div class="wrap-fp-nav"></div>')
                    jQuery('#fp-nav').appendTo(jQuery('.wrap-fp-nav'))
                    jQuery('button.menu-toggle').on('click', function () {
                        jQuery('.wrap-fp-nav').toggleClass('hiden')
                    })
                }
                // jQuery('#backtotop').on('click',function(){
                //     jQuery.fn.fullpage.moveTo(1)
                // })
            },
            afterResize: function () {
            },
            afterResponsive: function (isResponsive) {
            }
        });
    }
}