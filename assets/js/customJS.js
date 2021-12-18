// Custome JS 19jan2020
$(document).ready(function(){
    "use strict";

    // ASO.init();    

    // Slick-Slide
    $(".custom-slide").slick({
        slidesToShow: 4,
        infinite: false,
        speed: 500,
        responsive: [
            {
            breakpoint: 768,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 3
            }
            },
            {
            breakpoint: 480,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
            }
            }
        ]
    });

    $(".custom-slide-3").slick({
        slidesToShow: 3,
        infinite: false,
        speed: 500,
        responsive: [
            {
            breakpoint: 768,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 3
            }
            },
            {
            breakpoint: 480,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
            }
            }
        ]
    });

    $(".request-list ul li").click(function () {
        if ($(this).hasClass('checked')) {
            $(this).children('.checkbox').prop('checked', false);
            $(this).removeClass('checked');
            $(this).children('small').css('display', 'none');
        } else {

            $(this).addClass('checked');
            $(this).children('.checkbox').prop('checked', true);
            $(this).children('small').css('display', 'block');
        }
    });

    $('.recommended_itinerary').hide();
    $(".trigger").click(function() {
        $(".recommended_itinerary").toggle(500);
    })

    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;

    $(".next").click(function(){

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now) {
            // for making fielset appear animation
            opacity = 1 - now;

            current_fs.css({
            'display': 'none',
            'position': 'relative'
            });
            next_fs.css({'opacity': opacity});
            },
            duration: 600
        });
    });

    $(".previous").click(function(){

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                'display': 'none',
                'position': 'relative'
                });
                previous_fs.css({'opacity': opacity});
            },
            duration: 600
        });
    });

    $('.radio-group .radio').click(function(){
        $(this).parent().find('.radio').removeClass('selected');
        $(this).addClass('selected');
    });

    $(".submit").click(function(){
        return false;
    });

    $(".smartdev_btn").click(function () {
        var options = { direction: "right" };
        var duration = 1000;

        $('#smartDev').toggle(options, duration);
    });

    $(".chosen_btn").click(function () {
        var options = { direction: "right" };
        var duration = 1000;

        $('#chosen').toggle(options, duration);
    });

});

$(document).ready(function () {
    var itemsMainDiv = ('.MultiCarousel');
    var itemsDiv = ('.MultiCarousel-inner');
    var itemWidth = "";

    $('.leftLst, .rightLst').click(function () {
        var condition = $(this).hasClass("leftLst");
        if (condition)
            click(0, this);
        else
            click(1, this)
    });

    ResCarouselSize();




    $(window).resize(function () {
        ResCarouselSize();
    });

    //this function define the size of the items
    function ResCarouselSize() {
        var incno = 0;
        var dataItems = ("data-items");
        var itemClass = ('.item');
        var id = 0;
        var btnParentSb = '';
        var itemsSplit = '';
        var sampwidth = $(itemsMainDiv).width();
        var bodyWidth = $('body').width();
        $(itemsDiv).each(function () {
            id = id + 1;
            var itemNumbers = $(this).find(itemClass).length;
            btnParentSb = $(this).parent().attr(dataItems);
            itemsSplit = btnParentSb.split(',');
            $(this).parent().attr("id", "MultiCarousel" + id);


            if (bodyWidth >= 1200) {
                incno = itemsSplit[3];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 992) {
                incno = itemsSplit[2];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 768) {
                incno = itemsSplit[1];
                itemWidth = sampwidth / incno;
            }
            else {
                incno = itemsSplit[0];
                itemWidth = sampwidth / incno;
            }
            $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
            $(this).find(itemClass).each(function () {
                $(this).outerWidth(itemWidth);
            });

            $(".leftLst").addClass("over");
            $(".rightLst").removeClass("over");

        });
    }


    //this function used to move the items
    function ResCarousel(e, el, s) {
        var leftBtn = ('.leftLst');
        var rightBtn = ('.rightLst');
        var translateXval = '';
        var divStyle = $(el + ' ' + itemsDiv).css('transform');
        var values = divStyle.match(/-?[\d\.]+/g);
        var xds = Math.abs(values[4]);
        if (e == 0) {
            translateXval = parseInt(xds) - parseInt(itemWidth * s);
            $(el + ' ' + rightBtn).removeClass("over");

            if (translateXval <= itemWidth / 2) {
                translateXval = 0;
                $(el + ' ' + leftBtn).addClass("over");
            }
        }
        else if (e == 1) {
            var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
            translateXval = parseInt(xds) + parseInt(itemWidth * s);
            $(el + ' ' + leftBtn).removeClass("over");

            if (translateXval >= itemsCondition - itemWidth / 2) {
                translateXval = itemsCondition;
                $(el + ' ' + rightBtn).addClass("over");
            }
        }
        $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
    }

    //It is used to get some elements from btn
    function click(ell, ee) {
        var Parent = "#" + $(ee).parent().attr("id");
        var slide = $(Parent).attr("data-slide");
        ResCarousel(ell, Parent, slide);
    }

});

(function () {
    'use strict';

    class Menu {
        constructor(settings) {
            this.menuNode = settings.menuNode;
        }

        toggleMenuState(className) {
            if (typeof className !== 'string' || className.length === 0) {
                return console.log('you did not give the class for toggleState function');
            }
            return this.menuNode.classList.toggle(className);
        }
    }

    const jsMenuNode = document.querySelector('.menu');
    const demoMenu = new Menu({
        menuNode: jsMenuNode
    });

    function callMenuToggle(event) {
        demoMenu.toggleMenuState('menu_activated');
    }

    jsMenuNode.querySelector('.menu__hamburger').addEventListener('click', callMenuToggle);
})
();

$(document).ready(function() {
	$('.accordion').find('.accordion-toggle').click(function() {
		$(this).next().slideToggle('600');
		$(".accordion-content").not($(this).next()).slideUp('600');
	});
	$('.accordion-toggle').on('click', function() {
		$(this).toggleClass('active').siblings().removeClass('active');
	});
});

var Accordion = function() {
  
    var
      toggleItems,
      items;
    
    var _init = function() {
      toggleItems     = document.querySelectorAll('.accordion__itemTitleWrap');
      toggleItems     = Array.prototype.slice.call(toggleItems);
      items           = document.querySelectorAll('.accordion__item');
      items           = Array.prototype.slice.call(items);
      
      _addEventHandlers();
      TweenLite.set(items, {visibility:'visible'});
      TweenMax.staggerFrom(items, 0.9,{opacity:0, x:-100, ease:Power2.easeOut}, 0.3)
    }
    
    var _addEventHandlers = function() {
      toggleItems.forEach(function(element, index) {
        element.addEventListener('click', _toggleItem, false);
      });
    }
    
    var _toggleItem = function() {
      var parent = this.parentNode;
      var content = parent.children[1];
      if(!parent.classList.contains('is-active')) {
        parent.classList.add('is-active');
        TweenLite.set(content, {height:'auto'})
        TweenLite.from(content, 0.6, {height: 0, immediateRender:false, ease: Back.easeOut})
        
      } else {
        parent.classList.remove('is-active');
        TweenLite.to(content, 0.3, {height: 0, immediateRender:false, ease: Power1.easeOut})
      }
    }
    
    return {
      init: _init
    }
    
  }();
  
  Accordion.init();