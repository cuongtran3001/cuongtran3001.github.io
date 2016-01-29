/**
 * @name Site
 * @description Define global variables and functions
 * @version 1.0
  var images = $('#container img');
  var count = 0;
  for each (image in images) {
    image.onload = function() {
      count ++;
      if (count == images.length) {
        //complete
        }
  }
  }
 */
var Site = (function($, window, undefined) {
  var privateVar = 1;
  var loading = $('<div class="loading"></div>');
  var app = $('#app'),
      win = $(window);
  var GlobalEvents = {
    AJAX_SUCCESS: 'load-ajax-success'
  };
  var disableScrollBgd = function() {
    var heightScreen;
    scrollTop = win.scrollTop();

    app.css({
      'height': win.height() + scrollTop,
      'overflow': 'hidden',
      'margin-top': -scrollTop
    });
  };

  var resetScrollBgd = function() {
    app.css({'height': '', 'overflow': '', 'margin-top': ''});
    win.scrollTop(scrollTop);
  };

  function effectSocial() {
    $('.social-block li a').each(function(){
      $(this).addClass('animated');
      $(this).off('mouseover').on('mouseover',function(){
        $(this).addClass('rotateIn');
        $(this).on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
          function(e){
            $(this).removeClass('rotateIn');
        });
      });
    });
    $('.social li a').each(function(){
      $(this).addClass('animated');
      $(this).off('mouseover').on('mouseover',function(){
        $(this).addClass('rotateIn');
        $(this).on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
          function(e){
            $(this).removeClass('rotateIn');
        });
      });
    });
  }
  var limit = $('[data-multiple-select]').data('option-check');

  if ($('[data-multiple-select]').length) {
    $('[data-multiple-select]').change(function() {}).multipleSelect({
      placeholder: "",
      width: '100%',
      filter: false,
      selectAll: false,
      onClick: function(view) {
        var checkboxes = $("[data-multiple-select]").next().find("input[type='checkbox']").not(":checked");
        var selectedLen = $("[data-multiple-select]").multipleSelect('getSelects').length;
        if (selectedLen >= limit) {
          checkboxes.prop("disabled", true);
        } else {
          checkboxes.prop("disabled", false);
        }
      }
    });
  }

  if ($('.testselect2').length) {
    $('.testselect2').SumoSelect({ okCancelInMulti: true });
  }
  
  if($('[data-select-filter]').length){
    $('[data-select-filter]').ddTableFilter();
  }
  
  if ($('[data-rate]').length) {
    $('[data-rate]').raty({
      numberMax : 5,
      number    : 100,
      starOff : '../images/un-rate-large.png',
      starOn  : '../images/rate-large.png',
      target : '.hint'
    });
  }
  var templateLoading= '<div class="wrapLoad bgd-rgba"><div class="load-wrapp"><div class="load-1"><div class="line"></div><div class="line"></div><div class="line"></div></div></div></div>';
  // if ($('#app').length && $('#app').imagesLoaded) {
  //   $('#app').imagesLoaded()
  //   .always( function( instance ) {
  //     // $('.wrapLoad').remove();
  //     // console.log('all images loaded');
  //   })
  //   .done( function( instance ) {
  //     $('.wrapLoad').remove();
  //     $('#app').css({
  //       'height' : '',
  //       'overflow': ''
  //     });
  //   })
  //   .fail( function() {
  //     $('.wrapLoad').remove();
  //     $('#app').css({
  //       'height' : '',
  //       'overflow': ''
  //     });
  //     // console.log('all images loaded, at least one is broken');
  //   })
  //   .error( function() {
  //     $('.wrapLoad').remove();
  //     $('#app').css({
  //       'height' : '',
  //       'overflow': ''
  //     });
  //     // console.log('all images loaded, at least one is broken');
  //   })
  //   .progress( function( instance, image ) {
  //     $('#app').before(templateLoading);
  //     $('#app').css({
  //       'height' : $(window).height(),
  //       'overflow': 'hidden'
  //     });
  //     $('.wrapLoad').hide();
  //     $('.wrapLoad').eq(1).show();
  //     // var result = image.isLoaded ? 'loaded' : 'broken';
  //     // console.log( 'image is ' + result + ' for ' + image.img.src );
  //   });
  // }
  function loadingImg() {
    $('img').each(function(){
      var that = $(this);
      var img = new Image();
      img.onload = function() {
        $(window).on('resize.windowI', function(){
          if($(window).width() > 768){
            that.closest('.img-share').css({
              width: that.width(),
              height: that.height()
            });
          }else{
            that.closest('.img-share').css({
              width: '100%',
              height: 'auto'
            });
          }
          $('.play-video-block .list-videos .jspContainer').css({
            height: $('[data-video-frame]').height()
          });
          $('.play-video-block .list-videos').css({
            maxHeight: $('[data-video-frame]').height()
          });
          if($('.play-video-block .list-videos').length){
            $('.play-video-block .list-videos').jScrollPane({
              showArrows: true
            });
          }
        }).trigger('resize.windowI');
      }

      img.src = $(this).attr('src');
    });
  }
  function scrollEffect(){
    effectSocial();
    loadingImg();
    // $('[data-modal-ajax]').modal(show);
  }
  function scrollPane() {

    if ($('[data-loadscroll]').length) {
      $('[data-loadscroll]').jscroll({
        loadingHtml: '<img src="images/ajax-loader.gif" alt="Loading" />',
        padding: 20,
        nextSelector: '.data-next',
        callback: scrollEffect
      });
    } 
  }
  function privateMethod1() {
    var showChar = $('.caption-album-short').data('text-number');
    var ellipsestext = "...";
    var moretext = $('.caption-album-short').data('text-show');
    var lesstext = $('.caption-album-short').data('text-hide');
    if($('.content-check > .inner').length){
      $('.content-check > .inner').jScrollPane({
        showArrows: true
      });
    }
    $('.caption-album-short').each(function() {
        var content = $(this).html();
        if(content.length > showChar) {
          var c = content.substr(0, showChar);
          var h = content.substr(showChar, content.length - showChar);
          var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="javascript:void(0)" class="morelink view", title="">' + moretext + '</a></span>';
          $(this).html(html);
        }
    });
    
    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
    var item = $('.detail-news').data('url');
    $('[data-toggleslider-1]').each(function(){
      var that = $(this),
          el = that.find('.tbody');
      that.find('.thead').off('click').on('click', function(){
        if (that.hasClass('active')) {
          that.removeClass('active');
          el.fadeOut();
        }else{
          var before = $('[data-toggleslider-1]').filter('.active');
          if(before.length){
            before.removeClass('active');
            before.children('.tbody').fadeOut();
          }
          that.addClass('active');
          el.fadeIn();
        }
      });
    });
    if($('[data-scroll-head]').length){
      var offset = $('[data-scroll-head]').offset().top + 100;
      $('[data-scroll-head]').removeClass('fixed-content');
      $(window).scroll(function() {
        if ($(window).scrollTop() >= offset) {
          $('[data-scroll-head]').addClass('fixed-content');
        }else{
          // console.log($(window).scrollTop());
          $('[data-scroll-head]').removeClass('fixed-content');
        }
      });
    }
    var setHeightTable = function() {
      var maxHeight = 0,
          table = $('.table .table-cell');
      if(!table.hasClass('full-height')){
        table.css('height', '').each(function() {
          maxHeight = Math.max(maxHeight, $(this).outerHeight());
        });
        table.css({
          'height': maxHeight
        });
      }else{
        table.not('.full-height').css('height', '').each(function() {
          maxHeight = Math.max(maxHeight, $(this).outerHeight());
        });
        table.filter('.full-height').css({
          'height': maxHeight * 2
        });
        table.not('.full-height').css({
          'height': maxHeight
        });
      }
    };
    var detroyHeightTable = function() {
      var maxHeight = 0,
          table = $('.table .table-cell');
      table.css('height', '').each(function() {
        maxHeight = Math.max(maxHeight, $(this).outerHeight());
      });
      table.css({
        'height': ''
      });
    };
    $(window).on('resize.windowA', function(){
      if ($(window).width() > 768 ) {
        $('[data-sortable]').sortable();
        $('[data-sortable]').sortable('enable');
        detroyHeightTable();
        // $('.table.table-condensed.pink-style').removeClass('fixed');
      }else{
        $('[data-sortable]').sortable();
        $('[data-sortable]').disableSelection();
        setHeightTable();
        $('[data-sortable]').sortable('disable');
      }
      $('.block-bgd-full .container').css({
        'min-height': $(window).height()
      });
      var elementVideo = $('.desktop .play-video-block > .container');
      if (elementVideo.length){
        var videoOffset = elementVideo.offset().top + (elementVideo.height()+ 60);
        $(window).scroll(function() {
          if ($(window).scrollTop() >= videoOffset) {
            $('.desktop [data-video-frame]').addClass('fixed-video').css({
              left: $('.block-6 .sidebar').offset().left,
              width: $('.block-6 .sidebar').outerWidth()
            });
          }else{
            $('.desktop [data-video-frame]').removeClass('fixed-video').css({
              left: '',
              width: ''
            });
          }
        });
      }
    }).trigger('resize.windowA');
    if($('.list-link').length){
      $('.list-link').jScrollPane({
        showArrows: true
      });
    }
    $('.block-img .like').each(function(e){
        $(this).on('click', function(el){
          var target = el.target;
          // if(target.closest('.block-img a')){
          //   e.preventDefault;
          // $(this).toggleClass('active');
          // }
        });
    });
    if($('.replay-comment').length){
      $('.replay-comment').each(function(){
        var that = $(this);
        that.off('click').on('click', function(e){
          e.preventDefault;
          $(this).parent().addClass('active');
          $(this).closest('.btn-group').next().removeClass('hidden');
          $(this).closest('.btn-group').next().slideToggle();
        });
      });
    }

    if ($('[data-money]').length) {
      $('[data-money]').number(true);
    };
    
    if (('[data-fancybox]').length && $('[data-fancybox]').fancybox) {  
      $('[data-fancybox]').fancybox({
        helpers: {
          title: null,
        },
        afterLoad: function() {
          var MOBILE = $('html').hasClass('touch');
          var TABLET = (MOBILE && screen.width >= 768);
          if (TABLET) {
            $('html').addClass('fancybox-margin fancybox-lock');
          }
        }
      });
    }
      
    $('[data-tooltip]').tooltip();
    $(window).on('resize.tabtoogle',function(){
      // if($(window).width() > 768){
      // }else{
      //   $('[data-toggle-mobile]').removeClass('style-mb').css({display: 'none'});
      // }
    }).trigger('resize.tabtoogle');
    // $('[data-toggle-mobile]').addClass('style-mb').css({display: 'block'});
    $('.toggle-list').on('click',function(){
      if($('[data-toggle-mobile]').not('.style-mb')){
        $(this).find('span').addClass('rotateIn');
        $(this).find('span').on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
          function(e){
            $(this).removeClass('rotateIn');
        });
        $('[data-toggle-mobile]').stop().slideToggle(800, function(){
          $('.list-link').jScrollPane({
            showArrows: true
          });
        });
      }
    });
    if(!$('[data-buttonslider]').hasClass('active')){
      $('[data-buttonslider]').css({
        left: '-88%'
      });
    }
    $('[data-buttonslider]').click(function(e){
      var that = $(this);
      if(that.hasClass('active')){
        // that.find('.fa').removeClass('fa-angle-double-right').addClass('fa-angle-double-left');
        // that.find('.btn-slider').click(function(e){
        if(!$('[data-slidermobile]').hasClass('active')){
          that.stop().animate({
              left: '-88%'
          }, 800, function(){
            that.find('.fa').removeClass('fa-angle-double-left').addClass('fa-angle-double-right');
            that.removeClass('active');
          });
        }
      }
      else{
        console.log(1);
        that.addClass('active').stop().animate({
            left: 0
        }, 800, function(){
          that.find('.fa').removeClass('fa-angle-double-right').addClass('fa-angle-double-left');
        });
      }
    });
    $('[data-buttonslider]').find('.btn-show').click(function(e){
      $('[data-slidermobile]').stop().slideToggle(500);
      $('[data-slidermobile]').toggleClass('active');
    });
    $('[data-buttonslider]').find('.btn-slider').click(function(e){
      $('[data-slidermobile]').stop().slideToggle(500);
      $('[data-slidermobile]').toggleClass('active');
    });
    if ($("[data-coverflow]").length) {
      $("[data-coverflow]").flipster({
        itemContainer:      '> ul', // Container for the flippin' items.
        itemSelector:       '> li', // Selector for children of itemContainer to flip
        style:              'carousel', // Switch between 'coverflow' or 'carousel' display styles
        start:              0, // Starting item. Set to 0 to start at the first, 'center' to start in the middle or the index of the item you want to start with.
        
        enableKeyboard:     true, // Enable left/right arrow navigation
        enableMousewheel:   false, // Enable scrollwheel navigation (up = left, down = right)
        enableTouch:        true, // Enable swipe navigation for touch devices
        
        enableNav:          false, // If true, flipster will insert an unordered list of the slides
        enableNavButtons:   true, // If true, flipster will insert Previous / Next buttons
        
        onItemSwitch:       function(){}, // Callback function when items are switches
      });
    } 

    if(!$('.non-fixed #header').length && !$('.fullheight').length){
      $('#header').addClass('original').clone().insertAfter('#header').addClass('cloned').css('position','fixed').css('top','0').css('margin-top','0').css('z-index','500').removeClass('original').hide();
      setInterval(function(){stickIt();}, 100);
      function stickIt() {
        var orgElementPos = $('.original').offset();
        orgElementTop = orgElementPos.top;
        var target = $('[data-toggle-slide]').data('target'); 
        /*$('.search-category')
              .mouseover(function(){
                $('.ui-autocomplete-input').addClass('expand');
              })
              .mouseleave(function(){
                $('.ui-autocomplete-input').removeClass('expand');
            });*/
          
        $.widget("custom.catAutocomplete", $.ui.autocomplete, {
          _renderItemData: function( ul, item ) {
            return this._renderItem( ul, item ).data( "ui-autocomplete-item", item );
          },
          _renderItem: function( ul, item ) {
            return $( "<li>" )
              // .append( $( "<a>" ).text( item.label ) )
              .append( "<b>"+ item.alphabet + "-</b>" + item.label )
              .appendTo( ul );
          },
          _renderMenu: function(ul, items) {
            var that = this,
              currentCategory = "";
            ul.addClass('search-category');
            $.each(items, function(index, item) {
              if (item.category != currentCategory) {
                ul.append("<li class='ui-autocomplete-category " + item.class + "-icon '><span></span><p>" + item.category + "</p></li>");
                currentCategory = item.category;
              }

              // if (item) {
              //   ul.append("<li class='item' value='" + item.value + "'><b>" + item.alphabet + "</b>-" + item.label + "</li>");
              //   currentCategory = item.category;
              // }
              // console.log(item.value);
              that._renderItemData(ul, item);
              
              // console.log(item.label);
              
            });
          }
        });
        $('.search-spec').click(function(e){
          var input = $('.ui-autocomplete-input'),
              target = $(e.target);
          input.addClass('expand');
        });
        $('body').click(function(e){
          var input = $('.ui-autocomplete-input'),
              target = $(e.target);
          if(!target.closest('.search-spec').length && !target.closest('.search-category').length){
            input.removeClass('expand');
          }
        });
        // Initialize autocomplete with categories
        var xhr;
        $('.video-style.cloned #search-form #input-search').catAutocomplete({
            minLength: 0,
            delay: 0,
            source: function(request, response) {
              var regex = new RegExp(request.term, 'i');
              if(xhr){
                xhr.abort();
              }
              xhr = $.ajax({
                // Retrieve github user repositories list
                url: 'data/category.json',
                dataType: "json",
                cache: false,
                success: function(data) {
                  // data.sort(function(item1, item2){
                  //   return item1.forks > item2.forks ? 1 : -1;
                  // });
                  response($.map(data.temp, function(item) {
                    if(regex.test(item.label)){
                      return {
                        label: item.label,
                        category: item.category,
                        alphabet: item.alphabet,
                        class: item.classCategory
                      }
                    }
                  }));
                }
              });
            },
        });
        $('[data-toggle-slide]').parent().on('click', function(e){
          $(target).stop(true).slideDown(300, function(){
            $(this).addClass('active');
            
          });

        });
        if($(target).hasClass('active')){
          $('[data-toggle-slide]').parent().on('click', function(e){
            $(target).stop(true).slideUp(300,function(){
              $(this).removeClass('active');
            });
          });
        }
        $(target).find('.close').on('click', function(){
          $(target).stop(true).slideUp(300,function(){
            $(this).removeClass('active');
          });
        });
        if ($(window).scrollTop() >= (orgElementTop)) {
          orgElement = $('.original');
          coordsOrgElement = orgElement.offset();
          leftOrgElement = coordsOrgElement.left;
          widthOrgElement = orgElement.css('width');
          $('.cloned').css('left',leftOrgElement+'px').css('top',0).css('width',widthOrgElement).show();
          $('.original').css('visibility','hidden');
        } else {
          $('.cloned').hide();
          $('.original').css('visibility','visible');
        }
            
      }
    }
    var container = $('[data-masonry]');
    if (container.length) {
      container.imagesLoaded( function () {
        container.masonry({
          itemSelector: '.item',
          columnWidth: '.item',
          isAnimated:true,
          animationOptions: {
            duration: 700,
            easing:'swing',
            queue :false
          }
        });
      });
    }
      
    var ajaxAblum = $('.ajaxablum');
    var urlAlbum = ajaxAblum.data('show-ajax');
    var albumAjax = function(){
      $.ajax({
        url: urlAlbum,
        dataType: 'json',
        beforeSend: function(){
          loading.appendTo();
        },
        success: function(data){
          loading.remove();
          ajaxAblum.wrapInner('<div class="wrapper">'+data.template+'</div>');
          ajaxAblum.prev().show();
          detailAlbumAjax();
        },
        error: function(){
          alert('Please try again');
        }
      });
    };
    var detailAlbumAjax = function(){
      var itemAlbum = ajaxAblum.find('.wrapper');
      itemAlbum.each(function(){
        var itemA= $(this).find('a');
        itemA.on('click.album', function(){
          $.ajax({
            url: itemA.data('detail-album'),
            dataType: 'json',
            beforeSend: function(){
              loading.appendTo();
            },
            success: function(dataI){
              loading.remove();
              itemAlbum.hide();
              itemAlbum.parent().prev('.title-1').hide();
              ajaxAblum.wrapInner('<div class="wrapper-detail">'+ dataI.template +'</div>');
              $('[data-fancybox]').fancybox({
                helpers: {
                  title: null,
                },
                afterLoad: function() {
                  var MOBILE = $('html').hasClass('touch');
                  var TABLET = (MOBILE && screen.width >= 768);
                  if (TABLET) {
                    $('html').addClass('fancybox-margin fancybox-lock');
                  }
                }
              });
              backDetailAlbumAjax();
            },
            error: function(){
              alert('Please try again');
            }
          });
        });
      });
    };
    var backDetailAlbumAjax = function(){
      var btnBack = $('.infor-block .btn-2');
      var ajaxAblum = $('.ajaxablum');
      var itemAlbum = ajaxAblum.find('.wrapper-detail');
      var itemA= $(this).find('a');
      btnBack.on('click.backAlbum', function(){
        $.ajax({
          url: btnBack.data('back'),
          dataType: 'json',
          beforeSend: function(){
            loading.appendTo();
          },
          success: function(dataI){
            loading.remove();
            itemAlbum.remove();
            ajaxAblum.html(dataI.template);
            ajaxAblum.prev().show();
            albumAjax();
          },
          error: function(){
            alert('Please try again');
          }
        });
      });
    };

    if ($('[data-check]').length) {
      $('[data-check]').check();
    }
    
    $('a[data-toggle=tab]').each(function () {
      var that = $(this);
      var tab = $(that.attr('href'));
      var gmap = tab.find('[data-gmap]');
      that.on('shown.bs.tab', function () {
        if($('.ajaxablum').length){
          albumAjax();
          detailAlbumAjax();
          backDetailAlbumAjax();
        }
        container.imagesLoaded( function () {
          container.masonry({
            itemSelector: '.item',
            columnWidth: '.item',
            percentPosition: true,
            isAnimated:true,
            animationOptions: {
              duration: 700,
              easing:'swing',
              queue :false
            }
          });
        });
        if(!gmap.data('gmapFilter')){
        	gmap.gmapFilter();
        }
        if(gmap.length){
        	gmap.gmapFilter('initMap');
        }
      });
    });
    $(window).on('resize.a', function(){
      $('.block-album .item').each(function(e){
        if($(this).closest('.noslider').length){
          $(this).hover(function(){
            return false;
          },
          function () {
            return false;
          });
        }else{
          $(this).hover(function(){
            if($(window).width() > 768){
              $(this).find('.content').stop().slideDown(500);
            }
            if($(this).parent().hasClass('noslider')){
              return false;
            }
          },
          function () {
            if($(window).width() > 768){
              $(this).find('.content').stop().slideUp(500);
            }
            if($(this).parent().hasClass('noslider')){
              return false;
            }
          });
        }
      });
        $('.mega-menu').on('mouseover', function(){
          if($(window).width() > 992){
            $('.sub-mega').stop(true).slideDown();
          }
        }).on('mouseout', function(){
          $('.sub-mega').stop(true).slideUp();
        });
        $('.sub-mega').on('mouseover', function(){
          if($(window).width() > 992){
            $(this).stop(true).slideDown();
          }
        }).on('mouseout', function(){
          $(this).stop(true).slideUp();
        });
    }).trigger('resize.a');
    $('input[name="country"]').on('click.radiobtn', function(){
      if($(this).attr('value') === 'global'){
        $('[data-select="global"]').show();
        $('[data-select="local"]').not('[data-select="global"]').hide();
      }
      else{
        $('[data-select="local"]').show();
        $('[data-select="global"]').not('[data-select="local"]').hide();
      }
    });
    if ($('.slider-dashboard').length) {
      $('.slider-dashboard').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        adaptiveHeight: true
      });
    }
    
    if ($('[data-slider-small]').length) {  
      $('[data-slider-small]').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        onAfterChange:function(slickSlider,i){
          $('[data-slider-small] .slick-slide').removeClass('slick-current');
          $('[data-slider-small] .slick-slide').eq(i + 3).addClass('slick-current');
        }
      });
    }
    $('[data-slider-small]').find('.slick-slide').eq(3).addClass('slick-current');
    var initPhotoSwipeFromDOM = function(gallerySelector) {

      // parse slide data (url, title, size ...) from DOM elements 
      // (children of gallerySelector)
      var parseThumbnailElements = function(el) {
          var thumbElements = el.childNodes,
              numNodes = thumbElements.length,
              items = [],
              figureEl,
              linkEl,
              size,
              item;

          for (var i = 0; i < numNodes; i++) {

              figureEl = thumbElements[i]; // <figure> element

              // include only element nodes 
              if (figureEl.nodeType !== 1) {
                  continue;
              }

              linkEl = figureEl.children[0]; // <a> element

              size = linkEl.getAttribute('data-size').split('x');

              // create slide object
              item = {
                  src: linkEl.getAttribute('href'),
                  w: parseInt(size[0], 10),
                  h: parseInt(size[1], 10)
              };



              if (figureEl.children.length > 1) {
                  // <figcaption> content
                  item.title = figureEl.children[1].innerHTML;
              }

              if (linkEl.children.length > 0) {
                  // <img> thumbnail element, retrieving thumbnail url
                  item.msrc = linkEl.children[0].getAttribute('src');
              }

              item.el = figureEl; // save link to element for getThumbBoundsFn
              items.push(item);
          }

          return items;
      };

      // find nearest parent element
      var closest = function closest(el, fn) {
          return el && (fn(el) ? el : closest(el.parentNode, fn));
      };

      // triggers when user clicks on thumbnail
      var onThumbnailsClick = function(e) {
          e = e || window.event;
          e.preventDefault ? e.preventDefault() : e.returnValue = false;

          var eTarget = e.target || e.srcElement;

          // find root element of slide
          var clickedListItem = closest(eTarget, function(el) {
              return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
          });

          if (!clickedListItem) {
              return;
          }

          // find index of clicked item by looping through all child nodes
          // alternatively, you may define index via data- attribute
          var clickedGallery = clickedListItem.parentNode,
              childNodes = clickedListItem.parentNode.childNodes,
              numChildNodes = childNodes.length,
              nodeIndex = 0,
              index;

          for (var i = 0; i < numChildNodes; i++) {
              if (childNodes[i].nodeType !== 1) {
                  continue;
              }

              if (childNodes[i] === clickedListItem) {
                  index = nodeIndex;
                  break;
              }
              nodeIndex++;
          }



          if (index >= 0) {
              // open PhotoSwipe if valid index found
              openPhotoSwipe(index, clickedGallery);
          }
          return false;
      };

      // parse picture index and gallery index from URL (#&pid=1&gid=2)
      var photoswipeParseHash = function() {
          var hash = window.location.hash.substring(1),
              params = {};

          if (hash.length < 5) {
              return params;
          }

          var vars = hash.split('&');
          for (var i = 0; i < vars.length; i++) {
              if (!vars[i]) {
                  continue;
              }
              var pair = vars[i].split('=');
                if (pair.length < 2) {
                    continue;
                }
                params[pair[0]] = pair[1];
            }

            if (params.gid) {
                params.gid = parseInt(params.gid, 10);
            }

            return params;
        };

        var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
            var pswpElement = document.querySelectorAll('.pswp')[0],
                gallery,
                options,
                items;

            items = parseThumbnailElements(galleryElement);

            // define options (if needed)
            options = {

                // define gallery index (for URL)
                galleryUID: galleryElement.getAttribute('data-pswp-uid'),

                getThumbBoundsFn: function(index) {
                    // See Options -> getThumbBoundsFn section of documentation for more info
                    var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect();

                    return {
                        x: rect.left,
                        y: rect.top + pageYScroll,
                        w: rect.width
                    };
                }

            };

            // PhotoSwipe opened from URL
            if (fromURL) {
                if (options.galleryPIDs) {
                    // parse real index when custom PIDs are used 
                    // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                    for (var j = 0; j < items.length; j++) {
                        if (items[j].pid == index) {
                            options.index = j;
                            break;
                        }
                    }
                } else {
                    // in URL indexes start from 1
                    options.index = parseInt(index, 10) - 1;
                }
            } else {
                options.index = parseInt(index, 10);
            }

            // exit if index not found
            if (isNaN(options.index)) {
                return;
            }

            if (disableAnimation) {
                options.showAnimationDuration = 0;
            }

            // Pass data to PhotoSwipe and initialize it
            gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        };

        // loop through all gallery elements and bind events
        var galleryElements = document.querySelectorAll(gallerySelector);

        for (var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i + 1);
            galleryElements[i].onclick = onThumbnailsClick;
        }

        // Parse URL and open gallery if it contains #&pid=3&gid=1
        var hashData = photoswipeParseHash();
        if (hashData.pid && hashData.gid) {
            openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
        }
    };

    // execute above function
    initPhotoSwipeFromDOM('.show-gallery');
    $('.table-condensed .tbody .table-row').each(function(){
      var el = $(this);
      if(!el.is(':hidden')){
        $('.member[data-select]').on('customSelectChangeEvent',function(e) {
          var val = '^(?=.*\\b' + $.trim($(this).find('select').val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
              reg = RegExp(val, 'i'),
              text,
              col = $('[data-filter]'),
              rows = $('[data-filter]').closest('.table-row');
            rows.show().filter(function() {
                text = $(this).find('[data-filter]').text().replace(/\s+/g, ' ');
                return !reg.test(text);
            }).hide();
        });
        $('.name').on('keyup',function(e) {
          var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
              reg = RegExp(val, 'i'),
              text,
              col = $('[data-filter-name]'),
              rows = $('[data-filter-name]').closest('.table-row');
            rows.show().filter(function() {
                text = $(this).find('[data-filter-name]').text().replace(/\s+/g, ' ');
                return !reg.test(text);
            }).hide();
        });
      }
    });
    
    $('[data-modal-ajax]').on('shown.bs.modal', function (e) {
      e.preventDefault();
      var dataUrl= $('.modal-favorite .form-search .input-form').data('url'),
          rows = $('[data-filter]');
      disableScrollBgd.call(this);
      if(!$('.modal-content .modal-body').length){
        $('.loading-more').show();
        $('.loading-more').css({
          'background' : 'transparent',
          'z-index': 100000
        });
        setTimeout(function(){
          if(!$('.modal-content .modal-body').length){
            $('[data-modal-ajax]').modal('hide');
            $('.loading-more').hide();
          }else{
            $('.loading-more').hide();
          }
          if (e.type === 'shown') {
            if($('[data-search-filter]').length){
              $('[data-search-filter]').keyup(function() {
                var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
                    reg = RegExp(val, 'i'),
                    text;
                var jsp = $('.list-option').data('jsp');
                rows.show().filter(function() {
                    text = $(this).text().replace(/\s+/g, ' ');
                    return !reg.test(text);
                }).hide();
                if (jsp) {
                  jsp.destroy();
                }
                $('.list-option').jScrollPane({
                  mouseWheelSpeed: 50
                });
              });
              if($('.modal-favorite .list-option').length){
                $(window).on('resize.scrollpanelList', function(){
                  var jsp = $('.list-option').data('jsp');
                  if (jsp) {
                    jsp.destroy();
                  }
                  $('.list-option').jScrollPane({
                    mouseWheelSpeed: 50
                  });
                }).trigger('resize.scrollpanelList');
              }
            }
          }
        }, 5000);
      }
      setTimeout(function(){
        $('.modal-content').focus();
        if($('.block-bgd-second').length){
          $('.block-bgd-second').eqheight().init();
          $('.block-bgd-second').find('.bgd-pink .wrap').css({
            'height': $('.block-bgd-second .bgd-pink').height()
          });
        }
        $('.custome-fileupload').customFile();
        $('[data-money]').number(true);
        $('[data-check]').check();
        $('[data-picker]').datepicker({
          showButtonPanel: true,
          dateFormat: "dd/mm/yy",
           autoSize: true,
          beforeShow: function(input, inst) {
            setTimeout(function(){
              var widthItem = $('[data-picker]').parent().width();
              $('#ui-datepicker-div').css({width: widthItem});
            },200);
          }
        });
        setTimeout(function(){
          var widthItem = $('[data-picker]').parent().width();
          $('#ui-datepicker-div').css({width: widthItem});
        },200);

        $(window).resize(function() {
          if ($('[data-picker]').length) {
            $('[data-picker]').datepicker('hide');
              $('[data-picker]').blur();
          }
          if($('.block-bgd-second').length){
            $('.block-bgd-second').eqheight().init();
            $('.block-bgd-second').find('.bgd-pink .wrap').css({
              'height': $('.block-bgd-second .bgd-pink').height()
            });
          }
        });

        if ($('.slidershow-album .thumbnail-album').length) {
          $('.slidershow-album .thumbnail-album').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            asNavFor: '.control-album',
            onAfterChange:function(slickSlider,i){
              $('.slidershow-album .control-album .slick-slide').removeClass('slick-current');
              $('.slidershow-album .control-album .slick-slide').eq(i).addClass('slick-current');
            }
          });
        }
        if ($('[data-autocomplete]').length){
          var jsonAddress = function(){
            var jsAddress= $('[data-autocomplete]').data('autocomplete'),
                xhr;
            if(xhr){
              xhr.abort();
            }
            xhr = $.ajax({
              url: jsAddress,
              dataType: 'json',
              success: function(res){
                $('[data-autocomplete]').autocomplete({
                  source: res.address
                });
              }
            });
          };
          jsonAddress();
        }
        $(window).on('resize.album', function(){
          $('.modal-album .modal-dialog').each(function(e){
            if($(window).height() < $(this).height()){
              $(this).css({
                'top': 0
              })
            }else{
              $(this).css({
                'top': ($(window).height() - $(this).height()) / 2
              })
            }
          });
        }).trigger('resize.album');
        $('[data-money]').number(true);
        $('.slidershow-album .control-album').slick({
          slidesToShow: 8,
          slidesToScroll: 1,
          asNavFor: '.thumbnail-album',
          dots: false,
          arrows: true,
          vertical: true,
          focusOnSelect: true
        });

        if($('[data-modal-ajax] .lists-ablum-1').length){
          $(window).on('resize.scrollpanelList1', function(){
            var jsp = $('[data-modal-ajax] .lists-ablum-1').data('jsp');
            if (jsp) {
              jsp.destroy();
            }
            $('[data-modal-ajax] .lists-ablum-1').jScrollPane({
              mouseWheelSpeed: 50
            });

          }).trigger('resize.scrollpanelList1');
        }
        if($('[data-modal-ajax] .invitation-list').length){
          $('[data-modal-ajax] .invitation-list').jScrollPane({
            showArrows: true
          });
        }
        $('.slidershow-album .control-album .slick-slide').eq(0).addClass('slick-current');
        if($('.form-add-board').length){
          $('.form-add-board .btn-1').on('click',function(e){
            var form = $('.form-add-board')
                xhr;
            e.preventDefault();
            if(xhr){
              xhr.abort();
            }
            xhr = $.ajax({
              url: form.attr('action'),
              dataType: 'json',
              type: 'POST',
              data: $(this).serialize(),
              success:function(data){
                if(data.success){
                  $('#success').html(data.success);
                  $('#success').show(300);
                  form.closest('.form-search').hide();
                  $('.modal-favorite').on('hidden.bs.modal', function(e){
                    window.location.reload();
                  });
                }else{
                  $('#error').html(data.error);
                  $('#error').show(300).fadeOut(5000);
                }
              },
              error:function(data){
                $('#error').show(300).fadeOut(5000);
              }
            });
          });
        }
      }, 500);
    });
    $('[data-modal-ajax]').on('hidden.bs.modal', function() {
      resetScrollBgd.call(this);
      $(this).removeData('modal');
      $('.modal-content').html('');
    });
    $('body').on('hidden.bs.modal', '.modal', function () {
      $(this).removeData('bs.modal');
    });
    setTimeout(function(){
      $('[data-toggle="modal"]').addClass('active').fadeIn();
    }, 500);
    if ($('.slidershow-album .thumbnail-album').length) {
      $('.slidershow-album .thumbnail-album').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        asNavFor: '.control-album',
        onAfterChange:function(slickSlider,i){
          $('.slidershow-album .control-album .slick-slide').removeClass('slick-current');
          $('.slidershow-album .control-album .slick-slide').eq(i).addClass('slick-current');
        }
      }); 
    }
    if ($('.slidershow-album .control-album').length) {
      $('.slidershow-album .control-album').slick({
        slidesToShow: 8,
        slidesToScroll: 1,
        asNavFor: '.thumbnail-album',
        dots: false,
        arrows: true,
        vertical: true,
        focusOnSelect: true
      });
    }

    $('.slidershow-album .control-album .slick-slide').eq(0).addClass('slick-current');
    
    if ($('[data-validate]').length) {
      $('[data-validate]').validate({
          errorPlacement: function errorPlacement(error, element) { element.before(error);  error.appendTo(element.parent()); },
      });
    }
      
    var itemList= $('.banner .slider-nav.slick-slider .slick-slide');
    if(itemList.length < 6){
      $('.banner .slider-nav .slick-track').addClass('remove-transition');
    }else{
      $('.banner .slider-nav .slick-track').remove('remove-transition');
    }
    var form = $('[data-signup]');
    if (form.length) {
      form.validate({
        errorPlacement: function errorPlacement(error, element) { element.before(error); error.appendTo(element.parent()); },
      });
    }
    
    if ($('[data-step]').length) {  
      $('[data-step]').steps({
        headerTag: ".title-content",
        bodyTag: ".item",
        transitionEffect: "slideLeft",
        labels: {
          finish: "Hoàn thành",
          next: "Tiếp tục",
          previous: "Quay lại",
          loading: "Loading ..."
        },
        onInit: function(event, currentIndex) {
          var text = $('[data-step] .item').data('text');
          $('.cap-change').appendTo('.modal-body .form-1');
          $('.actions').find('a[href="#next"]').text(text);
        },
        onStepChanging: function (event, currentIndex, newIndex){
          form.validate().settings.ignore = ":disabled,:hidden";
          return form.valid();
        },
        onStepChanged: function (event, currentIndex, priorIndex){
          var text = $('[data-step] .item').data('text');
          $('[data-select]').select();
          if(currentIndex === 0){
            $('.cap-change').appendTo('.modal-body .form-1');
             $('.actions').removeClass('half');
             $('.actions').find('a[href="#next"]').text(text);
          }else{
            $('.actions').addClass('half');
            $('.modal-body .form-1 .cap-change').appendTo('#steps-uid-0-p-0 .col-sm-offset-1.col-sm-10 .row');
             $('.actions').find('a[href="#next"]').text("Tiếp tục");
          }
        },
        onFinishing: function (event, currentIndex){
          if($('#steps-uid-0-p-1').hasClass('current')){
            $('.modal-body .form-1 .cap-change').addClass('back');
          }else{
            $('.modal-body .form-1 .cap-change').removeClass('back');
          }
          form.validate().settings.ignore = ":disabled";
          return form.valid();
        },
        onFinished: function (event, currentIndex){
          var el = $(event).find('a[href="#finish"]');
          var form = $(this);
          form.submit();
        }
      });
    }

    $('[data-step]').click(function (e) {
        var source = $(e.target);
        if(source.is("li")){
        }
    }).trigger('click.step');

    if ($('[data-picker]').length) {
      $('[data-picker]').datepicker({
        showButtonPanel: true,
        autoSize: true,
        dateFormat: "dd/mm/yy",
        beforeShow: function(input, inst) {
          setTimeout(function(){
            var widthItem = $('[data-picker]').parent().width();
            $('#ui-datepicker-div').css({width: widthItem});
          },200);
        }
      });
    }

    $(window).resize(function() {
      if ($('[data-picker]').length) {
        $('[data-picker]').datepicker('hide');
        $('[data-picker]').blur();
      }
    });

    $('.modal-1').on('show.bs.modal', function (e) {
      setTimeout(function(){
        $('[data-validate]').validate({
          errorPlacement: function errorPlacement(error, element) { element.before(error);  error.appendTo(element.parent()); }
        });
      },300);
    });
  }
  function loadMore() {
    var flag = true;
    $('.load-more').each(function(){
      var url = $(this).data('content'),
          urlContent = $(this).attr('href');
      var page = 1;
      $(this).on('click', function(e){
        var button = $(this);
        e.preventDefault();
        page ++;
        if (flag === true){
          $.ajax({
            url: urlContent,
            method: 'GET',
            dataType: 'html',
            data: {
              page: page
            },
            beforeSend: function(){
              flag = false;
              loading.appendTo();
            },
            success: function(data){
              flag = true;
              loading.remove();
              var container = $(url);
              var currTop = $(window).scrollTop();
              var data = $(data).addClass('animated zoomIn');
              if($(data).length !== 0){
                container.append(data);
                setTimeout(function(){
                  if (container.data('masonry')){
                    container.masonry('destroy');
                    container.masonry({
                      itemSelector: '.item',
                      columnWidth: '.item',
                      percentPosition: true,
                      isAnimated:true,
                      animationOptions: {
                        duration: 700,
                        easing:'linear',
                        queue :false
                      }
                    });
                    $(window).scrollTop(currTop);
                  }
                },800);
                $(window).off('resize.a').on('resize.a', function(){
                  $('.block-album .item').each(function(e){
                    if($(window).width() > 768){
                      $(this).hover(function(){
                        $(this).find('.content').stop().slideDown(500);
                      },
                      function () {
                        $(this).find('.content').stop().slideUp(500);
                      });
                    }
                    if($(this).parent().hasClass('noslider')){
                      $(this).hover(function(){
                        $(this).find('.content').stop().slideDown(500);
                      },
                      function () {
                        $(this).find('.content').stop().slideDown(500);
                      });
                    }
                    else{
                      $(this).hover(function(){
                        $(this).find('.content').stop().slideUp(500);
                      },
                      function () {
                        $(this).find('.content').stop().slideUp(500);
                      });
                    }
                  });
                }).trigger('resize.a');
                if($('.album-detail').length){
                  $('.album-detail').data('eqheight').init();
                }
                $(container).find('.item').on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
                 function(e){
                    $(this).removeClass('animated zoomIn');
                 });
                
              }else{
                button.fadeOut(800,function(){
                  button.remove();
                });
              }
            },
            error: function(){
              alert('Please try again');
            }
          });
        }
      });
    })
  }
  function deleteInvitation() {
    var flag = true;
    $('.accordion .item').each(function(){
      var deleteBtn = $('.icon-delete', $(this)),
          that = $(this),
          marryBlock = $('[data-manage]');
      // $(deleteBtn).on('click', function(){
      //   that.remove();
      // });
      var urlContent = deleteBtn.parent().data('delete');
      $(deleteBtn).on('click', function(e){
        if (flag === true){
          $.ajax({
            url: urlContent,
            dataType: 'json',
            beforeSend: function(){
              flag = false;
              loading.appendTo();
            },
            success: function(data){
              if (data.result === 1) {
                that.fadeOut(800,function(){
                  that.remove();
                });
                marryBlock.html(data.content);
              }
            },
            error: function(){
              alert('Please try again');
            }
          });
        }
      });
    });
  }
  function deleteImg() {
    $('.block-album .item').each(function(){
      var deleteBtn = $('.fancybox-close', $(this)),
          that = $(this);
      var urlContent = $(deleteBtn).data('url');
      $(deleteBtn).on('click', function(e){
        e.stopImmediatePropagation();
        $.ajax({
          url: urlContent,
          dataType: 'json',
          beforeSend: function(){
            loading.appendTo();
          },
          success: function(data){
            if (data.result === 0) {
              that.fadeOut(800,function(){
                that.remove();
              });
            }
          },
          error: function(){
            alert('Please try again');
          }
        });
      });
    });
  }
  function changeDom(){
    if($('[data-sortable]').length && localStorage.table){
    var arrTable = localStorage.table;
      var parent = $('[data-sortable]');
      var div;
      for (var i = arrTable.length - 1; i >= 0; i --) {
        div = parent.find('[data-counter="' + arrTable[i] + '"]');
        parent.prepend(div);
      }
      
    }

    $('[data-sortable]').on( "sortstop", function( event, ui ) {
      var div = $('[data-sortable]').children();
      var arr = [];
      for (var i = 0; i < div.length; i ++) {
        arr.push($(div[i]).data('counter'));
      }
      localStorage.table = arr;
    });
  }

  // function changeDom(){
  //   if($('[data-sortable]').length && localStorage.table){
      
  //     getOrder(function(arrTable) {
  //       var arrTable = localStorage.table;
  //       var parent = $('[data-sortable]');
  //       var div;
  //         for (var i = arrTable.length - 1; i >= 0; i --) {
  //         div = parent.find('[data-counter="' + arrTable[i] + '"]');
  //         parent.prepend(div);
  //       }
  //     });
  //   }

  //   $('[data-sortable]').on( "sortstop", function( event, ui ) {
  //     var div = $('[data-sortable]').children();
  //     var arr = [];
  //     for (var i = 0; i < div.length; i ++) {
  //       arr.push($(div[i]).data('counter'));
  //     }
  //     saveOrder(arr);
  //   });

  //   function getOrder(callback) {
      
  //     // var arrTable = localStorage.table;
  //     // callback(arrTable);
      
  //     $.ajax({
  //       url: 'data/getOrder.json',
  //       dataType: 'json',
  //       method: "GET",
  //       beforeSend: function(){
  //         // loading.appendTo();
  //       },
  //       success: function(data){
  //         // if (data.result === 0) {
  //         //   that.fadeOut(800,function(){
  //         //     that.remove();
  //         //   });
  //         // }
  //         callback(data);
  //       },
  //       error: function(){
  //         // alert('Please try again');
  //       }
  //    });
  //   }

  //   function saveOrder(data) {
  //    //localStorage.table = data;

  //     $.ajax({
  //       url: 'data/saveOrder.json',
  //       dataType: 'json',
  //       method: "POST",
  //       data: { order : data },
  //       beforeSend: function(){
  //         // loading.appendTo();
  //       },
  //       success: function(data){
  //         // if (data.result === 0) {
  //         //   that.fadeOut(800,function(){
  //         //     that.remove();
  //         //   });
  //         // }
  //       },
  //       error: function(){
  //         // alert('Please try again');
  //       }
  //    });
  //   }
  // }
  function historyBackWFallback(fallbackUrl) {
    //fallbackUrl = fallbackUrl || '/';
    //var prevPage = window.location.href;

    //window.history.go(-1);

    //setTimeout(function(){ if (window.location.href == prevPage) window.location.href = fallbackUrl; }, 500);
  }
  
  return {
    publicVar: 1,
    publicObj: {
      var1: 1,
      var2: 2
    },
    events: GlobalEvents,
    loadMore: loadMore,
    deleteInvitation: deleteInvitation,
    deleteImg: deleteImg,
    effectSocial: effectSocial,
    loadingImg: loadingImg,
    changeDom: changeDom,
    scrollPane: scrollPane,
    publicMethod1: privateMethod1,
    historyBackWFallback: historyBackWFallback
  };

})(jQuery, window);

jQuery(function() {
  Site.publicMethod1();
  Site.loadMore();
  Site.scrollPane();
  Site.effectSocial();
  Site.changeDom();
  Site.loadingImg();
  Site.deleteInvitation();
  Site.deleteImg();
  Site.historyBackWFallback();
});
(function (window, App) {

  "use strict";

  App = {};
  App.settings = {};
  App.settings.locales = {};

  window.App = App;

}(window));




function FaceBook() {
	this.SCOPES = 'public_profile, user_photos, user_videos, user_friends';
	
	this.state = null;
	this.isMe = false;
	this.totalItem = 0;
}

FaceBook.prototype.init = function() {
	var	that = this;
	
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			that.state = 'LOGIN';
		}
   });
};

FaceBook.prototype.getFriends = function(evt) {
	FB.api(
    "me?fields=id,about,name,friends{id,name,cover,bio,about}",
    function (response) {
      if (response && !response.error) {
      	var myEvent = jQuery.Event('facebook.friendselect');
      	myEvent.friends = response.friends.data;
        $('body').trigger(myEvent);
      }
    }
	);
};

FaceBook.prototype.getListFriend = function() {
	var that = this;
	if (this.state) {
		that.getFriends();
	} else {
		FB.login(function(response) {
			if (response.status === 'connected') {
				that.state = 'LOGIN';
				that.getFriends();
			}
		}, {scope: this.SCOPES});
	}	
};

FaceBook.prototype.connect = function(type) {
	var	that = this;
	
	$('#cloud-breadcrumb').find('.separate').hide();
	$('#cloud-breadcrumb').find('.album').html('');

	this.totalItem = 0;
  	$('#cloud-breadcrumb').find('.selected-item').html('Selected ' + this.totalItem + ' item');
				
	if (this.state) {
		that.callMe();
		that.callAPI('me/albums?fields=id,name,cover_photo', function(response) { that.onAlbumLoadedHandler(response); });
	} else {	
		FB.login(function(response) {
			if (response.status === 'connected') {
				that.state = 'LOGIN';
				that.callMe();
				that.callAPI('me/albums?fields=id,name,cover_photo', function(response) { that.onAlbumLoadedHandler(response); });
			}
		  
			else if (response.status === 'not_authorized') {
				// The person is logged into Facebook, but not your app.
			} 
		  
			else {
				// The person is not logged into Facebook, so we're not sure if
				// they are logged into this app or not.
			}
		}, {scope: this.SCOPES});
	}
};

FaceBook.prototype.callAPI = function(apiQuery, callback) {
	
	var that = this;
	
	$('#cloud-content').find('.item').off('click');
	$('#cloud-content').empty();
	$('#cloud-breadcrumb').hide();	
	$('#cloud-loadding').show();

	this.totalItem = 0;
  	$('#cloud-breadcrumb').find('.selected-item').html('Selected ' + that.totalItem + ' item');
	
	FB.api(
		apiQuery,
		function (response) {
			if (response && !response.error) {					
				$('#cloud-loadding').hide();
				$('#cloud-breadcrumb').show();
				callback(response);
			}
		}
	);
};

FaceBook.prototype.callMe = function() {
	var that = this;
	
	if (!that.isMe) {
		FB.api(
			'me/',
			function (response) {
				if (response && !response.error) {					
					that.isMe = true;
					$('#cloud-breadcrumb').find('.root').html(response.name);
					$('#cloud-breadcrumb').find('.root').on('click', function(evt) { that.onClickMeHandler(evt); });
					$('#cloud-breadcrumb').find('.album').on('click', function(evt) { that.onClickAlbumHandler(evt); });
				}
			}
		);
	}	
};

FaceBook.prototype.onClickMeHandler = function(evt) {
	$('#cloud-breadcrumb').find('.separate').hide();
	$('#cloud-breadcrumb').find('.album').html('');
	
	var that = this;
	that.callAPI('me/albums?fields=id,name,cover_photo', function(response) { that.onAlbumLoadedHandler(response); });
};

FaceBook.prototype.onClickAlbumHandler = function(evt) {
	var that = this;
	
	var albumId = $('#cloud-breadcrumb').find('.album').data('album-id');	
	that.callAPI(albumId + '/photos?fields=id,name,images,url', function(response) { that.onAlbumDetailLoadedHandler(response); });
};

FaceBook.prototype.onAlbumLoadedHandler = function(response) {
	for (var i = 0; i < response.data.length; i ++) {
		this.addFolder(response.data[i]);
	}
};

FaceBook.prototype.onAlbumDetailLoadedHandler = function(response) {
	for (var i = 0; i < response.data.length; i ++) {
		this.addPhoto(response.data[i]);
	}
};

FaceBook.prototype.addFolder = function(folder) {
	var that = this;
	var title = folder.name;
	var albumId = folder.id;
	
	var div = $('<div data-item-url="Image1.png" class="item col-xs-3">' +
				'	<span>' + title + '</span>' +
				'	<div class="thumb"><img src="" alt="" class="img-responsive"/></div>' +
				'</div>');
	$('#cloud-content').append(div);
	
	FB.api(
		albumId + '/picture',
		function (response) {
			if (response && !response.error) {					
				div.find('.thumb img').attr('src', response.data.url);
			}
		}
	);
		
	div.on('click', function(evt) {	
		$('#cloud-breadcrumb').find('.separate').show();
		$('#cloud-breadcrumb').find('.album').html(title);
		$('#cloud-breadcrumb').find('.album').data('album-id', albumId);
				
		that.callAPI(albumId + '/photos?fields=id,name,images,url', function(response) { that.onAlbumDetailLoadedHandler(response); });
	});
};

FaceBook.prototype.addPhoto = function(photo) {
	var that = this;
	
	var heightThumbnail = 10000;
	var thumbnail = 'images/video/folder.png';
	
	var heightSource = 0;
	var source = '';
	
	for (var i = 0; i < photo.images.length; i ++) {
		if (photo.images[i].height < heightThumbnail) {
			heightThumbnail = photo.images[i].height;
			thumbnail = photo.images[i].source;
		}

		if (photo.images[i].height > heightSource) {
			heightSource = photo.images[i].height;
			source = photo.images[i].source;
		}
	}
	
	var div = $('<div data-item-url="' + source + '" class="item col-xs-3">' +
				'	<div class="thumb"><img src="' + thumbnail + '" alt="" class="img-responsive"/></div>' +
				'</div>');
	$('#cloud-content').append(div);
	
	div.on('click', function(evt) {		
		div.toggleClass('active');

		if (div.hasClass('active')) {
	        that.totalItem ++;
	    } else {
	    	that.totalItem --;
	    }

		$('#cloud-breadcrumb').find('.selected-item').html('Selected ' + that.totalItem + ' item');
	});
};

var facebook = new FaceBook();

//$(document).ready(function() {
//	$('#cloud-connect').on('click', function(evt) {
//		facebook.connect();
//	});
//s});

window.fbAsyncInit = function() {
	FB.init({
	  appId      : '390145291021310',
	  xfbml      : true,
	  version    : 'v2.5'
	});		
	facebook.init();
};

(function(d, s, id){
	 var js, fjs = d.getElementsByTagName(s)[0];
	 if (d.getElementById(id)) {return;}
	 js = d.createElement(s); js.id = id;
	 js.src = "//connect.facebook.net/en_US/sdk.js";
	 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function GoogleDrive() {
  this.CLIENT_ID = '691726389794-s28o1ikvvepsjclilk8e6tv1gdmua7f9.apps.googleusercontent.com';
  this.API_KEY = 'AIzaSyBo1FC19SxyHcSgS_1qBTMzvU-xRHKF7wQ';
  this.SCOPES = ['https://www.googleapis.com/auth/drive'];
  
  this.isMe = false;
  this.totalItem = 0;
}

GoogleDrive.prototype.init = function() {
  gapi.client.setApiKey(this.API_KEY);
};

GoogleDrive.prototype.retry = function(api, version, scope, callback) {
  var that = this;
  
  gapi.auth.authorize({
    'client_id': this.CLIENT_ID,
    'scope': scope,
    'immediate': false
  }, function(authResult) {
    if (authResult && !authResult.error) {
      that.loadApi(api, version, callback);
    }
  });
};

GoogleDrive.prototype.loadApi = function(api, version, callback) {
  gapi.client.load(api, version, function() {
    callback();
  });
};

GoogleDrive.prototype.connect = function(type) {
  
  this.totalItem = 0;
  $('#cloud-breadcrumb').find('.separate').hide();
  $('#cloud-breadcrumb').hide();
  $('#cloud-breadcrumb').find('.selected-item').html('Selected ' + this.totalItem + ' item');
  
  $('#cloud-content').find('.item').off('click');
  $('#cloud-content').empty();

  $('#cloud-loadding').show();

  var that = this;

  var api = 'drive';
  var version = 'v2';
  var scope = 'https://www.googleapis.com/auth/drive';

  gapi.auth.authorize({
    'client_id': this.CLIENT_ID,
    'scope': scope,
    'immediate': true
  }, function(authResult) {
    if (authResult && !authResult.error) {
    that.loadApi(api, version, function() { that.loadDrive(); } );
    } else {
      that.retry(api, version, scope, function() { that.loadDrive(); } );
    }
  });
};

GoogleDrive.prototype.loadDrive = function() {
  var that = this;
  var request = gapi.client.drive.about.get();
  request.execute(function(response) {

    that.isMe = true;
    $('#cloud-breadcrumb').find('.root').html(response.name);
    $('#cloud-breadcrumb').find('.root').data('folderId', response.rootFolderId);
    
    $('#cloud-breadcrumb').find('.root').on('click', function(evt) { that.onClickMeHandler(evt); });
    $('#cloud-breadcrumb').find('.album').on('click', function(evt) { that.onClickAlbumHandler(evt); });
    
    that.loadFiles(response.rootFolderId);
  });
};

GoogleDrive.prototype.onClickMeHandler = function(evt) {
  $('#cloud-breadcrumb').find('.separate').hide();
  $('#cloud-breadcrumb').find('.album').html('');
  
  var folderId = $('#cloud-breadcrumb').find('.root').data('folderId');
  this.loadFiles(folderId);
};

GoogleDrive.prototype.onClickAlbumHandler = function(evt) {
  var folderId = $('#cloud-breadcrumb').find('.album').data('folderId');
  this.loadFiles(folderId);
};

GoogleDrive.prototype.loadFiles = function(folderId) {
  var that = this;
  
  $('#cloud-loadding').show();
  
  $('#cloud-content').find('.item').off('click');
  $('#cloud-content').empty();

  this.totalItem = 0;
  $('#cloud-breadcrumb').find('.selected-item').html('Selected ' + that.totalItem + ' item');
  
  var request = gapi.client.request({
    'path': 'drive/v2/files?q=trashed=false ' +
        'and ( ' +
                'mimeType contains "folder" ' +
                'or mimeType contains "jpeg"' +
                'or mimeType contains "png")' +
                ' and "' + folderId + '" in parents',
    'method': 'GET',
    'params': {'maxResults': 1000, 'orderBy': 'folder'}
    });
  
  request.execute(function(resp) {
    $('#cloud-loadding').hide();
    $('#cloud-breadcrumb').show();
  
    
    var files = resp.items;
    if (files && files.length > 0) {
      for (var i = 0; i < files.length; i++) {
        that.addFile(files[i]);
      }
    }
  });
};

GoogleDrive.prototype.addFile = function(file) {
  var that = this;
  
  var isFolder = file.mimeType != 'application/vnd.google-apps.folder' ? false : true;
  var thumbnail = isFolder ? 'http://cuongtran3001.github.io/wedding/images/video/folder.png' : file.thumbnailLink;  
  var title = isFolder ? file.title : '';
  var classes = isFolder ? 'folder-item' : '';
  var folderId = file.id;
  var url = file.selfLink + '?alt=media';
  
  var div = $('<div data-item-url="' + url + '" class="item ' + classes + ' col-xs-3">' +
              '<span>' + title + '</span>' +
              '  <div class="thumb"><img src="' + thumbnail + '" alt="" class="img-responsive"/>'+
              '</div></div>');
  
  div.on('click', function(evt) {
    if (isFolder) {
      $('#cloud-breadcrumb').find('.separate').show();
      $('#cloud-breadcrumb').find('.album').html(title);
      $('#cloud-breadcrumb').find('.album').data('folderId', folderId);
      that.loadFiles(folderId);
    } else {
      div.toggleClass('active');
      
      if (div.hasClass('active')) {
        that.totalItem ++;
      } else {
        that.totalItem --;
      }
      $('#cloud-breadcrumb').find('.selected-item').html('Selected ' + that.totalItem + ' item');
      
    }
  });
  
  $('#cloud-content').append(div);
};

GoogleDrive.prototype.getListFriend = function() {
  
  var api = 'plus';
  var version = 'v1';
  var scope = 'https://www.googleapis.com/auth/plus.login';

  var that = this;
  gapi.auth.authorize({
    'client_id': this.CLIENT_ID,
    'scope': scope,
    'immediate': true
    }, function(authResult) {
      if (authResult && !authResult.error) {
        that.loadApi(api, version, function() { that.getFriends(); } );
      } else {
        that.retry(api, version, scope, function() { that.getFriends(); });
      }
    });
};

GoogleDrive.prototype.getFriends = function() {
  var request = gapi.client.plus.people.list({
     'userId': 'me',
     'collection' : 'visible'
  });
  request.execute(function(resp) {
    var myEvent = jQuery.Event('google.friendselect');
    myEvent.friends = resp.items;
    $('body').trigger(myEvent);
  });
};

var googleDrive = new GoogleDrive();
//$('#cloud-connect').on('click', function(evt) {
//  googleDrive.getListFriend();
//});

$(document).on('ready', function() {
  if ($('[data-google]').length) {
    googleDrive.CLIENT_ID = $('[data-google]').data('google-clientid');
  }
  
  if ($('[data-google]').length) {  
    googleDrive.API_KEY = $('[data-google]').data('google-apikey');
  }
});

window.onGooglClientApiLoadedHandler = function() {
  var interval = setInterval(function() {
    if (window['gapi'] && window['gapi']['client']) {
      clearInterval(interval);
      googleDrive.init();
    }
  }, 500);
}

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://apis.google.com/js/client.js?onload=onGooglClientApiLoadedHandler";
   fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'google-jssdk'));

/* =================
 * video-clip.js
  TO DO:
  move to variable for text
  filter upload by image, video, audio of cloud

 * ================= */

;(function($, window, createjs, App) {

  "use strict"; 

  /* =============== */
  /* MODULE DEFAULTS */
  /* =============== */

  var defaults = {};
  var pluginName = 'videoclip';

  var UPLOAD_URL = 'server/videoclip/uploadData.php';
  var CLOUD_URL = 'server/videoclip/getCloudData.php';
  var SAVE_URL = 'server/videoclip/saveVideoClip.php';
  var FINISH_URL = 'server/videoclip/finishVideoClip.php';
  var SHARE_URL = 'video-clip-share.html';
  var EMAIL_URL = 'server/videoclip/shareVideoClip.php';
  
  var PANEL_INTRO = 'intro';
  var PANEL_TEXT = 'text';
  var PANEL_IMAGE = 'image';
  var PANEL_VIDEO = 'video';
  var PANEL_EFFECT = 'effect';
  var PANEL_AUDIO = 'audio';
  var PANEL_TEXT_EFFECT = 'texteffect';

  var FROM_LIBRARY = 'library';
  var FROM_UPLOAD = 'upload';
  var FROM_YOURS = 'yours';
  
  var AUDIO_UNTITLE = '';

  var bgTpl =  '<div class="box">' +
               '  <div class="img-add">' +
               '    <img src="{bg_image}" alt="">' +
               '  </div>' +
               '  <span class="time" title="Click to change showed time of background">{bg_time}</span>' +
               '  <input type="number" class="time edit-time">' +
               '  <a href="javascript:void(0);" title="Delete" class="delete">' +
               '    <span class="fa fa-minus"></span>' +
               '  </a>' +
               '</div>';

  var audioTpl = '<div class="box">' +
                 '  <div class="title"><strong>{audio_title}</strong></div>' +
                 '  <span class="time" title="Click to change showed time of audio">{audio_time}</span>' +
                 '  <input type="number" class="time edit-time"></input>' +
                 '  <a href="javascript:void(0);" title="Delete" class="delete">' +
                 '    <span class="fa fa-minus"></span>' +
                 '  </a>' +
                 '</div>';

  var frameTpl = '<div class="frame">' +
                 '  <div class="thumb" title="Click to change image or video"><img class="frame-image" src="{frame_image}" alt=""></div>' +
                 '  <div class="icon">' +
                 '    <div class="icon-show" title="Click to show menu"><span class="fa fa-sort-desc"></span></div>' +
                 '    <div class="icon-effect" title="Effect"><span class="fa fa-exchange"></span></div>' +
                 '    <div class="icon-audio" title="Audio"><span class="fa fa-headphones"></span></div>' +
                 '  </div>' +
                 '  <div class="desc"><span class="icon-edit-text" title="Click to change text effect"></span><p class="frame-text" title="Click to change frame text">{frame_text}</p></div>' +
                 '</div>';

  var timeTpl = '<li><span>{time}</span></li>';

  /* ================= */
  /* MODULE DEFINITION */
  /* ================= */

  function VideoClip(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, options);

    this.vcid = Math.random().toString(36).substring(12);

    this.arrFrame = [];
    this.curFrameIndex = -1;
    this.curFrame = null;

    this.curFrameImage = null;
    this.curFrameVideo = null;
    this.curFrameText = null;
    this.curFrameEffect = null;
    this.curFrameAudio = null;
    this.curFrameHAlign = null;
    this.curFrameVAlign = null;
    this.curFrameStyle  = null;

    this.arrBG = []
    this.curBG = null;
    this.curBGIndex = -1;

    this.arrBGAudio = []
    this.curBGAudio = null;
    this.curBGAudioIndex = -1;
    
    this.isBackground = false;
    this.isAudio = false;

    this.canvas = null;
    this.stage = null;
    
    this.bitmapContainer = null;
    this.frameBitmap = null;
    this.bgContainer = null;
    this.bgBitmap = null;
    this.frameText = null
    this.textContainer = null;
    this.image = null;

    this.effectSetting = null;
    this.mediaSetting = null;
    this.loading = null;

    this.audioInstance = null;
    this.videoInstance = null;

    this.curPanel = null;
    this.previewVC = new PreviewVC(); 

    this.googleDrive = null;
    this.facebook = null;

    this.dragSource = null;

    return this.init();
  }

  /* ============== */
  /* MODULE METHODS */
  /* ============== */

  VideoClip.prototype.init = function() {

    var that = this;

    UPLOAD_URL = this.element.data('upload-url');
    CLOUD_URL = this.element.data('cloud-url');
    SAVE_URL = this.element.data('save-url');
    FINISH_URL = this.element.data('finish-url');
    SHARE_URL = this.element.data('social-url');
    EMAIL_URL = this.element.data('share-url');

    this.canvas = document.getElementById('cvsVC');
    this.stage = new createjs.Stage("cvsVC");
    this.bgContainer = this.stage.addChild(new createjs.Container());
    this.bitmapContainer = this.stage.addChild(new createjs.Container());
    this.textContainer = this.stage.addChild(new createjs.Container());

    createjs.Ticker.addEventListener("tick", function() { that.stage.update(); });
    
    $(window).on('resize', function(evt) { that.resize(); });
    this.resize();

    this.effectSetting = $('.effect-setting');

    this.videoInstance = document.getElementById('video');

    this.loading = $('.vc-loading-wrapp');
      
    //media-setting events
    this.mediaSetting = $('.media-setting');

    this.mediaSetting.find('.time-start').on('mousedown', function(evt) {
      that.onMoveTimeHandler(this);
    });

    this.mediaSetting.find('.time-end').on('mousedown', function(evt) {
      that.onMoveTimeHandler(this);
    });

    this.mediaSetting.find('.play-pause').off('click').on('click', function(evt) {
      that.onClickPlayPauseHandler(this);
    });

    //dropdown-menu
    var dropDownMenuFrame = $('.dropdown-menu').find('.item');
    dropDownMenuFrame.each(function() {
      var item = $(this);
      item.off('click').on('click', function(evt) {
        that.onClickDropDownMenuHandler(item);
      });
    });

    this.initShare();

    $(document).on('keyup', function(evt){
      if (evt.keyCode == 46) {
        that.deleteActive();
      }
    });

    //add new
    //$('.vc-backgrounds').find('.add-more').off('click').on('click', function(evt) { that.addBackground(null, true);});
    $('.vc-audios').find('.add-more').off('click').on('click', function(evt) { that.addBackgroundAudio(null, true);});
    $('.vc-frames').find('.add-more-effect').off('click').on('click', function(evt) { that.onClickAddFrameHandler(evt);});
    $('#vc-add-intro').find('.intro-click').off('click').on('click', function(evt) { that.onClickAddFrameHandler(evt);});
    $('.vc-frames').find('.add-more-effect').off('click').on('click', function(evt) { that.onClickAddFrameHandler(evt);});
    
    //menu
    var controlMenu = $('.control-menu').find('li');
    controlMenu.off('click').on('click', function(evt) {
      if (!$(this).hasClass('disabled')) {
        that.changePanel($(this).attr('id'));
      }
    });

    //save, preview and finish
    var listControl = $('.list-control');
    listControl.find('.save-vc').off('click').on('click', function(evt) { that.save();});
    listControl.find('.preview-vc').off('click').on('click', function(evt) { that.preview();});
    listControl.find('.finish-vc').off('click').on('click', function(evt) { that.finish();});

    //select image from library
    var imageLibrary = $('#vc-image-library').find('.item');
    imageLibrary.off('click').on('click', function(evt) {
      that.selectFrameData(this, FrameData.IMAGE);
    });

    imageLibrary.each(function() {
      that.addDragEvent(this);
    });

    var content = $('.vc-frames').find('.content')[0];
    content.addEventListener('dragover', function(evt) { 
      if (evt.preventDefault) {
        evt.preventDefault();
      }
      return false;
    });

    content.addEventListener('drop', function(evt) {
      if (that.dragSource == 'I') {
        var offset = $(content).find('.list-frame').offset();
        var pos = Math.floor((evt.pageX - offset.left) / 130) - 1;
        that.addFrameAt(content, pos, evt.dataTransfer.getData('itemId'), evt.dataTransfer.getData('itemUrl'), evt.dataTransfer.getData('itemSrc'));
      }
    }, false);

    //select FrameData.IMAGE from local
    var imageUpload = $('#vc-image-upload').find('.vc-image-upload-local');
    imageUpload.off('click').on('click', function(evt) {
      that.browseFile(FrameData.IMAGE, that.uploadFrameData);
    });

    var imageGD = $('#vc-image-upload').find('.vc-image-upload-gd');
    imageGD.off('click').on('click', function(evt) {
      that.connectGoogleDrive(FrameData.IMAGE);
    });

    var imageDB = $('#vc-image-upload').find('.vc-image-upload-db');
    imageDB.off('click').on('click', function(evt) {
      that.connectFaceBook(FrameData.IMAGE);
    });

    //select image from your album
    var imageYours = $('#vc-image-yours').find('.item');
    imageYours.off('click').on('click', function(evt) {
      that.selectFrameData(this, FrameData.IMAGE);
    });

    imageYours.each(function() {
      that.addDragEvent(this);
    });

    //select video from library
    var videoLibrary = $('#vc-video-library').find('.item');
    videoLibrary.off('click').on('click', function(evt) {
      that.selectFrameData(this, FrameData.VIDEO);
    });

    //select video from local
    var videoUpload = $('#vc-video-upload').find('.vc-video-upload-local');
    videoUpload.off('click').on('click', function(evt) {
      that.browseFile(FrameData.VIDEO, that.uploadFrameData);
    });

    var videoGD = $('#vc-video-upload').find('.vc-video-upload-gd');
    videoGD.off('click').on('click', function(evt) {
      that.connectGoogleDrive(FrameData.VIDEO);
    });

    var videoDB = $('#vc-video-upload').find('.vc-video-upload-db');
    videoDB.off('click').on('click', function(evt) {
      that.connectFaceBook(FrameData.VIDEO);
    });

    //select video from your album
    var videoYours = $('#vc-video-yours').find('.item');
    videoYours.off('click').on('click', function(evt) {
      that.selectFrameData(this, FrameData.VIDEO);
    });

    ///vc-add-text///////////////////////////////////////////////////
    //add text effect
    var addTextEffect = $('#vc-add-text').find('.text-effect .add-more');
    addTextEffect.off('click').on('click', function(evt) {
      that.showPanel(PANEL_TEXT_EFFECT);
    });

    //select text effect
    var textEffect = $('#vc-add-texteffect').find('.item');
    textEffect.off('click').on('click', function(evt) {
      that.selectFrameTextEffect(this);
    });

    $('#vc-add-text').find('textarea[name="frametext"]').bind('input propertychange', function(evt) {
      that.applyFrameText();
    });

    $('#vc-add-text').find('input[name="textsize"]').bind('input propertychange', function(evt) {
      that.applyFrameText();
    });

    //$('#vc-add-text').find('input[name="textcolor"]').bind('input propertychange', function(evt) {
    //  that.applyFrameText();
    //});
    
    $('#vc-add-text').find('input[name="textpadding"]').bind('input propertychange', function(evt) {
      that.applyFrameText();
    });

    //halign event handler
    $('#vc-add-text').find('.halign li').off('click').on('click', function(evt) {
      that.onClickHAlignHandler(this);
    });

    //valign event handler
    $('#vc-add-text').find('.valign li').off('click').on('click', function(evt) {
      that.onClickVAlignHandler(this);
    });

    //valign event handler
    $('#vc-add-text').find('.custom-select .text-val').bind('customSelectChangeEvent', function(evt) {
      that.applyFrameText();
    });

    //valign event handler
    $('#vc-add-text').find('.fontstyle li').off('click').on('click', function(evt) {
      that.onClickFontStyleHandler(this);
    });

    /////////////////////////////////////////////////////////////////
    //select effect
    var imageEffect = $('#vc-add-effect').find('.item');
    imageEffect.off('click').on('click', function(evt) {
      that.selectFrameImageEffect(this);
    });

    //select audio from library
    var audioLibrary = $('#vc-audio-library').find('.item');
    audioLibrary.each(function() {
      var item = $(this);
      item.off('click').on('click', function(evt) {
        that.selectAudio(item);
      });
    });

    //select audio from local
    var audioUpload = $('#vc-audio-upload').find('.vc-audio-upload-local');
    audioUpload.off('click').on('click', function(evt) {
      that.browseFile(FrameData.AUDIO, that.uploadFrameData);
    });

    var audioGD = $('#vc-audio-upload').find('.vc-audio-upload-gd');
    audioGD.off('click').on('click', function(evt) {
      that.connectGoogleDrive(FrameData.AUDIO);
    });

    var audioDB = $('#vc-audio-upload').find('.vc-audio-upload-db');
    audioDB.off('click').on('click', function(evt) {
      that.connectFaceBook(FrameData.AUDIO);
    });

    //select audio from your album
    var audioYours = $('#vc-audio-yours').find('.item');
    audioYours.each(function() {
      var item = $(this);
      item.off('click').on('click', function(evt) {
        that.selectAudio(item);
      });
    });

    //apply effect
    var saveEffect = $('.effect-setting').find('.btn-1');
    saveEffect.off('click').on('click', function(evt) {
      that.applyEffect();
    });

    //jScrollPane
    $('body').unbind('change.tab-video-small').bind('change.tab-video-small', function(evt) {
      var active = $('.multi-block').find('.block-tab-video').filter('.active');
      var jsp = active.find('.effect-list').data('jsp');
      if (jsp) {
        jsp.destroy();
      }
      active.find('.effect-list').jScrollPane({
        autoReinitialise: true
      });
    });

    if($('.change-title').length){
      var replaceWith = $('<input name="temp" type="text" />');
      var connectWith = $('input[name="hiddenField"]');
      $('.change-title').inlineEdit(replaceWith, connectWith);
    }

    if ($('#textcolor').length) {
      $("#textcolor").spectrum({
        color: "#FF00FF",
        showInput: true,
        showInitial: true,
        maxSelectionSize: 10,
        preferredFormat: "hex",
      });

      $("#textcolor").on('move.spectrum', function(evt, tinycolor) { 
        $('#vc-add-text').find('input[name="textcolor"]').val(tinycolor.toHexString());
        that.applyFrameText();
      });
    }

    var url = this.element.data('videoclip');
    if ($.trim(url) != '') {
      $.ajax({
        method: "GET",
        url: url
      })
      .done(function(response) {
        that.parseData(response);
      })
      .fail(function(response) {
        that.displayOnlyMenu(true, PANEL_INTRO);
      });
    } else {
      this.displayOnlyMenu(true, PANEL_INTRO);
    }
  };

  VideoClip.prototype.parseData = function(data) {

    var frames = data.frames;
    var frameData;
    var frame;
    for (var i = 0; i < frames.length; i ++) {
      frameData = new FrameData();
      frameData.parse(frames[i]);

      frame = this.addEmptyFrame(frameData);

      if (i == frames.length - 1) {
        frame.click();
        this.showPanel(PANEL_IMAGE);
      }
    }

    var backgrounds = data.backgrounds;
    var bgData;
    for (var i = 0; i < backgrounds.length; i ++) {
      bgData = new BackgroundData();
      bgData.parse(backgrounds[i]);
      this.addBackground(bgData, false);
    }

    var audios = data.audios;
    var audioData;
    for (var i = 0; i < audios.length; i ++) {
      audioData = new AudioData();
      audioData.parse(audios[i]);
      this.addBackgroundAudio(audioData, false);
    }
  };

  VideoClip.prototype.resize = function() {
    var videoClip = $('.video-clip');
    this.canvas.width = videoClip.width();
    this.canvas.height = videoClip.height();

    this.bitmapContainer.VC_WIDTH = this.textContainer.VC_WIDTH = this.canvas.width;
    this.bitmapContainer.VC_HEIGHT = this.textContainer.VC_HEIGHT = this.canvas.height;

    this.previewVC.resize(this.canvas.width, this.canvas.height);
  };

  VideoClip.prototype.onMoveTimeHandler = function(target) {
    var that = this;
    target = $(target);

    var left = that.mediaSetting.find('.time').offset().left;
    var width = that.mediaSetting.find('.time').width();
    var duration = that.mediaSetting.find('.time').data('duration');

    $(document.body).off("mousemove").on("mousemove", function(evt) {
      if (!target) {
        return;
      }
    
      var toX = evt.pageX - 10;

      if (target.hasClass('time-start')) {
        var timeEnd = that.mediaSetting.find('.time-end').offset().left;
  
        toX = toX < left - 10 ? left - 10: toX;
        toX = (toX > timeEnd) ? timeEnd : toX;

        target.offset({left: toX});
        
        that.mediaSetting.find('.timeline').offset({left: target.offset().left + 10});
        that.mediaSetting.find('.timeline').width(timeEnd - toX);

        var ts = (that.mediaSetting.find('.timeline').offset().left - left) * duration / width;
        target.find('.text').html(EffectUtils.formatTime(ts));

        that.updateAudioData(true, ts);

      } else {
        
        var timeStart = that.mediaSetting.find('.time-start').offset().left;

        toX = (toX < timeStart) ? timeStart : toX;
        toX = (toX > left + width - 10) ? left + width - 10 : toX;

        target.offset({left: toX});

        that.mediaSetting.find('.timeline').width(toX - timeStart);

        var te = (that.mediaSetting.find('.timeline').offset().left + that.mediaSetting.find('.timeline').width() - left) * duration / width;
        target.find('.text').html(EffectUtils.formatTime(te));

        that.updateAudioData(false, te);
      }
    });

    $(document.body).off("mouseup").on("mouseup", function (evt) {
      
      target = null;

      $(document.body).off("mousemove");
      $(document.body).off("mouseup");

      if (!that.isAudio) {
        that.updateTime();
      } else {
        that.updateBackgroundAudio();
      } 
      that.updateScroll();

      that.seekMedia((that.mediaSetting.find('.timeline').offset().left - left) * duration / width);
    });
  };

  VideoClip.prototype.onClickDropDownMenuHandler = function(item) {
    
    var arrPanel = [PANEL_TEXT, PANEL_TEXT_EFFECT, PANEL_IMAGE, PANEL_VIDEO, PANEL_EFFECT];//, PANEL_AUDIO];
      
    var name = $(item).attr('class').split(' ').pop();
    name = name.split('-').pop();

    var index = arrPanel.indexOf(name);
    if (index >= 0 && index < arrPanel.length) {
      this.showPanel(arrPanel[index]);
    }

    else {
      if (name == 'duplicate') {
        this.duplicateFrame();
      } 
      else if (name == 'delete') {
        this.deleteFrame();
      }
    }

    $('.dropdown-menu').hide();
    $(document).off('click'); 
  }

  VideoClip.prototype.connectFaceBook = function(type) {
    var that = this;

    if (!this.facebook) {
      this.facebook = window.facebook;
    }
    this.facebook.connect(type);

    var dialog = $('#cloudPopup');
    dialog.find('.modal-title').html('FaceBook');
    dialog.modal('show');

    var select = dialog.find("button[name='select']");
    select.off('click').on('click', function (evt) {

      var items = $('#cloud-content').find('.active');
      var arrUrl = [];
      for (var i = 0; i < items.length; i ++) {
        arrUrl.push($(items[i]).data('item-url'));
      }

      that.getCloudData(arrUrl, type, null, 0, that.uploadFrameData);

      dialog.modal('hide');
    });

    var cancel = dialog.find("button[name='cancel']");
    cancel.off('click').on('click', function (evt) {
       dialog.modal('hide');
    });
  };

  VideoClip.prototype.connectGoogleDrive = function(type) {
    var that = this;
    
    if (!that.googleDrive) {
      that.googleDrive = window.googleDrive;
    }
    that.googleDrive.connect(type);
    
    var dialog = $('#cloudPopup');
    dialog.find('.modal-title').html('Google Drive');
    dialog.modal('show');

    var select = dialog.find("button[name='select']");
    select.off('click').on('click', function (evt) {

      var items = $('#cloud-content').find('.active');
      var arrUrl = [];
      for (var i = 0; i < items.length; i ++) {
        arrUrl.push($(items[i]).data('item-url'));
      }

      that.getCloudData(arrUrl, type, gapi.auth.getToken().access_token, 0, that.uploadFrameData);

      dialog.modal('hide');
    });

    var cancel = dialog.find("button[name='cancel']");
    cancel.off('click').on('click', function (evt) {
       dialog.modal('hide');
    });
  };

  VideoClip.prototype.getCloudData = function(arrUrl, dataType, accessToken, uploadIndex, callback) {
    var that = this;

    if (uploadIndex < arrUrl.length) {
      var formData = new FormData();
      formData.append("url", arrUrl[uploadIndex]);
      formData.append("type", dataType);
      formData.append("vcid", this.vcid);

      if (accessToken) {
        formData.append("at", accessToken);
      } 
      
      var ajax = new XMLHttpRequest();
      ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status === 200) {
          
          uploadIndex = uploadIndex + 1;
          
          if (uploadIndex >= arrUrl.length) {
            callback.apply(that, [dataType, '', ajax.responseText, true]);
          } else {
            callback.apply(that, [dataType, '', ajax.responseText, false]);
            that.getCloudData(arrUrl, dataType, accessToken, uploadIndex, callback);
          }
        }
      };
      ajax.open("POST", CLOUD_URL);
      ajax.send(formData);

      this.loading.show();
    }
  };

  VideoClip.prototype.addBackground = function(bgData, actived) {
    var that = this;

    var bg_image = bgData && bgData.url != null ? bgData.url : "";
    var bg_time = bgData != null ? EffectUtils.formatTime(bgData.time) : EffectUtils.formatTime(30);

    var strBG = bgTpl;
    strBG = strBG.replace('{bg_image}', bg_image);
    strBG = strBG.replace('{bg_time}', bg_time);

    var box =  $(strBG);

    var listbox  =$('.vc-backgrounds').find('.list-box');
    listbox.append(box);

    /*
    $(window).on('resize.backgrounds',function(){
      if(newWidth > $('.wrap-list').width()){
        listbox.closest('.wrap-list').css({
          width: newWidth
        });
        var jsp = $('.add-function-block').data('jsp');
        if (jsp) {
          jsp.destroy();
        }
        $('.add-function-block').jScrollPane({
          autoReinitialise: true
        });
      }else{
        listbox.closest('.wrap-list').css({
          width: $('.add-function-block .wrap-list').width()
        });
      }
    }).trigger('resize.backgrounds');
    */
    this.updateScroll();

    if (!bgData) {
      bgData = new BackgroundData();
    }
    this.arrBG.push(bgData);

    box.on('click', function(evt) {

      var target = $(evt.target);

      if (target.hasClass('fa-minus')) {
        that.deactiveBackground(box, FrameData.IMAGE);
      } 

      else if (target.hasClass('time')) {

        that.deactiveFrame();

        if (that.curBGAudio) {
          that.curBGAudio.removeClass('active');
          that.curBGAudio = null;
        }

        that.activeBackground(box, FrameData.IMAGE);

        box.find('.edit-time').val(that.arrBG[box.index()].time);
        box.find('.edit-time').css('display', 'block');
        box.find('.edit-time').focus();
      }
      
      else {
        that.deactiveFrame();

        if (that.curBGAudio) {
          that.curBGAudio.removeClass('active');
          that.curBGAudio = null;
        }

        that.activeBackground(box, FrameData.IMAGE);
      }
    });

    box.find('.edit-time').blur(function(evt) {
      var time = Number(box.find('.edit-time').val());

      box.find('.time').html(EffectUtils.formatTime(time));
      box.find('.edit-time').css('display', 'none');

      that.arrBG[box.index()].time = time;
    });

    if (actived) {
      box.click();
    }
  };

  VideoClip.prototype.updateBackgroundAudio = function() {
     
    var listBox = $('.vc-audios').find('.box');
    var bgAudioData;
    var time = 0;
    var obj;
    var width;
    var audioTime = 0;
    
    for (var i =  0; i < listBox.length; i ++) {
      bgAudioData = this.arrBGAudio[i];
      audioTime = bgAudioData.getTime();

      /*
      obj = this.getFrameByAudioTime(time, time + bgAudioData.getTime());
      width = this.getBGAudioWidthByFrame(time, time + bgAudioData.getTime(), obj);
      */
      width = audioTime * 15;

      $(listBox[i]).css('width', width);

      this.updateBackgroundAudioTitle(width - 55, $(listBox[i]).find('.title strong'), bgAudioData.title);
      
      $(listBox[i]).find('.time').html(EffectUtils.formatTime(bgAudioData.getTime()));

      time += bgAudioData.getTime();
    }
  };
  
  VideoClip.prototype.updateBackgroundAudioTitle = function(width, title, data) {
    
    title.html(data);

    if (title.width() > width && width > 0) {
      var str = data;
      while (title.width() > width) {
        str = str.substr(0, str.length - 1);
        title.html(str);
      }
      
      str = str.substr(0, str.lastIndexOf(' '));
      str = str + '...';
      title.html(str);
    }
  };

  VideoClip.prototype.getBGAudioWidthByFrame = function(startTime, endTime, obj) {

    if (obj.startFrame < 0 || obj.startFrame >= this.arrFrame.length) {
      return 150;
    }

    //start frame
    var startFrameData = this.arrFrame[obj.startFrame];
    var startDuration = startFrameData.getDuration();
    var startPiece = 150 / startDuration;
    var startFrameWidth = (obj.startTime + startDuration - startTime) * startPiece;
    
    //middle frame
    var middleFrameWidth = (obj.endFrame - obj.startFrame - 1) * 150;

    //end frame
    var endFrameData = this.arrFrame[obj.endFrame];
    var endDuration = endFrameData.getDuration();
    var endPiece = 150 / endDuration;

    if (endTime > obj.endTime) {
      endTime = obj.endTime;
      endPiece = 130 / endDuration;
    };
    var endFrameWidth = (endTime - (obj.endTime - endDuration)) * endPiece;

    return startFrameWidth + endFrameWidth + middleFrameWidth;
  };

  VideoClip.prototype.getFrameByAudioTime = function(startTime, endTime) {
    
    var frameData;
    var totalTime = 0;

    var objResult = {startFrame: -1, startTime: 0, endFrame: -1, endTime: 0};

    for (var i = 0; i < this.arrFrame.length; i ++) {
      frameData = this.arrFrame[i];


      if (startTime >= totalTime && startTime < totalTime + frameData.getDuration()) {
        objResult.startTime = totalTime;
        objResult.startFrame = i;
      }

      totalTime += frameData.getDuration();

      if (endTime <= totalTime) {
        objResult.endTime = totalTime;
        objResult.endFrame = i;
        break;
      } 

      else {
        if (i == this.arrFrame.length - 1) {
          objResult.endTime = totalTime;
          objResult.endFrame = i;
        }
      }
    }

    return objResult;
  };

  VideoClip.prototype.addBackgroundAudio = function(audioData, actived) {
    var that = this;

    if (!audioData) {
      audioData = new AudioData();
    }  
    this.arrBGAudio.push(audioData);

    var audio_title = audioData.title ? audioData.title : AUDIO_UNTITLE;
    var strAudio = audioTpl;
    strAudio = strAudio.replace('{audio_title}', audio_title);
    strAudio = strAudio.replace('{audio_time}', EffectUtils.formatTime(audioData.time));

    var box = $(strAudio);
    var listbox = $('.vc-audios').find('.list-box')
    listbox.append(box);

    this.updateBackgroundAudio();
    this.updateScroll();

    box.on('click', function(evt) {

      var target = $(evt.target);

      if (target.hasClass('fa-minus')) {
        that.deactiveBackground(box, FrameData.AUDIO);
      } 

      else if (target.hasClass('time')) {
        that.deactiveFrame();
      
        if (that.curBG) {
          that.curBG.removeClass('active');
          that.curBG = null;
        }

        //that.bitmapContainer.visible = false;
        //that.bgContainer.visible = true;
        that.activeBackground(box, FrameData.AUDIO);
        
        if (!that.arrBGAudio[box.index()].id) {
          box.find('.edit-time').css('display', 'block');
          box.find('.edit-time').focus();
        }
      }

      else {
        that.deactiveFrame();
      
        if (that.curBG) {
          that.curBG.removeClass('active');
          that.curBG = null;
        }

        //that.bitmapContainer.visible = false;
        //that.bgContainer.visible = true;
        that.activeBackground(box, FrameData.AUDIO);
      }
    });

    box.find('.edit-time').blur(function(evt) {
      var time = Number(box.find('.edit-time').val());
      box.find('.time').html(EffectUtils.formatTime(time));
      box.find('.edit-time').css('display', 'none');
      that.arrBGAudio[box.index()].time = time;
    });

    if (actived) {
      box.click();
    }
  };

  VideoClip.prototype.onClickAddFrameHandler = function(evt) {
    //just hide the intro and show the panel text in the first time click on add frame
    if (this.arrFrame.length == 0 || this.isAudio || this.isBackground)  {
      this.isAudio = false;
      this.isBackground = false;
      this.showPanel(PANEL_TEXT);
    }
    
    var frame = this.addEmptyFrame(null);
    frame.click();
  };

  VideoClip.prototype.onClickHAlignHandler = function(li) {
    if(this.curFrameHAlign) {
      this.curFrameHAlign.removeClass('actived');
    }
    this.curFrameHAlign = $(li);
    this.curFrameHAlign.addClass('actived');

    this.applyFrameText();
  };

  VideoClip.prototype.onClickVAlignHandler = function(li) {
    if(this.curFrameVAlign) {
      this.curFrameVAlign.removeClass('actived');
    }
    this.curFrameVAlign = $(li);
    this.curFrameVAlign.addClass('actived');

    this.applyFrameText();
  };

  VideoClip.prototype.onClickFontStyleHandler = function(li) {
    if(this.curFrameStyle) {
      this.curFrameStyle.removeClass('actived');
    }
    this.curFrameStyle = $(li);
    this.curFrameStyle.addClass('actived');

    this.applyFrameText();
  };

  VideoClip.prototype.browseFile = function(type, callback) {
    var that = this;
    var file = document.createElement('input');
    file.name = 'file';
    file.type = 'file';
    file.accept = type + '/*';
    file.multiple = true;
    $(file).on('change', function(evt) {
      that.uploadData(evt.target.files, type, 0, callback);
    });
    file.click();
  };

  VideoClip.prototype.uploadData = function(files, type, count, callback) {
    var that = this;

    if (count < files.length) {
      var name = files[count].name;
      name = name.substr(0, name.lastIndexOf('.'));
      
      var formData = new FormData();
      formData.append("file", files[count]);
      formData.append("type", type);
      formData.append("vcid", this.vcid);
      
      var ajax = new XMLHttpRequest();
      ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status === 200) {
          count = count + 1;
          
          if (count >= files.length) {
            callback.apply(that, [type, name, ajax.responseText, true]);
          } else {
            callback.apply(that, [type, name, ajax.responseText, false]);
            that.uploadData(files, type, count, callback);
          }
        }
      };
      ajax.open("POST", UPLOAD_URL);
      ajax.send(formData);

      this.loading.show();
    }
  };

  VideoClip.prototype.deactiveBackground = function(item, type) {
    item = $(item);

    var replace = false;

    //if (this.isAudio) {
    if (item.is(this.curBGAudio)) {
      this.loading.hide();
      this.mediaSetting.hide();
      this.clearAudio();

      if (this.curFrameAudio) {
        this.curFrameAudio.removeClass('active');
        this.curFrameAudio.find('.add-more span').removeClass('fa fa-minus').addClass('fa fa-plus');
        this.curFrameAudio = null;
      }
      replace = true;
    }

    this.arrBGAudio.splice(item.index(), 1);

    if (replace) {
      var index = item.index();
      index = index < this.arrBGAudio.length ? index : index - 1;

      if (index >= 0) {
        var bgAudioItem = $('.vc-audios').find('.box')[index];
        this.activeBackground(bgAudioItem, FrameData.AUDIO);
      } else {

        var frameItem = $('.vc-frames').find('.frame')[this.curFrameIndex];
        this.activeFrame(frameItem);
      }
    }

    //}

    //else if (this.isBackground) {
    //  if (item.is(this.curBG)) {
    //    this.loading.hide();
    //    this.mediaSetting.hide();
    //    if (this.curFrameAudio) {
    //      this.curFrameAudio.removeClass('active');
    //      this.curFrameAudio = null;
    //    }
    //  }
    //  this.arrBG.splice(item.index(), 1);
    //}

    item.off();
    item.remove();

    this.updateScroll();
  };

  VideoClip.prototype.activeBackground = function(item, type) {

    item = $(item);

    if (type == FrameData.AUDIO) {
      this.isAudio = true;
      this.displayOnlyMenu(true, PANEL_AUDIO);

      if (this.curBGAudio) {
        this.curBGAudio.removeClass('active');
      }

      this.curBGAudio = item; 
      this.curBGAudio.addClass('active');
      
      this.curBGAudioIndex = this.curBGAudio.index();
      var audioData = this.arrBGAudio[this.curBGAudioIndex];
      
      if (this.curFrameAudio) {
        this.curFrameAudio.removeClass('active');
        this.curFrameAudio.find('.add-more span').removeClass('fa fa-minus').addClass('fa fa-plus');
        this.curFrameAudio = null;
      }

      //show current audio edit
      var itemAudio = $('#vc-audio-library').find('div[data-item-id="'+ audioData.id + '"]');
      if (!itemAudio.length) {
        itemAudio = $('#vc-audio-yours').find('div[data-item-id="'+ audioData.id + '"]');
      }
      
      if (itemAudio.length) {
        this.curFrameAudio = $(itemAudio[0]);
        this.curFrameAudio.addClass('active');
        this.curFrameAudio.find('.add-more span').removeClass('fa fa-plus').addClass('fa fa-minus');

        this.loadFrameAudio(audioData);
      }
    }

    /*
    else if (type == FrameData.IMAGE) {
      this.isBackground = true;
      this.displayOnlyMenu(true, PANEL_IMAGE);

      if (this.curBG) {
        this.curBG.removeClass('active');
      }

      this.curBG = item; 
      this.curBG.addClass('active');
      
      this.curBGIndex = this.curBG.index();
      var bgData = this.arrBG[this.curBGIndex];
      
      if (this.curFrameImage) {
        this.curFrameImage.removeClass('active');
        this.curFrameImage = null;
      }

      //show current image edit
      var itemImage = $('#vc-image-library').find('div[data-item-id="'+ bgData.id + '"]');
      if (!itemImage.length) {
        itemImage = $('#vc-image-yours').find('div[data-item-id="'+ bgData.id + '"]');
      }
      
      if (itemImage.length) {
        this.curFrameImage = $(itemImage[0]);
        this.curFrameImage.addClass('active');
      }

      //update here
      this.bitmapContainer.visible = false;
      
      this.bgContainer.removeAllChildren();
      this.bgContainer.visible = true;
      
      if (bgData.url) {
        this.loadBackgroundImage(bgData.url);
      }
    }
    */
  };

  VideoClip.prototype.uploadFrameData = function(type, name, url, actived) {
    var that = this;
    var item, list;
    
    //add to your album
    if (type == FrameData.AUDIO) {
      list = $('#vc-' + type + '-yours').find('.audio-control');
      item = $('<div data-item-id="item-' + type +'-yours_'  + (list.children().length + 1)  + '" data-item-url="' + url + '" data-item-time="300" class="item"><div class="title"><strong>Audio song name - upload </strong></div><a href="javascript:void(0)" title="Select" class="add-more"><span class="fa fa-plus"></span></a><span class="time">05:00</span></div>');
      
      item.off('click').on('click', function(evt) {
        that.selectAudio(item);
      });

    } else {
      list = $('#vc-' + type + '-yours');
      item = $('<div data-item-id="item_' + type + '-yours_' + (list.children().length + 1) + '" data-item-url="' + url + '" class="item"><div class="thumb"><img src="http://placehold.it/150x100/?text=upload" alt="" class="img-responsive"></div></div>');
      
      //add event
      item.off('click').on('click', function(evt) {
        that.selectFrameData(this, type);
      });

      this.addDragEvent(item);

    }
    list.append(item);

    var jsp = $('.vc-add-' + type).find('.effect-list').data('jsp');
    if (jsp) {
      jsp.destroy();
    }
    $('.vc-add-' + type).find('.effect-list').jScrollPane({
      autoReinitialise: true
    });

    //apply to current frame
    if (actived) {
      //show album tab
      var tab = $('#vc-add-' + type).find('a[href="#vc-' + type + '-yours"]');
      tab.click();
      item.click();
    }
  };

  VideoClip.prototype.initScroll = function(element) {
    var jsp = element.data('jsp');
    if (jsp) {
      jsp.destroy();
    }
    element.jScrollPane({autoReinitialise: true});
  };

  VideoClip.prototype.deleteActive = function() {
    var replace;

    if (this.isAudio) {
      if (this.curBGAudio) {
        this.deactiveBackground(this.curBGAudio, FrameData.AUDIO);
      }
    }

    else {
      if (this.curFrame) {
        this.deleteFrame();
      }
    }

    //if (this.isBackground) {
    //  if (this.curBG) {
    //    replace = this.curBG.next();
    //    replace = replace.length ? replace : this.curBG.prev();

    //    this.deactiveBackground(this.curBG, FrameData.IMAGE);

    //    if (replace.length) {
    //      this.activeBackground(replace, FrameData.IMAGE);
    //    }
        
    //  }
    //}
  };

  VideoClip.prototype.addFrameAt = function(content, pos, itemId, itemUrl, itemSrc) {

    //litmitation
    pos = pos < 0 ? 0 : pos;
    pos = pos > this.arrFrame.length - 1 ? this.arrFrame.length - 1 : pos;

    var target = $(content).find('.list-frame .frame').length ? $(content).find('.list-frame .frame')[pos] : null;

    var frameData = new FrameData();
    frameData.type = FrameData.IMAGE;
    frameData.bitmapId = itemId;
    frameData.bitmapUrl = itemUrl;

    var frame = this.addEmptyFrame(frameData);
    frame.find('.thumb img').attr('src', itemSrc);

    if (target) {
      frame.insertAfter($(target));
    }

    frame.click();

    this.updateTime();
    this.updateBackgroundAudio();
    this.updateScroll();
  };

  VideoClip.prototype.addEmptyFrame = function(frameData) {
    var that = this;

    if (!frameData)  {
      frameData = new FrameData();
    }
    this.arrFrame.push(frameData);

    var listframe =  $('.vc-frames').find('.list-frame');
    
    var frame_image = frameData && frameData.bitmapUrl != null ? frameData.bitmapUrl : 'images/videoclip/default.jpg';
    var frame_text = frameData && frameData.text.text != '' ? frameData.text.text : 'text here';

    var strFrame = frameTpl;
    strFrame = strFrame.replace('{frame_image}', frame_image);
    strFrame = strFrame.replace('{frame_text}', frame_text);

    var frame =  $(strFrame);
    listframe.append(frame);

    //update time
    var totalTime = EffectUtils.getTimeByFrame(this.arrFrame, this.arrFrame.length - 1);
    
    var strTime = timeTpl;
    strTime = strTime.replace('{time}', EffectUtils.formatTime(totalTime));
    
    var timelap = $('.timelap').find('ul');
    timelap.append($(strTime));
  
    this.updateTime();
    this.updateBackgroundAudio();
    this.updateScroll();
    
    //add frame events
    this.addFrameEvents(frame[0]);

    frame.on('click', function(evt) {
      var target = $(evt.target);
      
      if(target.hasClass('fa-exchange') || target.hasClass('icon-effect')) {
        that.showPanel(PANEL_EFFECT);
        that.activeFrame(frame);
      }

      else if(target.hasClass('fa-sort-desc') || target.hasClass('icon-show')) {
        $('.dropdown-menu').show(); 

        var wh = $(window).height();
        var top = evt.pageY;

        if (top - document.body.scrollTop + $('.dropdown-menu').height() > wh) {
          top = wh - $('.dropdown-menu').height() + document.body.scrollTop - 20;
        }
        var dropdown =  $('.dropdown-menu');

        dropdown.offset({
          left: evt.pageX,
          top: top
        });
        evt.stopImmediatePropagation();

        $(document).click(function(evt) {
          if ($(evt.target).closest('.dropdown-menu').length == 0) {
            dropdown.hide();
            $(document).off();
          }
        });  

        that.activeFrame(frame);
      }
      
      else if(target.hasClass('frame-image')) {
        that.showPanel(PANEL_IMAGE);
        that.activeFrame(frame);
      }

      else if(target.hasClass('video')) {
        that.showPanel(PANEL_VIDEO);
        that.activeFrame(frame);
      }

      else if(target.hasClass('frame-text')) {
        that.showPanel(PANEL_TEXT);
        that.activeFrame(frame);
      }

      else if(target.hasClass('fa-headphones')) {
        that.showPanel(PANEL_AUDIO);
        that.activeFrame(frame);
      }

      else if(target.hasClass('icon-edit-text')) {
        var index = frame.index();
        if (that.arrFrame[index].text.text != '') {
          that.showPanel(PANEL_TEXT_EFFECT);
        } else {
          that.showPanel(PANEL_TEXT);
        }
        that.activeFrame(frame);
      } 

      else {

        that.showPanel(PANEL_IMAGE);
        that.activeFrame(frame);

        var tab = $('#vc-add-image').find('a[href="#vc-image-library"]');
        tab.click();
      }
    });
    
    if (frameData.type == FrameData.VIDEO) {
      frame.find('.thumb').addClass('video');
    }

    if (!frameData.bitmapId) {
      frame.find('.icon-effect').hide();
    }

    if (!frameData.audioId) {
      frame.find('.icon-audio').hide();
    }
    
    return frame;
  };

  VideoClip.prototype.addDragEvent = function(item) {
    var that = this;

    var itemId = $(item).data('item-id');
    var itemSrc = $(item).find('.thumb img').attr('src');
    var itemUrl = $(item).data('item-url');

    item.setAttribute('draggable', 'true');
    
    item.addEventListener('dragstart', function(evt) { 
      that.dragSource = 'I';

      evt.dataTransfer.setData('itemId', itemId);
      evt.dataTransfer.setData('itemSrc', itemSrc);
      evt.dataTransfer.setData('itemUrl', itemUrl);

    }, false);
   
    item.addEventListener('drop', function(evt) { 
      that.dragSource = null;
    }, false);
    
    item.addEventListener('dragend', function(evt) { 
      that.dragSource = null;
    }, false);
  };

  VideoClip.prototype.addFrameEvents = function(frame) {
    var that = this;
    frame.setAttribute('draggable', 'true');
    frame.addEventListener('dragstart', function(evt) { that.handleDragStart(evt); }, false);
    frame.addEventListener('dragenter', function(evt) { that.handleDragEnter(evt); }, false);
    frame.addEventListener('dragover', function(evt) { that.handleDragOver(evt); }, false);
    frame.addEventListener('dragleave', function(evt) { that.handleDragLeave(evt); }, false);
    frame.addEventListener('drop', function(evt) { that.handleDrop(evt); }, false);
    frame.addEventListener('dragend', function(evt) { that.handleDragEnd(evt); }, false);
  };

  VideoClip.prototype.handleDragStart = function(evt) {
    var frame = $( evt.target).closest( ".frame" );

    evt.dataTransfer.setData('text/html', frame.innerHTML);
    this.dragSource = 'F';

    this.activeFrame(frame);

    frame.css('opacity', 0.4).addClass('moving');
  };

  VideoClip.prototype.handleDragOver = function(evt) {
    if (evt.preventDefault) {
      evt.preventDefault();
    }
    return false;
  };

  VideoClip.prototype.handleDragEnter = function(evt) {
    var target = $( evt.target).closest( ".frame" );    

    if (!target.hasClass('moving') && this.dragSource == 'F') {
      //target.addClass('active');
    }
  };

  VideoClip.prototype.handleDragLeave = function(evt) {
    var target = $( evt.target).closest( ".frame" );

    if (this.dragSource == 'F') {
      //target.removeClass('active');
    }
  };

  VideoClip.prototype.handleDrop = function(evt) {
    if (evt.stopPropagation) {
      evt.stopPropagation();
    }

    if (this.dragSource == 'F') {
      evt.dataTransfer.setData('text/html', '');
      
      var target = $( evt.target).closest( ".frame" );

      if (this.curFrame != target && this.dragSource == 'F') {

        //swap frame data
        var temp = this.arrFrame[target.index()];
        this.arrFrame[target.index()] = this.arrFrame[this.curFrame.index()];
        this.arrFrame[this.curFrame.index()] = temp;

        //swap frame item
        var prev = this.curFrame.prev();

        if (prev.length) {
          if (target.index() == this.curFrame.index() - 1) {
            target.insertAfter(this.curFrame);
          } else {
            this.curFrame.insertAfter(target);
            target.insertAfter(prev);
          }
        } else {
            var next = this.curFrame.next();
            this.curFrame.insertAfter(target);
            target.insertBefore(next);
        }

        target.removeClass('active');
        this.activeFrame(this.curFrame);

        this.updateTime();
        this.updateBackgroundAudio();
        this.updateScroll();
      }
    }

    else if (this.dragSource == 'I') {
      var itemId = evt.dataTransfer.getData('itemId');
      var itemSrc = evt.dataTransfer.getData('itemSrc');
      var itemUrl = evt.dataTransfer.getData('itemUrl');

      var frame = $( evt.target).closest( ".frame" );
      var index = frame.index();

      var frameData = this.arrFrame[index];
      frameData.type = FrameData.IMAGE;
      frameData.bitmapId = itemId;
      frameData.bitmapUrl = itemUrl;

      frameData.videoId = null;
      frameData.videoUrl = null;
      
      frame.find('.thumb img').attr('src', itemSrc);
      frame.click();
    }

    this.dragSource = null;

    return false;
  };

  VideoClip.prototype.handleDragEnd = function(evt) {
   var target = $(evt.target).closest( ".frame" );
    target.css('opacity', 1).removeClass('moving');
    this.dragSource = null;
  };

  VideoClip.prototype.deactiveFrame = function() {
    if (this.curFrame) {
      this.curFrame.removeClass('active');
      this.curFrame = null;
    }
  };

  VideoClip.prototype.activeFrame = function(frame) {

    if (this.curFrame) {
      this.curFrame.removeClass('active');
    }

    this.curFrame = $(frame);
    this.curFrame.addClass('active');

    this.curFrameIndex = this.curFrame.index();

    this.showCurrentFrameVideo();
  };

  VideoClip.prototype.duplicateFrame = function() {
    var frameData = this.arrFrame[this.curFrameIndex].clone();
    
    var frame = this.addEmptyFrame(frameData);
    frame.find('.thumb img').attr('src', this.curFrame.find('.thumb img').attr('src'));
    frame.insertAfter(this.curFrame);

    this.activeFrame(frame);

    this.updateTime();
    this.updateBackgroundAudio();
    this.updateScroll();
  };

  VideoClip.prototype.deleteFrame = function() {
  
    //find next or prev frame
    var frame = this.curFrame.next();
    frame = frame.length ? frame[0] : null;

    if (frame == null) {
      frame = this.curFrame.prev();
      frame = frame.length ? frame[0] : null;
    }

    //delete current frame
    this.curFrame.remove();
    this.arrFrame.splice(this.curFrameIndex, 1);

    //delete the corresponding time
    $( ".timelap" ).find('ul li').last().remove();
    
    this.updateTime();
    this.updateBackgroundAudio();
    this.updateScroll();

    //active next or prev frame 
    if (frame) {
      this.activeFrame(frame);
    } else {
      this.curFrame = null;
      this.curFrameIndex = -1;

      //remove image
      this.bitmapContainer.visible = true;
      this.bitmapContainer.removeAllChildren();

      if (this.frameText) {
        this.frameText.text = '';
      }

      this.clearAudio();

      this.clearVideo();
    
      this.displayOnlyMenu(true, PANEL_INTRO);
    }
  };

  VideoClip.prototype.updateScroll = function() {
    
    var frameTime = 0;
    for (var i =  0; i < this.arrFrame.length; i ++) {
      frameTime += this.arrFrame[i].getDuration();
    }

    var audioTime = 0;
    for (var i =  0; i < this.arrBGAudio.length; i ++) {
      audioTime += this.arrBGAudio[i].getTime();
    }

    var frameWidth = 20 + frameTime * 15 + $('.vc-frames').find('.add-more-effect').outerWidth(true) + 65;
    var audioWidth = 20 + audioTime * 15 + $('.vc-audios').find('.add-more').outerWidth(true) + 65;
 
    var newWidth = Math.max($('.tfooter').width() - (97 - 20 - 2), frameWidth);
    
    $('.timelap').css({width: newWidth + 'px'});

    newWidth = Math.max(newWidth, audioWidth);

    var wrapList = $('.list-frame').closest('.add-function-block .wrap-list');

    //if(newWidth > wrapList.width()){
      wrapList.css({
        width: newWidth + 'px'
      });
      
      var jsp = $('.add-function-block').data('jsp');
      if (jsp) {
        jsp.destroy();
      }

      $('.add-function-block').jScrollPane({ autoReinitialise: true });

      jsp = $('.add-function-block').data('jsp');
      
      jsp.scrollTo(newWidth, 0);
    
    //} else {
    //  wrapList.css({
    //    width: $('.add-function-block .wrap-list .item').width()
    //  });
    //}  
  };

  VideoClip.prototype.updateTime = function() {
    
    var timelap = $('.timelap').find('ul li');
    var frameTime = 0;
    var totalTime = 0;

    for (var i =  0; i < timelap.length; i ++) {
      frameTime = this.arrFrame[i].getDuration();
      $(timelap[i]).css('width', frameTime * 15);
      
      totalTime += this.arrFrame[i].getDuration();
      $(timelap[i]).find('span').html(EffectUtils.formatTime(totalTime));
    }

    var listFrame = $('.list-frame').find('.frame');
    for (i =  0; i < listFrame.length; i ++) {
      frameTime = this.arrFrame[i].getDuration();
      $(listFrame[i]).css('width', frameTime * 15);
    }
  };

  VideoClip.prototype.selectFrameData = function(item, type) {
    
    this.clearVideo();
    this.clearAudio();
    this.previewVC.clear();
    
    var itemId = $(item).data('item-id');
    var itemSrc = $(item).find('.thumb img').attr('src');
    var itemUrl = $(item).data('item-url');

    //background data
    /*
    if (this.isBackground && type == FrameData.IMAGE) {

      if (this.curFrameImage) {
        this.curFrameImage.removeClass('active');
        this.curFrameImage = null;
      }

      if (this.curBGIndex < 0 || this.curBGIndex >= this.arrBG.length) {
        return;
      }

      var bgData = this.arrBG[this.curBGIndex];
      if (bgData.id == itemId) {
        bgData.id = null;
        bgData.url = null;

        this.curBG.find('.img-add img').attr('src', '');

        this.bgContainer.removeAllChildren();
        this.bgBitmap = null;
      }

      else {
        bgData.id = itemId;
        bgData.url = itemUrl;
        
        this.curFrameImage =  $(item);
        this.curFrameImage.addClass('active');

        //load image here
        this.curBG.find('.img-add img').attr('src', itemSrc);

        this.loadBackgroundImage(itemUrl);
      }

      //update box here
      this.curBG.find('.img-add img').attr('src', bgData.url);
      this.curBG.find('.time').html(EffectUtils.formatTime(bgData.time));
      
      return;
    }
    */

    //frame data
    if (this.curFrameIndex < 0 || this.curFrameIndex >= this.arrFrame.length) {
      return;
    }

    //reset current imag or video
    if (this.curFrameImage) {
      this.curFrameImage.removeClass('active');
      this.curFrameImage = null;
    }

    if (this.curFrameVideo) {
      this.curFrameVideo.removeClass('active');
      this.curFrameVideo = null;
    }

    var frameData = this.arrFrame[this.curFrameIndex];
    frameData.type = type;

    if (frameData.bitmapId == itemId) {
      this.curFrame.find('.thumb img').attr('src', 'images/videoclip/default.jpg');
      this.curFrame.find('.icon-effect').hide();

      if (this.curFrameEffect) {
        this.curFrameEffect.removeClass('active');
        this.curFrameEffect = null;
      }

      frameData.bitmapId = null;
      frameData.bitmapUrl = null;
      frameData.type = null;
      this.curFrameImage = null;
      this.bitmapContainer.removeAllChildren();
      this.bgContainer.visible = frameData.type != FrameData.VIDEO ? true : false;
      return;
    }

    if (frameData.videoId == itemId) {
      this.curFrame.find('.thumb img').attr('src', 'images/videoclip/default.jpg');
      this.curFrame.find('.thumb').removeClass('video');
      frameData.videoId = null;
      frameData.videoUrl = null;
      frameData.type = null;
      this.curFrameVideo = null;
      this.clearVideo();
      this.mediaSetting.hide();
      this.bgContainer.visible = frameData.type != FrameData.VIDEO ? true : false;
      return;
    }

    //set new image or video
    if (type == FrameData.IMAGE) {
      this.curFrameImage = $(item);
      this.curFrameImage.addClass('active');
    } else {
      this.curFrameVideo = $(item);
      this.curFrameVideo.addClass('active');

      //remove bitmap effect
    }

    //apply data here
    if (this.curFrame) {
      this.curFrame.find('.thumb img').attr('src', itemSrc);
      
      if (type == FrameData.IMAGE) {
        this.curFrame.find('.thumb').removeClass('video');
      } else {
        this.curFrame.find('.thumb').addClass('video');
      }

      this.bitmapContainer.removeAllChildren();
      this.clearVideo();
      this.bgContainer.visible = frameData.type != FrameData.VIDEO ? true : false;

      //update image
      if (type == FrameData.IMAGE) {
        frameData.bitmapId = itemId;
        frameData.bitmapUrl = itemUrl;

        frameData.videoId = null;
        frameData.videoUrl = null;
        
        //show current bitmap effect edit
        var bitmapEffect = $('#vc-add-effect').find('div[data-item-id="'+ frameData.bitmapEffect + '"]');
        if (bitmapEffect.length) {
          this.curFrameEffect = $(bitmapEffect[0]);
          this.curFrameEffect.addClass('active');
        }

        this.curFrame.find('.icon-effect').show();
        
        this.mediaSetting.hide();
        this.loadFrameImage(frameData.bitmapUrl);
      } 

      else {
        //update video
        frameData.videoId = itemId;
        frameData.videoUrl = itemUrl;

        frameData.videoStart = 0;
        frameData.duration = frameData.videoEnd = $(item).data('item-time');;

        frameData.bitmapId = null;
        frameData.bitmapUrl = null;

        if (this.curFrameEffect) {
          this.curFrameEffect.removeClass('active');
          this.curFrameEffect = null;
        }
          
        this.curFrame.find('.icon-effect').hide();

        this.loadFrameVideo(frameData.videoUrl);

        this.updateTime();
        this.updateScroll();
      }
    }
  };

  VideoClip.prototype.applyFrameText = function() {
    if (this.curFrameIndex < 0 || this.curFrameIndex >= this.arrFrame.length) {
      return;
    }

    var frameData = this.arrFrame[this.curFrameIndex];

    if (!this.frameText) {
      this.frameText = new createjs.Text("Text", "20px Arial", "#ff7700");
    }
    this.textContainer.removeAllChildren();
    this.textContainer.addChild(this.frameText);

    var textarea = $('#vc-add-text').find('textarea[name="frametext"]');
    frameData.text.text = this.frameText.text = textarea.val();

    var str = frameData.text.text;
    str = str.substr(0, 12);
    if (str.lastIndexOf(" ") != -1) {
      str = str.substr(0, str.lastIndexOf(" "));
    }
    str = str + (frameData.text.text.length > 12 ? "..." : "");
    this.curFrame.find('.frame-text').html($.trim(str) != '' ? str : 'text here');

    var size = $('#vc-add-text').find('input[name="textsize"]');
    frameData.text.size = size = Number(size.val());

    var font = $('#vc-add-text').find('.custom-select .text-val').data('val');
    frameData.text.font = font;
    frameData.text.fontName = $('#vc-add-text').find('.custom-select .text-val').html();
    
    var style = this.curFrameStyle ? this.curFrameStyle.data('style') : "";
    frameData.text.style = style;

    this.frameText.font = style + ' ' + size + 'px ' + font;

    var color = $('#vc-add-text').find('input[name="textcolor"]');
    frameData.text.color = this.frameText.color = color.val();

    var padding = $('#vc-add-text').find('input[name="textpadding"]');
    frameData.text.padding = padding = Number(padding.val());

    if (this.curFrameHAlign) {
      var halign = this.curFrameHAlign.data('align');
      this.frameText.textAlign = halign;
      frameData.text.halign = halign;

      if (halign == TextData.HA_LEFT) {
        this.frameText.x = padding;
      }
      else if (halign == TextData.HA_CENTER) {
        this.frameText.x = this.textContainer.VC_WIDTH/2;
      }
      else if (halign == TextData.HA_RIGHT) {
        this.frameText.x = this.textContainer.VC_WIDTH - padding;
      }
    }

    if (this.curFrameVAlign) {
      var valign = this.curFrameVAlign.data('align');
      frameData.text.valign = valign;

      var textHeight = this.frameText.getBounds() ? this.frameText.getBounds().height : 0;
      if (valign == TextData.VA_TOP) {
        this.frameText.y = padding;
      }
      else if (valign == TextData.VA_MIDDLE) {
        this.frameText.y = this.textContainer.VC_HEIGHT/2 - textHeight/2;
      }
      else if (valign == TextData.VA_BOTTOM) {
        this.frameText.y = this.textContainer.VC_HEIGHT - textHeight - padding;
      }
    }
  };

  VideoClip.prototype.selectFrameTextEffect = function(item) {
    if (this.curFrameText) {
      this.curFrameText.removeClass('active');
    }
    this.curFrameText = $(item);
    this.curFrameText.addClass('active');

    if (this.curFrame) {
      //apply data here
      var frameData = this.arrFrame[this.curFrameIndex];
      frameData.textEffect = this.curFrameText.data('item-id');
      frameData.textEffectClass = this.curFrameText.data('item-url');

      //this.effectSetting.find('input[name="delay"]').val(frameData.textEffectDelay);
      this.effectSetting.find('input[name="time"]').val(frameData.textEffectDuration);
      this.effectSetting.find('input[name="next"]').val(frameData.textNextTime);

      this.effectSetting.show();
    }
  }; 

  VideoClip.prototype.selectFrameImageEffect = function(item) {

    if (this.curFrameIndex < 0 || this.curFrameIndex >= this.arrFrame.length) {
      return;
    }

    this.clearAudio();

    var frameData = this.arrFrame[this.curFrameIndex]; 
    if (frameData.type == FrameData.IMAGE) {

      if (this.curFrameEffect) {
        this.curFrameEffect.removeClass('active');
      }
      this.curFrameEffect = $(item);
      this.curFrameEffect.addClass('active');
      
      //apply data here
      frameData.bitmapEffect = this.curFrameEffect.data('item-id');
      frameData.bitmapEffectClass = this.curFrameEffect.data('item-url');
          
      //this.effectSetting.find('input[name="delay"]').val(frameData.bitmapEffectDelay);
      this.effectSetting.find('input[name="time"]').val(frameData.bitmapEffectDuration);
      this.effectSetting.find('input[name="next"]').val(frameData.bitmapNextTime);

      this.effectSetting.show();
    }
  };

  VideoClip.prototype.applyEffect = function() {
    if (this.curFrameIndex < 0 || this.curFrameIndex >= this.arrFrame.length) {
      return;
    }
    var that = this;

    var delayTime = 0;//this.effectSetting.find('input[name="delay"]').val();
    var effectTime = this.effectSetting.find('input[name="time"]').val();
    var nextTime = this.effectSetting.find('input[name="next"]').val();

    //delayTime = Number(delayTime);
    //delayTime = delayTime < 0 ? 0 : delayTime;

    effectTime = Number(effectTime);
    effectTime = effectTime < 3 ? 3 : effectTime;
    
    nextTime = Number(nextTime);
    nextTime = nextTime < 3 ? 3 : nextTime;

    this.effectSetting.find('input[name="time"]').val(effectTime);
    this.effectSetting.find('input[name="next"]').val(nextTime);

    var frameData = this.arrFrame[this.curFrameIndex];
    var prevData = this.curFrameIndex <= 0 ? null : this.arrFrame[this.curFrameIndex - 1];

    //bitmap effect
    if ($('#vc-add-effect').hasClass('active')) {
      frameData.bitmapEffectDelay = delayTime;
      frameData.bitmapEffectDuration = effectTime;
      frameData.bitmapNextTime = nextTime;

      //preview bitmap effect
      var bitmapEffectPlugin = EffectUtils.getEffectPlugin(frameData.bitmapEffect);
      if (bitmapEffectPlugin) {
        this.bitmapContainer.removeAllChildren();
        bitmapEffectPlugin.play(this.bitmapContainer, prevData ? prevData.bitmapView : null, this.frameBitmap, delayTime, effectTime);
      }
    } 

    else {
      //text effect
      frameData.textEffectDelay = delayTime;
      frameData.textEffectDuration = effectTime;
      frameData.textNextTime = nextTime;

      $('#vc-add-text').find('.effect-detail').html(frameData.textEffect + "(delay: " + frameData.textEffectDelay + ", time: " + frameData.textEffectDuration + ")");
      
      //preview text effect
      var textEffectPlugin = EffectUtils.getEffectPlugin(frameData.textEffect);
      if (textEffectPlugin) {
        this.textContainer.removeAllChildren();
        textEffectPlugin.play(this.textContainer, prevData ? prevData.textView : null, frameData);
      }
    }

    this.updateTime();
    this.updateBackgroundAudio();
    this.updateScroll();

    //hide effect setting when preview and save selection
    this.effectSetting.hide();

    this.effectTimeoutId = setTimeout(function() {
      clearTimeout(that.effectTimeoutId);
      that.effectSetting.show();
    }, (delayTime + effectTime) * 1000);
  };

  VideoClip.prototype.selectAudio = function(item) {
    var that = this;
    var itemId = $(item).data('item-id');
    var itemUrl = $(item).data('item-url');
    var audioData;

    if (!this.isAudio) {
      that.deactiveFrame();
      this.displayOnlyMenu(PANEL_AUDIO);

      audioData = new AudioData();
      audioData.id = itemId;
      audioData.url = itemUrl;
      audioData.start = 0;
      audioData.end = -1;
      audioData.time = $(item).data('item-time');
      audioData.title = $(item).find('.title strong').html();
      
      this.addBackgroundAudio(audioData, true);
      this.isAudio = true;
      return;
    }
    
    if (this.curFrameAudio) {
      this.curFrameAudio.removeClass('active');
      this.curFrameAudio.find('.add-more span').removeClass('fa fa-minus').addClass('fa fa-plus');
      this.curFrameAudio = null;
    }

    if (this.curBGAudioIndex < 0 || this.curBGAudioIndex >= this.arrBGAudio.length) {
      return;
    }

    var audioData = this.arrBGAudio[this.curBGAudioIndex];

    if (audioData.id == itemId) {
      audioData.id = null;
      audioData.url = null;
      audioData.start = 0;
      audioData.end = -1;
      audioData.time = 8;
      audioData.title = AUDIO_UNTITLE;

      that.loading.hide();
      this.mediaSetting.hide();
      this.clearAudio();
    }

    else {
      audioData.id = itemId;
      audioData.url = itemUrl;
      audioData.start = 0;
      audioData.end = $(item).data('item-time');
      audioData.time = $(item).data('item-time');
      audioData.title = $(item).find('.title strong').html();

      this.curFrameAudio =  $(item);
      this.curFrameAudio.addClass('active');
      this.curFrameAudio.find('.add-more span').removeClass('fa fa-plus').addClass('fa fa-minus');

      this.mediaSetting.hide();
      this.loadFrameAudio(audioData);
    }

    //update box here
    this.curBGAudio.find('.title strong').html(audioData.title);
    this.curBGAudio.find('.time').html(audioData.end == -1 ? EffectUtils.formatTime(audioData.time) : EffectUtils.formatTime(audioData.end - audioData.start));

    this.updateBackgroundAudio();
    this.updateScroll();

    /*
    //select audio for frame
    if (this.curFrameIndex < 0 || this.curFrameIndex >= this.arrFrame.length) {
      return;
    }

    //remove current active
    if (this.curFrameAudio) {
      this.curFrameAudio.removeClass('active');
      this.curFrameAudio.find('.add-more span').removeClass('fa fa-minus').addClass('fa fa-plus');
      this.curFrameAudio = null;
    }

    //if click on active item, then remove audio 
    var frameData = this.arrFrame[this.curFrameIndex];
    if (frameData.audioId == itemId) {
      frameData.audioId = null;
      frameData.audioUrl = null;
      this.curFrame.find('.icon-audio').hide();
      this.clearAudio();
      this.mediaSetting.hide();
      return;
    }
    
    this.curFrameAudio =  $(item);
    this.curFrameAudio.addClass('active');
    this.curFrameAudio.find('.add-more span').removeClass('fa fa-plus').addClass('fa fa-minus');
    this.curFrame.find('.icon-audio').show();

    frameData.audioId = itemId;
    frameData.audioUrl = itemUrl;

    this.clearVideo();

    this.loadFrameAudio(itemId, itemUrl);
    */
  };

  VideoClip.prototype.onClickPlayPauseHandler = function(item) {
    item = $(item);
    var icon = item.find('span');
    
    if (icon.hasClass('fa-pause')) {
      icon.removeClass('fa-pause').addClass('fa-play');

      if (this.audioInstance) {
        this.audioInstance.resumeTime = this.audioInstance.position/1000;
        this.audioInstance.stop();
      } else {
        this.videoInstance.pause();
      }
    }
    else if (icon.hasClass('fa-play')) {
      icon.removeClass('fa-play').addClass('fa-pause');
      if (this.audioInstance) {
        this.audioInstance.position = this.audioInstance.resumeTime * 1000;
        this.audioInstance.play();
      } else {
        this.videoInstance.play();
      }
    }
  };

  VideoClip.prototype.updateAudioData = function(isStart, position) {
    if (this.isAudio) {
      var audioData = this.arrBGAudio[this.curBGAudioIndex];

      if (isStart) {
        audioData.start = position;
      } else {
        audioData.end = position;
      }
    } 

    else {
      var frameData = this.arrFrame[this.curFrameIndex];
      if (isStart) {
        if (this.audioInstance) {
          //frameData.audioStart = position;
        } else {
          frameData.videoStart = position;
          frameData.duration = frameData.videoEnd - frameData.videoStart;
        }  
      } else {
        if (this.audioInstance) {
          //frameData.audioEnd = position;
        } else {
          frameData.videoEnd = position;
          frameData.duration = frameData.videoEnd - frameData.videoStart;
        }
      }
    }
  };

  VideoClip.prototype.updateMedia = function(position) {
    this.mediaSetting.find('.position').html(EffectUtils.formatTime(position));
  };

  VideoClip.prototype.seekMedia = function(startTime) {

    this.mediaSetting.find('.play-pause').find('span').removeClass('fa-play').addClass('fa-pause');

    //background audio
    if (this.isAudio) {
      if (this.curBGAudioIndex < 0 || this.curBGAudioIndex >= this.arrBGAudio.length) {
        return;
      }
      var audioData = this.arrBGAudio[this.curBGAudioIndex];
      audioData.start = startTime;

      if (this.audioInstance) {
        this.audioInstance.position = startTime * 1000;
        this.audioInstance.play();
      }

      return;
    }

    //frame data audio
    if (this.curFrameIndex < 0 || this.curFrameIndex >= this.arrFrame.length) {
      return;
    }
    var frameData = this.arrFrame[this.curFrameIndex];

    //if (this.audioInstance) {
    //  frameData.audioStart = startTime;
    //  this.audioInstance.position = startTime * 1000;
    //  this.audioInstance.play();
    //}

    if (this.videoInstance) {
      frameData.videoStart = startTime;
      this.videoInstance.currentTime = startTime;
      this.videoInstance.play();
    }
  };

  VideoClip.prototype.endMedia = function() {
    this.mediaSetting.find('.play-pause').find('span').removeClass('fa-pause').addClass('fa-play');
  };

  VideoClip.prototype.changePanel = function(id) {
    var name = id.substr(id.lastIndexOf('-') + 1, id.length);

    var arrPanel = [PANEL_TEXT, PANEL_IMAGE, PANEL_VIDEO, PANEL_EFFECT, PANEL_AUDIO];
    var index = arrPanel.indexOf(name);

    this.showPanel(arrPanel[index]);
  };

  VideoClip.prototype.showPanel = function(name) {
    this.curPanel = name;

    $('.control-menu').find('li').removeClass('disabled');

    //active menu    
    if ($('#vc-menu-' + name).length) {
      $('.control-menu').find('li').removeClass('active');
      $('#vc-menu-' + name).addClass('active');
    }

    //hide all content
    $('.block-tab-video').removeClass('active').hide();

    //show corresponding content
    var content = $('#vc-add-' + name);
    content.addClass('active').show();

    var jsp = content.children('[data-scroll-video]').data('jsp');
    if (jsp) {
      jsp.destroy();
    }

    content.children('[data-scroll-video]').jScrollPane({
      autoReinitialise: true
    });

    //hide or show effect setting
    if ((name == PANEL_EFFECT && this.arrFrame[this.curFrameIndex].type == FrameData.IMAGE) ||
       (name == PANEL_TEXT_EFFECT)) {

      var frameData = this.arrFrame[this.curFrameIndex];
        
      if (name == PANEL_TEXT_EFFECT) {
        //this.effectSetting.find('input[name="delay"]').val(frameData.textEffectDelay);
        this.effectSetting.find('input[name="time"]').val(frameData.textEffectDuration);
        this.effectSetting.find('input[name="next"]').val(frameData.textNextTime);        
      } else if (name == PANEL_EFFECT) {
        //this.effectSetting.find('input[name="delay"]').val(frameData.bitmapEffectDelay);
        this.effectSetting.find('input[name="time"]').val(frameData.bitmapEffectDuration);
        this.effectSetting.find('input[name="next"]').val(frameData.bitmapNextTime);
      }

      this.effectSetting.show();
    } else {
      this.effectSetting.hide();
    }

    //hide media setting
    //if (name == PANEL_VIDEO) {
    //  this.mediaSetting.show();
    //} else {
      //this.mediaSetting.hide();
    //}
  };

  VideoClip.prototype.displayOnlyMenu = function(disabled, name) {
    
    if (disabled) {
      $('.control-menu').find('li').addClass('disabled');
    } else {
      $('.control-menu').find('li').removeClass('disabled');
    }

    //deactive all menu
    $('.control-menu').find('li').removeClass('active');
    this.effectSetting.hide();
    this.mediaSetting.hide();

    //stop all sounds
    this.clearAudio();

    //stop all videos
    this.clearVideo();

    this.loading.hide();

      //active menu
    if ($('#vc-menu-' + name).length) {
      $('#vc-menu-' + name).addClass('active');
    }

    //hide all content
    $('.block-tab-video').removeClass('active').hide();

    //show corresponding content
    var content = $('#vc-add-' + name);
    content.addClass('active').show();

    var jsp = content.children('[data-scroll-video]').data('jsp');
    if (jsp) {
      jsp.destroy();
    }

    content.children('[data-scroll-video]').jScrollPane({
      autoReinitialise: true
    });
  };

  VideoClip.prototype.showCurrentFrameVideo = function() {
    if (this.curFrameIndex < 0 || this.curFrameIndex >= this.arrFrame.length) {
      return;
    }

    this.isAudio = false;
    if (this.curBGAudio) {
      this.curBGAudio.removeClass('active');
      this.curBGAudio = null;
    }

    if(this.curFrameAudio) {
      this.curFrameAudio.removeClass('active');
      this.curFrameAudio.find('.add-more span').removeClass('fa fa-minus').addClass('fa fa-plus');
      this.curFrameAudio = null;
    }

    //this.isBackground = false;
    //if (this.curBG) {
    //  this.curBG.removeClass('active');
    //  this.curBG = null;
    //}

    this.previewVC.clear();
    
    //reset all currrent
    this.curFrameImage = null;
    $('#vc-image-library').find('div[data-item-id]').removeClass('active');
    $('#vc-image-yours').find('div[data-item-id]').removeClass('active');
    
    this.curFrameEffect = null;
    $('#vc-add-effect').find('div[data-item-id]').removeClass('active');

    this.curFrameText = null;
    $('#vc-add-texteffect').find('div[data-item-id]').removeClass('active');

    this.curFrameVideo = null;
    $('#vc-video-library').find('div[data-item-id]').removeClass('active');
    $('#vc-video-yours').find('div[data-item-id]').removeClass('active');

    //this.curFrameAudio = null;
    //$('#vc-audio-library').find('div[data-item-id]').removeClass('active');
    //$('#vc-audio-yours').find('div[data-item-id]').removeClass('active');

    //stop all sounds
    this.clearAudio();

    this.mediaSetting.hide();

    //remove image
    this.bitmapContainer.visible = true;
    this.bitmapContainer.removeAllChildren();
    
    if (this.frameText) {
      this.frameText.text = '';
    }
    this.textContainer.visible = true;
    
    //stop all videos
    this.clearVideo();

    //get current FrameData
    var frameData = this.arrFrame[this.curFrameIndex];

    //show current text edit
    var panelText = $('#vc-add-text');
    panelText.find('textarea[name="frametext"]').val(frameData.text.text);
    panelText.find('.custom-select .text-val').data('val', frameData.text.font);
    panelText.find('.custom-select .text-val').html(frameData.text.fontName);

    panelText.find('.fontstyle').find('li[data-style]').removeClass('actived');
    panelText.find('.halign').find('li[data-align]').removeClass('actived');
    panelText.find('.valign').find('li[data-align]').removeClass('actived');
    
    this.curFrameStyle = panelText.find('.fontstyle').find('li[data-style="' + frameData.text.style + '"]');
    this.curFrameStyle.addClass('actived');

    this.curFrameHAlign = panelText.find('.halign').find('li[data-align="' + frameData.text.halign + '"]');
    this.curFrameHAlign.addClass('actived');

    this.curFrameVAlign = panelText.find('.valign').find('li[data-align="' + frameData.text.valign + '"]');
    this.curFrameVAlign.addClass('actived');

    panelText.find('input[name="textpadding"]').val(frameData.text.padding);
    panelText.find('input[name="textsize"]').val(frameData.text.size);
    panelText.find('input[name="textcolor"]').val(frameData.text.color);
    panelText.find('input[name="textcolor"]').spectrum("set", frameData.text.color);

    this.applyFrameText();

    //show current background
    this.bgContainer.visible = frameData.type != FrameData.VIDEO ? true : false;
    this.bgContainer.removeAllChildren();
    if (this.bgContainer.visible) {
      var frameTime = EffectUtils.getTimeByFrame(this.arrFrame, this.curFrame.index());
      var bgData = EffectUtils.getBackgroundDataByTime(this.arrBG, frameTime);
      if (bgData && bgData.url) {
        this.loadBackgroundImage(bgData.url);
      }
    }

    //show current image edit
    if (frameData.type == FrameData.IMAGE) {
      var itemImage = $('#vc-image-library').find('div[data-item-id="'+ frameData.bitmapId + '"]');
      if (!itemImage.length) {
        itemImage = $('#vc-image-yours').find('div[data-item-id="'+ frameData.bitmapId + '"]');
      }
      if (itemImage.length) {
        this.curFrameImage = $(itemImage[0]);
        this.curFrameImage.addClass('active');

        //load frame image
        if (frameData.bitmapUrl) {
          this.loadFrameImage(frameData.bitmapUrl);
        }
      }
    }

    //show current video edit
    if (frameData.type == FrameData.VIDEO) {
      
      var itemVideo = $('#vc-video-library').find('div[data-item-id="'+ frameData.videoId + '"]');
      if (!itemVideo.length) {
        itemVideo = $('#vc-video-yours').find('div[data-item-id="'+ frameData.videoId + '"]');
      }
      if (itemVideo.length) {
        this.curFrameVideo = $(itemVideo[0]);
        this.curFrameVideo.addClass('active');

        //load frame video
        if (frameData.videoUrl) {
          this.loadFrameVideo(frameData.videoUrl);

          if (this.curPanel == PANEL_TEXT_EFFECT) {
            this.mediaSetting.hide();
          }
        }
      }
    }

    //show current text effect edit
    var textEffect = $('#vc-add-texteffect').find('div[data-item-id="'+ frameData.textEffect + '"]');
    if (textEffect.length) {
      this.curFrameText = $(textEffect[0]);
      this.curFrameText.addClass('active');
    }
    panelText.find('.effect-detail').html(frameData.textEffect + "(delay: " + frameData.textEffectDelay + ", time: " + frameData.textEffectDuration + ")");

    //show current bitmap effect edit
    var bitmapEffect = $('#vc-add-effect').find('div[data-item-id="'+ frameData.bitmapEffect + '"]');
    if (bitmapEffect.length) {
      this.curFrameEffect = $(bitmapEffect[0]);
      this.curFrameEffect.addClass('active');
    }

    //show current audio edit
    //var itemAudio = $('#vc-audio-library').find('div[data-item-id="'+ frameData.audioId + '"]');
    //  if (!itemAudio.length) {
    //    itemAudio = $('#vc-audio-yours').find('div[data-item-id="'+ frameData.audioId + '"]');
    //  }
    //  if (itemAudio.length) {
    //    this.curFrameAudio = $(itemAudio[0]);
    //    this.curFrameAudio.addClass('active');

        //load frame audio
    //    if (frameData.audioUrl && this.curPanel == PANEL_AUDIO) {
    //      this.loadFrameAudio(frameData.audioId, frameData.audioUrl);
    //    }
    //  }
  };

  VideoClip.prototype.loadFrameImage = function(url) {
    var that = this;

    that.loading.show();

    if (that.image) {
      $(that.image).off('load');
    }
    
    that.image = new Image();
    $(that.image).on('load', function(evt) {
      $(that.image).off('load');
      that.loading.hide();

      var w = that.image.width;
      var h = that.image.height;
      
      //find corrected scale
      var scale = that.bitmapContainer.VC_WIDTH / w;
      if(h * scale > that.bitmapContainer.VC_HEIGHT) {
        scale = that.bitmapContainer.VC_HEIGHT / h;
      }

      var translateX = (that.bitmapContainer.VC_WIDTH - scale * w)/2;
      var translateY = (that.bitmapContainer.VC_HEIGHT - scale * h)/2;
    
      var matrix = new createjs.Matrix2D(scale, 0, 0, scale, translateX, translateY);
      var bitmapData = new createjs.BitmapData(that.image, that.bitmapContainer.VC_WIDTH, that.bitmapContainer.VC_HEIGHT, 0x000000);
      bitmapData.draw(that.image, matrix, null, null, null, true);
    
      that.frameBitmap = that.bitmapContainer.addChild(new createjs.Bitmap(bitmapData.canvas));
      that.bitmapContainer.visible = true;
      that.arrFrame[that.curFrameIndex].bitmapView = that.frameBitmap;
    });
    that.image.src = url;
  };

  VideoClip.prototype.loadBackgroundImage = function(url) {
    var that = this;

    that.loading.show();

    if (that.image) {
      $(that.image).off('load');
    }

    that.image = new Image();
    $(that.image).on('load', function(evt) {
      $(that.image).off('load');
      that.loading.hide();

      var w = that.image.width;
      var h = that.image.height;
      
      //find corrected scale
      var scale = that.bitmapContainer.VC_WIDTH / w;
      if(h * scale > that.bitmapContainer.VC_HEIGHT) {
        scale = that.bitmapContainer.VC_HEIGHT / h;
      }

      var translateX = (that.bitmapContainer.VC_WIDTH - scale * w)/2;
      var translateY = (that.bitmapContainer.VC_HEIGHT - scale * h)/2;
    
      var matrix = new createjs.Matrix2D(scale, 0, 0, scale, translateX, translateY);
      var bitmapData = new createjs.BitmapData(that.image, that.bitmapContainer.VC_WIDTH, that.bitmapContainer.VC_HEIGHT, 0x000000);
      bitmapData.draw(that.image, matrix, null, null, null, true);
    
      that.bgContainer.removeAllChildren();
      that.bgContainer.visible = true;
      that.bgBitmap = that.bgContainer.addChild(new createjs.Bitmap(bitmapData.canvas));
    });
    that.image.src = url;
  };

  VideoClip.prototype.clearAudio = function() {
    this.loading.hide();

    if (this.audioInstance && this.audioInstance.playProgressTimeout) {
      //this.audioInstance.stop();
      clearInterval(this.audioInstance.playProgressTimeout);
    };
    this.audioInstance = null;

    if (createjs.Sound) {
      createjs.Sound.stop();
      createjs.Sound.removeAllSounds();
      createjs.Sound.removeAllEventListeners();
    }
  };

  VideoClip.prototype.clearVideo = function() {
    this.videoInstance.pause();
    $('#video').attr('src', '');
  };

  VideoClip.prototype.loadFrameAudio = function(audioData) {
    var that = this;

    var id = audioData.id;
    var url = audioData.url;

    this.previewVC.clear();

    $('.preview-setting').hide();
    this.clearAudio();

    //load audio if not exist
    createjs.Sound.alternateExtensions = ["mp3", "m4a", "wav"];
    createjs.Sound.registerPlugins([createjs.WebAudioPlugin]);
    createjs.Sound.addEventListener("fileload", onAudioLoadHandler);
    createjs.Sound.registerSound({id: id, src: url});

    this.loading.show();

    if (this.isAudio) {
      var audioData = this.arrBGAudio[this.curBGAudioIndex];
    } 
    //else {
    //  var frameData = this.arrFrame[this.curFrameIndex];
    //}

    function onAudioLoadHandler(evt) {
      that.loading.hide();

      // Play the loaded sound
      that.mediaSetting.show();
      
      that.audioInstance = createjs.Sound.createInstance(id);

      that.saveMediaMetaData(0, that.audioInstance.duration / 1000);

      var left = that.mediaSetting.find('.time').offset().left;
      var controlWidth = that.mediaSetting.find('.time').width();
      var duration = that.audioInstance.duration / 1000;
      var toLeft = left + audioData.start * controlWidth / duration - 10;
      
      //time-start
      that.mediaSetting.find('.time-start').offset({left: toLeft});

      //time-end
      var toRight = left + controlWidth - 10;

      if (audioData.end != -1) {
        toRight = left + audioData.end * controlWidth / duration - 10;
      }
      that.mediaSetting.find('.time-end').offset({left: toRight});

      //timeline
      that.mediaSetting.find('.timeline').offset({left: toLeft + 10});
      that.mediaSetting.find('.timeline').width(toRight - toLeft);

      that.mediaSetting.find('.play-pause').find('span').removeClass('fa-play').addClass('fa-pause');
      //that.mediaSetting.find('.time').data('duration', audioData.getTime());
      that.mediaSetting.find('.time-start .text').html(EffectUtils.formatTime(audioData.start));
      that.mediaSetting.find('.time-end .text').html(EffectUtils.formatTime(audioData.end));
      
      that.audioInstance.position = audioData.start * 1000;
      that.audioInstance.play();
    
      that.audioInstance.on("complete", onAudioPlayCompleteHandler);
      that.audioInstance.playProgressTimeout = setInterval(onAudioPlayProgressHandler, 100);
    }

    function onAudioPlayProgressHandler(evt) {

      if (that.audioInstance) {
        that.updateMedia(that.audioInstance.position/1000);

        if (audioData) {
          if (audioData.end != -1 && that.audioInstance.position/1000 >= audioData.end) {
            that.mediaSetting.find('.play-pause').find('span').removeClass('fa-pause').addClass('fa-play');
            
            that.audioInstance.resumeTime = audioData.start;
            that.audioInstance.stop();
          }
        } 

        //else {
        //  if (frameData.audioEnd != -1 && that.audioInstance.position/1000 >= frameData.audioEnd) {
        //    that.mediaSetting.find('.play-pause').find('span').removeClass('fa-pause').addClass('fa-play');
            
        //    that.audioInstance.resumeTime = frameData.audioStart;
        //    that.audioInstance.stop();
        //  }
        //}
      }
    }

    function onAudioPlayCompleteHandler(evt) {
      if (that.audioInstance) {
        clearInterval(that.audioInstance.playProgressTimeout);
      }
      that.endMedia();
    }
  };

  VideoClip.prototype.loadFrameVideo = function(url) {
    var that = this;

    this.loading.show();

    $('#video').attr('src', url);
    this.videoInstance.play();

    this.mediaSetting.show();
    that.mediaSetting.find('.play-pause').find('span').removeClass('fa-play').addClass('fa-pause');

    var frameData = this.arrFrame[this.curFrameIndex];

    $('#video').off('loadedmetadata').on('loadedmetadata', function(evt) {
      that.loading.hide();
      that.saveMediaMetaData(0, that.videoInstance.duration);

      that.videoInstance.currentTime = frameData.videoStart;
      that.videoInstance.play();
    });

    $('#video').off('timeupdate').on('timeupdate', function(evt) {
      that.updateMedia(that.videoInstance.currentTime);

      //console.log(that.videoInstance.currentTime, frameData.videoEnd);

      if (frameData.videoEnd != -1 && that.videoInstance.currentTime >= frameData.videoEnd) {
        that.mediaSetting.find('.play-pause').find('span').removeClass('fa-pause').addClass('fa-play');
        that.videoInstance.currentTime = frameData.videoStart;
        that.videoInstance.pause();
      }
    });

    $('#video').off('ended').on('ended', function(evt) {
      that.endMedia();
    }); 
  };

  VideoClip.prototype.saveMediaMetaData = function(position, duration) {

    this.mediaSetting.find('.position').html(EffectUtils.formatTime(position));
    this.mediaSetting.find('.duration').html(EffectUtils.formatTime(duration));

    var left = this.mediaSetting.find('.time').offset().left;
    var width = this.mediaSetting.find('.time').width();

    this.mediaSetting.find('.time').data('duration', duration);
    this.mediaSetting.find('.timeline').offset({left: left});
    this.mediaSetting.find('.timeline').width(width);
    this.mediaSetting.find('.time-start').offset({left: left - 10});
    this.mediaSetting.find('.time-end').offset({left: left + width - 10});
    this.mediaSetting.find('.time-start .text').html(EffectUtils.formatTime(position));
    this.mediaSetting.find('.time-end .text').html(EffectUtils.formatTime(duration));
  };

  VideoClip.prototype.toJSON = function() {
    var str = '{';

    //backgrounds
    str += '"backgrounds" : ['
    for (var i = 0; i < this.arrBG.length; i ++) {
      str += this.arrBG[i].toJSON();
      if (i <= this.arrBG.length - 2) {
        str += ', ';
      }
    }
    str += '], ';

    //audios
    str += '"audios" : ['
    for (var i = 0; i < this.arrBGAudio.length; i ++) {
      str += this.arrBGAudio[i].toJSON();
      if (i <= this.arrBGAudio.length - 2) {
        str += ', ';
      }
    }
    str += '], ';

    //frames
    str += '"frames" : ['
    for (var i = 0; i < this.arrFrame.length; i ++) {
      str += this.arrFrame[i].toJSON();
      if (i <= this.arrFrame.length - 2) {
        str += ', ';
      }
    }
    str += ']}';

    return str;
  };

  VideoClip.prototype.save = function() {
    var str = this.toJSON();    
    $.ajax({
      method: "POST",
      url: SAVE_URL,
      data: { vcid : this.vcid, data: str }
    })
    .done(function( msg ) {});
  };

  VideoClip.prototype.preview = function() {
    this.textContainer.visible = false;
    this.bitmapContainer.visible = false;
    this.bgContainer.visible = false;
    
    clearTimeout(this.effectTimeoutId);
    this.effectSetting.hide();
    this.mediaSetting.hide();

    this.clearAudio();
    this.clearVideo();

    this.previewVC.setData(this.arrBG, this.arrBGAudio, this.arrFrame, this.stage, this.bitmapContainer.VC_WIDTH, this.bitmapContainer.VC_HEIGHT, this.loading, this.videoInstance, $('.preview-setting'));
  };

  VideoClip.prototype.finish = function() {
    
    this.save();

    var dialog = $('#videoComplete');
    dialog.modal('show');

    //test link share
    dialog.find('input[name="vc-link-share"]').val(SHARE_URL + '?vcid=' + this.vcid);
  };

  VideoClip.prototype.initShare = function() {
    
    var dialog = $('#videoComplete');

    //share
    dialog.find('button[name="vc-view-share"]').on('click', function(evt) {
      var url = $('#videoComplete').find('input[name="vc-link-share"]').val();
      window.open(url,'_blank');
      dialog.modal('hide');
    });

    dialog.find('a[name="vc-fb-share"]').on('click', function(evt) {
      var url = $('#videoComplete').find('input[name="vc-link-share"]').val();
      FB.ui({
        method: 'share',
        href: url,
      }, function(response){});
      dialog.modal('hide');
    });

    dialog.find('a[name="vc-gp-share"]').on('click', function(evt) {
      var url = $('#videoComplete').find('input[name="vc-link-share"]').val();
      url = 'https://plus.google.com/share?url=' + url;

      var shareWindow = window.open(url,'Share on Google+','height=400,width=600');
      shareWindow.focus();
      
       dialog.modal('hide');
    });

    dialog.find('button[name="vc-send-share"]').on('click', function(evt) {
      
      var title = dialog.find('input[name="vc-title-share"]');
      var email = dialog.find('input[name="vc-email-share"]');
      var content = dialog.find('textarea[name="vc-content-share"]');

      if ($.trim(title.val()) == '') {
        title.focus();
      }
      else if ($.trim(email.val()) == '') {
        email.focus();
      }
      else if ($.trim(content.val()) == '') {
        content.focus();
      }
      else {
        $.ajax({
          method: "POST",
          url: EMAIL_URL,
          data: { vcid : this.vcid, title: title.val(), email: email.val(), content: content.val() }
        })
        .done(function( msg ) {
          dialog.modal('hide');
        });
      }
    });
  };
  

  /* =============== */
  /* MODULE DATA-API */
  /* =============== */

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new VideoClip(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({});
  });

}(window.jQuery, window, window.createjs, window.App));

function TextData() {
  this.text = '';
  this.font = 'Arial';
  this.fontName = 'Arial';
  this.style = '';

  this.halign = 'center';
  this.valign = 'middle';
  this.padding = 5;
  
  this.size = 36;
  this.color = 'Magenta';
};

TextData.HA_LEFT    = 'left';
TextData.HA_CENTER  = 'center';
TextData.HA_RIGHT   = 'right';
TextData.VA_TOP     = 'top';
TextData.VA_MIDDLE  = 'middle';
TextData.VA_BOTTOM  = 'bottom';  

TextData.prototype.toJSON = function() {
  return '{' + 
    '"text": "' + this.text + '",' +
    '"font": "' + this.font + '",' +
    '"fontName": "' + this.fontName + '",' +
    '"style": "' + this.style + '",' +
    '"halign": "' + this.halign + '",' +
    '"valign": "' + this.valign + '",' +
    '"padding": ' + this.padding + ',' +
    '"size": ' + this.size + ',' +
    '"color": "' + this.color + '"' +
  '}';
};

function AudioData() {
  this.id = null;
  this.url = null;
  this.start = 0;
  this.end = -1;

  this.time = 8;
  this.title = null;

  this.audioInstance = null;
};

AudioData.prototype.parse = function(data) {
  this.id = data.id == 'null' ? null : data.id;
  this.url = data.url == 'null' ? null : data.url;
  this.start = data.start;
  this.end = data.end;
  this.time = data.time;
  this.title = data.title == 'null' ? null : data.title;
};

AudioData.prototype.getTime = function() {
  if (this.end != -1) {
    return (this.end - this.start);
  } 
  return this.time - this.start;
};

AudioData.prototype.toJSON = function() {
  return '{' + 
    '"id": "' + this.id + '",' +
    '"url": "' + this.url + '",' +
    '"start": ' + this.start + ',' +
    '"end": ' + this.end + ',' +
    '"time": ' + this.time + ',' +
    '"title": "' + this.title + '"' +
  '}';
};

function BackgroundData() {
  this.id = null;
  this.url = null;
  this.time = 30;
  this.bitmapView = null;
  this.imageView = null;
};

BackgroundData.prototype.parse = function(data) {
  this.id = data.id == 'null' ? null : data.id;
  this.url = data.url == 'null' ? null : data.url;
  this.time = data.time;
};

BackgroundData.prototype.toJSON = function() {
  return '{' + 
    '"id": "' + this.id + '",' +
    '"url": "' + this.url + '",' +
    '"time": ' + this.time +
  '}';
};

function FrameData() {
  //text data
  this.text = new TextData();
  this.textEffect = 'TFade';
  this.textEffectClass = 'TEffect_Fade';
  this.textEffectDelay = 0;
  this.textEffectDuration = 3;
  this.textNextTime = 5;

  //image data
  this.bitmapId = null;
  this.bitmapUrl =  null;
  this.bitmapEffect = 'BFade';
  this.bitmapEffectClass = 'BEffect_Fade';
  this.bitmapEffectDelay = 0;
  this.bitmapEffectDuration = 3;
  this.bitmapNextTime = 5;

  //video data
  this.videoId = null;
  this.videoUrl = null;
  this.videoStart = 0;
  this.videoEnd = -1

  //audio data
  this.audioId = null;
  this.audioUrl = null;
  this.audioStart = 0;
  this.audioEnd = -1;

  //time data
  this.delayTime = 5;
  this.duration = 0;

  this.type = null;

  this.bitmapView = null;
  this.textView = null;
  this.imageView = null;
  this.videoView = null;
  this.audioInstance = null;
};

FrameData.prototype.getDuration = function() {

  var textTime = this.textEffectDuration + this.textNextTime;
  var compareTime = 0;

  if (this.type == FrameData.IMAGE) {
    compareTime = this.bitmapEffectDuration + this.bitmapNextTime;
  } else {
    compareTime = this.duration;
  } 

  return Math.max(textTime, compareTime);
}

//bug: when duplicate frame, the getDuration is not cloned
FrameData.prototype.clone = function() {
  var frameData = new FrameData();

  //text data
  frameData.text.text = this.text.text;
  frameData.text.font = this.text.font;
  frameData.text.fontName = this.text.fontName;
  frameData.text.style = this.text.style;
  frameData.text.halign = this.text.halign;
  frameData.text.valign = this.text.valign;
  frameData.text.padding = this.text.padding;
  frameData.text.size = this.text.size;
  frameData.text.color = this.text.color;
  
  frameData.textEffect = this.textEffect;
  frameData.textEffectClass = this.textEffectClass;
  frameData.textEffectDelay = this.textEffectDelay;
  frameData.textEffectDuration = this.textEffectDuration;
  frameData.textNextTime = this.textNextTime;

  //image data
  frameData.bitmapId = this.bitmapId;
  frameData.bitmapUrl =  this.bitmapUrl;
  frameData.bitmapEffect = this.bitmapEffect;
  frameData.bitmapEffectClass = this.bitmapEffectClass;
  frameData.bitmapEffectDelay = this.bitmapEffectDelay;
  frameData.bitmapEffectDuration = this.bitmapEffectDuration;
  frameData.bitmapNextTime = this.bitmapNextTime;
  
  //video data
  frameData.videoId = this.videoId;
  frameData.videoUrl = this.videoUrl;
  frameData.videoStart = this.videoStart;
  frameData.videoEnd = this.videoEnd;

  //audio data
  frameData.audioId = this.audioId;
  frameData.audioUrl = this.audioUrl;
  frameData.audioStart = this.audioStart;
  frameData.audioEnd = this.audioEnd;

  //time data
  frameData.delayTime = this.delayTime;
  frameData.duration = this.duration;

  frameData.type = this.type;

  return frameData;
}

FrameData.prototype.parse = function(data) {

  //text data
  this.text.text = data.text.text;
  this.text.font = data.text.font;
  this.text.fontName = data.text.fontName;
  this.text.style = data.text.style;
  this.text.halign = data.text.halign;
  this.text.valign = data.text.valign;
  this.text.padding = data.text.padding;
  this.text.size = data.text.size;
  this.text.color = data.text.color;
  
  this.textEffect = data.textEffect;
  this.textEffectClass = data.textEffectClass;
  this.textEffectDelay = 0;//data.textEffectDelay;
  this.textEffectDuration = data.textEffectDuration;
  this.textNextTime = data.textNextTime;

  //image data
  this.bitmapId = data.bitmapId == 'null' ? null : data.bitmapId;
  this.bitmapUrl =  data.bitmapUrl == 'null' ? null : data.bitmapUrl;
  this.bitmapEffect = data.bitmapEffect;
  this.bitmapEffectClass = data.bitmapEffectClass;
  this.bitmapEffectDelay = 0;//data.bitmapEffectDelay;
  this.bitmapEffectDuration = data.bitmapEffectDuration;
  this.bitmapNextTime = data.bitmapNextTime;
  
  //video data
  this.videoId = data.videoId == 'null' ? null : data.videoId;
  this.videoUrl = data.videoUrl == 'null' ? null : data.videoUrl;
  this.videoStart = data.videoStart;
  this.videoEnd = data.videoEnd;

  //audio data
  this.audioId = data.audioId == 'null' ? null : data.audioId;
  this.audioUrl = data.audioUrl == 'null' ? null : data.audioUrl;
  this.audioStart = data.audioStart;
  this.audioEnd = data.audioEnd;

  //time data
  this.delayTime = data.delayTime;
  this.duration = data.duration;

  this.type = data.type;
};

FrameData.prototype.toJSON = function() {
  return '{' + 
    '"text": ' + this.text.toJSON()  + ',' +
    '"textEffect":"' + this.textEffect + '",' +
    '"textEffectClass":"' + this.textEffectClass + '",' +
    '"textEffectDelay":' + this.textEffectDelay + ',' +
    '"textEffectDuration":' + this.textEffectDuration + ',' +
    '"textNextTime":' + this.textNextTime + ',' +
    '"bitmapId":"' + this.bitmapId + '",' +
    '"bitmapUrl":"' + this.bitmapUrl + '",' +
    '"bitmapEffect":"' + this.bitmapEffect + '",' +
    '"bitmapEffectClass":"' + this.bitmapEffectClass + '",' +
    '"bitmapEffectDelay":' + this.bitmapEffectDelay + ',' +
    '"bitmapEffectDuration":' + this.bitmapEffectDuration + ',' +
    '"bitmapNextTime":' + this.bitmapNextTime + ',' +
    '"videoId":"' + this.videoId + '",' +
    '"videoUrl":"' + this.videoUrl + '",' +
    '"videoStart":' + this.videoStart + ',' +
    '"videoEnd":' + this.videoEnd + ',' +
    '"audioId":"' + this.audioId + '",' +
    '"audioUrl":"' + this.audioUrl + '",' +
    '"audioStart":' + this.audioStart + ',' +
    '"audioEnd":' + this.audioEnd + ',' +
    '"delayTime":' + this.delayTime + ',' +
    '"duration":' + this.duration + ',' +
    '"type":"' + this.type +  '"' + 
  '}';
};

FrameData.IMAGE = 'image';
FrameData.AUDIO = 'audio';
FrameData.VIDEO = 'video';

function createText(container, VC_WIDTH, VC_HEIGHT, frameData) {
  
  var text = new createjs.Text(frameData.text.text, frameData.text.style + ' ' + frameData.text.size + 'px ' + frameData.text.font, frameData.text.color);
  container.addChild(text);
  
  var halign = frameData.text.halign;
  var padding = frameData.text.padding;
  text.textAlign = halign;
  
  if (halign == TextData.HA_LEFT) {
    text.x = padding;
  }
  else if (halign == TextData.HA_CENTER) {
    text.x = VC_WIDTH/2;
  }
  else if (halign == TextData.HA_RIGHT) {
    text.x = VC_WIDTH - padding;
  }

  var valign = frameData.text.valign;
  var textHeight = text.getBounds() ? text.getBounds().height : 0;
  if (valign == TextData.VA_TOP) {
    text.y = padding;
  }
  else if (valign == TextData.VA_MIDDLE) {
    text.y = VC_HEIGHT/2 - textHeight/2;
  }
  else if (valign == TextData.VA_BOTTOM) {
    text.y = VC_HEIGHT - textHeight - padding;
  }
  return text;
};

function getTextPositionByHAlign(text, VC_WIDTH, textData, isToLeft) {
  if (textData.halign == TextData.HA_LEFT) {
    return isToLeft ? VC_WIDTH + textData.padding : -text.getBounds().width;
  }
  else if (textData.halign == TextData.HA_CENTER) {
    return isToLeft ? VC_WIDTH + text.getBounds().width / 2 + textData.padding : -text.getBounds().width + textData.padding;
  }
  else if (textData.halign == TextData.HA_RIGHT) {
    return isToLeft ? VC_WIDTH + textData.padding + text.getBounds().width : 0;
  }
  return 0;
}

function getTextPositionByVAlign(text, VC_HEIGHT, textData, isUp) {
  if (textData.valign == TextData.VA_TOP) {
    return isUp ? -text.getBounds().height : VC_HEIGHT;
  }
  else if (textData.valign == TextData.VA_MIDDLE) {
    return isUp ? - text.getBounds().height : VC_HEIGHT;
  }
  else if (textData.valign == TextData.VA_BOTTOM) {
    return isUp ? -text.getBounds().height : VC_HEIGHT;
  }
  return 0;
};

function getTextPositionVertical(text, VC_HEIGHT, textData) {
  var position = 0;
  
  if (textData.valign == TextData.VA_TOP) {
    position = textData.padding;
  }
  else if (textData.valign == TextData.VA_MIDDLE) {
    position = VC_HEIGHT/2 - text.getBounds().height ;
  }
  else if (textData.valign == TextData.VA_BOTTOM) {
    position = VC_HEIGHT - text.getBounds().height - textData.padding;
  }
  return position;
}

function getStartTextPositionByHAlign(text, VC_WIDTH, textData) {
  if (textData.halign == TextData.HA_LEFT) {
    return textData.padding;
  }
  else if (textData.halign == TextData.HA_CENTER) {
    return VC_WIDTH/2 - text.getBounds().width / 2;
  }
  else if (textData.halign == TextData.HA_RIGHT) {
    return VC_WIDTH - text.getBounds().width - textData.padding;
  }
  return 0;
};

function getStartTextPositionByVAlign(text, VC_HEIGHT, textData) {
  if (textData.valign == TextData.VA_TOP) {
    return textData.padding;
  }
  else if (textData.valign == TextData.VA_MIDDLE) {
    return VC_HEIGHT/2 - text.getBounds().height / 2;
  }
  else if (textData.valign == TextData.VA_BOTTOM) {
    return VC_HEIGHT - text.getBounds().height - textData.padding;
  }
  return 0;
};

////////////////////////////////////////////////////////////////////////////////////
///////////TEXT EFFECT//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

//////////TEffect_Fade//////////
function TEffect_None() {
  this.arrTween = [];
};
TEffect_None.prototype.play = function(container, preText, frameData) {
  if (preText) {
    container.removeChild(preText);
  }
  frameData.textView = createText(container, container.VC_WIDTH, container.VC_HEIGHT, frameData);
};
TEffect_None.prototype.stop = function() {
};
window.TEffect_None = TEffect_None;

//////////TEffect_Fade//////////
function TEffect_Fade() {
  this.arrTween = [];
};
TEffect_Fade.prototype.play = function(container, preText, frameData) {

  if (preText) {
    preText.alpha = 1;
    container.addChild(preText);
    var tween = TweenLite.to(preText, 1, {alpha: 0, onComplete: function() {
      container.removeChild(preText);
    }});
    this.arrTween.push(tween);
  }
  
  var text = createText(container, container.VC_WIDTH, container.VC_HEIGHT, frameData);
  text.alpha = 0;
  container.addChild(text);
  frameData.textView = text;
  tween = TweenLite.to(text, frameData.textEffectDuration, {alpha: 1});
  this.arrTween.push(tween);
};
TEffect_Fade.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.TEffect_Fade = TEffect_Fade;

//////////TEffect_SlideLeft//////////
function TEffect_SlideLeft() {
  this.arrTween = [];
}
TEffect_SlideLeft.prototype.play = function(container, preText, frameData) {
  var tween;
  if (preText) {
    tween = TweenLite.to(preText, frameData.textEffectDuration, {x: -container.VC_WIDTH, onComplete: function() {
      container.removeChild(preText);
    }});
    this.arrTween.push(tween);
  }

   var text = createText(container, container.VC_WIDTH, container.VC_HEIGHT, frameData);
   var orgX = text.x;
   text.x = getTextPositionByHAlign(text, container.VC_WIDTH, frameData.text, true);
   container.addChild(text);
   frameData.textView = text;
  
    tween = TweenLite.to(text, frameData.textEffectDuration, {x: orgX});
    this.arrTween.push(tween);
};
TEffect_SlideLeft.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.TEffect_SlideLeft = TEffect_SlideLeft;

//////////TEffect_SlideRight//////////
function TEffect_SlideRight() {
  this.arrTween = [];
}
TEffect_SlideRight.prototype.play = function(container, preText, frameData) {
  var tween;
  if (preText) {
    tween = TweenLite.to(preText, frameData.textEffectDuration, {x: container.VC_WIDTH, onComplete: function() {
      container.removeChild(preText);
    }});
    this.arrTween.push(tween);
  }

   var text = createText(container, container.VC_WIDTH, container.VC_HEIGHT, frameData);
   var orgX = text.x;
   text.x = getTextPositionByHAlign(text, container.VC_WIDTH, frameData.text, false);
   container.addChild(text);
   frameData.textView = text;
  
    tween = TweenLite.to(text, frameData.textEffectDuration, {x: orgX});
    this.arrTween.push(tween);
};
TEffect_SlideRight.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.TEffect_SlideRight = TEffect_SlideRight;

//////////TEffect_SlideUp//////////
function TEffect_SlideUp() {
  this.arrTween = [];
}
TEffect_SlideUp.prototype.play = function(container, preText, frameData) {
  var tween;
  if (preText) {
    tween = TweenLite.to(preText, frameData.textEffectDuration, {y: container.VC_HEIGHT, onComplete: function() {
      container.removeChild(preText);
    }});
    this.arrTween.push(tween);
  }

   var text = createText(container, container.VC_WIDTH, container.VC_HEIGHT, frameData);
   var orgY = text.y;
   text.y = getTextPositionByVAlign(text, container.VC_WIDTH, frameData.text, true);
   container.addChild(text);
   frameData.textView = text;
  
    tween = TweenLite.to(text, frameData.textEffectDuration, {y: orgY});
    this.arrTween.push(tween);
};
TEffect_SlideUp.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.TEffect_SlideUp = TEffect_SlideUp;

//////////TEffect_SlideDown//////////
function TEffect_SlideDown() {
  this.arrTween = [];
}
TEffect_SlideDown.prototype.play = function(container, preText, frameData) {
  var tween;
  if (preText) {
    tween = TweenLite.to(preText, frameData.textEffectDuration, {y: -container.VC_HEIGHT, onComplete: function() {
      container.removeChild(preText);
    }});
    this.arrTween.push(tween);
  }

   var text = createText(container, container.VC_WIDTH, container.VC_HEIGHT, frameData);
   var orgY = text.y;
   text.y = getTextPositionByVAlign(text, container.VC_HEIGHT, frameData.text, false);
   container.addChild(text);
   frameData.textView = text;
  
    tween = TweenLite.to(text, frameData.textEffectDuration, {y: orgY});
    this.arrTween.push(tween);
};
TEffect_SlideDown.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.TEffect_SlideDown = TEffect_SlideDown;

//////////TEffect_FastBounceText//////////
function TEffect_FastBounceText() {
  this.arrTween = [];
};
TEffect_FastBounceText.prototype.play = function(container, preText, frameData) {
  if (preText) {
    container.removeChild(preText);
  }

   var str = frameData.text.text;
  
   var text = createText(container, container.VC_WIDTH, container.VC_HEIGHT, frameData);
   container.removeChild(text); 
   frameData.textView = text;

  var arrText = str.split('\n');
  var toX = getStartTextPositionByHAlign(text, container.VC_WIDTH, frameData.text);
  var toY = getStartTextPositionByVAlign(text, container.VC_HEIGHT, frameData.text);
  var txt;
  var character;
  var tempW, tempH;
  var blurFilter = new createjs.BlurFilter(5, 5, 5);
  var blur = new createjs.BlurFilter(1, 1, 1);
  var colorFilter = new createjs.ColorFilter(0, 0, 0, 1, 255, 255, 255, 0);
  
  var len = str.replace(/''/g, '\n');
  len = len.length;
  var delayTime = frameData.textEffectDuration / len;

  for (var i = 0; i < arrText.length; i ++) {
    character = arrText[i];

    for (var j = 0; j < character.length; j ++) {
      txt = new createjs.Text(character[j], frameData.text.style + ' ' + frameData.text.size + 'px ' + frameData.text.font, frameData.text.color);
      txt.orgX = toX;
      txt.orgY = toY;
      
      tempW = txt.getMeasuredWidth();
      tempH = txt.getMeasuredLineHeight();
      toX += tempW;
      
      txt.scaleX = txt.scaleY = 5;
      txt.x = toX - tempW * 5 / 2;
      txt.y = toY - tempH * 5 / 2;
              
      container.addChild(txt);
      txt.alpha = 0;
      tween = TweenLite.to(txt, 0.2, {alpha: 1, x: txt.orgX, y: txt.orgY, scaleX: 1, scaleY: 1, delay: delayTime * (i + 1) * j})
      this.arrTween.push(tween);
    }   
    toX = 0; 
    toY += txt.getMeasuredLineHeight();
  }
};
TEffect_FastBounceText.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.TEffect_FastBounceText = TEffect_FastBounceText;

//////////TEffect_StarLeft//////////
function TEffect_StarLeft()  {
  this.arrTween = [];
};
TEffect_StarLeft.prototype.play = function(container, preText, frameData) {
  var tween;
  var that = this;
  if (preText) {
    container.removeChild(preText);
  }

  //create text and set position
  text = createText(container, container.VC_WIDTH, container.VC_HEIGHT, frameData);
  var orgX = text.x;
  text.x = getTextPositionByHAlign(text, container.VC_WIDTH, frameData.text, false);
  frameData.textView = text;
  
  var fromY = getTextPositionVertical(text, container.VC_HEIGHT, frameData.text);
  tween = TweenLite.to(text, frameData.textEffectDuration, {x: orgX});
  this.arrTween.push(tween);
  
  var randomX, randomY;
  var star, numOfStar = Math.ceil(container.VC_WIDTH/ 40);
  var row = Math.ceil(text.getBounds().height / 10) + 4;
  var delayTime = (frameData.textEffectDuration - 1) / numOfStar;
  
  for(var i = 0; i < row; i ++) {
    for(var j = 0; j < numOfStar; j ++) {
      star = new createjs.Shape();
      
      star.x = Math.random() * 40 + j * 40;
      star.y = fromY + i * 10
      
      star.graphics.beginFill("#FFFFFF").drawPolyStar(0, 0, 10, 5, 0.8, - 90);
      star.scaleX = star.scaleY = Math.random();
      container.addChild(star);

      randomX = Math.random() < 0.5 ? star.x + Math.random() * 50 : star.x - Math.random() * 50;
      randomY = Math.random() < 0.5 ? star.y + Math.random() * 50 : star.y - Math.random() * 50;
      
      star.alpha = 0;
      
      tween = TweenLite.to(star, 0.01, {alpha: 1, delay: j * delayTime,
        onComplete: function(star, randomX, randomY) {
          var scale = Math.random();
          var tw = TweenLite.to(star, 1, {alpha: 0, rotation: Math.random() * 360, x: randomX, y: randomY, scaleX: scale, scaleY: scale});
          that.arrTween.push(tw);
        }, onCompleteParams: [star, randomX, randomY]});
      this.arrTween.push(tween);
    }
  }
};
TEffect_StarLeft.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.TEffect_StarLeft = TEffect_StarLeft;

//////////TEffect_FadeStar//////////
function TEffect_StarRight()  {
  this.arrTween = [];
};
TEffect_StarRight.prototype.play = function(container, preText, frameData) {
  var tween;
  var that = this;
  if (preText) {
    container.removeChild(preText);
  }
  
  //create text and set position
  text = createText(container, container.VC_WIDTH, container.VC_HEIGHT, frameData);
  var orgX = text.x;
  text.x = getTextPositionByHAlign(text, container.VC_WIDTH, frameData.text, true);
  frameData.textView = text;
  
  var fromY = getTextPositionVertical(text, container.VC_HEIGHT, frameData.text);
  tween = TweenLite.to(text, frameData.textEffectDuration, {x: orgX});
  this.arrTween.push(tween);
  
  var randomX, randomY;
  var star, numOfStar = Math.ceil(container.VC_WIDTH/ 40);
  var row = Math.ceil(text.getBounds().height / 10) + 4;
  var delayTime = (frameData.textEffectDuration - 1) / numOfStar;

  for(var i = 0; i < row; i ++) {
    for(var j = 0; j < numOfStar; j ++) {
      star = new createjs.Shape();
      
      star.x = Math.random() * 40 + j * 40;
      star.y = fromY + i * 10
      
      star.graphics.beginFill("#FFFFFF").drawPolyStar(0, 0, 10, 5, 0.8, - 90);
      star.scaleX = star.scaleY = Math.random();
      container.addChild(star);

      randomX = Math.random() < 0.5 ? star.x + Math.random() * 50 : star.x - Math.random() * 50;
      randomY = Math.random() < 0.5 ? star.y + Math.random() * 50 : star.y - Math.random() * 50;
      
      star.alpha = 0;
      tween = TweenLite.to(star, 0.01, {alpha: 1, delay: (numOfStar - j) * delayTime,
        onComplete: function(star, randomX, randomY) {     
          var scale = Math.random();
          var tw = TweenLite.to(star, 1, {alpha: 0, rotation: Math.random() * 360, x: randomX, y: randomY, scaleX: scale, scaleY: scale});
          that.arrTween.push(tw);
        }, onCompleteParams: [star, randomX, randomY]});
      this.arrTween.push(tween);
    }
  }
};
TEffect_StarRight.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.TEffect_StarRight = TEffect_StarRight;

//////////TEffect_HeartLeft//////////
function TEffect_HeartLeft()  {
  this.arrTween = [];
};
TEffect_HeartLeft.prototype.play = function(container, preText, frameData) {
  var tween;
  var that = this;
  if (preText) {
    container.removeChild(preText);
  }
  
  //create text and set position
  text = createText(container, container.VC_WIDTH, container.VC_HEIGHT, frameData);
  var orgX = text.x;
  text.x = getTextPositionByHAlign(text, container.VC_WIDTH, frameData.text, false);
  frameData.textView = text;
  
  var fromY = getTextPositionVertical(text, container.VC_HEIGHT, frameData.text);
  tween = TweenLite.to(text, frameData.textEffectDuration, {x: orgX});
  this.arrTween.push(tween);
  
  var randomX, randomY;
  var heart, numOfHeart = Math.ceil(container.VC_WIDTH/ 40);
  var row = Math.ceil(text.getBounds().height / 10) + 4;
  var baseLen = 7;
  var delayTime = (frameData.textEffectDuration - 1) / numOfHeart;
  
  for(var i = 0; i < row; i ++) {
    for(var j = 0; j < numOfHeart; j ++) {
      heart = new createjs.Shape();
      
      heart.x = Math.random() * 40 + j * 40;
      heart.y = fromY + i * 10
      
      heart.graphics.beginFill('red').moveTo(-baseLen, 0).arc(0, 0, baseLen, 0, Math.PI, false).lineTo(baseLen, 0).arc(baseLen, -baseLen, baseLen, Math.PI * 90 / 180, Math.PI * 270 / 180, true).lineTo(baseLen, -baseLen * 2).lineTo(-baseLen, -baseLen * 2).lineTo(-baseLen, 0).endFill();
      heart.scaleX = heart.scaleY = Math.random();
      container.addChild(heart);

      randomX = Math.random() < 0.5 ? heart.x + Math.random() * 50 : heart.x - Math.random() * 50;
      randomY = Math.random() < 0.5 ? heart.y + Math.random() * 50 : heart.y - Math.random() * 50;
      
      heart.alpha = 0;
      tween = TweenLite.to(heart, 0.01, {alpha: 1, delay: j * delayTime, 
        onComplete: function(heart, randomX, randomY) {     
          var scale = Math.random();
          var tw = TweenLite.to(heart, 1, {alpha: 0, rotation: Math.random() * 360, x: randomX, y: randomY, scaleX: scale, scaleY: scale});    
          that.arrTween.push(tw);
        }, onCompleteParams: [heart, randomX, randomY]});
      this.arrTween.push(tween);
    }
  }
};
TEffect_HeartLeft.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.TEffect_HeartLeft = TEffect_HeartLeft;

//////////TEffect_HeartRight//////////
function TEffect_HeartRight()  {
  this.arrTween = [];
};
TEffect_HeartRight.prototype.play = function(container, preText, frameData) {
  var tween;
  var that = this;
  if (preText) {
    container.removeChild(preText);
  }
  
  //create text and set position
  text = createText(container, container.VC_WIDTH, container.VC_HEIGHT, frameData);
  var orgX = text.x;
  text.x = getTextPositionByHAlign(text, container.VC_WIDTH, frameData.text, true);
  frameData.textView = text;
  
  var fromY = getTextPositionVertical(text, container.VC_HEIGHT, frameData.text);
  tween = TweenLite.to(text, frameData.textEffectDuration, {x: orgX});
  this.arrTween.push(tween);
  
  var randomX, randomY;
  var heart, numOfHeart = Math.ceil(container.VC_WIDTH/ 40);
  var row = Math.ceil(text.getBounds().height / 10) + 4;
  var baseLen = 7;
  var delayTime = (frameData.textEffectDuration - 1) / numOfHeart;
  
  for(var i = 0; i < row; i ++) {
    for(var j = 0; j < numOfHeart; j ++) {
      heart = new createjs.Shape();
      
      heart.x = Math.random() * 40 + j * 40;
      heart.y = fromY + i * 10
      
      heart.graphics.beginFill('red').moveTo(-baseLen, 0).arc(0, 0, baseLen, 0, Math.PI, false).lineTo(baseLen, 0).arc(baseLen, -baseLen, baseLen, Math.PI * 90 / 180, Math.PI * 270 / 180, true).lineTo(baseLen, -baseLen * 2).lineTo(-baseLen, -baseLen * 2).lineTo(-baseLen, 0).endFill();
      heart.scaleX = heart.scaleY = Math.random();
      container.addChild(heart);

      randomX = Math.random() < 0.5 ? heart.x + Math.random() * 50 : heart.x - Math.random() * 50;
      randomY = Math.random() < 0.5 ? heart.y + Math.random() * 50 : heart.y - Math.random() * 50;
      
      heart.alpha = 0;
      tween = TweenLite.to(heart, 0.01, {alpha: 1, delay: (numOfHeart - j) * delayTime, 
        onComplete: function(heart, randomX, randomY) {
          var scale = Math.random();
          var tw = TweenLite.to(heart, 1, {alpha: 0, rotation: Math.random() * 360, x: randomX, y: randomY, scaleX: scale, scaleY: scale});    
          that.arrTween.push(tw);
        }, onCompleteParams: [heart, randomX, randomY]});
      this.arrTween.push(tween);
    }
  }
};
TEffect_HeartRight.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.TEffect_HeartRight = TEffect_HeartRight;

//////////TEffect_CenterGo//////////
function TEffect_CenterGo()   {
  this.arrTween = [];
};
TEffect_CenterGo.prototype.play = function(container, preText, frameData) {
  var tween;
  if (preText) {
    container.removeChild(preText);
  }

  text = createText(container, container.VC_WIDTH, container.VC_HEIGHT, frameData);
  container.removeChild(text);
  frameData.textView = text;
  
  var str = frameData.text.text;

  var arrText = str.split('\n');
  var toX = getStartTextPositionByHAlign(text, container.VC_WIDTH, frameData.text);
  var toY = getStartTextPositionByVAlign(text, container.VC_HEIGHT, frameData.text);
  var txt;
  var character;
  var tempW, tempH;
  
  var len = str.replace(/''/g, '\n');
  len = len.length;
  var delayTime = frameData.textEffectDuration / len;
  
  for (var i = 0; i < arrText.length; i ++) {
    character = arrText[i];

    for (var j = 0; j < character.length; j ++) {
      txt = new createjs.Text(character[j], frameData.text.style + ' ' + frameData.text.size + 'px ' + frameData.text.fontName, frameData.text.color);
      
      txt.orgX = toX;
      txt.orgY = toY;
      
      txt.scaleX = txt.scaleY = 0;
      
      tempW = txt.getMeasuredWidth();
      tempH = txt.getMeasuredLineHeight();
      toX += tempW;
     
      txt.x = container.VC_WIDTH/2;
      txt.y = container.VC_HEIGHT/2;
              
      container.addChild(txt);

      txt.alpha = 0;
      tween = TweenLite.to(txt, 0.5, {alpha: 1, x: txt.orgX, y: txt.orgY, scaleX: 1, scaleY: 1, delay: delayTime * (i + 1) * j});
      this.arrTween.push(tween);
    }   
    toX = 0; 
    toY += txt.getMeasuredLineHeight();
  }
};
TEffect_CenterGo.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.TEffect_CenterGo = TEffect_CenterGo;

//////////TEffect_LightLeft//////////
function TEffect_LightLeft() {
  this.arrTween = [];
}
TEffect_LightLeft.prototype.play = function(container, preText, frameData) {
  var tween;
  if (preText) {
    container.removeChild(preText);
  }

  //var text = createText(container, container.VC_WIDTH, container.VC_HEIGHT, frameData);
  //text.alpha = 0;
  //frameData.textView = text;
  //tween = TweenLite.to(text, 0.1, {delay: frameData.textEffectDelay/2, alpha: 0.3});
  //this.arrTween.push(tween);

  var textEffect = createText(container, container.VC_WIDTH, container.VC_HEIGHT, frameData);
 
  var mask = new createjs.Shape();
  mask.x = getStartTextPositionByHAlign(textEffect, container.VC_WIDTH, frameData.text);
  mask.y = getStartTextPositionByVAlign(textEffect, container.VC_HEIGHT, frameData.text);

  mask.graphics.beginFill('#FF00FF').drawRect(0, 0, textEffect.getBounds().width, textEffect.getBounds().height);
  textEffect.mask = mask;

  var toX = 0;
  if (frameData.text.halign == TextData.HA_LEFT) {
    toX = textEffect.x;
  }

  else if (frameData.text.halign == TextData.HA_CENTER) {
    toX = textEffect.x - textEffect.getBounds().width/2;
  }

  else if (frameData.text.halign == TextData.HA_RIGHT) {
    toX = textEffect.x - textEffect.getBounds().width;
  }

  mask.x = mask.x - textEffect.getBounds().width;
  
  tween = TweenLite.to(mask, frameData.textEffectDuration, {x: toX});
  this.arrTween.push(tween);
};
TEffect_LightLeft.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.TEffect_LightLeft = TEffect_LightLeft;

//////////TEffect_LightRight//////////
function TEffect_LightRight() {
  this.arrTween = [];
}
TEffect_LightRight.prototype.play = function(container, preText, frameData) {
  var tween;
  if (preText) {
    container.removeChild(preText);
  }

  //var text = createText(container, container.VC_WIDTH, container.VC_HEIGHT, frameData);
  //text.alpha = 0;
  //frameData.textView = text;
  //tween = TweenLite.to(text, 0.1, {delay: frameData.textEffectDelay/2, alpha: 0.3});
  //this.arrTween.push(tween);
  
  var textEffect = createText(container, container.VC_WIDTH, container.VC_HEIGHT, frameData);
   
  var mask = new createjs.Shape();
  mask.x = getStartTextPositionByHAlign(textEffect, container.VC_WIDTH, frameData.text);
  mask.y = getStartTextPositionByVAlign(textEffect, container.VC_HEIGHT, frameData.text);
  mask.graphics.beginFill('#FF00FF').drawRect(0, 0, textEffect.getBounds().width, textEffect.getBounds().height);
  textEffect.mask = mask;
  
  var toX = 0;
  if (frameData.text.halign == TextData.HA_LEFT) {
    toX = textEffect.x;
  }

  else if (frameData.text.halign == TextData.HA_CENTER) {
    toX = textEffect.x - textEffect.getBounds().width/2;
  }

  else if (frameData.text.halign == TextData.HA_RIGHT) {
    toX = textEffect.x - textEffect.getBounds().width;
  }

  mask.x = mask.x + textEffect.getBounds().width;
   
  tween = TweenLite.to(mask, frameData.textEffectDuration, {x: toX});
  this.arrTween.push(tween);
};
TEffect_LightRight.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.TEffect_LightRight = TEffect_LightRight;

////////////////////////////////////////////////////////////////////////////////////
///////////BITMAP EFFECT////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

//////////BEffect_None//////////
function BEffect_None() {
  this.arrTween = [];
}
BEffect_None.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {
  if (prevBitmap) {
    container.removeChild(prevBitmap);
  }
  container.addChild(nextBitmap);
};
BEffect_None.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.BEffect_None = BEffect_None;

//////////BEffect_Fade//////////
function BEffect_Fade() {
  this.arrTween = [];
};
BEffect_Fade.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {
  var tween;
  if (prevBitmap) {
    container.addChild(prevBitmap);
    prevBitmap.alpha = 1;
    prevBitmap.x = prevBitmap.y = 0;
    tween = TweenLite.to(prevBitmap, time, {delay: delay, alpha: 0});
    this.arrTween.push(tween);
  }

  container.addChild(nextBitmap);
  nextBitmap.alpha = 0;
  tween = TweenLite.to(nextBitmap, time, {delay: delay, alpha: 1});
  this.arrTween.push(tween);
};
BEffect_Fade.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.BEffect_Fade = BEffect_Fade;

//////////BEffect_Slide//////////
function BEffect_SlideLeft() {
  this.arrTween = [];
};
BEffect_SlideLeft.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {
  var tween;
  if (prevBitmap) {
    container.addChild(prevBitmap);
    prevBitmap.x = prevBitmap.y = 0;
    tween = TweenLite.to(prevBitmap, time, {x: -container.VC_WIDTH});
    this.arrTween.push(tween);
  }

  container.addChild(nextBitmap);
  nextBitmap.x = container.VC_WIDTH;
  tween = TweenLite.to(nextBitmap, time, {x: 0});
  this.arrTween.push(tween);
}
BEffect_SlideLeft.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.BEffect_SlideLeft = BEffect_SlideLeft;

//////////BEffect_SlideRight//////////
function BEffect_SlideRight() {
  this.arrTween = [];
};
BEffect_SlideRight.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {
  var tween;
  if (prevBitmap) {
    tween = TweenLite.to(prevBitmap, time, {x: container.VC_WIDTH});
    this.arrTween.push(tween);
  }

  container.addChild(nextBitmap);
  nextBitmap.x = -container.VC_WIDTH;
  tween = TweenLite.to(nextBitmap, time, {x: 0});
  this.arrTween.push(tween);
}
BEffect_SlideRight.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.BEffect_SlideRight = BEffect_SlideRight;

//////////BEffect_SlideUp//////////
function BEffect_SlideUp() {
  this.arrTween = [];
};
BEffect_SlideUp.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {
  var tween;
  if (prevBitmap) {
    tween = TweenLite.to(prevBitmap, time, {y: -container.VC_HEIGHT});
    this.arrTween.push(tween);
  }

  container.addChild(nextBitmap);
  nextBitmap.y = container.VC_HEIGHT;
  tween = TweenLite.to(nextBitmap, time, {y: 0});
  this.arrTween.push(tween);
}
BEffect_SlideUp.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.BEffect_SlideUp = BEffect_SlideUp;

//////////BEffect_SlideDown//////////
function BEffect_SlideDown() {
  this.arrTween = [];
};
BEffect_SlideDown.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {
  var tween;
  if (prevBitmap) {
    tween = TweenLite.to(prevBitmap, time, {y: container.VC_HEIGHT});
    this.arrTween.push(tween);
  }

  container.addChild(nextBitmap);
  nextBitmap.y = -container.VC_HEIGHT;
  tween = TweenLite.to(nextBitmap, time, {y: 0});
  this.arrTween.push(tween);
}
BEffect_SlideDown.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.BEffect_SlideDown = BEffect_SlideDown;

//////////BEffect_ZoomIn//////////
function BEffect_ZoomIn() {
  this.arrTween = [];
};
BEffect_ZoomIn.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {
  var tween;
  container.addChild(nextBitmap);
  
  var scale = nextBitmap.scaleX;
  nextBitmap.alpha = 0;

  nextBitmap.scaleX = nextBitmap.scaleY = 0.5;
  nextBitmap.x = 0.5 * nextBitmap.getBounds().width / 2;
  nextBitmap.y = 0.5 * nextBitmap.getBounds().height / 2;
  
  tween = TweenLite.to(nextBitmap, time, {delay: delay, alpha: 1, x: 0, y :0, scaleX: scale, scaleY: scale});
  this.arrTween.push(tween);  
}
BEffect_ZoomIn.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.BEffect_ZoomIn = BEffect_ZoomIn;

//////////BEffect_ZoomOut//////////
function BEffect_ZoomOut() {
  this.arrTween = [];
};
BEffect_ZoomOut.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {
  var tween;
  container.addChild(nextBitmap);
  
  var scale = nextBitmap.scaleX;
  nextBitmap.alpha = 0;
  nextBitmap.scaleX = nextBitmap.scaleY = 2;
  nextBitmap.x = - nextBitmap.getBounds().width / 2;
  nextBitmap.y = - nextBitmap.getBounds().height / 2;
  
  tween = TweenLite.to(nextBitmap, time, {alpha: 1, x: 0, y :0, scaleX: scale, scaleY: scale});
  this.arrTween.push(tween);
}
BEffect_ZoomOut.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.BEffect_ZoomOut = BEffect_ZoomOut;

//////////BEffect_AlphaBars//////////
function BEffect_AlphaBars() {
  this.arrTween = [];
};
BEffect_AlphaBars.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {
  var tween;
  //step 1: create temp bitmap with corrected size
  var w = nextBitmap.getBounds().width;
  var h = nextBitmap.getBounds().height;
  
  nextBitmap.cache(0, 0, w, h);
  
  var matrix = new createjs.Matrix2D(container.VC_WIDTH/ w, 0, 0, container.VC_WIDTH/ w, 0, (container.VC_HEIGHT - (container.VC_WIDTH/ w) * h)/2);      
  var bitmapData = new createjs.BitmapData(null, container.VC_WIDTH, container.VC_HEIGHT, 0x000000);
  bitmapData.draw(nextBitmap, matrix, null, null, null, true);
  
  var temp = new createjs.Container();
  container.addChild(temp); 
  
  //step 2: create and show bars
  var barWidth = 30;
  var numOfBar = Math.ceil(container.VC_WIDTH / barWidth);
  var bar;
  var showTime = 0.5;
  var delayTime = time / numOfBar;
  
  for (var i = 0; i < numOfBar; i ++) {
    bar = new createjs.Bitmap(bitmapData.canvas);
    bar.sourceRect = new createjs.Rectangle(barWidth * i, 0, barWidth, container.VC_HEIGHT);
    bar.x = barWidth * i;
    bar.alpha = 0;
    temp.addChild(bar); 
    
    tween = TweenLite.to(bar, showTime, {alpha: 1, delay: i < numOfBar / 2  ? delayTime * i : numOfBar * delayTime - delayTime * i, onComplete: onCompleteShowBar, onCompleteParams: [bar, i]});
    this.arrTween.push(tween);
  }      
  
  function onCompleteShowBar(bar, index) {
    if (index == numOfBar - 1) {
      container.addChild(new createjs.Bitmap(bitmapData.canvas));
      temp.removeAllChildren();
      container.removeChild(temp);
    }
  }      
};
BEffect_AlphaBars.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.BEffect_AlphaBars = BEffect_AlphaBars;

//////////BEffect_SquareExplode//////////
function BEffect_SquareExplode() {
  this.arrTween = [];
};
BEffect_SquareExplode.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {
  var tween;
  //step 1: create temp bitmap with corrected size
  var w = nextBitmap.getBounds().width;
  var h = nextBitmap.getBounds().height;
  
  nextBitmap.cache(0, 0, w, h);
  
  var matrix = new createjs.Matrix2D(container.VC_WIDTH/ w, 0, 0, container.VC_WIDTH/ w, 0, (container.VC_HEIGHT - (container.VC_WIDTH/ w) * h)/2);      
  var bitmapData = new createjs.BitmapData(null, container.VC_WIDTH, container.VC_HEIGHT, 0x000000);
  bitmapData.draw(nextBitmap, matrix, null, null, null, true);
  
  var temp = new createjs.Container();
  container.addChild(temp); 
  
  //create image with mask
  var imageMask = new createjs.Shape();
  imageMask.graphics.drawRect(0, 0, container.VC_WIDTH, container.VC_HEIGHT);
  imageMask.scaleX = 0;
  temp.addChild(imageMask);
  
  var bitmap = new createjs.Bitmap(bitmapData.canvas);
  bitmap.cache(0, 0, container.VC_WIDTH, container.VC_HEIGHT);
  temp.addChild(bitmap);
  
  temp.mask = imageMask;
  tween = TweenLite.to(imageMask, 2, {scaleX: 1, ease: Power2.easeOut });
  this.arrTween.push(tween);
  
  //step 2: create and show bars
  var barWidth = 40;
  var barHeight = 40;
  var col = Math.ceil(container.VC_HEIGHT / barHeight);
  var row = Math.ceil(container.VC_WIDTH / barWidth);
  var i, j;
  var bar;      
  var showTime = 1;
  var delayTime = time / (col * row);
  var distance = 150;
  var toX, toY;
  
  for (i = 0; i < row; i ++) {
    for (j = 0; j < col; j ++) {
      bar = new createjs.Bitmap(bitmapData.canvas);
      bar.sourceRect = new createjs.Rectangle(barWidth * i, barHeight * j, barWidth, barHeight);
      bar.x = barWidth * i;
      bar.y = barHeight * j;
      temp.addChild(bar); 
      
      toX = bar.x + (Math.random() < 0.5 ? -Math.random() * distance : Math.random() * distance);
      toY = bar.y + (Math.random() < 0.5 ? -Math.random() * distance : Math.random() * distance);
    
      tween = TweenLite.to(bar, showTime, {alpha: 0, delay: delayTime * i, x: toX, y: toY, onComplete: onCompleteShowEffect, onCompleteParams: [bar]});
      this.arrTween.push(tween);
    }      
  }
  
  function onCompleteShowEffect(bar) {
    temp.removeChild(bar);
  }
};
BEffect_SquareExplode.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.BEffect_SquareExplode = BEffect_SquareExplode;

//////////BEffect_BrightSquares//////////
function BEffect_BrightSquares() {
  this.arrTween = [];
};
BEffect_BrightSquares.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {
  var tween;
  //step 1: create temp bitmap with corrected size
  var w = nextBitmap.getBounds().width;
  var h = nextBitmap.getBounds().height;
  
  nextBitmap.cache(0, 0, w, h);
  
  var matrix = new createjs.Matrix2D(container.VC_WIDTH/ w, 0, 0, container.VC_WIDTH/ w, 0, (container.VC_HEIGHT - (container.VC_WIDTH/ w) * h)/2);      
  var bitmapData = new createjs.BitmapData(null, container.VC_WIDTH, container.VC_HEIGHT, 0x000000);
  bitmapData.draw(nextBitmap, matrix, null, null, null, true);
  
  var temp = new createjs.Container();
  container.addChild(temp); 
  
  //step 2: create and show bars
  var barWidth = 40;
  var barHeight = 40;
  var col = Math.ceil(container.VC_HEIGHT / barHeight);
  var row = Math.ceil(container.VC_WIDTH / barWidth);
  var i, j;
  var bar;      
  var bitmap;
  var bright;
  var showTime = 0.5;
  var delayTime = time / (col * row);
  var delayBar;
  
  for (i = 0; i < row; i ++) {
    for (j = 0; j < col; j ++) {
      bar = new createjs.Container();
      bar.orgX = barWidth * i;
      bar.orgY = barHeight * j;
      bar.x = bar.orgX + barWidth/2;
      bar.y = bar.orgY + barHeight/2;
      bar.scaleX = bar.scaleY = 0;
      temp.addChild(bar); 
      
      bitmap = new createjs.Bitmap(bitmapData.canvas);
      bitmap.sourceRect = new createjs.Rectangle(barWidth * i, barHeight * j, barWidth, barHeight);
      bar.addChild(bitmap); 
      
      bright = new createjs.Shape();          
      bright.graphics.beginFill('#FFFFFF').drawRect(0, 0, barWidth, barHeight).endFill();
      bar.addChild(bright);
      
      delayBar = delayTime *  i * (col - j);
      tween = TweenLite.to(bright, showTime + 0.2, {alpha: 0, delay: delayBar + 0.2});
      this.arrTween.push(tween);
      
      tween = TweenLite.to(bar, showTime, {alpha: 1, x: bar.orgX, y: bar.orgY, scaleX: 1, scaleY: 1, delay: delayBar, onComplete: onCompleteShowEffect, onCompleteParams: [bar]});
      this.arrTween.push(tween);
    }      
  }
  
  function onCompleteShowEffect(bar) {
    //temp.removeChild(bar);
  }
};
BEffect_BrightSquares.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.BEffect_BrightSquares = BEffect_BrightSquares;

//////////BEffect_ClockWise//////////
function BEffect_ClockWise() {
  this.arrTween = [];
};
BEffect_ClockWise.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {

  if (prevBitmap) {
    container.addChild(prevBitmap);
  }

  //center point
  var circle = new createjs.Shape();
  circle.x = container.VC_WIDTH/2;
  circle.y = container.VC_HEIGHT/2;
  
  var w = nextBitmap.getBounds().width;
  var h = nextBitmap.getBounds().height;  

  nextBitmap.cache(0, 0, w, h);
  nextBitmap.mask = circle;
  
  var angle = 0;  
  var startAngle = Math.PI/180;
  var endAngle;
  var radius = 600;  
  var piece = Math.ceil(60 / (time * 10)) + 2;
  
  var tween = TweenLite.to(circle, time, {delay: delay, ease: Expo.easeOut, alpha: 1, 
    onStart: function() {
      container.addChild(nextBitmap);
    },
    onUpdate: function() {
      angle += piece;
      endAngle = angle * Math.PI/180;
      circle.graphics.clear();
      circle.graphics.beginFill('red');
      circle.graphics.moveTo(0, 0);
      circle.graphics.arc(0, 0, radius, startAngle, endAngle);     
    }
  });
  this.arrTween.push(tween);
};
BEffect_ClockWise.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.BEffect_ClockWise = BEffect_ClockWise;

//////////BEffect_MultiZoom//////////
function BEffect_MultiZoom() {
  this.arrTween = [];
};
BEffect_MultiZoom.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {

  if (prevBitmap) {
    container.addChild(prevBitmap);
  }

  var w = nextBitmap.getBounds().width;
  var h = nextBitmap.getBounds().height;
  
  nextBitmap.cache(0, 0, w, h);
  
  var matrix = new createjs.Matrix2D(container.VC_WIDTH/ w, 0, 0, container.VC_WIDTH/ w, 0, (container.VC_HEIGHT - (container.VC_WIDTH/ w) * h)/2);      
  var bitmapData = new createjs.BitmapData(null, container.VC_WIDTH, container.VC_HEIGHT, 0x000000);
  bitmapData.draw(nextBitmap, matrix, null, null, null, true);

  var bitmapTop = new createjs.Bitmap(bitmapData.canvas);
  bitmapTop.scaleX = bitmapTop.scaleY = 0.3;
  bitmapTop.x = container.VC_WIDTH/2 - 0.3 * w / 2;
  bitmapTop.y = -0.3 * h / 2;
  container.addChild(bitmapTop);

  var bitmapBottom = new createjs.Bitmap(bitmapData.canvas);
  bitmapBottom.scaleX = bitmapBottom.scaleY = 0.3;
  bitmapBottom.x = container.VC_WIDTH/2 - 0.3 * w / 2;
  bitmapBottom.y = container.VC_HEIGHT - 0.3 * h / 2;
  container.addChild(bitmapBottom);

  var bitmapLeft = new createjs.Bitmap(bitmapData.canvas);
  bitmapLeft.scaleX = bitmapLeft.scaleY = 0.3;
  bitmapLeft.x = - 0.3 * w / 2;
  bitmapLeft.y = container.VC_HEIGHT/2 - 0.3 * h / 2;
  container.addChild(bitmapLeft);

  var bitmapRight = new createjs.Bitmap(bitmapData.canvas);
  bitmapRight.scaleX = bitmapRight.scaleY = 0.3;
  bitmapRight.x = container.VC_WIDTH - 0.3 * w / 2;
  bitmapRight.y = container.VC_HEIGHT/2 - 0.3 * h / 2;
  container.addChild(bitmapRight);

  bitmapTop.alpha = bitmapBottom.alpha = bitmapLeft.alpha = bitmapRight.alpha = 0;
  var tween = TweenLite.to(bitmapTop, time/2, {delay: delay, ease: Expo.easeOut, alpha: 0.3, x: container.VC_WIDTH/2 - 0.3 * w / 2, y: container.VC_HEIGHT/2 - 0.3 * h / 2,
    onComplete: onCompleteShowEffect, onCompleteParams: [bitmapTop]
  });
  this.arrTween.push(tween);

  tween = TweenLite.to(bitmapBottom, time/2, {delay: delay, ease: Expo.easeOut, alpha: 0.3, x: container.VC_WIDTH/2 - 0.3 * w / 2, y: container.VC_HEIGHT/2 - 0.3 * h / 2,
    onComplete:onCompleteShowEffect, onCompleteParams: [bitmapBottom]
  });
  this.arrTween.push(tween);
  
  tween = TweenLite.to(bitmapLeft, time/2, {delay: delay, ease: Expo.easeOut, alpha: 0.3, x: container.VC_WIDTH/2 - 0.3 * w / 2, y: container.VC_HEIGHT/2 - 0.3 * h / 2,
    onComplete: onCompleteShowEffect, onCompleteParams: [bitmapLeft]
  });
  this.arrTween.push(tween);

  tween = TweenLite.to(bitmapRight, time/2, {delay: delay, ease: Expo.easeOut, alpha: 0.3, x: container.VC_WIDTH/2 - 0.3 * w / 2, y: container.VC_HEIGHT/2 - 0.3 * h / 2,
    onComplete: onCompleteShowEffect, onCompleteParams: [bitmapRight]
  });
  this.arrTween.push(tween);

  var that = this;
  function onCompleteShowEffect(target) {
    tween = TweenLite.to(target, time/2, {alpha: 1, scaleX: 1, scaleY: 1, x: 0, y : 0, ease: Expo.easeIn,});
    that.arrTween.push(tween);
  }
  
};
BEffect_MultiZoom.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.BEffect_MultiZoom = BEffect_MultiZoom;

//////////BEffect_LeftRightMerge//////////
function BEffect_LeftRightMerge() {
  this.arrTween = [];
};
BEffect_LeftRightMerge.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {

  if (prevBitmap) {
    container.addChild(prevBitmap);
  }

  var w = nextBitmap.getBounds().width;
  var h = nextBitmap.getBounds().height;
  
  nextBitmap.cache(0, 0, w, h);
  
  var matrix = new createjs.Matrix2D(container.VC_WIDTH/ w, 0, 0, container.VC_WIDTH/ w, 0, (container.VC_HEIGHT - (container.VC_WIDTH/ w) * h)/2);      
  var bitmapData = new createjs.BitmapData(null, container.VC_WIDTH, container.VC_HEIGHT, 0x000000);
  bitmapData.draw(nextBitmap, matrix, null, null, null, true);

  var bitmapLeft = new createjs.Bitmap(bitmapData.canvas);
  bitmapLeft.x = - w;
  container.addChild(bitmapLeft);

  var maskLeft = new createjs.Shape();
  maskLeft.graphics.beginFill('#FF00FF').drawRect(0, 0, container.VC_WIDTH, container.VC_HEIGHT/2);
  bitmapLeft.mask = maskLeft;

  var bitmapRight = new createjs.Bitmap(bitmapData.canvas);
  bitmapRight.x = w;
  container.addChild(bitmapRight);

  var maskRight = new createjs.Shape();
  maskRight.graphics.beginFill('#FF00FF').drawRect(0, container.VC_HEIGHT/2, container.VC_WIDTH, container.VC_HEIGHT/2);
  bitmapRight.mask = maskRight;

  var tween = TweenLite.to(bitmapLeft, time, {delay: delay, ease: Expo.easeOut, x: 0});
  this.arrTween.push(tween);

  tween = TweenLite.to(bitmapRight, time, {delay: delay, ease: Expo.easeOut, x: 0});
  this.arrTween.push(tween);
};
BEffect_LeftRightMerge.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.BEffect_LeftRightMerge = BEffect_LeftRightMerge;

//////////BEffect_UpDownMerge//////////
function BEffect_UpDownMerge() {
  this.arrTween = [];
};
BEffect_UpDownMerge.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {

  if (prevBitmap) {
    container.addChild(prevBitmap);
  }

  var w = nextBitmap.getBounds().width;
  var h = nextBitmap.getBounds().height;
  
  nextBitmap.cache(0, 0, w, h);
  
  var matrix = new createjs.Matrix2D(container.VC_WIDTH/ w, 0, 0, container.VC_WIDTH/ w, 0, (container.VC_HEIGHT - (container.VC_WIDTH/ w) * h)/2);      
  var bitmapData = new createjs.BitmapData(null, container.VC_WIDTH, container.VC_HEIGHT, 0x000000);
  bitmapData.draw(nextBitmap, matrix, null, null, null, true);

  var bitmapUp = new createjs.Bitmap(bitmapData.canvas);
  bitmapUp.y = - h;
  container.addChild(bitmapUp);

  var maskUp = new createjs.Shape();
  maskUp.graphics.beginFill('#FF00FF').drawRect(0, 0, container.VC_WIDTH/2, container.VC_HEIGHT);
  bitmapUp.mask = maskUp;

  var bitmapDown = new createjs.Bitmap(bitmapData.canvas);
  bitmapDown.y = h;
  container.addChild(bitmapDown);

  var maskDown = new createjs.Shape();
  maskDown.graphics.beginFill('#FF00FF').drawRect(container.VC_WIDTH/2, 0, container.VC_WIDTH/2, container.VC_HEIGHT);
  bitmapDown.mask = maskDown;

  var tween = TweenLite.to(bitmapUp, time, {delay: delay, ease: Expo.easeOut, y: 0});
  this.arrTween.push(tween);

  tween = TweenLite.to(bitmapDown, time, {delay: delay, ease: Expo.easeOut, y: 0});
  this.arrTween.push(tween);
};
BEffect_UpDownMerge.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.BEffect_UpDownMerge = BEffect_UpDownMerge;

//////////BEffect_TopMerge//////////
function BEffect_TopMerge() {
  this.arrTween = [];
};
BEffect_TopMerge.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {
  if (prevBitmap) {
    container.addChild(prevBitmap);
  }

  var tween;
  //step 1: create temp bitmap with corrected size
  var w = nextBitmap.getBounds().width;
  var h = nextBitmap.getBounds().height;
  
  nextBitmap.cache(0, 0, w, h);
  
  var matrix = new createjs.Matrix2D(container.VC_WIDTH/ w, 0, 0, container.VC_WIDTH/ w, 0, (container.VC_HEIGHT - (container.VC_WIDTH/ w) * h)/2);      
  var bitmapData = new createjs.BitmapData(null, container.VC_WIDTH, container.VC_HEIGHT, 0x000000);
  bitmapData.draw(nextBitmap, matrix, null, null, null, true);
  
  var temp = new createjs.Container();
  container.addChild(temp); 
  
  //step 2: create and show bars
  var barWidth = 40;
  var barHeight = 40;
  var row = Math.ceil(container.VC_HEIGHT / barHeight);
  var col = Math.ceil(container.VC_WIDTH / barWidth);      
  var i, j;
  var bar;      
  var bitmap;
  var showTime = time / row;

  delay = delay ? delay : 0;
  
  for (i = 0; i < row; i ++) {
    for (j = 0; j < col; j ++) {
      bitmap = new createjs.Bitmap(bitmapData.canvas);
      bitmap.sourceRect = new createjs.Rectangle(barWidth * j, barHeight * i, barWidth, barHeight);
      temp.addChild(bitmap); 
      
      bitmap.orgX = barWidth * j;
      bitmap.orgY = barHeight * i;
      
      bitmap.x = container.VC_WIDTH/2;
      bitmap.y = container.VC_HEIGHT + 100;
      
      tween = TweenLite.to(bitmap, showTime, {x: bitmap.orgX, y: bitmap.orgY, delay: delay + 0.03 * i, onComplete: onCompleteShowEffect, onCompleteParams: [bitmap]});
      this.arrTween.push(tween);
    }
  }
  
  function onCompleteShowEffect(bitmap) {
    //temp.removeChild(bar);
  }
};
BEffect_TopMerge.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.BEffect_TopMerge = BEffect_TopMerge;

//////////BEffect_BottomMerge//////////
function BEffect_BottomMerge() {
  this.arrTween = [];
};
BEffect_BottomMerge.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {
  if (prevBitmap) {
    container.addChild(prevBitmap);
  }

  var tween;
  //step 1: create temp bitmap with corrected size
  var w = nextBitmap.getBounds().width;
  var h = nextBitmap.getBounds().height;
  
  nextBitmap.cache(0, 0, w, h);
  
  var matrix = new createjs.Matrix2D(container.VC_WIDTH/ w, 0, 0, container.VC_WIDTH/ w, 0, (container.VC_HEIGHT - (container.VC_WIDTH/ w) * h)/2);      
  var bitmapData = new createjs.BitmapData(null, container.VC_WIDTH, container.VC_HEIGHT, 0x000000);
  bitmapData.draw(nextBitmap, matrix, null, null, null, true);
  
  var temp = new createjs.Container();
  container.addChild(temp); 
  
  //step 2: create and show bars
  var barWidth = 40;
  var barHeight = 40;
  var row = Math.ceil(container.VC_HEIGHT / barHeight);
  var col = Math.ceil(container.VC_WIDTH / barWidth);      
  var i, j;
  var bar;      
  var bitmap;
  var showTime = time / row;
  delay = delay ? delay : 0;
  
  for (i = 0; i < row; i ++) {
    for (j = 0; j < col; j ++) {
      bitmap = new createjs.Bitmap(bitmapData.canvas);
      bitmap.sourceRect = new createjs.Rectangle(barWidth * j, barHeight * i, barWidth, barHeight);
      temp.addChild(bitmap); 
      
      bitmap.orgX = barWidth * j;
      bitmap.orgY = barHeight * i;
      
      bitmap.x = container.VC_WIDTH/2;
      bitmap.y = -100;
      
      tween = TweenLite.to(bitmap, showTime, {x: bitmap.orgX, y: bitmap.orgY, delay: delay + 0.03 * (row - i), onComplete: onCompleteShowEffect, onCompleteParams: [bitmap]});
      this.arrTween.push(tween);
    }
  }
  
  function onCompleteShowEffect(bitmap) {
    //temp.removeChild(bar);
  }
};
BEffect_BottomMerge.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.BEffect_BottomMerge = BEffect_BottomMerge;

//////////BEffect_HeartMask//////////
function BEffect_HeartMask()  {
  this.arrTween = [];
};
BEffect_HeartMask.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {
  var tween;
  var that = this;
  if (prevBitmap) {
    container.addChild(prevBitmap);
  }

  container.addChild(nextBitmap);

  var baseLen = 20;
  var heart = new createjs.Shape();
  heart.graphics.beginFill('red').moveTo(-baseLen, 0).arc(0, 0, baseLen, 0, Math.PI, false).lineTo(baseLen, 0).arc(baseLen, -baseLen, baseLen, Math.PI * 90 / 180, Math.PI * 270 / 180, true).lineTo(baseLen, -baseLen * 2).lineTo(-baseLen, -baseLen * 2).lineTo(-baseLen, 0).endFill();
  heart.rotation = -135;
  heart.scaleX = heart.scaleY = 0;
  heart.x = container.VC_WIDTH/2;
  heart.y = container.VC_HEIGHT/2;
  nextBitmap.mask = heart;

  var tween = TweenLite.to(heart, time, {scaleX: 100, scaleY: 100, delay: delay});
  this.arrTween.push(tween);

};
BEffect_HeartMask.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.BEffect_HeartMask = BEffect_HeartMask;

//////////BEffect_RotateLeft//////////
function BEffect_RotateLeft()  {
  this.arrTween = [];
};
BEffect_RotateLeft.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {
  var tween;
  var that = this;
  if (prevBitmap) {
    container.addChild(prevBitmap);
    prevBitmap.x = 0;
    prevBitmap.y = container.VC_HEIGHT;
    prevBitmap.regX = 0;
    prevBitmap.regY = container.VC_HEIGHT;
    prevBitmap.rotation = 0;
    tween = TweenLite.to(prevBitmap, time, { rotation: 90, delay: delay, ease: Expo.easeOut});
    this.arrTween.push(tween);
  }

  container.addChild(nextBitmap);
  nextBitmap.x = 0;  
  nextBitmap.y = container.VC_HEIGHT;  
  nextBitmap.regX = 0;
  nextBitmap.regY = container.VC_HEIGHT;
  nextBitmap.rotation = 270;
  tween = TweenLite.to(nextBitmap, time, { rotation: 360, delay: delay, ease: Expo.easeOut});
  this.arrTween.push(tween);
};
BEffect_RotateLeft.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.BEffect_RotateLeft = BEffect_RotateLeft;

//////////BEffect_RotateRight//////////
function BEffect_RotateRight()  {
  this.arrTween = [];
};
BEffect_RotateRight.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {
  var tween;
  var that = this;
  if (prevBitmap) {
    container.addChild(prevBitmap);
    prevBitmap.x = container.VC_WIDTH;
    prevBitmap.y = container.VC_HEIGHT;
    prevBitmap.regX = container.VC_WIDTH;
    prevBitmap.regY = container.VC_HEIGHT;
    prevBitmap.rotation = 0;
    tween = TweenLite.to(prevBitmap, time, { rotation: -90, delay: delay, ease: Expo.easeOut});
    this.arrTween.push(tween);
  }

  container.addChild(nextBitmap);
  nextBitmap.x = container.VC_WIDTH;
  nextBitmap.y = container.VC_HEIGHT;
  nextBitmap.regX = container.VC_WIDTH;
  nextBitmap.regY = container.VC_HEIGHT;  
  nextBitmap.rotation = 90;
  tween = TweenLite.to(nextBitmap, time, { rotation: 0, delay: delay, ease: Expo.easeOut});
  this.arrTween.push(tween);
};
BEffect_RotateRight.prototype.stop = function() {
  for (var i = 0; i < this.arrTween.length; i ++) {
    this.arrTween[i].pause();
  }
};
window.BEffect_RotateRight = BEffect_RotateRight;

////////////////////////////////////////////////////////////////////////////////////
///////////EFFEACT UTILS////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

var EffectUtils = function() {
  var arrEffect = [];
  
  return {
    addEffectPlugin : function(type, effect) {
      var isExist = false;
      for (var key in arrEffect) {
        if (key == type) {
          isExist = true;
          break;
        }
      }
      if (!isExist) {
        arrEffect[type] = effect;
      }
      return !isExist;
    },

    getEffectPlugin : function(type) {
      for (var key in arrEffect) {
        if (key == type) {
          return arrEffect[key];
        }
      }
    },
    
    formatTime: function(time) {
      var hour = Math.floor(time / 3600);
      var strHour = (hour > 9) ? ('' + hour)  : ('0' + hour);

      time = time % 3600;
      var minute = Math.floor(time / 60);
      var strMinute = (minute > 9) ? ('' + minute)  : ('0' + minute);

      time = time % 60;
      var second = Math.floor(time % 60);
      var strSecond = (second > 9) ? ('' + second)  : ('0' + second);

      if (hour > 0) {     
        return strHour + ':' + strMinute + ':' + strSecond;
      }
      return strMinute + ':' + strSecond;
    },

    getTimeByFrame: function(arrFrame, frameIndex) {
      var frameData;
      var totalTime = 0;
      for (var i = 0; i <= frameIndex; i ++) {
        totalTime += (arrFrame[i]).getDuration();
      }
      return totalTime;
    },

    getFrameByTime: function(arrFrame, position) {
      var frameData;
      var time = 0;
      for (var i = 0; i < arrFrame.length; i ++) {
        frameData = arrFrame[i];
        if (time + frameData.getDuration() >= position) {
          return i;
        }
        time += frameData.getDuration();
      }
      return -1;
    },

    getStartTimeOfFrameByTime: function(arrFrame, position) {
      var frameData;
      var time = 0;
      for (var i = 0; i < arrFrame.length; i ++) {
        frameData = arrFrame[i];
        if (time + frameData.getDuration() >= position) {
          return time;
        }
        time += frameData.getDuration();
      }
      return -1;
    },

    getBackgroundDataByTime: function(arrBG, time) {
      var bgData;
      var bgTime = 0;
      for (var i = 0; i < arrBG.length; i ++) {
        bgData = arrBG[i];
        if (bgTime <= time && (bgTime + bgData.time) >= time) {
          return bgData;
        }
        bgTime += bgData.time;
      }
      return null;
    },

    getAudioDataByTime: function(arrAudio, position) {
      var audioData;
      var time = 0;
      for (var i = 0; i < arrAudio.length; i ++) {
        audioData = arrAudio[i];
        if ((time + audioData.getTime()) >= position) {
          return {audioData: audioData, index: i, startTime: time};
        }
        time += audioData.getTime();
      }
      return null;
    }
  }
}();

EffectUtils.addEffectPlugin('TNone', new window['TEffect_None']());
EffectUtils.addEffectPlugin('TFade', new window['TEffect_Fade']());
EffectUtils.addEffectPlugin('TSlideLeft', new window['TEffect_SlideLeft']());
EffectUtils.addEffectPlugin('TSlideRight', new window['TEffect_SlideRight']());
EffectUtils.addEffectPlugin('TSlideUp', new window['TEffect_SlideUp']());
EffectUtils.addEffectPlugin('TSlideDown', new window['TEffect_SlideDown']());
EffectUtils.addEffectPlugin('TFastBounceText', new window['TEffect_FastBounceText']());
EffectUtils.addEffectPlugin('TStarLeft', new window['TEffect_StarLeft']());
EffectUtils.addEffectPlugin('TStarRight', new window['TEffect_StarRight']());
EffectUtils.addEffectPlugin('THeartLeft', new window['TEffect_HeartLeft']());
EffectUtils.addEffectPlugin('THeartRight', new window['TEffect_HeartRight']());
EffectUtils.addEffectPlugin('TCenterGo', new window['TEffect_CenterGo']());
EffectUtils.addEffectPlugin('TLightLeft', new window['TEffect_LightLeft']());
EffectUtils.addEffectPlugin('TLightRight', new window['TEffect_LightRight']());

EffectUtils.addEffectPlugin('BNone', new window['BEffect_None']());
EffectUtils.addEffectPlugin('BFade', new window['BEffect_Fade']());
EffectUtils.addEffectPlugin('BSlideLeft', new window['BEffect_SlideLeft']());
EffectUtils.addEffectPlugin('BSlideRight', new window['BEffect_SlideRight']());
EffectUtils.addEffectPlugin('BSlideUp', new window['BEffect_SlideUp']());
EffectUtils.addEffectPlugin('BSlideDown', new window['BEffect_SlideDown']());
EffectUtils.addEffectPlugin('BZoomIn', new window['BEffect_ZoomIn']());
EffectUtils.addEffectPlugin('BZoomOut', new window['BEffect_ZoomOut']());
EffectUtils.addEffectPlugin('BAlphaBars', new window['BEffect_AlphaBars']());
EffectUtils.addEffectPlugin('BSquareExplode', new window['BEffect_SquareExplode']());
EffectUtils.addEffectPlugin('BBrightSquares', new window['BEffect_BrightSquares']());
EffectUtils.addEffectPlugin('BClockWise', new window['BEffect_ClockWise']());
EffectUtils.addEffectPlugin('BMultiZoom', new window['BEffect_MultiZoom']());
EffectUtils.addEffectPlugin('BLeftRightMerge', new window['BEffect_LeftRightMerge']());
EffectUtils.addEffectPlugin('BUpDownMerge', new window['BEffect_UpDownMerge']());
EffectUtils.addEffectPlugin('BTopMerge', new window['BEffect_TopMerge']());
EffectUtils.addEffectPlugin('BBottomMerge', new window['BEffect_BottomMerge']());
EffectUtils.addEffectPlugin('BHeartMask', new window['BEffect_HeartMask']());
EffectUtils.addEffectPlugin('BRotateLeft', new window['BEffect_RotateLeft']());
EffectUtils.addEffectPlugin('BRotateRight', new window['BEffect_RotateRight']());

function PreviewVC() {
  this.curFrameIndex = -1;
  this.arrFrame = [];

  this.arrBG = [];
  this.arrAudio = [];

  this.container = new createjs.Container();

  this.bgContainer = this.container.addChild(new createjs.Container());
  this.bitmapContainer = this.container.addChild(new createjs.Container());
  this.textContainer = this.container.addChild(new createjs.Container());
  
  this.VC_WIDTH = 0;
  this.VC_HEIGHT = 0;

  this.loading = null;
  this.previewSetting = null;
  this.videoInstance = null;

  this.playedTime = 0;
  this.duration = 0;
  this.timeoutId = null;
  this.psTimeout = null;

  this.frameTimeoutId = null;
  this.textEffectPlugin = null;
  this.bitmapEffectPlugin = null;
  this.frameAudioInstance = null;
  this.audioInstance = null;

  this.arrId = [];
  this.isPlaying = false;
};

PreviewVC.prototype.setData = function(arrBG, arrAudio, arrFrame, stage, width, height, loading, video, previewSetting) {
  
  var that = this;

  this.isPlaying = false;
  this.arrBG = arrBG;
  this.arrAudio = arrAudio;
  this.arrFrame = arrFrame;
  this.loading = loading;
  this.videoInstance = video;
  this.previewSetting = previewSetting;
  this.arrId = [];

  //add events - refactor later
  var videoClip = that.previewSetting.parent()[0];

  this.previewSetting.find('.play-pause').off('click').on('click', function(evt) {
    onPlayStopHandler(evt);
  });

  this.previewSetting.find('.time').off('click').on('click', function(evt) {
    
    var timeLeft = that.previewSetting.find('.time').offset().left;
    var timeWith = that.previewSetting.find('.time').width();

    var curTime = Math.floor((evt.pageX - timeLeft) * that.duration / timeWith);

    that.seek(curTime);
  });

  function onPlayStopHandler(evt) {
    that.isPlaying = !that.isPlaying;

    if (that.isPlaying) {
      that.play();
    } else {
      that.stop();
    }
  };

  this.previewSetting.find('.full-screen').off('click').on('click', function(evt) {
    $(videoClip).toggleClass('full-screen');

    if ($(videoClip).hasClass('full-screen')) {
      that.gotoFullscreen(videoClip);      
      that.resize($(videoClip).width(), $(videoClip).height());

    } else {
      that.exitFullscreen();
    }
  });

  document.addEventListener("fullscreenchange", function(evt) { onFullScreenChange(evt);});
  document.addEventListener("webkitfullscreenchange", function(evt) { onFullScreenChange(evt);});
  document.addEventListener("mozfullscreenchange", function(evt) { onFullScreenChange(evt);});
  document.addEventListener("MSFullscreenChange", function(evt) { onFullScreenChange(evt);});

  function onFullScreenChange(evt) {
    var isFullScreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;

    if (!isFullScreen) {
     $(videoClip).removeClass('full-screen');
    }
  };

  this.textContainer.removeAllChildren();
  this.bitmapContainer.removeAllChildren();
  stage.addChild(this.container);

  this.VC_WIDTH = this.textContainer.VC_WIDTH = this.bitmapContainer.VC_WIDTH = width;
  this.VC_HEIGHT = this.textContainer.VC_HEIGHT = this.bitmapContainer.VC_HEIGHT = height;
  
  //duration
  var frameData;
  this.duration = 0;
  for (var i = 0; i < this.arrFrame.length; i ++) {
    frameData = this.arrFrame[i];
    this.duration += frameData.getDuration();
  }

  //this.loadNextBackgroundImage(0);
  this.loadNextImage(0);
};

PreviewVC.prototype.gotoFullscreen = function(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
};

PreviewVC.prototype.exitFullscreen = function() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};

/*
PreviewVC.prototype.loadNextBackgroundImage = function(index) {

  if (index >= this.arrBG.length) {
    this.loadNextImage(0);
    return;
  }

  if (this.arrBG[index].url == null) {
    index ++;
    this.loadNextBackgroundImage(index);
    return;
  }

  var that = this;
  this.loading.show();

  var image = new Image();
  image.onload = function(evt) {
    that.arrBG[index].imageView = image;
    
    index ++;
    that.loadNextBackgroundImage(index);
  };
  image.src = this.arrBG[index].url;
};
*/

PreviewVC.prototype.loadNextImage = function(index) {

  if (index >= this.arrFrame.length) {
    this.loadNextAudio(0);
    return;
  }

  if (this.arrFrame[index].bitmapUrl == null) {
    index ++;
    this.loadNextImage(index);
    return;
  }

  var that = this;
  this.loading.show();

  var image = new Image();
  image.onload = function(evt) {
    that.arrFrame[index].imageView = image;
    
    index ++;
    that.loadNextImage(index);
  };
  image.src = this.arrFrame[index].bitmapUrl;
};

PreviewVC.prototype.loadNextAudio = function(index) {

  if (index >= this.arrAudio.length) {
    this.loadNextVideo(0);
    return;
  }

  var that = this;
  this.loading.show();

  var audioData = this.arrAudio[index];
  if (audioData.url == null) {
    index++;
    that.loadNextAudio(index);
    return;
  }

  var existIndex = this.arrId.indexOf(audioData.id);
  if (existIndex != -1) {
    audioData.audioInstance = this.arrAudio[existIndex].audioInstance;
    index++;
    that.loadNextAudio(index);
    return;
  }

  createjs.Sound.addEventListener("fileload", onAudioLoadHandler);
  createjs.Sound.registerSound({id: audioData.id, src: audioData.url});

  function onAudioLoadHandler(evt) {
    that.arrId.push(audioData.id);
    createjs.Sound.removeEventListener("fileload", onAudioLoadHandler);

    audioData.audioInstance = createjs.Sound.createInstance(audioData.id);
    
    index ++;
    that.loadNextAudio(index);
  };
};

/*
PreviewVC.prototype.loadNextFrameAudio = function(index) {

  if (index >= this.arrFrame.length) {
    this.loadNextVideo(0);
    return;
  }

  var that = this;
  this.loading.show();

  var frameData = this.arrFrame[index];
  if (frameData.audioUrl == null) {
    index++;
    this.loadNextFrameAudio(index);
    return;
  }

  createjs.Sound.addEventListener("fileload", onFrameAudioLoadHandler);
  createjs.Sound.registerSound({id: frameData.audioId, src: frameData.audioUrl});

  function onFrameAudioLoadHandler(evt) {
    createjs.Sound.removeEventListener("fileload", onFrameAudioLoadHandler);

    frameData.audioInstance = createjs.Sound.createInstance(frameData.audioId);

    index ++;
    that.loadNextFrameAudio(index);
  };
};
*/

PreviewVC.prototype.loadNextVideo = function(index) {
  if (index >= this.arrFrame.length) {
    this.play();
    return;
  }

  if (this.arrFrame[index].videoUrl == null) {
    index ++;
    this.loadNextVideo(index);
    return;
  }

  var that = this;
  this.loading.show();

  var queue = new createjs.LoadQueue();
  queue.on("fileload", onFileLoadHandler);
  //queue.on("complete", onCompleteHandler);
  queue.loadFile({id: this.arrFrame[index].videoId, src: this.arrFrame[index].videoUrl, type: createjs.AbstractLoader.BINARY});
  
  function onFileLoadHandler(evt) {
    queue.off("fileload", onFileLoadHandler);
  //}
  //
  //function onCompleteHandler(evt) {
  //  queue.off("complete", onCompleteHandler);

    var blob = new Blob([evt.result], { type: "video/mp4" } );
    var URLCreator = window.URL || window.webkitURL;
    var objUrl = URLCreator.createObjectURL(blob);

    that.arrFrame[index].videoView = objUrl;

    index ++;
    that.loadNextVideo(index);
  }
}; 

PreviewVC.prototype.createBitmap = function(image) {
  var w = image.width;
  var h = image.height;
  
  //find corrected scale
  var scale = this.VC_WIDTH / w;
  if(h * scale > this.VC_HEIGHT) {
    scale = this.VC_HEIGHT / h;
  }

  var translateX = (this.VC_WIDTH - scale * w)/2;
  var translateY = (this.VC_HEIGHT - scale * h)/2;

  var matrix = new createjs.Matrix2D(scale, 0, 0, scale, translateX, translateY);
  var bitmapData = new createjs.BitmapData(image, this.VC_WIDTH, this.VC_HEIGHT, 0x000000);
  bitmapData.draw(image, matrix, null, null, null, true);

  return new createjs.Bitmap(bitmapData.canvas);
};

PreviewVC.prototype.createText = function(textData, textView) {

  var frameText =  textView;
  if (!frameText) {
    frameText = new createjs.Text("Text", "20px Arial", "#FF7700");
  }

  frameText.text = textData.text;
  frameText.font = textData.style + ' ' + textData.size + 'px ' + textData.fontName;
  frameText.color = textData.color;
  frameText.textAlign = textData.halign;

  if (textData.halign == TextData.HA_LEFT) {
    frameText.x = textData.padding;
  }
  else if (textData.halign == TextData.HA_CENTER) {
    frameText.x = this.VC_WIDTH/2;
  }
  else if (textData.halign == vHA_RIGHT) {
    frameText.x = this.VC_WIDTH - textData.padding;
  }
  
  var textHeight = frameText.getBounds() ? frameText.getBounds().height : 0;
  if (textData.valign == TextData.VA_TOP) {
    frameText.y = textData.padding;
  }
  else if (textData.valign == TextData.VA_MIDDLE) {
    frameText.y = this.VC_HEIGHT/2 - textHeight/2;
  }
  else if (textData.valign == TextData.VA_BOTTOM) {
    frameText.y = this.VC_HEIGHT - textHeight - textData.padding;
  }

  return frameText;
};

PreviewVC.prototype.playAudio = function(audioIndex, startTime) {
    this.nextAudio(audioIndex, startTime);
}

PreviewVC.prototype.nextAudio = function(index, startTime) {
  if (this.isPlaying == false) {
    return;
  }

  var that = this;
  if (index >= 0 && index < this.arrAudio.length) {
    var audioData = this.arrAudio[index];

    this.audioInstance = audioData.audioInstance;

    if (!audioData.audioInstance) {

      var ti = setTimeout(function() {
        clearTimeout(ti);
        index ++;
        that.nextAudio(index);
      }, startTime ? (audioData.time - startTime) * 1000 : audioData.time * 1000);

      return;
    }

    var isEnd = false;

    function onAudioPlayProgressHandler(evt) {
      if (audioData.audioInstance) {

        //volume up when start
        if (audioData.audioInstance.volume < 1 && isEnd == false) {
          audioData.audioInstance.volume += 0.009;
        }

        //volume down when end
        if (audioData.end == -1) {
          if (audioData.audioInstance.position/1000 + 4 >= audioData.audioInstance.duration/1000) {
            isEnd = true;
            audioData.audioInstance.volume -= 0.03;
          }
        } else {
          if (audioData.audioInstance.position/1000 + 4 >= audioData.end) {
            isEnd = true;
            audioData.audioInstance.volume -= 0.03;
          }
        }

        //audioData.audioInstance.volume = audioData.audioInstance.volume += 0.008;

        if (audioData.end != -1 && audioData.end <= audioData.audioInstance.position/1000) {
          audioData.audioInstance.stop();
          clearInterval(audioData.audioInstance.playProgressTimeout);
          audioData.audioInstance.removeAllEventListeners();
          
          index ++;
          that.nextAudio(index);
        }
      }
    }

    function onAudioPlayCompleteHandler(evt) {
      if (audioData.audioInstance) {
        clearInterval(audioData.audioInstance.playProgressTimeout);
        audioData.audioInstance.removeAllEventListeners();
      }
      
      index ++;
      that.nextAudio(index);
    }

    audioData.audioInstance.volume = 0;
    audioData.audioInstance.position = startTime ? startTime * 1000 : audioData.start * 1000;
    audioData.audioInstance.play();
    audioData.audioInstance.on("complete", onAudioPlayCompleteHandler);
    audioData.audioInstance.playProgressTimeout = setInterval(onAudioPlayProgressHandler, 100);
  }
};

PreviewVC.prototype.nextFrame = function() {
  if (this.isPlaying == false) {
    return;
  }

  this.curFrameIndex ++;
  if (this.curFrameIndex < this.arrFrame.length) {
    
    var preFrameData;
    if (this.curFrameIndex > 0) {
      preFrameData = this.arrFrame[this.curFrameIndex - 1];
    }
    
    var that = this;

    var nexFrameData = this.arrFrame[this.curFrameIndex];
    
    this.playFrame(preFrameData, nexFrameData, function() { 
      that.nextFrame(); 
    });
  }
};

PreviewVC.prototype.playFrame = function(prev, next, callback) {
  if (this.isPlaying == false) {
    return;
  }

  var that = this;

  //play video or play sound
  this.container.visible = true;
  this.bgContainer.visible = (next.type == FrameData.VIDEO) ? false : true;

  //text effect
  if (next.text.text != '') {
    //next.textView = this.createText(next.text, next.textView);

    this.textEffectPlugin = EffectUtils.getEffectPlugin(next.textEffect);
    if (this.textEffectPlugin) {
      this.textEffectPlugin.play(this.textContainer, prev ? prev.textView : null, next);
    }
  } else {
    this.textEffectPlugin = null;
    this.textContainer.removeAllChildren();
  }

  //bitmap effect
  if (next.bitmapUrl != null) {
    next.bitmapView = this.createBitmap(next.imageView);

    this.bitmapEffectPlugin = EffectUtils.getEffectPlugin(next.bitmapEffect);
    if (this.bitmapEffectPlugin) {
      this.bitmapEffectPlugin.play(this.bitmapContainer, prev && prev.bitmapUrl != null ? prev.bitmapView : null, next.bitmapView, next.bitmapEffectDelay, next.bitmapEffectDuration); 
    }
  } else {
    this.bitmapEffectPlugin = null;
    this.bitmapContainer.removeAllChildren();
  }

  //video 
  if ($(this.videoInstance).attr('src') != '') {
    $(this.videoInstance).animate({opacity: 0}, 2000);
  }

  $(this.videoInstance).attr('src', '');
  $(this.videoInstance).css('opacity', 1);
  
  if (next.type == FrameData.VIDEO && next.videoView != null) {
    $(this.videoInstance).attr('src', next.videoView);
    $(this.videoInstance).css('opacity', 0);
    $(this.videoInstance).animate({opacity: 1}, 2000);
    
    $(this.videoInstance).off('timeupdate').on('timeupdate', function(evt) {

      if (next.videoEnd != -1 && that.videoInstance.currentTime >= next.videoEnd) {
        that.videoInstance.pause();
      }
    });

    this.videoInstance.play();
  }

  //audio
  /*
  if (prev && prev.audioInstance) {
    clearInterval(prev.audioInstance.playProgressTimeout);
    prev.audioInstance.removeAllEventListeners();
    prev.audioInstance.stop();
  }

  if (next.audioInstance) {
    next.audioInstance.on("complete", onAudioPlayCompleteHandler);
    next.audioInstance.playProgressTimeout = setInterval(onAudioPlayProgressHandler, 100);

    function onAudioPlayProgressHandler(evt) {
      if (next.audioEnd != -1 && next.audioInstance.position/1000 >= next.audioEnd) {
        clearInterval(next.audioInstance.playProgressTimeout);
        next.audioInstance.removeAllEventListeners();
        next.audioInstance.stop();
      }
    }

    function onAudioPlayCompleteHandler(evt) {
      if (next.audioInstance) {
        clearInterval(next.audioInstance.playProgressTimeout);
        next.audioInstance.removeAllEventListeners();
      }
    } 

    next.audioInstance.position = next.audioStart * 1000;
    next.audioInstance.play();
  }  
  this.frameAudioInstance = next.audioInstance;
  */

  //frame duration timeout
  this.frameTimeoutId = setTimeout(function() {
    clearTimeout(that.frameTimeoutId);
    callback();
  }, next.getDuration() * 1000);
};

PreviewVC.prototype.playBackground = function(time) {
  var bgData = EffectUtils.getBackgroundDataByTime(this.arrBG, time);

  if (!bgData || !bgData.url) {
    this.bgContainer.url = null;
    this.bgContainer.removeAllChildren();
  }

  else if (this.bgContainer.url != bgData.url) {
    this.bgContainer.url = bgData.url;
    this.bgContainer.removeAllChildren();
    this.bgContainer.addChild(this.createBitmap(bgData.imageView));
  }
};

PreviewVC.prototype.startTime = function() {
  var that = this;
  
  //background image
  //next.bitmapView = this.createBitmap(next.imageView);

  this.previewSetting.find('.duration').html(EffectUtils.formatTime(this.duration));

  this.timeoutId = setInterval(function() {
    if (!that.isPlaying) {
      return;
    }

    that.playedTime += 100;
    that.previewSetting.find('.position').html(EffectUtils.formatTime(that.playedTime/1000));
    that.previewSetting.find('.timeline').css('width', Math.floor(100 * that.playedTime / (that.duration * 1000)) + '%');

    //show background image here
    //that.playBackground(that.playedTime / 1000);

    if (that.playedTime >= that.duration * 1000) {
      clearInterval(that.timeoutId);
      that.stop();
    } 
  }, 100);
};

PreviewVC.prototype.resize = function(width, height) {
  this.VC_WIDTH = width;
  this.VC_HEIGHT = height;

  if (this.bitmapContainer && this.textContainer) {
    this.textContainer.VC_WIDTH = this.bitmapContainer.VC_WIDTH = width;
    this.textContainer.VC_HEIGHT = this.bitmapContainer.VC_HEIGHT = height;
  }

  if (this.arrFrame.length) {
    this.seek(this.playedTime/1000);
  } 
};

PreviewVC.prototype.play = function() {
  var that = this;

  this.loading.hide();
  this.previewSetting.show();
  this.previewSetting.find('.play-pause span').removeClass('fa fa-play').addClass('fa fa-stop');

  this.isPlaying = true;
  this.curFrameIndex = -1;
  this.nextFrame();
  this.playAudio(0);

  this.playedTime = 0;
  this.startTime();

  this.hideSetting();
  $('.video-clip').off('mousemove').on('mousemove', function(evt) {
    that.showSetting();
  });
};

PreviewVC.prototype.hideSetting = function() {
  var that = this;
  clearTimeout(that.psTimeout);
  this.psTimeout = setTimeout(function() {
    clearTimeout(that.psTimeout);
    that.previewSetting.hide();
  }, 5000);
};

PreviewVC.prototype.showSetting = function() {
   clearTimeout(this.psTimeout);
   this.previewSetting.show();
   this.hideSetting();
};

PreviewVC.prototype.pause = function() {

};

PreviewVC.prototype.stop = function() {
  clearInterval(this.timeoutId);
  clearTimeout(this.psTimeout);
  $('.video-clip').off('mousemove');

  this.isPlaying = false;
  
  this.textContainer.removeAllChildren();
  this.bitmapContainer.removeAllChildren();
  this.bgContainer.removeAllChildren();

  this.previewSetting.find('.play-pause span').removeClass('fa fa-stop').addClass('fa fa-play');
  this.previewSetting.find('.position').html(EffectUtils.formatTime(0));
  this.previewSetting.find('.timeline').css('width', '0%');
  this.previewSetting.show();

  $(this.videoInstance).attr('src', '');

  if (this.audioInstance) {
    this.audioInstance.stop();
    clearInterval(this.audioInstance.playProgressTimeout);
    this.audioInstance.removeAllEventListeners();
    this.audioInstance = null;
  }

  /*
  if (this.curFrameIndex >=0 && this.curFrameIndex< this.arrFrame.length) {
    var frameData = this.arrFrame[this.curFrameIndex];

    if (frameData.audioInstance) {
      clearInterval(frameData.audioInstance.playProgressTimeout);
      frameData.audioInstance.stop();
    }
  }
  */

  createjs.Sound.stop();
  createjs.Sound.removeAllEventListeners();
  this.exitFullscreen();
};

PreviewVC.prototype.seek = function(position) {
  var that = this;

  clearInterval(this.timeoutId);
  clearInterval(this.frameTimeoutId);

  //stop current frame
  this.isPlaying = false;

  if (this.textEffectPlugin) {
    this.textEffectPlugin.stop();
  }

  if (this.bitmapEffectPlugin) {
    this.bitmapEffectPlugin.stop();
  }

  //video 
  $(this.videoInstance).attr('src', '');
  $(this.videoInstance).off('timeupdate');

  this.bgContainer.url = null;
  this.bgContainer.removeAllChildren();

  this.textContainer.removeAllChildren();
  this.bitmapContainer.removeAllChildren();

  /*
  if (this.frameAudioInstance) {
    clearInterval(this.frameAudioInstance.playProgressTimeout);
    this.frameAudioInstance.stop();
    this.frameAudioInstance.removeAllEventListeners();
    this.frameAudioInstance = null;
  }
  */
  
  if (this.audioInstance) {
    this.audioInstance.stop();
    clearInterval(this.audioInstance.playProgressTimeout);
    this.audioInstance.removeAllEventListeners();
    this.audioInstance = null;
  }

  //find the frame by time and play
  var frameIndex = EffectUtils.getFrameByTime(this.arrFrame, position);

  this.isPlaying = true;

  this.curFrameIndex = frameIndex - 1;
  this.nextFrame();
  
  this.playedTime = EffectUtils.getStartTimeOfFrameByTime(this.arrFrame, position) * 1000;
  
  var obj = EffectUtils.getAudioDataByTime(this.arrAudio, this.playedTime / 1000);
  if (obj) {
    var startTime = this.playedTime/1000 - obj.startTime;
    startTime = obj.audioData.start +  startTime;

    this.playAudio(obj.index, startTime);
  }
  
  this.startTime();

  this.previewSetting.show();
  this.previewSetting.find('.play-pause span').removeClass('fa fa-play').addClass('fa fa-stop');

  this.hideSetting();
  $('.video-clip').off('mousemove').on('mousemove', function(evt) {
    that.showSetting();
  });
};

PreviewVC.prototype.clear = function(clearSound) {
  clearInterval(this.timeoutId);
  clearInterval(this.frameTimeoutId);

  //stop current frame
  this.isPlaying = false;

  if (this.textEffectPlugin) {
    this.textEffectPlugin.stop();
  }

  if (this.bitmapEffectPlugin) {
    this.bitmapEffectPlugin.stop();
  }

  //video 
  $(this.videoInstance).attr('src', '');
  $(this.videoInstance).off('timeupdate');

  this.bgContainer.url = null;
  this.bgContainer.removeAllChildren();

  this.textContainer.removeAllChildren();
  this.bitmapContainer.removeAllChildren();

  /*
  if (this.frameAudioInstance) {
    clearInterval(this.frameAudioInstance.playProgressTimeout);
    //this.frameAudioInstance.stop();
    this.frameAudioInstance.removeAllEventListeners();
    this.frameAudioInstance = null;
  }
  */
  
  if (this.audioInstance) {
    clearInterval(this.audioInstance.playProgressTimeout);
    //this.audioInstance.stop();
    this.audioInstance.removeAllEventListeners();
    this.audioInstance = null;
  }
  
  $('.video-clip').off('mousemove');

  this.container.visible = false;
  
  if (this.previewSetting) {
    this.previewSetting.find('.play-pause span').removeClass('fa fa-stop').addClass('fa fa-play');
    this.previewSetting.hide();
  }

  if (createjs.Sound) {
    createjs.Sound.stop();
    createjs.Sound.removeAllSounds();
    createjs.Sound.removeAllEventListeners();
  }
};

/* =================
 * VideoClipShare.js
  TO DO:
  
 * ================= */

;(function($, window, createjs, App) {

  "use strict"; 

  /* =============== */
  /* MODULE DEFAULTS */
  /* =============== */

  var defaults = {};
  var pluginName = 'videoclip-share';

  /* ================= */
  /* MODULE DEFINITION */
  /* ================= */

  function VideoClipShare(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, options);

    this.arrFrame = [];
    this.arrBG = []
    this.arrBGAudio = []
    
    this.canvas = null;
    this.stage = null;
    
    this.previewVC = new PreviewVC(); 

    return this.init();
  }

  /* ============== */
  /* MODULE METHODS */
  /* ============== */

  VideoClipShare.prototype.init = function() {

    var that = this;

    createjs.Sound.alternateExtensions = ["mp3", "m4a", "wav"];
    createjs.Sound.registerPlugins([createjs.WebAudioPlugin]);
    
    this.canvas = document.getElementById('cvsVC');
    this.stage = new createjs.Stage("cvsVC");
    
    createjs.Ticker.addEventListener("tick", function() { that.stage.update(); });
    
    $(window).on('resize', function(evt) { that.resize(); });
    this.resize();

    var vcid = this.getParameterByName('vcid');
    var url = "http://localhost:3001/wedding/public/server/videoclip/frames/" + vcid + "/" + vcid + ".json"
    
    var ajax = $.ajax({
      url: url,
      method: "GET",
      data: { id : '' },
      dataType: "json"
    });
     
    ajax.done(function(data) {
      try {
        that.parseData(data);
      } catch(err) {}
    });
     
    ajax.fail(function(jqXHR, textStatus) {
    });
  };

  VideoClipShare.prototype.resize = function() {
    var videoClip = $('.video-clip');
    this.canvas.width = videoClip.width();
    this.canvas.height = videoClip.height();

    this.previewVC.resize(this.canvas.width, this.canvas.height);
  };

  VideoClipShare.prototype.getParameterByName = function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  VideoClipShare.prototype.parseData = function(data) {

    var frames = data.frames;
    var frameData;
    for (var i = 0; i < frames.length; i ++) {
      frameData = new FrameData();
      frameData.parse(frames[i]);
      this.arrFrame.push(frameData);
    }

    var backgrounds = data.backgrounds;
    var bgData;
    for (var i = 0; i < backgrounds.length; i ++) {
      bgData = new BackgroundData();
      bgData.parse(backgrounds[i]);
      this.arrBG.push(bgData);
    }

    var audios = data.audios;
    var audioData;
    for (var i = 0; i < audios.length; i ++) {
      audioData = new AudioData();
      audioData.parse(audios[i]);
      this.arrBGAudio.push(audioData);
    }

    this.preview();
  };

  VideoClipShare.prototype.preview = function() {
    this.previewVC.setData(this.arrBG, this.arrBGAudio, this.arrFrame, this.stage, this.canvas.width, this.canvas.height, $('.vc-loading-wrapp'), document.getElementById('video'), $('.preview-setting'));
  };

  /* =============== */
  /* MODULE DATA-API */
  /* =============== */

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new VideoClipShare(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({});
  });

}(window.jQuery, window, window.createjs, window.App));

/**
 *  @name read-more
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  var pluginName = 'add-phone';
  

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
          ele = that.element;
      var i = 1; 
      ele.find('.add-more-phone').on('click.'+ pluginName, function(){
        var self = $(this),
            nameItem = self.prev('.wrap').find('input').attr('name');
        var numberappend = $('<div class="item-more"><input type="number" name="'+nameItem+'-'+ i + '" value="" autocomplete="off" class="input-1 more-input" placeholder=""><a class="delete" href="javascript:void(0);" title="delete"><span class="fa fa-minus"></span></div>');
        self.prev('.wrap').append(numberappend);
        self.addClass('center-block');  
        self.prev('.wrap').addClass('wrap-more');
        ele.find('.item-more .delete').on('click.'+ pluginName, function(){
          $(this).closest('.item-more').remove();
          if (self.prev('.wrap').children().length === 1) {
            self.prev('.wrap').removeClass('wrap-more')
              .end().removeClass('center-block');
          }
        });
        
        i++;
      });
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
 /**
 *  @name Select
 *  @description Custom select boxes
 *  @version 1.0
 *  @options
      effect (String) show (default), fade, slide
      duration (Number) 500
 *  @events
      onSelected (Array) (value, text)
 *  @methods
 *    init
 *    offsetSelect
 *    toggle
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'gmapFilter',
      win = $(window);

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
        ele = that.element;
      that.vars = {
        lat: ele.data('lat'),
        lng: ele.data('long'),
        deskOpts: {panControl: true, zoomControl: true, streetViewControl: true},
        mobileOpts: {panControl: false, zoomControl: false, streetViewControl: false},
        markers: []
      };

      window.google.maps.event.addDomListener(window, 'load', function(){
        that.initMap();
      });
    },
    initMap: function(){
      var that = this,
      centerMarker, centerPoint, mapOptions;
      var mapsInitialize = function(){
        centerPoint = new google.maps.LatLng(that.vars.lat, that.vars.lng);
        that.infoWindow = new google.maps.InfoWindow();
        mapOptions = {
          center: centerPoint,
          zoom: 17,
          mapTypeIds: google.maps.MapTypeId.ROADMAP,
          zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE
          }
        };
        that.vars.map = new google.maps.Map(that.element.get(0), mapOptions);

        centerMarker = new google.maps.Marker({
          position: centerPoint,
          map: that.vars.map,
          icon: that.element.data('icon-marker') || '',
          template: that.element.data('template') || ''
        });

        google.maps.event.addListener(centerMarker, "click", function (e) {
          that.infoWindow.setContent(this.template);
          that.infoWindow.open(that.vars.map, this);
        })
        that.vars.centerPoint = centerPoint;
        that.vars.centerMarker = centerMarker;
        that.vars.centerMarker = centerMarker;
      };
      if (that.vars.markers.length){
        google.maps.event.trigger(that.vars.map, "resize");
        that.infoWindow.setContent(this.template);
        that.drawMarkers();
      }
      else{
        mapsInitialize();
      }
    },
    clearMarkers: function(){
      var that = this;
      if (that.vars.markers.length) 
      {
        for (var i in that.vars.markers) 
        {
          that.vars.markers[i].setMap(null);
        }
        that.vars.markers = [];
      }
    },
    updateLatLng: function(LatLng){
      var that = this;
      that.LatLng = LatLng;
    },
    drawMarkers: function(){
      var that = this,
      ele = that.element,
      LatLng = that.LatLng;
      var bounds = new google.maps.LatLngBounds();
      
      that.clearMarkers();
      for(var i=0; i < LatLng.length; i ++){
        var marker = new google.maps.Marker({
          position: LatLng[i],
          map: that.vars.map,
          icon: that.element.data('icon-marker') || '',
          template: LatLng[i].template
        });
        bounds.extend(marker.position);
        that.vars.markers.push(marker);
        google.maps.event.addListener(marker, "click", function (e) {
          that.infoWindow.setContent(this.template);
          that.infoWindow.open(that.vars.map, this);
        });
      };

      function getBoundsZoomLevel(bounds, mapDim) {
        var WORLD_DIM = { height: 256, width: 256 };
        var ZOOM_MAX = 21;

        function latRad(lat) {
          var sin = Math.sin(lat * Math.PI / 180);
          var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
          return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
        }

        function zoom(mapPx, worldPx, fraction) {
          return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
        }

        var ne = bounds.getNorthEast();
        var sw = bounds.getSouthWest();

        var latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;
        
        var lngDiff = ne.lng() - sw.lng();
        var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;
        
        var latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
        var lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

        return Math.min(latZoom, lngZoom, ZOOM_MAX);
      }

      var mapDim = {
        height: ele.height(),
        width: ele.width()
      }
      that.vars.map.fitBounds(bounds);
      that.vars.map.setZoom(getBoundsZoomLevel(bounds, mapDim));
    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
  };

  $(function() {
    if(typeof google !=='undefined'){
      if($('[data-gmap]').is(':visible')){
        $('[data-gmap]')[pluginName]();
      }
      var sideBarLeft = $('.col-md-3.sidebar-left');
      if(!sideBarLeft){
        return;
      }

      var groupBtn = $('.group-button button', sideBarLeft);
      var rsBtn = groupBtn.eq(0);
      var ftBtn = groupBtn.eq(1);
      var fiterItem = $('.find-block :checkbox, .find-block :radio', sideBarLeft);
      var counter = $('.counter span', sideBarLeft);
      var albumContent = $('#tab-01').find('.col');
      var getUrlProvider = $('[data-gmap]', $('#tab-02')).data('url');

      var ajaxCall = function(url, dataItems){
        var gmap = $('[data-gmap]', $('#tab-02'));
        $.ajax({
          url: url,
          data: dataItems,
          success: function(res){
            albumContent.html(res.addressData);
            if(!gmap.data('gmapFilter')){
              gmap.gmapFilter();
              gmap.gmapFilter('initMap');
            }
            if(gmap.length){
              gmap.gmapFilter('updateLatLng', res.latlongData);
              gmap.gmapFilter('drawMarkers');
            }
          }
        });
      };

      ajaxCall(getUrlProvider, fiterItem);

      albumContent.delegate('.icon-prev-heart, .icon-next-heart', 'click.direction', function(e){
        e.preventDefault();
        var el = $(this);
        var wrapper = el.parent();
        if(!el.hasClass('disabled')){
          ajaxCall(wrapper.attr('href'), fiterItem);
        }
      });
      
      fiterItem.off('change.selectFilter').on('change.selectFilter', function(e){
        e.preventDefault();
        counter.text(fiterItem.filter(':checked').length);
      });
      rsBtn.off('click.resetFilter').on('click.resetFilter', function(e){
        e.preventDefault();
        fiterItem.prop('checked', false).closest('div').removeClass('checked');
        counter.text(fiterItem.filter(':checked').length);
        ajaxCall(rsBtn.data('url-default'), fiterItem);
      }).trigger('click.resetFilter');
      ftBtn.off('click.fiterAddress').on('click.fiterAddress', function(e){
        e.preventDefault();
        ajaxCall('data/filter.json', fiterItem);
      });
    }
  });

}(jQuery, window));

/* =========
 * back-to-top.js
 * ========= */

(function($, App) {

  "use strict";

  /* ============== */
  /* MODULE TRIGGER */
  /* ============== */

  var scrollTopTrigger = '.backtotop',
      win = $(window);

  /* =============== */
  /* MODULE DEFAULTS */
  /* =============== */

  var defaults = {
    appearTimeout: 500,
    scrollTimeout: 1000,
    limitTop: 10
  };

  /* ================= */
  /* MODULE DEFINITION */
  /* ================= */

  function BackToTop(opts) {
    this.settings = $.extend({}, defaults, opts);
    return this.init();
  }

  /* ============== */
  /* MODULE METHODS */
  /* ============== */

  BackToTop.prototype.init = function() {
    var that = this,
        icoScrollTop = $(scrollTopTrigger);

    win.off('scroll.backToTop').on('scroll.backToTop', function(){
      if($(this).scrollTop() < that.settings.limitTop){
        icoScrollTop.fadeOut(that.settings.appearTimeout);
      }
      else{
        icoScrollTop.fadeIn(that.settings.appearTimeout);
      }
    }).trigger('scroll.backToTop');

    icoScrollTop.on('click.backToTop', function(e) {
      e.preventDefault();
      that.scrollTop(0);
    });

    return this;
  };

  BackToTop.prototype.scrollTop = function(top) {
    var that = this;
    $('html, body').animate({
      scrollTop: top
    }, that.settings.scrollTimeout);

    return this;
  };

  /* =============== */
  /* MODULE DATA-API */
  /* =============== */

  $(function() {
    var opts = {};
    App.backToTop = new BackToTop(opts);
  });

}(window.jQuery, window.App));


/**
 *  @Accordion plugin
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    toggle
 *    destroy
 */
;(function($, window, undefined) {
  var pluginName = 'accordion',
      win = $(window);

  function Accordion(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, options);
    this.init();
  }

  Accordion.prototype = {
    init: function() {
      var that = this;
      that.vars={
        handlers : $(that.options.handlers, this.element),
        contents : $(that.options.contents, this.element)
      }
      
      that.vars.handlers.each(function(idx){
        var handler = $(this);
        handler.on('click', function(){
          that.show(handler, idx);
          if(!$('[data-gmap]').data('gmapFilter')){
            $('[data-gmap]').gmapFilter();
            $('[data-gmap]').gmapFilter('initMap');
          }
        });
      });
      $('[data-masonry]').masonry({
        itemSelector: '.item',
        columnWidth: '.item'
      });
      that.vars.handlers.parent().eq(that.options.openIndex).addClass('active');
      that.vars.contents.eq(that.options.openIndex).show();
      
    },
    show: function(el, idx) {
      var item = $(el).parent();
      var hrefEl = $('.block-tab .nav-tabs li');
      if(item.hasClass('active in')){
        item.removeClass('active in');
        item.children(this.options.contents).stop().slideUp(this.options.duration);
      }
      else{
        var beforeEL = this.vars.handlers.parent().filter('.active .in');
        if(beforeEL.length){
          beforeEL.removeClass('active in');
          beforeEL.children(this.options.contents).stop().slideUp(this.options.duration);
        }
        item.addClass('active in');
        item.children(this.options.contents).stop().slideDown(this.options.duration);
      }
      hrefEl.removeClass('active').eq(idx).addClass('active');
    },
    destroy: function() {
      // $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Accordion(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {
    handlers: 'a.title-3',
    triggerTab: '.block-tab',
    contents: '.col',
    duration: 500,
    openIndex: 0
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({
      handlers: 'a.title-3',
      contents: '.col',
      duration: 300,
      openIndex: 0
    });
  });

}(jQuery, window));
/**
 *  @name Check
 *  @description Custom checkbox and radio
 *  @version 1.0
 *  @options
 *  @events
 *  @methods
 *    init
 *    check
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'check';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
          customEl= this.element,
          checkAll = $('[data-checkall]'),
          formEl = customEl.find('input');
      var xhr;
      var marryBlock = $('[data-manage]');
      customEl.tooltip();
      formEl.on('click.'+ pluginName, function(){
        var formElment = this;
        that.check(this, customEl);
        var el = $(formElment).closest('.accordion .item');
        var checkedBtn = $(formElment, el)
        if(!el.hasClass('active')){
          el.addClass('active').fadeOut();
        }else{
          el.removeClass('active');
        }
        // if(xhr){
        //   xhr.abort();
        // }
        $.ajax({
          url: customEl.data('url'),
          data: formEl,
          dataType: 'json',
          success: function(data){
            if(data.result === 1){
              marryBlock.html(data.content);
            }
          }
        });
      });
      // if(checkAll.length){
      //   checkAll.click(function () {
      //     $('input:checkbox').attr('checked');
      //   });
      // }
      if(checkAll.length){
        checkAll.change(function(){
          // customEl.prop('checked',$(this).prop("checked"));
          if (checkAll.find('input').is(':checked')) {
            $('input:checkbox').prop('checked','checked');
            $('input:checkbox').closest(customEl).addClass('checked');
            checkAll.addClass('checked');
          }else{
            $('input:checkbox').prop('checked', false);
            $('input:checkbox').closest(customEl).removeClass('checked');
            checkAll.removeClass('checked');
          }
        });
        // if (checkAll.hasClass('checked')) {
        //   checkAll.click(function(){
        //     if ($('input:checkbox').is(':checked')) {
        //       $('input:checkbox').prop('checked',false);
        //       customEl.removeClass('checked');
        //     }
        //   });
        // }
        customEl.not(checkAll).click(function(){
          if(customEl.length == customEl.hasClass('checked').length) {
            checkAll.find('input').attr("checked", "checked");
          } else {
            checkAll.find('input').removeAttr("checked");
            checkAll.removeClass('checked');
          }
        });
      }
      $('[data-validate]').validate();
    },
    check: function(el, wrapper) {
      wrapper.toggleClass('checked');
      if(el.type === 'radio'){
        var groupRadio = $('input[name="'+ $(el).attr('name') +'"]');
        wrapper.addClass('checked');
        groupRadio.not(el).closest('[data-check]').removeClass('checked');
      }
    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {

  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));


 /**
 *  @name Select
 *  @description Custom select boxes
 *  @version 1.0
 *  @options
      effect (String) show (default), fade, slide
      duration (Number) 500
 *  @events
      onSelected (Array) (value, text)
 *  @methods
 *    init
 *    offsetSelect
 *    toggle
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'select',
      win = $(window);

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
          body = $('body'),
          select = $('select', that.element),
          options = select.children('option'),
          optGroups = select.find('optgroup'),
          customContent = $('<div class="content-select"></div>'),
          optGroup,
          optsGroup,
          arr = [];
      that.vars = {
        template: $('<ul></ul>', that.element),
        template2: $('<div class="inner"></div>', that.element),
        content: customContent,
        doc: $(document),
        effect: this.options.effect,
        duration: this.options.duration
      };
      if(!window.Modernizr.mobile){
        that.vars.content.appendTo('body');
        for(var n = 0; n < options.length; n++){
          arr.push('<li><span data-val="' + options[n].value + '">' + options[n].text + '</span></li>');
        }
        for (var j = 0; j < optGroups.length; j++) {
          optGroup = $(optGroups[j]);
          optsGroup = optGroup.find('option');
          arr.push('<li><strong>' + optGroup.attr('label') + '</strong></li>');
          for(var i = 0; i < optsGroup.length; i++){
            arr.push('<li><span data-val="' + optsGroup[i].value + '">' + optsGroup[i].text + '</span></li>');
          }
        }
        select.hide();
        body.append(customContent);
        if(options.length >= 20){
          var row = parseInt(options.length/4);
          for(var i = 0; i < 4; i++){
            var newArr = arr.slice(row*i, row*(i + 1));
            if(i === 3){
              newArr = arr.slice(row*i, options.length);
            }
            var htmlTemplate = '<ul class="item">' + newArr.join('') + '</ul>';
            that.vars.template2.append(htmlTemplate);
            that.vars.content.append(that.vars.template2);
          }
        }else{
          that.vars.template.append(arr.join(''));
          that.vars.content.append(that.vars.template);
        }
        var paused = false;
        that.element.on('click.' + pluginName , function(){
          that.offsetSelect();
          that.toggle(this, true);
          $(this).toggleClass('out');
          
          // if($('[data-slider-home]').length){
          //   paused = !paused;
          //   if(paused) {
          //       $('[data-slider-home]').slickPause();
          //   } else {
          //       $('[data-slider-home]').slickPlay();
          //   }
          // }
        });
        $('.custom-select select').each(function() {
          var el = $(this);
          var titleSpan = el.siblings('.text-val');
          titleSpan.text(el.find('option:selected').text());
          titleSpan.data('val', el.find('option:selected').value);
          titleSpan.trigger("customSelectChangeEvent");
        });
        that.vars.doc.on('click.' + pluginName , function(e){
          var target = $(e.target);
          that.offsetSelect();
          if(!target.closest('.custom-select').is(that.element) || target.is('br')){
            that.toggle(this, false);
          }
        });
        that.vars.template.find('li>span').on('click', function(){
          var el = $(this),
              textShow = that.element.find('.text-val');
          textShow.text(el.text());
          textShow.data('val', el.data('val'));

          select.val(el.data('val'));
          that.toggle(this, false);
          
          textShow.trigger("customSelectChangeEvent");
        });
        that.vars.template2.find('li>span').on('click', function(){
          var el = $(this),
              textShow = that.element.find('.text-val');
          textShow.text(el.text());
          select.val(el.data('val'));
          that.toggle(this, false);
          
          textShow.data('val', el.data('val'));
          textShow.trigger("customSelectChangeEvent");
        });
        win.bind('resize.' + pluginName , function(){
          switch(that.vars.effect){
            case 'slide':
              that.vars.content.stop().slideUp(100);
            break;
            case 'fade':
              that.vars.content.stop().fadeOut(100);
            break;
            default:
              that.vars.content.hide();
          }
        });
      }
      else{
        $(document).on('change.' + pluginName, '[data-select] select' , function() {
          var el = $(this);
          var titleSpan = el.siblings('.text-val');
          titleSpan.text(el.find('option:selected').text());

          titleSpan.data('val', el.find('option:selected').value);
          titleSpan.trigger("customSelectChangeEvent");
        });
        $('.custom-select select', that.element).each(function() {
          var el = $(this);
          var titleSpan = el.siblings('.text-val');
          titleSpan.text(el.find('option:selected').text());
          titleSpan.data('val', el.find('option:selected').value);
          titleSpan.trigger("customSelectChangeEvent");
        });
      }
    },
    toggle: function(el, isShow) {
      var that = this,
          effect = that.vars.effect;

      if (isShow && that.vars.content.is(':hidden')){
        switch(effect){
          case 'slide':
            that.vars.content.stop().slideDown(that.vars.duration);
          break;
          case 'fade':
            that.vars.content.stop().fadeIn(that.vars.duration);
          break;
          default:
            that.vars.content.show();
        }
        that.offsetSelect();
      }
      else{
        switch(effect){
          case 'slide':
            that.vars.content.stop().slideUp(that.options.duration);
          break;
          case 'fade':
            that.vars.content.stop().fadeOut(that.options.duration);
          break;
          default:
            that.vars.content.hide();
        }
      }
      if($('[data-slider-home]').length){
        // $('[data-slider-home]').slick('slickPause');
        // $('[data-slider-home]').on('afterChange', function(event, slick, currentSlide){
        //   if( currentSlide === 0){
        //     $('[data-slider-home]').paused = true;
        //     $('[data-slider-home]').slick('slickPause');
        //     console.log('paused');
        //   }
        // });
      }
    },
    offsetSelect: function() {
      var that = this,
          selectOffest = that.element.offset(),
          heightSelect = that.element.outerHeight();
      that.vars.content.css({
        position: 'absolute',
        top: selectOffest.top + heightSelect - 1,
        left: selectOffest.left,
        width: that.element.outerWidth(),
        zIndex: 10000
      });

      // console.log(that.element);
      // console.log(selectOffest.left);
      if(that.element.data('style') === ""){
        that.vars.content.addClass('style-1').css({
          width: $('.find-block').outerWidth(),
          left: $('.find-block').offset().left
        });
      }
    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    effect: 'slide',
    duration: 500,
    callback: function() {}
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({
      duration: 400,
    });
  });

}(jQuery, window));


/* =========
 * detect-useragent.js
 * ========= */

(function($, App) {

  "use strict";

  var mobileWidth = 767;

  /* =============== */
  /* MODULE DATA-API */
  /* =============== */

  function UserAgent(opts) {
    var ua = navigator.userAgent.toLowerCase();
    this.iOS = navigator.userAgent.match(/(iPod|iPhone|iPad)/);
    this.iOSVersion = Math.round(parseFloat(('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1]).replace('undefined', '3_2').replace('_', '.').replace('_', ''))) || false;
    this.android = ua.indexOf('android') > -1;
    this.chrome = ua.indexOf('chrome') > -1;
    this.isIE = ua.indexOf('msie') !== -1 ? parseInt(ua.split('msie')[1]) : false;
    this.isIE11 = ua.indexOf('msie');
    this.isMobile = function() {
      return window.Modernizr.mq('(max-width: ' + mobileWidth + 'px)');
    };
  }

  /* =============== */
  /* MODULE DATA-API */
  /* =============== */

  $(function() {
    App.detectUserAgent = new UserAgent();
    var html = $('html');
    if(App.detectUserAgent.iOS){
      html.addClass('ios-only');
    }
    else if(App.detectUserAgent.android && !App.detectUserAgent.chrome){
      html.addClass('android-only');
    }

    if(App.detectUserAgent.isIE === 8) {
      html.addClass('ie8');
    }
    if(App.detectUserAgent.isIE === 9) {
      html.addClass('ie9');
    }
    if (App.detectUserAgent.isIE11 > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))   {
      html.addClass('ie'); 
    }
  });

}(window.jQuery, window.App));

/**
 *  @name same-height
 *  @description description
 *  @version 1.0
 *  @options
 *    block
 *  @methods
 *    init
 *    destroy
 */
(function($, window) {
  'use strict';

  var pluginName = 'eqheight',
    win = $(window);

  var setHeight = function() {
    var maxHeight = 0;
    this.vars.blocks.css('height', '').each(function() {
      maxHeight = Math.max(maxHeight, $(this).outerHeight());
    });
    this.vars.blocks.css({
      'height': maxHeight
    });
  };
  var setHeightResize = function() {
    var maxWidth = 0;
    this.vars.blocks.css('width', '').each(function() {
      maxWidth = Math.max(maxWidth, $(this).width());
    });
    this.vars.blocks.css({
      'height': maxWidth,
      'min-height': 'inherit'
    });
  };
  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
        arrImage = $('[data-load] img', that.element),
        count = 0,
        i;
      that.vars = {
        blocks: $(that.options.block, that.element)
      };
      function loadImage(evt){
        count ++;
        if (count === arrImage.length) {
          if($(that.options.block, that.element).hasClass('row')){
            win.on('resize.' + pluginName + '1', $.proxy(setHeightResize, that)).trigger('resize.' + pluginName + '1');
          }else{
            win.on('resize.' + pluginName, $.proxy(setHeight, that)).trigger('resize.' + pluginName);
          }
        }
      }
      for ( i = 0; i < arrImage.length; i ++) {
        arrImage[i].onload = loadImage;
      }
      // win.on('resize.' + pluginName, $.proxy(setHeight, that)).trigger('resize.' + pluginName);
      if($(that.options.block, that.element).hasClass('row')){
        win.on('resize.' + pluginName + '1', $.proxy(setHeightResize, that)).trigger('resize.' + pluginName + '1');
      }else{
        win.on('resize.' + pluginName, $.proxy(setHeight, that)).trigger('resize.' + pluginName);
      }
    },
    destroy: function() {
      win.off('resize.' + pluginName);
      win.off('resize.' + pluginName + '1');
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
  return this.each(function() {
    var instance = $.data(this, pluginName);
    if (!instance) {
    $.data(this, pluginName, new Plugin(this, options));
    } else if (instance[options]) {
    instance[options](params);
    }
  });
  };

  $.fn[pluginName].defaults = {
    block: '[data-block]'
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
/* =========
 * get-window-width.js
 * ========= */

(function($, App) {

  "use strict";

  /* =============== */
  /* MODULE DATA-API */
  /* =============== */

  $(function() {
    App.viewportWidth = (function(){
      if(window.Modernizr.touch){
        return function() {
          return $(window).width();
        };
      }else{
        if(navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i)) {
          return function(){
            return document.documentElement.clientWidth;
          };
        }else {
          return function(){
            return window.innerWidth || document.documentElement.clientWidth;
          };
        }
      }
    })();
  });

}(window.jQuery, window.App));
/**
 *  @name cover-image
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  var pluginName = 'interchange',
      win = $(window),
      BREAK_POINT1 = 768,
      BREAK_POINT2 = 992,
      width = 0;
  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
          ele = this.element;

      that.listCover = ele.data('interchange');
      that.vars = {
        iscover0 : false,
        iscover1 : false,
        iscover2 : false
      };

      win.on('resize.' + pluginName, function(){
        width = win.width();
        ele.data('type') == 'background-image' ? that.initBackground(ele) : that.initImageSrc(ele);
        if(typeof that.options.afterChangeHandle === 'function') {
          that.options.afterChangeHandle();
        }
      }).trigger('resize.' + pluginName);
    },

    initBackground: function(ele){
      var that = this,
          vars = that.vars,
          listCover = that.listCover;

      if(width < BREAK_POINT2 && width >= BREAK_POINT1 && !vars.iscover1){
        ele.css('backgroundImage', 'url('+ listCover[1] +')');
        vars.iscover1 = true;
        vars.iscover0 = false;
        vars.iscover2 = false;

      }else if(width < BREAK_POINT1 && !vars.iscover2){
        ele.css('backgroundImage', 'url('+ listCover[2] +')');
        vars.iscover2 = true;
        vars.iscover1 = false;
        vars.iscover0 = false;

      }else if(width >= BREAK_POINT2 && !vars.iscover0){
        ele.css('backgroundImage', 'url('+ listCover[0] +')');
        vars.iscover0 = true;
        vars.iscover1 = false;
        vars.iscover2 = false;

      }
    },

    initImageSrc: function(ele){
      var that = this,
          vars = that.vars,
          listCover = that.listCover;

      if(width < BREAK_POINT2 && width >= BREAK_POINT1 && !vars.iscover1){
        ele.attr('src', listCover[1]);
        vars.iscover1 = true;
        vars.iscover0 = false;
        vars.iscover2 = false;

      }else if(width < BREAK_POINT1 && !that.isMobile && !vars.iscover2){
        ele.attr('src', listCover[2]);
        vars.iscover2 = true;
        vars.iscover1 = false;
        vars.iscover0 = false;

      }else if(width >= BREAK_POINT2 && !vars.iscover0){
        ele.attr('src', listCover[0]);
        vars.iscover0 = true;
        vars.iscover1 = false;
        vars.iscover2 = false;
      }
    }

  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        // window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function() {
    var opt = {
      afterChangeHandle: function() {
        $('.item.visual .image-wrap').each(function() {
          var el = $(this);
          window.Site.checkVertical(el.find('img')[0].src, el);
        });
      }
    };
    $('[data-' + pluginName + ']')[pluginName](opt);
    // win.on(Site.events.AJAX_SUCCESS + '.' + pluginName, function() {
    //   $('[data-' + pluginName + ']')[pluginName](opt);
    // });
  });

}(jQuery, window));
 /*!
 * Buttons helper for fancyBox
 * version: 1.0.5 (Mon, 15 Oct 2012)
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             buttons: {
 *                 position : 'top'
 *             }
 *         }
 *     });
 *
 */
(function ($) {
	//Shortcut for fancyBox object
	var F = $.fancybox;

	//Add helper object
	F.helpers.buttons = {
		defaults : {
			skipSingle : false, // disables if gallery contains single image
			position   : 'top', // 'top' or 'bottom'
			tpl        : '<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="Previous" href="javascript:;"></a></li><li><a class="btnPlay" title="Start slideshow" href="javascript:;"></a></li><li><a class="btnNext" title="Next" href="javascript:;"></a></li><li><a class="btnToggle" title="Toggle size" href="javascript:;"></a></li><li><a class="btnClose" title="Close" href="javascript:;"></a></li></ul></div>'
		},

		list : null,
		buttons: null,

		beforeLoad: function (opts, obj) {
			//Remove self if gallery do not have at least two items

			if (opts.skipSingle && obj.group.length < 2) {
				obj.helpers.buttons = false;
				obj.closeBtn = true;

				return;
			}

			//Increase top margin to give space for buttons
			obj.margin[ opts.position === 'bottom' ? 2 : 0 ] += 30;
		},

		onPlayStart: function () {
			if (this.buttons) {
				this.buttons.play.attr('title', 'Pause slideshow').addClass('btnPlayOn');
			}
		},

		onPlayEnd: function () {
			if (this.buttons) {
				this.buttons.play.attr('title', 'Start slideshow').removeClass('btnPlayOn');
			}
		},

		afterShow: function (opts, obj) {
			var buttons = this.buttons;

			if (!buttons) {
				this.list = $(opts.tpl).addClass(opts.position).appendTo('body');

				buttons = {
					prev   : this.list.find('.btnPrev').click( F.prev ),
					next   : this.list.find('.btnNext').click( F.next ),
					play   : this.list.find('.btnPlay').click( F.play ),
					toggle : this.list.find('.btnToggle').click( F.toggle ),
					close  : this.list.find('.btnClose').click( F.close )
				}
			}

			//Prev
			if (obj.index > 0 || obj.loop) {
				buttons.prev.removeClass('btnDisabled');
			} else {
				buttons.prev.addClass('btnDisabled');
			}

			//Next / Play
			if (obj.loop || obj.index < obj.group.length - 1) {
				buttons.next.removeClass('btnDisabled');
				buttons.play.removeClass('btnDisabled');

			} else {
				buttons.next.addClass('btnDisabled');
				buttons.play.addClass('btnDisabled');
			}

			this.buttons = buttons;

			this.onUpdate(opts, obj);
		},

		onUpdate: function (opts, obj) {
			var toggle;

			if (!this.buttons) {
				return;
			}

			toggle = this.buttons.toggle.removeClass('btnDisabled btnToggleOn');

			//Size toggle button
			if (obj.canShrink) {
				toggle.addClass('btnToggleOn');

			} else if (!obj.canExpand) {
				toggle.addClass('btnDisabled');
			}
		},

		beforeClose: function () {
			if (this.list) {
				this.list.remove();
			}

			this.list    = null;
			this.buttons = null;
		}
	};

}(jQuery));

/*!
 * Media helper for fancyBox
 * version: 1.0.6 (Fri, 14 Jun 2013)
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             media: true
 *         }
 *     });
 *
 * Set custom URL parameters:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             media: {
 *                 youtube : {
 *                     params : {
 *                         autoplay : 0
 *                     }
 *                 }
 *             }
 *         }
 *     });
 *
 * Or:
 *     $(".fancybox").fancybox({,
 *         helpers : {
 *             media: true
 *         },
 *         youtube : {
 *             autoplay: 0
 *         }
 *     });
 *
 *  Supports:
 *
 *      Youtube
 *          http://www.youtube.com/watch?v=opj24KnzrWo
 *          http://www.youtube.com/embed/opj24KnzrWo
 *          http://youtu.be/opj24KnzrWo
 *			http://www.youtube-nocookie.com/embed/opj24KnzrWo
 *      Vimeo
 *          http://vimeo.com/40648169
 *          http://vimeo.com/channels/staffpicks/38843628
 *          http://vimeo.com/groups/surrealism/videos/36516384
 *          http://player.vimeo.com/video/45074303
 *      Metacafe
 *          http://www.metacafe.com/watch/7635964/dr_seuss_the_lorax_movie_trailer/
 *          http://www.metacafe.com/watch/7635964/
 *      Dailymotion
 *          http://www.dailymotion.com/video/xoytqh_dr-seuss-the-lorax-premiere_people
 *      Twitvid
 *          http://twitvid.com/QY7MD
 *      Twitpic
 *          http://twitpic.com/7p93st
 *      Instagram
 *          http://instagr.am/p/IejkuUGxQn/
 *          http://instagram.com/p/IejkuUGxQn/
 *      Google maps
 *          http://maps.google.com/maps?q=Eiffel+Tower,+Avenue+Gustave+Eiffel,+Paris,+France&t=h&z=17
 *          http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
 *          http://maps.google.com/?ll=48.859463,2.292626&spn=0.000965,0.002642&t=m&z=19&layer=c&cbll=48.859524,2.292532&panoid=YJ0lq28OOy3VT2IqIuVY0g&cbp=12,151.58,,0,-15.56
 */
(function ($) {
	"use strict";

	//Shortcut for fancyBox object
	var F = $.fancybox,
		format = function( url, rez, params ) {
			params = params || '';

			if ( $.type( params ) === "object" ) {
				params = $.param(params, true);
			}

			$.each(rez, function(key, value) {
				url = url.replace( '$' + key, value || '' );
			});

			if (params.length) {
				url += ( url.indexOf('?') > 0 ? '&' : '?' ) + params;
			}

			return url;
		};

	//Add helper object
	F.helpers.media = {
		defaults : {
			youtube : {
				matcher : /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
				params  : {
					autoplay    : 1,
					autohide    : 1,
					fs          : 1,
					rel         : 0,
					hd          : 1,
					wmode       : 'opaque',
					enablejsapi : 1
				},
				type : 'iframe',
				url  : '//www.youtube.com/embed/$3'
			},
			vimeo : {
				matcher : /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
				params  : {
					autoplay      : 1,
					hd            : 1,
					show_title    : 1,
					show_byline   : 1,
					show_portrait : 0,
					fullscreen    : 1
				},
				type : 'iframe',
				url  : '//player.vimeo.com/video/$1'
			},
			metacafe : {
				matcher : /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
				params  : {
					autoPlay : 'yes'
				},
				type : 'swf',
				url  : function( rez, params, obj ) {
					obj.swf.flashVars = 'playerVars=' + $.param( params, true );

					return '//www.metacafe.com/fplayer/' + rez[1] + '/.swf';
				}
			},
			dailymotion : {
				matcher : /dailymotion.com\/video\/(.*)\/?(.*)/,
				params  : {
					additionalInfos : 0,
					autoStart : 1
				},
				type : 'swf',
				url  : '//www.dailymotion.com/swf/video/$1'
			},
			twitvid : {
				matcher : /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
				params  : {
					autoplay : 0
				},
				type : 'iframe',
				url  : '//www.twitvid.com/embed.php?guid=$1'
			},
			twitpic : {
				matcher : /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
				type : 'image',
				url  : '//twitpic.com/show/full/$1/'
			},
			instagram : {
				matcher : /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
				type : 'image',
				url  : '//$1/p/$2/media/?size=l'
			},
			google_maps : {
				matcher : /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
				type : 'iframe',
				url  : function( rez ) {
					return '//maps.google.' + rez[1] + '/' + rez[3] + '' + rez[4] + '&output=' + (rez[4].indexOf('layer=c') > 0 ? 'svembed' : 'embed');
				}
			}
		},

		beforeLoad : function(opts, obj) {
			var url   = obj.href || '',
				type  = false,
				what,
				item,
				rez,
				params;

			for (what in opts) {
				if (opts.hasOwnProperty(what)) {
					item = opts[ what ];
					rez  = url.match( item.matcher );

					if (rez) {
						type   = item.type;
						params = $.extend(true, {}, item.params, obj[ what ] || ($.isPlainObject(opts[ what ]) ? opts[ what ].params : null));

						url = $.type( item.url ) === "function" ? item.url.call( this, rez, params, obj ) : format( item.url, rez, params );

						break;
					}
				}
			}

			if (type) {
				obj.href = url;
				obj.type = type;

				obj.autoHeight = false;
			}
		}
	};

}(jQuery));
 /*!
 * Thumbnail helper for fancyBox
 * version: 1.0.7 (Mon, 01 Oct 2012)
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             thumbs: {
 *                 width  : 50,
 *                 height : 50
 *             }
 *         }
 *     });
 *
 */
(function ($) {
	//Shortcut for fancyBox object
	var F = $.fancybox;

	//Add helper object
	F.helpers.thumbs = {
		defaults : {
			width    : 50,       // thumbnail width
			height   : 50,       // thumbnail height
			position : 'bottom', // 'top' or 'bottom'
			source   : function ( item ) {  // function to obtain the URL of the thumbnail image
				var href;

				if (item.element) {
					href = $(item.element).find('img').attr('src');
				}

				if (!href && item.type === 'image' && item.href) {
					href = item.href;
				}

				return href;
			}
		},

		wrap  : null,
		list  : null,
		width : 0,

		init: function (opts, obj) {
			var that = this,
				list,
				thumbWidth  = opts.width,
				thumbHeight = opts.height,
				thumbSource = opts.source;

			//Build list structure
			list = '';

			for (var n = 0; n < obj.group.length; n++) {
				list += '<li><a style="width:' + thumbWidth + 'px;height:' + thumbHeight + 'px;" href="javascript:jQuery.fancybox.jumpto(' + n + ');"></a></li>';
			}

			this.wrap = $('<div id="fancybox-thumbs"></div>').addClass(opts.position).appendTo('body');
			this.list = $('<ul>' + list + '</ul>').appendTo(this.wrap);

			//Load each thumbnail
			$.each(obj.group, function (i) {
				var href = thumbSource( obj.group[ i ] );

				if (!href) {
					return;
				}

				$("<img />").load(function () {
					var width  = this.width,
						height = this.height,
						widthRatio, heightRatio, parent;

					if (!that.list || !width || !height) {
						return;
					}

					//Calculate thumbnail width/height and center it
					widthRatio  = width / thumbWidth;
					heightRatio = height / thumbHeight;

					parent = that.list.children().eq(i).find('a');

					if (widthRatio >= 1 && heightRatio >= 1) {
						if (widthRatio > heightRatio) {
							width  = Math.floor(width / heightRatio);
							height = thumbHeight;

						} else {
							width  = thumbWidth;
							height = Math.floor(height / widthRatio);
						}
					}

					$(this).css({
						width  : width,
						height : height,
						top    : Math.floor(thumbHeight / 2 - height / 2),
						left   : Math.floor(thumbWidth / 2 - width / 2)
					});

					parent.width(thumbWidth).height(thumbHeight);

					$(this).hide().appendTo(parent).fadeIn(300);

				}).attr('src', href);
			});

			//Set initial width
			this.width = this.list.children().eq(0).outerWidth(true);

			this.list.width(this.width * (obj.group.length + 1)).css('left', Math.floor($(window).width() * 0.5 - (obj.index * this.width + this.width * 0.5)));
		},

		beforeLoad: function (opts, obj) {
			//Remove self if gallery do not have at least two items
			if (obj.group.length < 2) {
				obj.helpers.thumbs = false;

				return;
			}

			//Increase bottom margin to give space for thumbs
			obj.margin[ opts.position === 'top' ? 0 : 2 ] += ((opts.height) + 15);
		},

		afterShow: function (opts, obj) {
			//Check if exists and create or update list
			if (this.list) {
				this.onUpdate(opts, obj);

			} else {
				this.init(opts, obj);
			}

			//Set active element
			this.list.children().removeClass('active').eq(obj.index).addClass('active');
		},

		//Center list
		onUpdate: function (opts, obj) {
			if (this.list) {
				this.list.stop(true).animate({
					'left': Math.floor($(window).width() * 0.5 - (obj.index * this.width + this.width * 0.5))
				}, 150);
			}
		},

		beforeClose: function () {
			if (this.wrap) {
				this.wrap.remove();
			}

			this.wrap  = null;
			this.list  = null;
			this.width = 0;
		}
	}

}(jQuery));
/*
== malihu jquery custom scrollbar plugin ==
Version: 3.0.6
Plugin URI: http://manos.malihu.gr/jquery-custom-content-scroller
Author: malihu
Author URI: http://manos.malihu.gr
License: MIT License (MIT)
*/

/*
Copyright 2010 Manos Malihutsakis (email: manos@malihu.gr)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
The code below is fairly long, fully commented and should be normally used in development.
For production, use either the minified jquery.mCustomScrollbar.min.js script or
the production-ready jquery.mCustomScrollbar.concat.min.js which contains the plugin
and dependencies (minified).
*/

;(function($,window,document){

(function(init){
	var _rjs=typeof define==="function" && define.amd, /* RequireJS */
		// _dlp=("https:"==document.location.protocol) ? "https:" : "http:", /* location protocol */
		_url="jquery.mousewheel.js";
	if(!_rjs){
		/* load jquery-mousewheel plugin (via CDN) if it's not present or not loaded via RequireJS
		(works when mCustomScrollbar fn is called on window load) */
		$.event.special.mousewheel || $("head").append(decodeURI("%3Cscript src="+_url+"%3E%3C/script%3E"));
	}
	init();
}(function(){

	/*
	----------------------------------------
	PLUGIN NAMESPACE, PREFIX, DEFAULT SELECTOR(S)
	----------------------------------------
	*/

	var pluginNS="mCustomScrollbar",
		pluginPfx="mCS",
		defaultSelector=".mCustomScrollbar",





	/*
	----------------------------------------
	DEFAULT OPTIONS
	----------------------------------------
	*/

		defaults={
			/*
			set element/content width/height programmatically
			values: boolean, pixels, percentage
				option						default
				-------------------------------------
				setWidth					false
				setHeight					false
			*/
			/*
			set the initial css top property of content
			values: string (e.g. "-100px", "10%" etc.)
			*/
			setTop:0,
			/*
			set the initial css left property of content
			values: string (e.g. "-100px", "10%" etc.)
			*/
			setLeft:0,
			/*
			scrollbar axis (vertical and/or horizontal scrollbars)
			values (string): "y", "x", "yx"
			*/
			axis:"y",
			/*
			position of scrollbar relative to content
			values (string): "inside", "outside" ("outside" requires elements with position:relative)
			*/
			scrollbarPosition:"inside",
			/*
			scrolling inertia
			values: integer (milliseconds)
			*/
			scrollInertia:950,
			/*
			auto-adjust scrollbar dragger length
			values: boolean
			*/
			autoDraggerLength:true,
			/*
			auto-hide scrollbar when idle
			values: boolean
				option						default
				-------------------------------------
				autoHideScrollbar			false
			*/
			/*
			auto-expands scrollbar on mouse-over and dragging
			values: boolean
				option						default
				-------------------------------------
				autoExpandScrollbar			false
			*/
			/*
			always show scrollbar, even when there's nothing to scroll
			values: integer (0=disable, 1=always show dragger rail, 2=always show dragger rail, dragger and buttons), boolean
			*/
			alwaysShowScrollbar:0,
			/*
			scrolling always snaps to a multiple of this number in pixels
			values: integer
				option						default
				-------------------------------------
				snapAmount					null
			*/
			/*
			when snapping, snap with this number in pixels as an offset
			values: integer
			*/
			snapOffset:0,
			/*
			mouse-wheel scrolling
			*/
			mouseWheel:{
				/*
				enable mouse-wheel scrolling
				values: boolean
				*/
				enable:true,
				/*
				scrolling amount in pixels
				values: "auto", integer
				*/
				scrollAmount:"auto",
				/*
				mouse-wheel scrolling axis
				the default scrolling direction when both vertical and horizontal scrollbars are present
				values (string): "y", "x"
				*/
				axis:"y",
				/*
				prevent the default behaviour which automatically scrolls the parent element(s) when end of scrolling is reached
				values: boolean
					option						default
					-------------------------------------
					preventDefault				null
				*/
				/*
				the reported mouse-wheel delta value. The number of lines (translated to pixels) one wheel notch scrolls.
				values: "auto", integer
				"auto" uses the default OS/browser value
				*/
				deltaFactor:"auto",
				/*
				normalize mouse-wheel delta to -1 or 1 (disables mouse-wheel acceleration)
				values: boolean
					option						default
					-------------------------------------
					normalizeDelta				null
				*/
				/*
				invert mouse-wheel scrolling direction
				values: boolean
					option						default
					-------------------------------------
					invert						null
				*/
				/*
				the tags that disable mouse-wheel when cursor is over them
				*/
				disableOver:["select","option","keygen","datalist","textarea"]
			},
			/*
			scrollbar buttons
			*/
			scrollButtons:{
				/*
				enable scrollbar buttons
				values: boolean
					option						default
					-------------------------------------
					enable						null
				*/
				/*
				scrollbar buttons scrolling type
				values (string): "stepless", "stepped"
				*/
				scrollType:"stepless",
				/*
				scrolling amount in pixels
				values: "auto", integer
				*/
				scrollAmount:"auto"
				/*
				tabindex of the scrollbar buttons
				values: false, integer
					option						default
					-------------------------------------
					tabindex					null
				*/
			},
			/*
			keyboard scrolling
			*/
			keyboard:{
				/*
				enable scrolling via keyboard
				values: boolean
				*/
				enable:true,
				/*
				keyboard scrolling type
				values (string): "stepless", "stepped"
				*/
				scrollType:"stepless",
				/*
				scrolling amount in pixels
				values: "auto", integer
				*/
				scrollAmount:"auto"
			},
			/*
			enable content touch-swipe scrolling
			values: boolean, integer, string (number)
			integer values define the axis-specific minimum amount required for scrolling momentum
			*/
			contentTouchScroll:25,
			/*
			advanced option parameters
			*/
			advanced:{
				/*
				auto-expand content horizontally (for "x" or "yx" axis)
				values: boolean
					option						default
					-------------------------------------
					autoExpandHorizontalScroll	null
				*/
				/*
				auto-scroll to elements with focus
				*/
				autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
				/*
				auto-update scrollbars on content, element or viewport resize
				should be true for fluid layouts/elements, adding/removing content dynamically, hiding/showing elements, content with images etc.
				values: boolean
				*/
				updateOnContentResize:true,
				/*
				auto-update scrollbars each time each image inside the element is fully loaded
				values: boolean
				*/
				updateOnImageLoad:true
				/*
				auto-update scrollbars based on the amount and size changes of specific selectors
				useful when you need to update the scrollbar(s) automatically, each time a type of element is added, removed or changes its size
				values: boolean, string (e.g. "ul li" will auto-update scrollbars each time list-items inside the element are changed)
				a value of true (boolean) will auto-update scrollbars each time any element is changed
					option						default
					-------------------------------------
					updateOnSelectorChange		null
				*/
				/*
				extra selectors that'll release scrollbar dragging upon mouseup, pointerup, touchend etc. (e.g. "selector-1, selector-2")
					option						default
					-------------------------------------
					releaseDraggableSelectors	null
				*/
			},
			/*
			scrollbar theme
			values: string (see CSS/plugin URI for a list of ready-to-use themes)
			*/
			theme:"light",
			/*
			user defined callback functions
			*/
			callbacks:{
				/*
				Available callbacks:
					callback					default
					-------------------------------------
					onInit						null
					onScrollStart				null
					onScroll					null
					onTotalScroll				null
					onTotalScrollBack			null
					whileScrolling				null
					onTotalScrollOffset			0
					onTotalScrollBackOffset		0
					alwaysTriggerOffsets		true
					onOverflowY					null
					onOverflowX					null
					onOverflowYNone				null
					onOverflowXNone				null
					onImageLoad					null
					onSelectorChange			null
					onUpdate					null
				*/
				onTotalScrollOffset:0,
				onTotalScrollBackOffset:0,
				alwaysTriggerOffsets:true
			}
			/*
			add scrollbar(s) on all elements matching the current selector, now and in the future
			values: boolean, string
			string values: "on" (enable), "once" (disable after first invocation), "off" (disable)
			liveSelector values: string (selector)
				option						default
				-------------------------------------
				live						false
				liveSelector				null
			*/
		},





	/*
	----------------------------------------
	VARS, CONSTANTS
	----------------------------------------
	*/

		totalInstances=0, /* plugin instances amount */
		liveTimers={}, /* live option timers */
		oldIE=(window.attachEvent && !window.addEventListener) ? 1 : 0, /* detect IE < 9 */
		touchActive=false, /* global touch state (for touch and pointer events) */
		/* general plugin classes */
		classes=[
			"mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar",
			"mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer",
			"mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"
		],





	/*
	----------------------------------------
	METHODS
	----------------------------------------
	*/

		methods={

			/*
			plugin initialization method
			creates the scrollbar(s), plugin data object and options
			----------------------------------------
			*/

			init:function(options){

				var options=$.extend(true,{},defaults,options),
					selector=_selector.call(this); /* validate selector */

				/*
				if live option is enabled, monitor for elements matching the current selector and
				apply scrollbar(s) when found (now and in the future)
				*/
				if(options.live){
					var liveSelector=options.liveSelector || this.selector || defaultSelector, /* live selector(s) */
						$liveSelector=$(liveSelector); /* live selector(s) as jquery object */
					if(options.live==="off"){
						/*
						disable live if requested
						usage: $(selector).mCustomScrollbar({live:"off"});
						*/
						removeLiveTimers(liveSelector);
						return;
					}
					liveTimers[liveSelector]=setTimeout(function(){
						/* call mCustomScrollbar fn on live selector(s) every half-second */
						$liveSelector.mCustomScrollbar(options);
						if(options.live==="once" && $liveSelector.length){
							/* disable live after first invocation */
							removeLiveTimers(liveSelector);
						}
					},500);
				}else{
					removeLiveTimers(liveSelector);
				}

				/* options backward compatibility (for versions < 3.0.0) and normalization */
				options.setWidth=(options.set_width) ? options.set_width : options.setWidth;
				options.setHeight=(options.set_height) ? options.set_height : options.setHeight;
				options.axis=(options.horizontalScroll) ? "x" : _findAxis(options.axis);
				options.scrollInertia=options.scrollInertia>0 && options.scrollInertia<17 ? 17 : options.scrollInertia;
				if(typeof options.mouseWheel!=="object" &&  options.mouseWheel==true){ /* old school mouseWheel option (non-object) */
					options.mouseWheel={enable:true,scrollAmount:"auto",axis:"y",preventDefault:false,deltaFactor:"auto",normalizeDelta:false,invert:false}
				}
				options.mouseWheel.scrollAmount=!options.mouseWheelPixels ? options.mouseWheel.scrollAmount : options.mouseWheelPixels;
				options.mouseWheel.normalizeDelta=!options.advanced.normalizeMouseWheelDelta ? options.mouseWheel.normalizeDelta : options.advanced.normalizeMouseWheelDelta;
				options.scrollButtons.scrollType=_findScrollButtonsType(options.scrollButtons.scrollType);

				_theme(options); /* theme-specific options */

				/* plugin constructor */
				return $(selector).each(function(){

					var $this=$(this);

					if(!$this.data(pluginPfx)){ /* prevent multiple instantiations */

						/* store options and create objects in jquery data */
						$this.data(pluginPfx,{
							idx:++totalInstances, /* instance index */
							opt:options, /* options */
							scrollRatio:{y:null,x:null}, /* scrollbar to content ratio */
							overflowed:null, /* overflowed axis */
							contentReset:{y:null,x:null}, /* object to check when content resets */
							bindEvents:false, /* object to check if events are bound */
							tweenRunning:false, /* object to check if tween is running */
							sequential:{}, /* sequential scrolling object */
							langDir:$this.css("direction"), /* detect/store direction (ltr or rtl) */
							cbOffsets:null, /* object to check whether callback offsets always trigger */
							/*
							object to check how scrolling events where last triggered
							"internal" (default - triggered by this script), "external" (triggered by other scripts, e.g. via scrollTo method)
							usage: object.data("mCS").trigger
							*/
							trigger:null
						});

						var d=$this.data(pluginPfx),o=d.opt,
							/* HTML data attributes */
							htmlDataAxis=$this.data("mcs-axis"),htmlDataSbPos=$this.data("mcs-scrollbar-position"),htmlDataTheme=$this.data("mcs-theme");

						if(htmlDataAxis){o.axis=htmlDataAxis;} /* usage example: data-mcs-axis="y" */
						if(htmlDataSbPos){o.scrollbarPosition=htmlDataSbPos;} /* usage example: data-mcs-scrollbar-position="outside" */
						if(htmlDataTheme){ /* usage example: data-mcs-theme="minimal" */
							o.theme=htmlDataTheme;
							_theme(o); /* theme-specific options */
						}

						_pluginMarkup.call(this); /* add plugin markup */

						$("#mCSB_"+d.idx+"_container img:not(."+classes[2]+")").addClass(classes[2]); /* flag loaded images */

						methods.update.call(null,$this); /* call the update method */

					}

				});

			},
			/* ---------------------------------------- */



			/*
			plugin update method
			updates content and scrollbar(s) values, events and status
			----------------------------------------
			usage: $(selector).mCustomScrollbar("update");
			*/

			update:function(el,cb){

				var selector=el || _selector.call(this); /* validate selector */

				return $(selector).each(function(){

					var $this=$(this);

					if($this.data(pluginPfx)){ /* check if plugin has initialized */

						var d=$this.data(pluginPfx),o=d.opt,
							mCSB_container=$("#mCSB_"+d.idx+"_container"),
							mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];

						if(!mCSB_container.length){return;}

						if(d.tweenRunning){_stop($this);} /* stop any running tweens while updating */

						/* if element was disabled or destroyed, remove class(es) */
						if($this.hasClass(classes[3])){$this.removeClass(classes[3]);}
						if($this.hasClass(classes[4])){$this.removeClass(classes[4]);}

						_maxHeight.call(this); /* detect/set css max-height value */

						_expandContentHorizontally.call(this); /* expand content horizontally */

						if(o.axis!=="y" && !o.advanced.autoExpandHorizontalScroll){
							mCSB_container.css("width",_contentWidth(mCSB_container.children()));
						}

						d.overflowed=_overflowed.call(this); /* determine if scrolling is required */

						_scrollbarVisibility.call(this); /* show/hide scrollbar(s) */

						/* auto-adjust scrollbar dragger length analogous to content */
						if(o.autoDraggerLength){_setDraggerLength.call(this);}

						_scrollRatio.call(this); /* calculate and store scrollbar to content ratio */

						_bindEvents.call(this); /* bind scrollbar events */

						/* reset scrolling position and/or events */
						var to=[Math.abs(mCSB_container[0].offsetTop),Math.abs(mCSB_container[0].offsetLeft)];
						if(o.axis!=="x"){ /* y/yx axis */
							if(!d.overflowed[0]){ /* y scrolling is not required */
								_resetContentPosition.call(this); /* reset content position */
								if(o.axis==="y"){
									_unbindEvents.call(this);
								}else if(o.axis==="yx" && d.overflowed[1]){
									_scrollTo($this,to[1].toString(),{dir:"x",dur:0,overwrite:"none"});
								}
							}else if(mCSB_dragger[0].height()>mCSB_dragger[0].parent().height()){
								_resetContentPosition.call(this); /* reset content position */
							}else{ /* y scrolling is required */
								_scrollTo($this,to[0].toString(),{dir:"y",dur:0,overwrite:"none"});
								d.contentReset.y=null;
							}
						}
						if(o.axis!=="y"){ /* x/yx axis */
							if(!d.overflowed[1]){ /* x scrolling is not required */
								_resetContentPosition.call(this); /* reset content position */
								if(o.axis==="x"){
									_unbindEvents.call(this);
								}else if(o.axis==="yx" && d.overflowed[0]){
									_scrollTo($this,to[0].toString(),{dir:"y",dur:0,overwrite:"none"});
								}
							}else if(mCSB_dragger[1].width()>mCSB_dragger[1].parent().width()){
								_resetContentPosition.call(this); /* reset content position */
							}else{ /* x scrolling is required */
								_scrollTo($this,to[1].toString(),{dir:"x",dur:0,overwrite:"none"});
								d.contentReset.x=null;
							}
						}

						/* callbacks: onImageLoad, onSelectorChange, onUpdate */
						if(cb && d){
							if(cb===2 && o.callbacks.onImageLoad && typeof o.callbacks.onImageLoad==="function"){
								o.callbacks.onImageLoad.call(this);
							}else if(cb===3 && o.callbacks.onSelectorChange && typeof o.callbacks.onSelectorChange==="function"){
								o.callbacks.onSelectorChange.call(this);
							}else if(o.callbacks.onUpdate && typeof o.callbacks.onUpdate==="function"){
								o.callbacks.onUpdate.call(this);
							}
						}

						_autoUpdate.call(this); /* initialize automatic updating (for dynamic content, fluid layouts etc.) */

					}

				});

			},
			/* ---------------------------------------- */



			/*
			plugin scrollTo method
			triggers a scrolling event to a specific value
			----------------------------------------
			usage: $(selector).mCustomScrollbar("scrollTo",value,options);
			*/

			scrollTo:function(val,options){

				/* prevent silly things like $(selector).mCustomScrollbar("scrollTo",undefined); */
				if(typeof val=="undefined" || val==null){return;}

				var selector=_selector.call(this); /* validate selector */

				return $(selector).each(function(){

					var $this=$(this);

					if($this.data(pluginPfx)){ /* check if plugin has initialized */

						var d=$this.data(pluginPfx),o=d.opt,
							/* method default options */
							methodDefaults={
								trigger:"external", /* method is by default triggered externally (e.g. from other scripts) */
								scrollInertia:o.scrollInertia, /* scrolling inertia (animation duration) */
								scrollEasing:"mcsEaseInOut", /* animation easing */
								moveDragger:false, /* move dragger instead of content */
								timeout:60, /* scroll-to delay */
								callbacks:true, /* enable/disable callbacks */
								onStart:true,
								onUpdate:true,
								onComplete:true
							},
							methodOptions=$.extend(true,{},methodDefaults,options),
							to=_arr.call(this,val),dur=methodOptions.scrollInertia>0 && methodOptions.scrollInertia<17 ? 17 : methodOptions.scrollInertia;

						/* translate yx values to actual scroll-to positions */
						to[0]=_to.call(this,to[0],"y");
						to[1]=_to.call(this,to[1],"x");

						/*
						check if scroll-to value moves the dragger instead of content.
						Only pixel values apply on dragger (e.g. 100, "100px", "-=100" etc.)
						*/
						if(methodOptions.moveDragger){
							to[0]*=d.scrollRatio.y;
							to[1]*=d.scrollRatio.x;
						}

						methodOptions.dur=dur;

						setTimeout(function(){
							/* do the scrolling */
							if(to[0]!==null && typeof to[0]!=="undefined" && o.axis!=="x" && d.overflowed[0]){ /* scroll y */
								methodOptions.dir="y";
								methodOptions.overwrite="all";
								_scrollTo($this,to[0].toString(),methodOptions);
							}
							if(to[1]!==null && typeof to[1]!=="undefined" && o.axis!=="y" && d.overflowed[1]){ /* scroll x */
								methodOptions.dir="x";
								methodOptions.overwrite="none";
								_scrollTo($this,to[1].toString(),methodOptions);
							}
						},methodOptions.timeout);

					}

				});

			},
			/* ---------------------------------------- */



			/*
			plugin stop method
			stops scrolling animation
			----------------------------------------
			usage: $(selector).mCustomScrollbar("stop");
			*/
			stop:function(){

				var selector=_selector.call(this); /* validate selector */

				return $(selector).each(function(){

					var $this=$(this);

					if($this.data(pluginPfx)){ /* check if plugin has initialized */

						_stop($this);

					}

				});

			},
			/* ---------------------------------------- */



			/*
			plugin disable method
			temporarily disables the scrollbar(s)
			----------------------------------------
			usage: $(selector).mCustomScrollbar("disable",reset);
			reset (boolean): resets content position to 0
			*/
			disable:function(r){

				var selector=_selector.call(this); /* validate selector */

				return $(selector).each(function(){

					var $this=$(this);

					if($this.data(pluginPfx)){ /* check if plugin has initialized */

						var d=$this.data(pluginPfx);

						_autoUpdate.call(this,"remove"); /* remove automatic updating */

						_unbindEvents.call(this); /* unbind events */

						if(r){_resetContentPosition.call(this);} /* reset content position */

						_scrollbarVisibility.call(this,true); /* show/hide scrollbar(s) */

						$this.addClass(classes[3]); /* add disable class */

					}

				});

			},
			/* ---------------------------------------- */



			/*
			plugin destroy method
			completely removes the scrollbar(s) and returns the element to its original state
			----------------------------------------
			usage: $(selector).mCustomScrollbar("destroy");
			*/
			destroy:function(){

				var selector=_selector.call(this); /* validate selector */

				return $(selector).each(function(){

					var $this=$(this);

					if($this.data(pluginPfx)){ /* check if plugin has initialized */

						var d=$this.data(pluginPfx),o=d.opt,
							mCustomScrollBox=$("#mCSB_"+d.idx),
							mCSB_container=$("#mCSB_"+d.idx+"_container"),
							scrollbar=$(".mCSB_"+d.idx+"_scrollbar");

						if(o.live){removeLiveTimers(o.liveSelector || $(selector).selector);} /* remove live timers */

						_autoUpdate.call(this,"remove"); /* remove automatic updating */

						_unbindEvents.call(this); /* unbind events */

						_resetContentPosition.call(this); /* reset content position */

						$this.removeData(pluginPfx); /* remove plugin data object */

						_delete(this,"mcs"); /* delete callbacks object */

						/* remove plugin markup */
						scrollbar.remove(); /* remove scrollbar(s) first (those can be either inside or outside plugin's inner wrapper) */
						mCSB_container.find("img."+classes[2]).removeClass(classes[2]); /* remove loaded images flag */
						mCustomScrollBox.replaceWith(mCSB_container.contents()); /* replace plugin's inner wrapper with the original content */
						/* remove plugin classes from the element and add destroy class */
						$this.removeClass(pluginNS+" _"+pluginPfx+"_"+d.idx+" "+classes[6]+" "+classes[7]+" "+classes[5]+" "+classes[3]).addClass(classes[4]);

					}

				});

			}
			/* ---------------------------------------- */

		},





	/*
	----------------------------------------
	FUNCTIONS
	----------------------------------------
	*/

	/* validates selector (if selector is invalid or undefined uses the default one) */
		_selector=function(){
			return (typeof $(this)!=="object" || $(this).length<1) ? defaultSelector : this;
		},
		/* -------------------- */

		/* changes options according to theme */
		_theme=function(obj){
			var fixedSizeScrollbarThemes=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],
				nonExpandedScrollbarThemes=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],
				disabledScrollButtonsThemes=["minimal","minimal-dark"],
				enabledAutoHideScrollbarThemes=["minimal","minimal-dark"],
				scrollbarPositionOutsideThemes=["minimal","minimal-dark"];
			obj.autoDraggerLength=$.inArray(obj.theme,fixedSizeScrollbarThemes) > -1 ? false : obj.autoDraggerLength;
			obj.autoExpandScrollbar=$.inArray(obj.theme,nonExpandedScrollbarThemes) > -1 ? false : obj.autoExpandScrollbar;
			obj.scrollButtons.enable=$.inArray(obj.theme,disabledScrollButtonsThemes) > -1 ? false : obj.scrollButtons.enable;
			obj.autoHideScrollbar=$.inArray(obj.theme,enabledAutoHideScrollbarThemes) > -1 ? true : obj.autoHideScrollbar;
			obj.scrollbarPosition=$.inArray(obj.theme,scrollbarPositionOutsideThemes) > -1 ? "outside" : obj.scrollbarPosition;
		},
		/* -------------------- */


		/* live option timers removal */
		removeLiveTimers=function(selector){
			if(liveTimers[selector]){
				clearTimeout(liveTimers[selector]);
				_delete(liveTimers,selector);
			}
		},
		/* -------------------- */


		/* normalizes axis option to valid values: "y", "x", "yx" */
		_findAxis=function(val){
			return (val==="yx" || val==="xy" || val==="auto") ? "yx" : (val==="x" || val==="horizontal") ? "x" : "y";
		},
		/* -------------------- */


		/* normalizes scrollButtons.scrollType option to valid values: "stepless", "stepped" */
		_findScrollButtonsType=function(val){
			return (val==="stepped" || val==="pixels" || val==="step" || val==="click") ? "stepped" : "stepless";
		},
		/* -------------------- */


		/* generates plugin markup */
		_pluginMarkup=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				expandClass=o.autoExpandScrollbar ? " "+classes[1]+"_expand" : "",
				scrollbar=["<div id='mCSB_"+d.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+d.idx+"_scrollbar mCS-"+o.theme+" mCSB_scrollTools_vertical"+expandClass+"'><div class='"+classes[12]+"'><div id='mCSB_"+d.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+d.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+d.idx+"_scrollbar mCS-"+o.theme+" mCSB_scrollTools_horizontal"+expandClass+"'><div class='"+classes[12]+"'><div id='mCSB_"+d.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
				wrapperClass=o.axis==="yx" ? "mCSB_vertical_horizontal" : o.axis==="x" ? "mCSB_horizontal" : "mCSB_vertical",
				scrollbars=o.axis==="yx" ? scrollbar[0]+scrollbar[1] : o.axis==="x" ? scrollbar[1] : scrollbar[0],
				contentWrapper=o.axis==="yx" ? "<div id='mCSB_"+d.idx+"_container_wrapper' class='mCSB_container_wrapper' />" : "",
				autoHideClass=o.autoHideScrollbar ? " "+classes[6] : "",
				scrollbarDirClass=(o.axis!=="x" && d.langDir==="rtl") ? " "+classes[7] : "";
			if(o.setWidth){$this.css("width",o.setWidth);} /* set element width */
			if(o.setHeight){$this.css("height",o.setHeight);} /* set element height */
			o.setLeft=(o.axis!=="y" && d.langDir==="rtl") ? "989999px" : o.setLeft; /* adjust left position for rtl direction */
			$this.addClass(pluginNS+" _"+pluginPfx+"_"+d.idx+autoHideClass+scrollbarDirClass).wrapInner("<div id='mCSB_"+d.idx+"' class='mCustomScrollBox mCS-"+o.theme+" "+wrapperClass+"'><div id='mCSB_"+d.idx+"_container' class='mCSB_container' style='position:relative; top:"+o.setTop+"; left:"+o.setLeft+";' dir="+d.langDir+" /></div>");
			var mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_container=$("#mCSB_"+d.idx+"_container");
			if(o.axis!=="y" && !o.advanced.autoExpandHorizontalScroll){
				mCSB_container.css("width",_contentWidth(mCSB_container.children()));
			}
			if(o.scrollbarPosition==="outside"){
				if($this.css("position")==="static"){ /* requires elements with non-static position */
					$this.css("position","relative");
				}
				$this.css("overflow","visible");
				mCustomScrollBox.addClass("mCSB_outside").after(scrollbars);
			}else{
				mCustomScrollBox.addClass("mCSB_inside").append(scrollbars);
				mCSB_container.wrap(contentWrapper);
			}
			_scrollButtons.call(this); /* add scrollbar buttons */
			/* minimum dragger length */
			var mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
			mCSB_dragger[0].css("min-height",mCSB_dragger[0].height());
			mCSB_dragger[1].css("min-width",mCSB_dragger[1].width());
		},
		/* -------------------- */


		/* calculates content width */
		_contentWidth=function(el){
			return Math.max.apply(Math,el.map(function(){return $(this).outerWidth(true);}).get());
		},
		/* -------------------- */


		/* expands content horizontally */
		_expandContentHorizontally=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				mCSB_container=$("#mCSB_"+d.idx+"_container");
			if(o.advanced.autoExpandHorizontalScroll && o.axis!=="y"){
				/*
				wrap content with an infinite width div and set its position to absolute and width to auto.
				Setting width to auto before calculating the actual width is important!
				We must let the browser set the width as browser zoom values are impossible to calculate.
				*/
				mCSB_container.css({"position":"absolute","width":"auto"})
					.wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />")
					.css({ /* set actual width, original position and un-wrap */
						/*
						get the exact width (with decimals) and then round-up.
						Using jquery outerWidth() will round the width value which will mess up with inner elements that have non-integer width
						*/
						"width":(Math.ceil(mCSB_container[0].getBoundingClientRect().right+0.4)-Math.floor(mCSB_container[0].getBoundingClientRect().left)),
						"position":"relative"
					}).unwrap();
			}
		},
		/* -------------------- */


		/* adds scrollbar buttons */
		_scrollButtons=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				mCSB_scrollTools=$(".mCSB_"+d.idx+"_scrollbar:first"),
				tabindex=!_isNumeric(o.scrollButtons.tabindex) ? "" : "tabindex='"+o.scrollButtons.tabindex+"'",
				btnHTML=[
					"<a href='#' class='"+classes[13]+"' oncontextmenu='return false;' "+tabindex+" />",
					"<a href='#' class='"+classes[14]+"' oncontextmenu='return false;' "+tabindex+" />",
					"<a href='#' class='"+classes[15]+"' oncontextmenu='return false;' "+tabindex+" />",
					"<a href='#' class='"+classes[16]+"' oncontextmenu='return false;' "+tabindex+" />"
				],
				btn=[(o.axis==="x" ? btnHTML[2] : btnHTML[0]),(o.axis==="x" ? btnHTML[3] : btnHTML[1]),btnHTML[2],btnHTML[3]];
			if(o.scrollButtons.enable){
				mCSB_scrollTools.prepend(btn[0]).append(btn[1]).next(".mCSB_scrollTools").prepend(btn[2]).append(btn[3]);
			}
		},
		/* -------------------- */


		/* detects/sets css max-height value */
		_maxHeight=function(){
			var $this=$(this),d=$this.data(pluginPfx),
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mh=$this.css("max-height") || "none",pct=mh.indexOf("%")!==-1,
				bs=$this.css("box-sizing");
			if(mh!=="none"){
				var val=pct ? $this.parent().height()*parseInt(mh)/100 : parseInt(mh);
				/* if element's css box-sizing is "border-box", subtract any paddings and/or borders from max-height value */
				if(bs==="border-box"){val-=(($this.innerHeight()-$this.height())+($this.outerHeight()-$this.innerHeight()));}
				mCustomScrollBox.css("max-height",Math.round(val));
			}
		},
		/* -------------------- */


		/* auto-adjusts scrollbar dragger length */
		_setDraggerLength=function(){
			var $this=$(this),d=$this.data(pluginPfx),
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
				ratio=[mCustomScrollBox.height()/mCSB_container.outerHeight(false),mCustomScrollBox.width()/mCSB_container.outerWidth(false)],
				l=[
					parseInt(mCSB_dragger[0].css("min-height")),Math.round(ratio[0]*mCSB_dragger[0].parent().height()),
					parseInt(mCSB_dragger[1].css("min-width")),Math.round(ratio[1]*mCSB_dragger[1].parent().width())
				],
				h=oldIE && (l[1]<l[0]) ? l[0] : l[1],w=oldIE && (l[3]<l[2]) ? l[2] : l[3];
			mCSB_dragger[0].css({
				"height":h,"max-height":(mCSB_dragger[0].parent().height()-10)
			}).find(".mCSB_dragger_bar").css({"line-height":l[0]+"px"});
			mCSB_dragger[1].css({
				"width":w,"max-width":(mCSB_dragger[1].parent().width()-10)
			});
		},
		/* -------------------- */


		/* calculates scrollbar to content ratio */
		_scrollRatio=function(){
			var $this=$(this),d=$this.data(pluginPfx),
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
				scrollAmount=[mCSB_container.outerHeight(false)-mCustomScrollBox.height(),mCSB_container.outerWidth(false)-mCustomScrollBox.width()],
				ratio=[
					scrollAmount[0]/(mCSB_dragger[0].parent().height()-mCSB_dragger[0].height()),
					scrollAmount[1]/(mCSB_dragger[1].parent().width()-mCSB_dragger[1].width())
				];
			d.scrollRatio={y:ratio[0],x:ratio[1]};
		},
		/* -------------------- */


		/* toggles scrolling classes */
		_onDragClasses=function(el,action,xpnd){
			var expandClass=xpnd ? classes[0]+"_expanded" : "",
				scrollbar=el.closest(".mCSB_scrollTools");
			if(action==="active"){
				el.toggleClass(classes[0]+" "+expandClass); scrollbar.toggleClass(classes[1]);
				el[0]._draggable=el[0]._draggable ? 0 : 1;
			}else{
				if(!el[0]._draggable){
					if(action==="hide"){
						el.removeClass(classes[0]); scrollbar.removeClass(classes[1]);
					}else{
						el.addClass(classes[0]); scrollbar.addClass(classes[1]);
					}
				}
			}
		},
		/* -------------------- */


		/* checks if content overflows its container to determine if scrolling is required */
		_overflowed=function(){
			var $this=$(this),d=$this.data(pluginPfx),
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				contentHeight=d.overflowed==null ? mCSB_container.height() : mCSB_container.outerHeight(false),
				contentWidth=d.overflowed==null ? mCSB_container.width() : mCSB_container.outerWidth(false);
			return [contentHeight>mCustomScrollBox.height(),contentWidth>mCustomScrollBox.width()];
		},
		/* -------------------- */


		/* resets content position to 0 */
		_resetContentPosition=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
			_stop($this); /* stop any current scrolling before resetting */
			if((o.axis!=="x" && !d.overflowed[0]) || (o.axis==="y" && d.overflowed[0])){ /* reset y */
				mCSB_dragger[0].add(mCSB_container).css("top",0);
				_scrollTo($this,"_resetY");
			}
			if((o.axis!=="y" && !d.overflowed[1]) || (o.axis==="x" && d.overflowed[1])){ /* reset x */
				var cx=dx=0;
				if(d.langDir==="rtl"){ /* adjust left position for rtl direction */
					cx=mCustomScrollBox.width()-mCSB_container.outerWidth(false);
					dx=Math.abs(cx/d.scrollRatio.x);
				}
				mCSB_container.css("left",cx);
				mCSB_dragger[1].css("left",dx);
				_scrollTo($this,"_resetX");
			}
		},
		/* -------------------- */


		/* binds scrollbar events */
		_bindEvents=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt;
			if(!d.bindEvents){ /* check if events are already bound */
				_draggable.call(this);
				if(o.contentTouchScroll){_contentDraggable.call(this);}
				_selectable.call(this);
				if(o.mouseWheel.enable){ /* bind mousewheel fn when plugin is available */
					function _mwt(){
						mousewheelTimeout=setTimeout(function(){
							if(!$.event.special.mousewheel){
								_mwt();
							}else{
								clearTimeout(mousewheelTimeout);
								_mousewheel.call($this[0]);
							}
						},100);
					}
					var mousewheelTimeout;
					_mwt();
				}
				_draggerRail.call(this);
				_wrapperScroll.call(this);
				if(o.advanced.autoScrollOnFocus){_focus.call(this);}
				if(o.scrollButtons.enable){_buttons.call(this);}
				if(o.keyboard.enable){_keyboard.call(this);}
				d.bindEvents=true;
			}
		},
		/* -------------------- */


		/* unbinds scrollbar events */
		_unbindEvents=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				namespace=pluginPfx+"_"+d.idx,
				sb=".mCSB_"+d.idx+"_scrollbar",
				sel=$("#mCSB_"+d.idx+",#mCSB_"+d.idx+"_container,#mCSB_"+d.idx+"_container_wrapper,"+sb+" ."+classes[12]+",#mCSB_"+d.idx+"_dragger_vertical,#mCSB_"+d.idx+"_dragger_horizontal,"+sb+">a"),
				mCSB_container=$("#mCSB_"+d.idx+"_container");
			if(o.advanced.releaseDraggableSelectors){sel.add($(o.advanced.releaseDraggableSelectors));}
			if(d.bindEvents){ /* check if events are bound */
				/* unbind namespaced events from document/selectors */
				$(document).unbind("."+namespace);
				sel.each(function(){
					$(this).unbind("."+namespace);
				});
				/* clear and delete timeouts/objects */
				clearTimeout($this[0]._focusTimeout); _delete($this[0],"_focusTimeout");
				clearTimeout(d.sequential.step); _delete(d.sequential,"step");
				clearTimeout(mCSB_container[0].onCompleteTimeout); _delete(mCSB_container[0],"onCompleteTimeout");
				d.bindEvents=false;
			}
		},
		/* -------------------- */


		/* toggles scrollbar visibility */
		_scrollbarVisibility=function(disabled){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				contentWrapper=$("#mCSB_"+d.idx+"_container_wrapper"),
				content=contentWrapper.length ? contentWrapper : $("#mCSB_"+d.idx+"_container"),
				scrollbar=[$("#mCSB_"+d.idx+"_scrollbar_vertical"),$("#mCSB_"+d.idx+"_scrollbar_horizontal")],
				mCSB_dragger=[scrollbar[0].find(".mCSB_dragger"),scrollbar[1].find(".mCSB_dragger")];
			if(o.axis!=="x"){
				if(d.overflowed[0] && !disabled){
					scrollbar[0].add(mCSB_dragger[0]).add(scrollbar[0].children("a")).css("display","block");
					content.removeClass(classes[8]+" "+classes[10]);
				}else{
					if(o.alwaysShowScrollbar){
						if(o.alwaysShowScrollbar!==2){mCSB_dragger[0].add(scrollbar[0].children("a")).css("display","none");}
						content.removeClass(classes[10]);
					}else{
						scrollbar[0].css("display","none");
						content.addClass(classes[10]);
					}
					content.addClass(classes[8]);
				}
			}
			if(o.axis!=="y"){
				if(d.overflowed[1] && !disabled){
					scrollbar[1].add(mCSB_dragger[1]).add(scrollbar[1].children("a")).css("display","block");
					content.removeClass(classes[9]+" "+classes[11]);
				}else{
					if(o.alwaysShowScrollbar){
						if(o.alwaysShowScrollbar!==2){mCSB_dragger[1].add(scrollbar[1].children("a")).css("display","none");}
						content.removeClass(classes[11]);
					}else{
						scrollbar[1].css("display","none");
						content.addClass(classes[11]);
					}
					content.addClass(classes[9]);
				}
			}
			if(!d.overflowed[0] && !d.overflowed[1]){
				$this.addClass(classes[5]);
			}else{
				$this.removeClass(classes[5]);
			}
		},
		/* -------------------- */


		/* returns input coordinates of pointer, touch and mouse events (relative to document) */
		_coordinates=function(e){
			var t=e.type;
			switch(t){
				case "pointerdown": case "MSPointerDown": case "pointermove": case "MSPointerMove": case "pointerup": case "MSPointerUp":
					return [e.originalEvent.pageY,e.originalEvent.pageX,false];
					break;
				case "touchstart": case "touchmove": case "touchend":
					var touch=e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
						touches=e.originalEvent.touches.length || e.originalEvent.changedTouches.length;
					return [touch.pageY,touch.pageX,touches>1];
					break;
				default:
					return [e.pageY,e.pageX,false];
			}
		},
		/* -------------------- */


		/*
		SCROLLBAR DRAG EVENTS
		scrolls content via scrollbar dragging
		*/
		_draggable=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				namespace=pluginPfx+"_"+d.idx,
				draggerId=["mCSB_"+d.idx+"_dragger_vertical","mCSB_"+d.idx+"_dragger_horizontal"],
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				mCSB_dragger=$("#"+draggerId[0]+",#"+draggerId[1]),
				draggable,dragY,dragX,
				rds=o.advanced.releaseDraggableSelectors ? mCSB_dragger.add($(o.advanced.releaseDraggableSelectors)) : mCSB_dragger;
			mCSB_dragger.bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
				e.stopImmediatePropagation();
				e.preventDefault();
				if(!_mouseBtnLeft(e)){return;} /* left mouse button only */
				touchActive=true;
				if(oldIE){document.onselectstart=function(){return false;}} /* disable text selection for IE < 9 */
				_iframe(false); /* enable scrollbar dragging over iframes by disabling their events */
				_stop($this);
				draggable=$(this);
				var offset=draggable.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left,
					h=draggable.height()+offset.top,w=draggable.width()+offset.left;
				if(y<h && y>0 && x<w && x>0){
					dragY=y;
					dragX=x;
				}
				_onDragClasses(draggable,"active",o.autoExpandScrollbar);
			}).bind("touchmove."+namespace,function(e){
				e.stopImmediatePropagation();
				e.preventDefault();
				var offset=draggable.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left;
				_drag(dragY,dragX,y,x);
			});
			$(document).bind("mousemove."+namespace+" pointermove."+namespace+" MSPointerMove."+namespace,function(e){
				if(draggable){
					var offset=draggable.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left;
					if(dragY===y){return;} /* has it really moved? */
					_drag(dragY,dragX,y,x);
				}
			}).add(rds).bind("mouseup."+namespace+" touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
				if(draggable){
					_onDragClasses(draggable,"active",o.autoExpandScrollbar);
					draggable=null;
				}
				touchActive=false;
				if(oldIE){document.onselectstart=null;} /* enable text selection for IE < 9 */
				_iframe(true); /* enable iframes events */
			});
			function _iframe(evt){
				var el=mCSB_container.find("iframe");
				if(!el.length){return;} /* check if content contains iframes */
				var val=!evt ? "none" : "auto";
				el.css("pointer-events",val); /* for IE11, iframe's display property should not be "block" */
			}
			function _drag(dragY,dragX,y,x){
				mCSB_container[0].idleTimer=o.scrollInertia<233 ? 250 : 0;
				if(draggable.attr("id")===draggerId[1]){
					var dir="x",to=((draggable[0].offsetLeft-dragX)+x)*d.scrollRatio.x;
				}else{
					var dir="y",to=((draggable[0].offsetTop-dragY)+y)*d.scrollRatio.y;
				}
				_scrollTo($this,to.toString(),{dir:dir,drag:true});
			}
		},
		/* -------------------- */


		/*
		TOUCH SWIPE EVENTS
		scrolls content via touch swipe
		Emulates the native touch-swipe scrolling with momentum found in iOS, Android and WP devices
		*/
		_contentDraggable=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				namespace=pluginPfx+"_"+d.idx,
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
				dragY,dragX,touchStartY,touchStartX,touchMoveY=[],touchMoveX=[],startTime,runningTime,endTime,distance,speed,amount,
				durA=0,durB,overwrite=o.axis==="yx" ? "none" : "all",touchIntent=[];
			mCSB_container.bind("touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
				if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){return;}
				var offset=mCSB_container.offset();
				dragY=_coordinates(e)[0]-offset.top;
				dragX=_coordinates(e)[1]-offset.left;
				touchIntent=[_coordinates(e)[0],_coordinates(e)[1]];
			}).bind("touchmove."+namespace+" pointermove."+namespace+" MSPointerMove."+namespace,function(e){
				if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){return;}
				e.stopImmediatePropagation();
				runningTime=_getTime();
				var offset=mCustomScrollBox.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left,
					easing="mcsLinearOut";
				touchMoveY.push(y);
				touchMoveX.push(x);
				touchIntent[2]=Math.abs(_coordinates(e)[0]-touchIntent[0]); touchIntent[3]=Math.abs(_coordinates(e)[1]-touchIntent[1]);
				if(d.overflowed[0]){
					var limit=mCSB_dragger[0].parent().height()-mCSB_dragger[0].height(),
						prevent=((dragY-y)>0 && (y-dragY)>-(limit*d.scrollRatio.y) && (touchIntent[3]*2<touchIntent[2] || o.axis==="yx"));
				}
				if(d.overflowed[1]){
					var limitX=mCSB_dragger[1].parent().width()-mCSB_dragger[1].width(),
						preventX=((dragX-x)>0 && (x-dragX)>-(limitX*d.scrollRatio.x) && (touchIntent[2]*2<touchIntent[3] || o.axis==="yx"));
				}
				if(prevent || preventX){e.preventDefault();} /* prevent native document scrolling */
				amount=o.axis==="yx" ? [(dragY-y),(dragX-x)] : o.axis==="x" ? [null,(dragX-x)] : [(dragY-y),null];
				mCSB_container[0].idleTimer=250;
				if(d.overflowed[0]){_drag(amount[0],durA,easing,"y","all",true);}
				if(d.overflowed[1]){_drag(amount[1],durA,easing,"x",overwrite,true);}
			});
			mCustomScrollBox.bind("touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
				if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){return;}
				e.stopImmediatePropagation();
				_stop($this);
				startTime=_getTime();
				var offset=mCustomScrollBox.offset();
				touchStartY=_coordinates(e)[0]-offset.top;
				touchStartX=_coordinates(e)[1]-offset.left;
				touchMoveY=[]; touchMoveX=[];
			}).bind("touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
				if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){return;}
				e.stopImmediatePropagation();
				endTime=_getTime();
				var offset=mCustomScrollBox.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left;
				if((endTime-runningTime)>30){return;}
				speed=1000/(endTime-startTime);
				var easing="mcsEaseOut",slow=speed<2.5,
					diff=slow ? [touchMoveY[touchMoveY.length-2],touchMoveX[touchMoveX.length-2]] : [0,0];
				distance=slow ? [(y-diff[0]),(x-diff[1])] : [y-touchStartY,x-touchStartX];
				var absDistance=[Math.abs(distance[0]),Math.abs(distance[1])];
				speed=slow ? [Math.abs(distance[0]/4),Math.abs(distance[1]/4)] : [speed,speed];
				var a=[
					Math.abs(mCSB_container[0].offsetTop)-(distance[0]*_m((absDistance[0]/speed[0]),speed[0])),
					Math.abs(mCSB_container[0].offsetLeft)-(distance[1]*_m((absDistance[1]/speed[1]),speed[1]))
				];
				amount=o.axis==="yx" ? [a[0],a[1]] : o.axis==="x" ? [null,a[1]] : [a[0],null];
				durB=[(absDistance[0]*4)+o.scrollInertia,(absDistance[1]*4)+o.scrollInertia];
				var md=parseInt(o.contentTouchScroll) || 0; /* absolute minimum distance required */
				amount[0]=absDistance[0]>md ? amount[0] : 0;
				amount[1]=absDistance[1]>md ? amount[1] : 0;
				if(d.overflowed[0]){_drag(amount[0],durB[0],easing,"y",overwrite,false);}
				if(d.overflowed[1]){_drag(amount[1],durB[1],easing,"x",overwrite,false);}
			});
			function _m(ds,s){
				var r=[s*1.5,s*2,s/1.5,s/2];
				if(ds>90){
					return s>4 ? r[0] : r[3];
				}else if(ds>60){
					return s>3 ? r[3] : r[2];
				}else if(ds>30){
					return s>8 ? r[1] : s>6 ? r[0] : s>4 ? s : r[2];
				}else{
					return s>8 ? s : r[3];
				}
			}
			function _drag(amount,dur,easing,dir,overwrite,drag){
				if(!amount){return;}
				_scrollTo($this,amount.toString(),{dur:dur,scrollEasing:easing,dir:dir,overwrite:overwrite,drag:drag});
			}
		},
		/* -------------------- */


		/*
		SELECT TEXT EVENTS
		scrolls content when text is selected
		*/
		_selectable=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
				namespace=pluginPfx+"_"+d.idx,
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				wrapper=mCSB_container.parent(),
				action;
			mCSB_container.bind("mousedown."+namespace,function(e){
				if(!action){action=1; touchActive=true;}
			}).add(document).bind("mousemove."+namespace,function(e){
				if(action && _sel()){
					var offset=mCSB_container.offset(),
						y=_coordinates(e)[0]-offset.top+mCSB_container[0].offsetTop,x=_coordinates(e)[1]-offset.left+mCSB_container[0].offsetLeft;
					if(y>0 && y<wrapper.height() && x>0 && x<wrapper.width()){
						if(seq.step){_seq("off",null,"stepped");}
					}else{
						if(o.axis!=="x" && d.overflowed[0]){
							if(y<0){
								_seq("on",38);
							}else if(y>wrapper.height()){
								_seq("on",40);
							}
						}
						if(o.axis!=="y" && d.overflowed[1]){
							if(x<0){
								_seq("on",37);
							}else if(x>wrapper.width()){
								_seq("on",39);
							}
						}
					}
				}
			}).bind("mouseup."+namespace,function(e){
				if(action){action=0; _seq("off",null);}
				touchActive=false;
			});
			function _sel(){
				return 	window.getSelection ? window.getSelection().toString() :
						document.selection && document.selection.type!="Control" ? document.selection.createRange().text : 0;
			}
			function _seq(a,c,s){
				seq.type=s && action ? "stepped" : "stepless";
				seq.scrollAmount=10;
				_sequentialScroll($this,a,c,"mcsLinearOut",s ? 60 : null);
			}
		},
		/* -------------------- */


		/*
		MOUSE WHEEL EVENT
		scrolls content via mouse-wheel
		via mouse-wheel plugin (https://github.com/brandonaaron/jquery-mousewheel)
		*/
		_mousewheel=function(){
			var $this=$(this),d=$this.data(pluginPfx);
			if(d){ /* Check if the scrollbar is ready to use mousewheel events (issue: #185) */
				var o=d.opt,
					namespace=pluginPfx+"_"+d.idx,
					mCustomScrollBox=$("#mCSB_"+d.idx),
					mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
					iframe=$("#mCSB_"+d.idx+"_container").find("iframe"),
					el=mCustomScrollBox /* mousewheel element selector */;
				/* check for cross domain iframes and bind mousewheel event on them in addition to default mousewheel element selector */
				if(iframe.length){
					iframe.each(function(){
						var iFobj=this;
						if(_canAccessIFrame(iFobj)){ /* check if iframe can be accessed */
							el=el.add($(iFobj).contents().find("body"));
						}
					});
				}
				el.bind("mousewheel."+namespace,function(e,delta){
					_stop($this);
					if(_disableMousewheel($this,e.target)){return;} /* disables mouse-wheel when hovering specific elements */
					var deltaFactor=o.mouseWheel.deltaFactor!=="auto" ? parseInt(o.mouseWheel.deltaFactor) : (oldIE && e.deltaFactor<100) ? 100 : e.deltaFactor || 100;
					if(o.axis==="x" || o.mouseWheel.axis==="x"){
						var dir="x",
							px=[Math.round(deltaFactor*d.scrollRatio.x),parseInt(o.mouseWheel.scrollAmount)],
							amount=o.mouseWheel.scrollAmount!=="auto" ? px[1] : px[0]>=mCustomScrollBox.width() ? mCustomScrollBox.width()*0.9 : px[0],
							contentPos=Math.abs($("#mCSB_"+d.idx+"_container")[0].offsetLeft),
							draggerPos=mCSB_dragger[1][0].offsetLeft,
							limit=mCSB_dragger[1].parent().width()-mCSB_dragger[1].width(),
							dlt=e.deltaX || e.deltaY || delta;
					}else{
						var dir="y",
							px=[Math.round(deltaFactor*d.scrollRatio.y),parseInt(o.mouseWheel.scrollAmount)],
							amount=o.mouseWheel.scrollAmount!=="auto" ? px[1] : px[0]>=mCustomScrollBox.height() ? mCustomScrollBox.height()*0.9 : px[0],
							contentPos=Math.abs($("#mCSB_"+d.idx+"_container")[0].offsetTop),
							draggerPos=mCSB_dragger[0][0].offsetTop,
							limit=mCSB_dragger[0].parent().height()-mCSB_dragger[0].height(),
							dlt=e.deltaY || delta;
					}
					if((dir==="y" && !d.overflowed[0]) || (dir==="x" && !d.overflowed[1])){return;}
					if(o.mouseWheel.invert){dlt=-dlt;}
					if(o.mouseWheel.normalizeDelta){dlt=dlt<0 ? -1 : 1;}
					if((dlt>0 && draggerPos!==0) || (dlt<0 && draggerPos!==limit) || o.mouseWheel.preventDefault){
						e.stopImmediatePropagation();
						e.preventDefault();
					}
					_scrollTo($this,(contentPos-(dlt*amount)).toString(),{dir:dir});
				});
			}
			/* check if iframe can be accessed */
			function _canAccessIFrame(iframe){
				var html=null;
				try{
					var doc=iframe.contentDocument || iframe.contentWindow.document;
					html=doc.body.innerHTML;
				}catch(err){/* do nothing */}
				return(html!==null);
			}
		},
		/* -------------------- */


		/* disables mouse-wheel when hovering specific elements like select, datalist etc. */
		_disableMousewheel=function(el,target){
			var tag=target.nodeName.toLowerCase(),
				tags=el.data(pluginPfx).opt.mouseWheel.disableOver,
				/* elements that require focus */
				focusTags=["select","textarea"];
			return $.inArray(tag,tags) > -1 && !($.inArray(tag,focusTags) > -1 && !$(target).is(":focus"));
		},
		/* -------------------- */


		/*
		DRAGGER RAIL CLICK EVENT
		scrolls content via dragger rail
		*/
		_draggerRail=function(){
			var $this=$(this),d=$this.data(pluginPfx),
				namespace=pluginPfx+"_"+d.idx,
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				wrapper=mCSB_container.parent(),
				mCSB_draggerContainer=$(".mCSB_"+d.idx+"_scrollbar ."+classes[12]);
			mCSB_draggerContainer.bind("touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
				touchActive=true;
			}).bind("touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
				touchActive=false;
			}).bind("click."+namespace,function(e){
				if($(e.target).hasClass(classes[12]) || $(e.target).hasClass("mCSB_draggerRail")){
					_stop($this);
					var el=$(this),mCSB_dragger=el.find(".mCSB_dragger");
					if(el.parent(".mCSB_scrollTools_horizontal").length>0){
						if(!d.overflowed[1]){return;}
						var dir="x",
							clickDir=e.pageX>mCSB_dragger.offset().left ? -1 : 1,
							to=Math.abs(mCSB_container[0].offsetLeft)-(clickDir*(wrapper.width()*0.9));
					}else{
						if(!d.overflowed[0]){return;}
						var dir="y",
							clickDir=e.pageY>mCSB_dragger.offset().top ? -1 : 1,
							to=Math.abs(mCSB_container[0].offsetTop)-(clickDir*(wrapper.height()*0.9));
					}
					_scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
				}
			});
		},
		/* -------------------- */


		/*
		FOCUS EVENT
		scrolls content via element focus (e.g. clicking an input, pressing TAB key etc.)
		*/
		_focus=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				namespace=pluginPfx+"_"+d.idx,
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				wrapper=mCSB_container.parent();
			mCSB_container.bind("focusin."+namespace,function(e){
				var el=$(document.activeElement),
					nested=mCSB_container.find(".mCustomScrollBox").length,
					dur=0;
				if(!el.is(o.advanced.autoScrollOnFocus)){return;}
				_stop($this);
				clearTimeout($this[0]._focusTimeout);
				$this[0]._focusTimer=nested ? (dur+17)*nested : 0;
				$this[0]._focusTimeout=setTimeout(function(){
					var	to=[_childPos(el)[0],_childPos(el)[1]],
						contentPos=[mCSB_container[0].offsetTop,mCSB_container[0].offsetLeft],
						isVisible=[
							(contentPos[0]+to[0]>=0 && contentPos[0]+to[0]<wrapper.height()-el.outerHeight(false)),
							(contentPos[1]+to[1]>=0 && contentPos[0]+to[1]<wrapper.width()-el.outerWidth(false))
						],
						overwrite=(o.axis==="yx" && !isVisible[0] && !isVisible[1]) ? "none" : "all";
					if(o.axis!=="x" && !isVisible[0]){
						_scrollTo($this,to[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:overwrite,dur:dur});
					}
					if(o.axis!=="y" && !isVisible[1]){
						_scrollTo($this,to[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:overwrite,dur:dur});
					}
				},$this[0]._focusTimer);
			});
		},
		/* -------------------- */


		/* sets content wrapper scrollTop/scrollLeft always to 0 */
		_wrapperScroll=function(){
			var $this=$(this),d=$this.data(pluginPfx),
				namespace=pluginPfx+"_"+d.idx,
				wrapper=$("#mCSB_"+d.idx+"_container").parent();
			wrapper.bind("scroll."+namespace,function(e){
				if(wrapper.scrollTop()!==0 || wrapper.scrollLeft()!==0){
					$(".mCSB_"+d.idx+"_scrollbar").css("visibility","hidden"); /* hide scrollbar(s) */
				}
			});
		},
		/* -------------------- */


		/*
		BUTTONS EVENTS
		scrolls content via up, down, left and right buttons
		*/
		_buttons=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
				namespace=pluginPfx+"_"+d.idx,
				sel=".mCSB_"+d.idx+"_scrollbar",
				btn=$(sel+">a");
			btn.bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace+" mouseup."+namespace+" touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace+" mouseout."+namespace+" pointerout."+namespace+" MSPointerOut."+namespace+" click."+namespace,function(e){
				e.preventDefault();
				if(!_mouseBtnLeft(e)){return;} /* left mouse button only */
				var btnClass=$(this).attr("class");
				seq.type=o.scrollButtons.scrollType;
				switch(e.type){
					case "mousedown": case "touchstart": case "pointerdown": case "MSPointerDown":
						if(seq.type==="stepped"){return;}
						touchActive=true;
						d.tweenRunning=false;
						_seq("on",btnClass);
						break;
					case "mouseup": case "touchend": case "pointerup": case "MSPointerUp":
					case "mouseout": case "pointerout": case "MSPointerOut":
						if(seq.type==="stepped"){return;}
						touchActive=false;
						if(seq.dir){_seq("off",btnClass);}
						break;
					case "click":
						if(seq.type!=="stepped" || d.tweenRunning){return;}
						_seq("on",btnClass);
						break;
				}
				function _seq(a,c){
					seq.scrollAmount=o.snapAmount || o.scrollButtons.scrollAmount;
					_sequentialScroll($this,a,c);
				}
			});
		},
		/* -------------------- */


		/*
		KEYBOARD EVENTS
		scrolls content via keyboard
		Keys: up arrow, down arrow, left arrow, right arrow, PgUp, PgDn, Home, End
		*/
		_keyboard=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
				namespace=pluginPfx+"_"+d.idx,
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				wrapper=mCSB_container.parent(),
				editables="input,textarea,select,datalist,keygen,[contenteditable='true']";
			mCustomScrollBox.attr("tabindex","0").bind("blur."+namespace+" keydown."+namespace+" keyup."+namespace,function(e){
				switch(e.type){
					case "blur":
						if(d.tweenRunning && seq.dir){_seq("off",null);}
						break;
					case "keydown": case "keyup":
						var code=e.keyCode ? e.keyCode : e.which,action="on";
						if((o.axis!=="x" && (code===38 || code===40)) || (o.axis!=="y" && (code===37 || code===39))){
							/* up (38), down (40), left (37), right (39) arrows */
							if(((code===38 || code===40) && !d.overflowed[0]) || ((code===37 || code===39) && !d.overflowed[1])){return;}
							if(e.type==="keyup"){action="off";}
							if(!$(document.activeElement).is(editables)){
								e.preventDefault();
								e.stopImmediatePropagation();
								_seq(action,code);
							}
						}else if(code===33 || code===34){
							/* PgUp (33), PgDn (34) */
							if(d.overflowed[0] || d.overflowed[1]){
								e.preventDefault();
								e.stopImmediatePropagation();
							}
							if(e.type==="keyup"){
								_stop($this);
								var keyboardDir=code===34 ? -1 : 1;
								if(o.axis==="x" || (o.axis==="yx" && d.overflowed[1] && !d.overflowed[0])){
									var dir="x",to=Math.abs(mCSB_container[0].offsetLeft)-(keyboardDir*(wrapper.width()*0.9));
								}else{
									var dir="y",to=Math.abs(mCSB_container[0].offsetTop)-(keyboardDir*(wrapper.height()*0.9));
								}
								_scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
							}
						}else if(code===35 || code===36){
							/* End (35), Home (36) */
							if(!$(document.activeElement).is(editables)){
								if(d.overflowed[0] || d.overflowed[1]){
									e.preventDefault();
									e.stopImmediatePropagation();
								}
								if(e.type==="keyup"){
									if(o.axis==="x" || (o.axis==="yx" && d.overflowed[1] && !d.overflowed[0])){
										var dir="x",to=code===35 ? Math.abs(wrapper.width()-mCSB_container.outerWidth(false)) : 0;
									}else{
										var dir="y",to=code===35 ? Math.abs(wrapper.height()-mCSB_container.outerHeight(false)) : 0;
									}
									_scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
								}
							}
						}
						break;
				}
				function _seq(a,c){
					seq.type=o.keyboard.scrollType;
					seq.scrollAmount=o.snapAmount || o.keyboard.scrollAmount;
					if(seq.type==="stepped" && d.tweenRunning){return;}
					_sequentialScroll($this,a,c);
				}
			});
		},
		/* -------------------- */


		/* scrolls content sequentially (used when scrolling via buttons, keyboard arrows etc.) */
		_sequentialScroll=function(el,action,trigger,e,s){
			var d=el.data(pluginPfx),o=d.opt,seq=d.sequential,
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				once=seq.type==="stepped" ? true : false;
			switch(action){
				case "on":
					seq.dir=[
						(trigger===classes[16] || trigger===classes[15] || trigger===39 || trigger===37 ? "x" : "y"),
						(trigger===classes[13] || trigger===classes[15] || trigger===38 || trigger===37 ? -1 : 1)
					];
					_stop(el);
					if(_isNumeric(trigger) && seq.type==="stepped"){return;}
					_on(once);
					break;
				case "off":
					_off();
					if(once || (d.tweenRunning && seq.dir)){
						_on(true);
					}
					break;
			}
			/* starts sequence */
			function _on(once){
				var c=seq.type!=="stepped", /* continuous scrolling */
					t=s ? s : !once ? 1000/60 : c ? o.scrollInertia/1.5 : o.scrollInertia, /* timer */
					m=!once ? 2.5 : c ? 7.5 : 40, /* multiplier */
					contentPos=[Math.abs(mCSB_container[0].offsetTop),Math.abs(mCSB_container[0].offsetLeft)],
					ratio=[d.scrollRatio.y>10 ? 10 : d.scrollRatio.y,d.scrollRatio.x>10 ? 10 : d.scrollRatio.x],
					amount=seq.dir[0]==="x" ? contentPos[1]+(seq.dir[1]*(ratio[1]*m)) : contentPos[0]+(seq.dir[1]*(ratio[0]*m)),
					px=seq.dir[0]==="x" ? contentPos[1]+(seq.dir[1]*parseInt(seq.scrollAmount)) : contentPos[0]+(seq.dir[1]*parseInt(seq.scrollAmount)),
					to=seq.scrollAmount!=="auto" ? px : amount,
					easing=e ? e : !once ? "mcsLinear" : c ? "mcsLinearOut" : "mcsEaseInOut",
					onComplete=!once ? false : true;
				if(once && t<17){
					to=seq.dir[0]==="x" ? contentPos[1] : contentPos[0];
				}
				_scrollTo(el,to.toString(),{dir:seq.dir[0],scrollEasing:easing,dur:t,onComplete:onComplete});
				if(once){
					seq.dir=false;
					return;
				}
				clearTimeout(seq.step);
				seq.step=setTimeout(function(){
					_on();
				},t);
			}
			/* stops sequence */
			function _off(){
				clearTimeout(seq.step);
				_delete(seq,"step");
				_stop(el);
			}
		},
		/* -------------------- */


		/* returns a yx array from value */
		_arr=function(val){
			var o=$(this).data(pluginPfx).opt,vals=[];
			if(typeof val==="function"){val=val();} /* check if the value is a single anonymous function */
			/* check if value is object or array, its length and create an array with yx values */
			if(!(val instanceof Array)){ /* object value (e.g. {y:"100",x:"100"}, 100 etc.) */
				vals[0]=val.y ? val.y : val.x || o.axis==="x" ? null : val;
				vals[1]=val.x ? val.x : val.y || o.axis==="y" ? null : val;
			}else{ /* array value (e.g. [100,100]) */
				vals=val.length>1 ? [val[0],val[1]] : o.axis==="x" ? [null,val[0]] : [val[0],null];
			}
			/* check if array values are anonymous functions */
			if(typeof vals[0]==="function"){vals[0]=vals[0]();}
			if(typeof vals[1]==="function"){vals[1]=vals[1]();}
			return vals;
		},
		/* -------------------- */


		/* translates values (e.g. "top", 100, "100px", "#id") to actual scroll-to positions */
		_to=function(val,dir){
			if(val==null || typeof val=="undefined"){return;}
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				wrapper=mCSB_container.parent(),
				t=typeof val;
			if(!dir){dir=o.axis==="x" ? "x" : "y";}
			var contentLength=dir==="x" ? mCSB_container.outerWidth(false) : mCSB_container.outerHeight(false),
				contentPos=dir==="x" ? mCSB_container[0].offsetLeft : mCSB_container[0].offsetTop,
				cssProp=dir==="x" ? "left" : "top";
			switch(t){
				case "function": /* this currently is not used. Consider removing it */
					return val();
					break;
				case "object": /* js/jquery object */
					var obj=val.jquery ? val : $(val);
					if(!obj.length){return;}
					return dir==="x" ? _childPos(obj)[1] : _childPos(obj)[0];
					break;
				case "string": case "number":
					if(_isNumeric(val)){ /* numeric value */
						return Math.abs(val);
					}else if(val.indexOf("%")!==-1){ /* percentage value */
						return Math.abs(contentLength*parseInt(val)/100);
					}else if(val.indexOf("-=")!==-1){ /* decrease value */
						return Math.abs(contentPos-parseInt(val.split("-=")[1]));
					}else if(val.indexOf("+=")!==-1){ /* inrease value */
						var p=(contentPos+parseInt(val.split("+=")[1]));
						return p>=0 ? 0 : Math.abs(p);
					}else if(val.indexOf("px")!==-1 && _isNumeric(val.split("px")[0])){ /* pixels string value (e.g. "100px") */
						return Math.abs(val.split("px")[0]);
					}else{
						if(val==="top" || val==="left"){ /* special strings */
							return 0;
						}else if(val==="bottom"){
							return Math.abs(wrapper.height()-mCSB_container.outerHeight(false));
						}else if(val==="right"){
							return Math.abs(wrapper.width()-mCSB_container.outerWidth(false));
						}else if(val==="first" || val==="last"){
							var obj=mCSB_container.find(":"+val);
							return dir==="x" ? _childPos(obj)[1] : _childPos(obj)[0];
						}else{
							if($(val).length){ /* jquery selector */
								return dir==="x" ? _childPos($(val))[1] : _childPos($(val))[0];
							}else{ /* other values (e.g. "100em") */
								mCSB_container.css(cssProp,val);
								methods.update.call(null,$this[0]);
								return;
							}
						}
					}
					break;
			}
		},
		/* -------------------- */


		/* calls the update method automatically */
		_autoUpdate=function(rem){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				mCSB_container=$("#mCSB_"+d.idx+"_container");
			if(rem){
				/*
				removes autoUpdate timer
				usage: _autoUpdate.call(this,"remove");
				*/
				clearTimeout(mCSB_container[0].autoUpdate);
				_delete(mCSB_container[0],"autoUpdate");
				return;
			}
			var	wrapper=mCSB_container.parent(),
				scrollbar=[$("#mCSB_"+d.idx+"_scrollbar_vertical"),$("#mCSB_"+d.idx+"_scrollbar_horizontal")],
				scrollbarSize=function(){return [
					scrollbar[0].is(":visible") ? scrollbar[0].outerHeight(true) : 0, /* returns y-scrollbar height */
					scrollbar[1].is(":visible") ? scrollbar[1].outerWidth(true) : 0 /* returns x-scrollbar width */
				]},
				oldSelSize=sizesSum(),newSelSize,
				os=[mCSB_container.outerHeight(false),mCSB_container.outerWidth(false),wrapper.height(),wrapper.width(),scrollbarSize()[0],scrollbarSize()[1]],ns,
				oldImgsLen=imgSum(),newImgsLen;
			upd();
			function upd(){
				clearTimeout(mCSB_container[0].autoUpdate);
				mCSB_container[0].autoUpdate=setTimeout(function(){
					/* update on specific selector(s) length and size change */
					if(o.advanced.updateOnSelectorChange){
						newSelSize=sizesSum();
						if(newSelSize!==oldSelSize){
							doUpd(3);
							oldSelSize=newSelSize;
							return;
						}
					}
					/* update on main element and scrollbar size changes */
					if(o.advanced.updateOnContentResize){
						ns=[mCSB_container.outerHeight(false),mCSB_container.outerWidth(false),wrapper.height(),wrapper.width(),scrollbarSize()[0],scrollbarSize()[1]];
						if(ns[0]!==os[0] || ns[1]!==os[1] || ns[2]!==os[2] || ns[3]!==os[3] || ns[4]!==os[4] || ns[5]!==os[5]){
							doUpd(ns[0]!==os[0] || ns[1]!==os[1]);
							os=ns;
						}
					}
					/* update on image load */
					if(o.advanced.updateOnImageLoad){
						newImgsLen=imgSum();
						if(newImgsLen!==oldImgsLen){
							mCSB_container.find("img").each(function(){
								imgLoader(this);
							});
							oldImgsLen=newImgsLen;
						}
					}
					if(o.advanced.updateOnSelectorChange || o.advanced.updateOnContentResize || o.advanced.updateOnImageLoad){upd();}
				},60);
			}
			/* returns images amount */
			function imgSum(){
				var total=0
				if(o.advanced.updateOnImageLoad){total=mCSB_container.find("img").length;}
				return total;
			}
			/* a tiny image loader */
			function imgLoader(el){
				if($(el).hasClass(classes[2])){doUpd(); return;}
				var img=new Image();
				function createDelegate(contextObject,delegateMethod){
					return function(){return delegateMethod.apply(contextObject,arguments);}
				}
				function imgOnLoad(){
					this.onload=null;
					$(el).addClass(classes[2]);
					doUpd(2);
				}
				img.onload=createDelegate(img,imgOnLoad);
				img.src=el.src;
			}
			/* returns the total height and width sum of all elements matching the selector */
			function sizesSum(){
				if(o.advanced.updateOnSelectorChange===true){o.advanced.updateOnSelectorChange="*";}
				var total=0,sel=mCSB_container.find(o.advanced.updateOnSelectorChange);
				if(o.advanced.updateOnSelectorChange && sel.length>0){sel.each(function(){total+=$(this).height()+$(this).width();});}
				return total;
			}
			/* calls the update method */
			function doUpd(cb){
				clearTimeout(mCSB_container[0].autoUpdate);
				methods.update.call(null,$this[0],cb);
			}
		},
		/* -------------------- */


		/* snaps scrolling to a multiple of a pixels number */
		_snapAmount=function(to,amount,offset){
			return (Math.round(to/amount)*amount-offset);
		},
		/* -------------------- */


		/* stops content and scrollbar animations */
		_stop=function(el){
			var d=el.data(pluginPfx),
				sel=$("#mCSB_"+d.idx+"_container,#mCSB_"+d.idx+"_container_wrapper,#mCSB_"+d.idx+"_dragger_vertical,#mCSB_"+d.idx+"_dragger_horizontal");
			sel.each(function(){
				_stopTween.call(this);
			});
		},
		/* -------------------- */


		/*
		ANIMATES CONTENT
		This is where the actual scrolling happens
		*/
		_scrollTo=function(el,to,options){
			var d=el.data(pluginPfx),o=d.opt,
				defaults={
					trigger:"internal",
					dir:"y",
					scrollEasing:"mcsEaseOut",
					drag:false,
					dur:o.scrollInertia,
					overwrite:"all",
					callbacks:true,
					onStart:true,
					onUpdate:true,
					onComplete:true
				},
				options=$.extend(defaults,options),
				dur=[options.dur,(options.drag ? 0 : options.dur)],
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				wrapper=mCSB_container.parent(),
				totalScrollOffsets=o.callbacks.onTotalScrollOffset ? _arr.call(el,o.callbacks.onTotalScrollOffset) : [0,0],
				totalScrollBackOffsets=o.callbacks.onTotalScrollBackOffset ? _arr.call(el,o.callbacks.onTotalScrollBackOffset) : [0,0];
			d.trigger=options.trigger;
			if(wrapper.scrollTop()!==0 || wrapper.scrollLeft()!==0){ /* always reset scrollTop/Left */
				$(".mCSB_"+d.idx+"_scrollbar").css("visibility","visible");
				wrapper.scrollTop(0).scrollLeft(0);
			}
			if(to==="_resetY" && !d.contentReset.y){
				/* callbacks: onOverflowYNone */
				if(_cb("onOverflowYNone")){o.callbacks.onOverflowYNone.call(el[0]);}
				d.contentReset.y=1;
			}
			if(to==="_resetX" && !d.contentReset.x){
				/* callbacks: onOverflowXNone */
				if(_cb("onOverflowXNone")){o.callbacks.onOverflowXNone.call(el[0]);}
				d.contentReset.x=1;
			}
			if(to==="_resetY" || to==="_resetX"){return;}
			if((d.contentReset.y || !el[0].mcs) && d.overflowed[0]){
				/* callbacks: onOverflowY */
				if(_cb("onOverflowY")){o.callbacks.onOverflowY.call(el[0]);}
				d.contentReset.x=null;
			}
			if((d.contentReset.x || !el[0].mcs) && d.overflowed[1]){
				/* callbacks: onOverflowX */
				if(_cb("onOverflowX")){o.callbacks.onOverflowX.call(el[0]);}
				d.contentReset.x=null;
			}
			if(o.snapAmount){to=_snapAmount(to,o.snapAmount,o.snapOffset);} /* scrolling snapping */
			switch(options.dir){
				case "x":
					var mCSB_dragger=$("#mCSB_"+d.idx+"_dragger_horizontal"),
						property="left",
						contentPos=mCSB_container[0].offsetLeft,
						limit=[
							mCustomScrollBox.width()-mCSB_container.outerWidth(false),
							mCSB_dragger.parent().width()-mCSB_dragger.width()
						],
						scrollTo=[to,to===0 ? 0 : (to/d.scrollRatio.x)],
						tso=totalScrollOffsets[1],
						tsbo=totalScrollBackOffsets[1],
						totalScrollOffset=tso>0 ? tso/d.scrollRatio.x : 0,
						totalScrollBackOffset=tsbo>0 ? tsbo/d.scrollRatio.x : 0;
					break;
				case "y":
					var mCSB_dragger=$("#mCSB_"+d.idx+"_dragger_vertical"),
						property="top",
						contentPos=mCSB_container[0].offsetTop,
						limit=[
							mCustomScrollBox.height()-mCSB_container.outerHeight(false),
							mCSB_dragger.parent().height()-mCSB_dragger.height()
						],
						scrollTo=[to,to===0 ? 0 : (to/d.scrollRatio.y)],
						tso=totalScrollOffsets[0],
						tsbo=totalScrollBackOffsets[0],
						totalScrollOffset=tso>0 ? tso/d.scrollRatio.y : 0,
						totalScrollBackOffset=tsbo>0 ? tsbo/d.scrollRatio.y : 0;
					break;
			}
			if(scrollTo[1]<0 || (scrollTo[0]===0 && scrollTo[1]===0)){
				scrollTo=[0,0];
			}else if(scrollTo[1]>=limit[1]){
				scrollTo=[limit[0],limit[1]];
			}else{
				scrollTo[0]=-scrollTo[0];
			}
			if(!el[0].mcs){
				_mcs();  /* init mcs object (once) to make it available before callbacks */
				if(_cb("onInit")){o.callbacks.onInit.call(el[0]);} /* callbacks: onInit */
			}
			clearTimeout(mCSB_container[0].onCompleteTimeout);
			if(!d.tweenRunning && ((contentPos===0 && scrollTo[0]>=0) || (contentPos===limit[0] && scrollTo[0]<=limit[0]))){return;}
			_tweenTo(mCSB_dragger[0],property,Math.round(scrollTo[1]),dur[1],options.scrollEasing);
			_tweenTo(mCSB_container[0],property,Math.round(scrollTo[0]),dur[0],options.scrollEasing,options.overwrite,{
				onStart:function(){
					if(options.callbacks && options.onStart && !d.tweenRunning){
						/* callbacks: onScrollStart */
						if(_cb("onScrollStart")){_mcs(); o.callbacks.onScrollStart.call(el[0]);}
						d.tweenRunning=true;
						_onDragClasses(mCSB_dragger);
						d.cbOffsets=_cbOffsets();
					}
				},onUpdate:function(){
					if(options.callbacks && options.onUpdate){
						/* callbacks: whileScrolling */
						if(_cb("whileScrolling")){_mcs(); o.callbacks.whileScrolling.call(el[0]);}
					}
				},onComplete:function(){
					if(options.callbacks && options.onComplete){
						if(o.axis==="yx"){clearTimeout(mCSB_container[0].onCompleteTimeout);}
						var t=mCSB_container[0].idleTimer || 0;
						mCSB_container[0].onCompleteTimeout=setTimeout(function(){
							/* callbacks: onScroll, onTotalScroll, onTotalScrollBack */
							if(_cb("onScroll")){_mcs(); o.callbacks.onScroll.call(el[0]);}
							if(_cb("onTotalScroll") && scrollTo[1]>=limit[1]-totalScrollOffset && d.cbOffsets[0]){_mcs(); o.callbacks.onTotalScroll.call(el[0]);}
							if(_cb("onTotalScrollBack") && scrollTo[1]<=totalScrollBackOffset && d.cbOffsets[1]){_mcs(); o.callbacks.onTotalScrollBack.call(el[0]);}
							d.tweenRunning=false;
							mCSB_container[0].idleTimer=0;
							_onDragClasses(mCSB_dragger,"hide");
						},t);
					}
				}
			});
			/* checks if callback function exists */
			function _cb(cb){
				return d && o.callbacks[cb] && typeof o.callbacks[cb]==="function";
			}
			/* checks whether callback offsets always trigger */
			function _cbOffsets(){
				return [o.callbacks.alwaysTriggerOffsets || contentPos>=limit[0]+tso,o.callbacks.alwaysTriggerOffsets || contentPos<=-tsbo];
			}
			/*
			populates object with useful values for the user
			values:
				content: this.mcs.content
				content top position: this.mcs.top
				content left position: this.mcs.left
				dragger top position: this.mcs.draggerTop
				dragger left position: this.mcs.draggerLeft
				scrolling y percentage: this.mcs.topPct
				scrolling x percentage: this.mcs.leftPct
				scrolling direction: this.mcs.direction
			*/
			function _mcs(){
				var cp=[mCSB_container[0].offsetTop,mCSB_container[0].offsetLeft], /* content position */
					dp=[mCSB_dragger[0].offsetTop,mCSB_dragger[0].offsetLeft], /* dragger position */
					cl=[mCSB_container.outerHeight(false),mCSB_container.outerWidth(false)], /* content length */
					pl=[mCustomScrollBox.height(),mCustomScrollBox.width()]; /* content parent length */
				el[0].mcs={
					content:mCSB_container, /* original content wrapper as jquery object */
					top:cp[0],left:cp[1],draggerTop:dp[0],draggerLeft:dp[1],
					topPct:Math.round((100*Math.abs(cp[0]))/(Math.abs(cl[0])-pl[0])),leftPct:Math.round((100*Math.abs(cp[1]))/(Math.abs(cl[1])-pl[1])),
					direction:options.dir
				};
				/*
				this refers to the original element containing the scrollbar(s)
				usage: this.mcs.top, this.mcs.leftPct etc.
				*/
			}
		},
		/* -------------------- */


		/*
		CUSTOM JAVASCRIPT ANIMATION TWEEN
		Lighter and faster than jquery animate() and css transitions
		Animates top/left properties and includes easings
		*/
		_tweenTo=function(el,prop,to,duration,easing,overwrite,callbacks){
			if(!el._mTween){el._mTween={top:{},left:{}};}
			var callbacks=callbacks || {},
				onStart=callbacks.onStart || function(){},onUpdate=callbacks.onUpdate || function(){},onComplete=callbacks.onComplete || function(){},
				startTime=_getTime(),_delay,progress=0,from=el.offsetTop,elStyle=el.style,_request,tobj=el._mTween[prop];
			if(prop==="left"){from=el.offsetLeft;}
			var diff=to-from;
			tobj.stop=0;
			if(overwrite!=="none"){_cancelTween();}
			_startTween();
			function _step(){
				if(tobj.stop){return;}
				if(!progress){onStart.call();}
				progress=_getTime()-startTime;
				_tween();
				if(progress>=tobj.time){
					tobj.time=(progress>tobj.time) ? progress+_delay-(progress-tobj.time) : progress+_delay-1;
					if(tobj.time<progress+1){tobj.time=progress+1;}
				}
				if(tobj.time<duration){tobj.id=_request(_step);}else{onComplete.call();}
			}
			function _tween(){
				if(duration>0){
					tobj.currVal=_ease(tobj.time,from,diff,duration,easing);
					elStyle[prop]=Math.round(tobj.currVal)+"px";
				}else{
					elStyle[prop]=to+"px";
				}
				onUpdate.call();
			}
			function _startTween(){
				_delay=1000/60;
				tobj.time=progress+_delay;
				_request=(!window.requestAnimationFrame) ? function(f){_tween(); return setTimeout(f,0.01);} : window.requestAnimationFrame;
				tobj.id=_request(_step);
			}
			function _cancelTween(){
				if(tobj.id==null){return;}
				if(!window.requestAnimationFrame){clearTimeout(tobj.id);
				}else{window.cancelAnimationFrame(tobj.id);}
				tobj.id=null;
			}
			function _ease(t,b,c,d,type){
				switch(type){
					case "linear": case "mcsLinear":
						return c*t/d + b;
						break;
					case "mcsLinearOut":
						t/=d; t--; return c * Math.sqrt(1 - t*t) + b;
						break;
					case "easeInOutSmooth":
						t/=d/2;
						if(t<1) return c/2*t*t + b;
						t--;
						return -c/2 * (t*(t-2) - 1) + b;
						break;
					case "easeInOutStrong":
						t/=d/2;
						if(t<1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
						t--;
						return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
						break;
					case "easeInOut": case "mcsEaseInOut":
						t/=d/2;
						if(t<1) return c/2*t*t*t + b;
						t-=2;
						return c/2*(t*t*t + 2) + b;
						break;
					case "easeOutSmooth":
						t/=d; t--;
						return -c * (t*t*t*t - 1) + b;
						break;
					case "easeOutStrong":
						return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
						break;
					case "easeOut": case "mcsEaseOut": default:
						var ts=(t/=d)*t,tc=ts*t;
						return b+c*(0.499999999999997*tc*ts + -2.5*ts*ts + 5.5*tc + -6.5*ts + 4*t);
				}
			}
		},
		/* -------------------- */


		/* returns current time */
		_getTime=function(){
			if(window.performance && window.performance.now){
				return window.performance.now();
			}else{
				if(window.performance && window.performance.webkitNow){
					return window.performance.webkitNow();
				}else{
					if(Date.now){return Date.now();}else{return new Date().getTime();}
				}
			}
		},
		/* -------------------- */


		/* stops a tween */
		_stopTween=function(){
			var el=this;
			if(!el._mTween){el._mTween={top:{},left:{}};}
			var props=["top","left"];
			for(var i=0; i<props.length; i++){
				var prop=props[i];
				if(el._mTween[prop].id){
					if(!window.requestAnimationFrame){clearTimeout(el._mTween[prop].id);
					}else{window.cancelAnimationFrame(el._mTween[prop].id);}
					el._mTween[prop].id=null;
					el._mTween[prop].stop=1;
				}
			}
		},
		/* -------------------- */


		/* deletes a property (avoiding the exception thrown by IE) */
		_delete=function(c,m){
			try{delete c[m];}catch(e){c[m]=null;}
		},
		/* -------------------- */


		/* detects left mouse button */
		_mouseBtnLeft=function(e){
			return !(e.which && e.which!==1);
		},
		/* -------------------- */


		/* detects if pointer type event is touch */
		_pointerTouch=function(e){
			var t=e.originalEvent.pointerType;
			return !(t && t!=="touch" && t!==2);
		},
		/* -------------------- */


		/* checks if value is numeric */
		_isNumeric=function(val){
			return !isNaN(parseFloat(val)) && isFinite(val);
		},
		/* -------------------- */


		/* returns element position according to content */
		_childPos=function(el){
			var p=el.parents(".mCSB_container");
			return [el.offset().top-p.offset().top,el.offset().left-p.offset().left];
		};
		/* -------------------- */





	/*
	----------------------------------------
	PLUGIN SETUP
	----------------------------------------
	*/

	/* plugin constructor functions */
	$.fn[pluginNS]=function(method){ /* usage: $(selector).mCustomScrollbar(); */
		if(methods[method]){
			return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
		}else if(typeof method==="object" || !method){
			return methods.init.apply(this,arguments);
		}else{
			$.error("Method "+method+" does not exist");
		}
	};
	$[pluginNS]=function(method){ /* usage: $.mCustomScrollbar(); */
		if(methods[method]){
			return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
		}else if(typeof method==="object" || !method){
			return methods.init.apply(this,arguments);
		}else{
			$.error("Method "+method+" does not exist");
		}
	};

	/*
	allow setting plugin default options.
	usage: $.mCustomScrollbar.defaults.scrollInertia=500;
	to apply any changed default options on default selectors (below), use inside document ready fn
	e.g.: $(document).ready(function(){ $.mCustomScrollbar.defaults.scrollInertia=500; });
	*/
	$[pluginNS].defaults=defaults;

	/*
	add window object (window.mCustomScrollbar)
	usage: if(window.mCustomScrollbar){console.log("custom scrollbar plugin loaded");}
	*/
	window[pluginNS]=true;

	$(window).load(function(){

		$(defaultSelector)[pluginNS](); /* add scrollbars automatically on default selector */

		/* extend jQuery expressions */
		$.extend($.expr[":"],{
			/* checks if element is within scrollable viewport */
			mcsInView:$.expr[":"].mcsInView || function(el){
				var $el=$(el),content=$el.parents(".mCSB_container"),wrapper,cPos;
				if(!content.length){return;}
				wrapper=content.parent();
				cPos=[content[0].offsetTop,content[0].offsetLeft];
				return 	cPos[0]+_childPos($el)[0]>=0 && cPos[0]+_childPos($el)[0]<wrapper.height()-$el.outerHeight(false) &&
						cPos[1]+_childPos($el)[1]>=0 && cPos[1]+_childPos($el)[1]<wrapper.width()-$el.outerWidth(false);
			},
			/* checks if element is overflowed having visible scrollbar(s) */
			mcsOverflow:$.expr[":"].mcsOverflow || function(el){
				var d=$(el).data(pluginPfx);
				if(!d){return;}
				return d.overflowed[0] || d.overflowed[1];
			}
		});

	});

}))}(jQuery,window,document));

/* =========
 * lazyload.js
 * ========= */

(function($, App) {

  "use strict";

  /* ============== */
  /* MODULE TRIGGER */
  /* ============== */

  var lazyloadTrigger = '.lazyload-item',
      winElm = $(window),
      body = $('body'),
      isIE9 = $('html').hasClass('ie9');

  /* =============== */
  /* LAZY LOAD DEFAULTS */
  /* =============== */

  var defaults = {
    animDuration: 800,
    timeoutShow: 100,
    offsetDiff: 50,
    initTopPos: 100
  };

  $.easing.jswing = $.easing.swing;

  $.extend($.easing, {
    easeOutCubic: function (x, t, b, c, d) {
      return c*((t=t/d-1)*t*t + 1) + b;
    }
  });

  /* ================= */
  /* LAZY LOAD DEFINITION */
  /* ================= */

  function Lazyload(opts) {
    this.settings = $.extend({}, defaults, opts);
    return this.init();
  }

  /* ============== */
  /* LAZY LOAD METHODS */
  /* ============== */

  Lazyload.prototype.init = function() {
    var that = this;
    $('html, body').scrollTop(0);
    that.initLazyload();
    return this;
  };

  Lazyload.prototype.initLazyload = function() {
    var that = this,
        namespace = 'lazyLoad' + Math.random();

    winElm.on('scroll.' + namespace, function() {
      var listItem = $(lazyloadTrigger).not('.inited').filter(':visible'),
          topPos = (window.innerHeight ? window.innerHeight : winElm.height()) + winElm.scrollTop(),
          timeout = that.settings.timeoutShow;

      if(body.data('scrolling')) {
        return;
      }

      listItem.each(function() {
        var item = $(this);
        if(!item.hasClass('inited')) {
          if(item.offset().top + that.settings.offsetDiff < topPos ) {
            item.addClass('inited');
            if(isIE9) {
              setTimeout(function() {
                item.css({
                  opacity: 0,
                  top: that.settings.initTopPos
                }).animate({
                  opacity: 1,
                  top: 0
                }, that.settings.animDuration, 'easeOutCubic');
              }, timeout);
            }
            else {
              item.css("transition-delay", timeout + "ms");
            }
            timeout += that.settings.timeoutShow;
          }
        }
      });
    }).trigger('scroll.' + namespace);

    winElm.on('resize.lazyload.' + namespace, function() {
      winElm.trigger('scroll.' + namespace);
    });
    return this;
  };

  /* =============== */
  /* LAZY LOAD DATA-API */
  /* =============== */

  $(function() {
    if(!isIE9) {
      $('html').addClass('not-ie9');
    }
    setTimeout(function() {
      App.lazyload = new Lazyload();
    }, 1000);
  });

}(window.jQuery, window.App));
/**
 *  @Accordion plugin
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    toggle
 *    destroy
 */
;(function($, window, undefined) {
  var pluginName = 'list-friend-gp',
      win = $(window);

  function ListFriend(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, options);
    this.init();
  }

  ListFriend.prototype = {
    init: function() {
      var that = this;
      var templateLoading= '<div class="wrapLoad" style="z-index: 100000"><div class="load-wrapp"><div class="load-1"><div class="line"></div><div class="line"></div><div class="line"></div></div></div></div>';
      this.element.on('click', function(evt) {
        
        window.googleDrive.getListFriend();
        $('body').bind('google.friendselect', function(evt) {
          // console.log(1);
          that.showFriends(evt);
        })
        $('body').append(templateLoading);
        $('#googlefriend.modal').on('hidden.bs.modal', function (e) {
          var jsp = $('#googlefriend .invitation-list').data('jsp');
          if (jsp) {
            jsp.destroy();
          }

        });
      });
    },
    destroy: function() {
      // $.removeData(this.element[0], pluginName);
    },

    showFriends: function(evt) {
      var tmpl = '<li><div class="media""><div class="media-left"><img class="media-object" alt="thumb" src="{img}"></div><div class="media-body"><div class="inner"><h4 class="media-heading">{name}</h4><div class="desc"><p></p></div></div><div class="custom-checkbox pull-right" data-check="data-check" data-original-title="" title=""><label for="{id}"><span class="custom"><input type="checkbox" name="" id="{id}"></span></label></div></div></div></li>';
      
      var div;
      var str;
      if (!evt.friends) {
        return;
      }
      
      var list = $('#googlefriend .invitation-list .list-unstyled');
      list.empty();
      for (var i = 0; i < evt.friends.length; i++) {
        // console.log(evt.friends[i]);
        str = tmpl;
        str = str.replace(new RegExp('{name}', "g"), evt.friends[i].displayName);
        // str = str.replace(new RegExp('{cover.source}', "g"), evt.friends[i].cover.source);
        // str = str.replace(new RegExp('{cover.bio}', "g"), evt.friends[i].cover.bio ? evt.friends[i].cover.bio : "" );
        str = str.replace(new RegExp('{img}', "g"), evt.friends[i].image.url);
        // str = str.replace(new RegExp('{id}', "g"), evt.friends[i].id);
        div = $(str);
        // getAvatar(div,evt.friends[i].id);
        list.append(div);
      }

      var images = list.find('img');
      var count = 0;
      images.each(function() {
        $(this).on('load', function() {
          count ++;
          if (count == images.length) {
            $('body .wrapLoad').remove();
            $('#listFriend').modal('hide');
            setTimeout(function(){
              $('body').addClass('modal-open');
            }, 300);
            $('[data-check]').check();
             $('#googlefriend .invitation-list').jScrollPane({
              showArrows: true,
              autoReinitialise: true
            });
          }
        })
      });
      
      // function getAvatar(div, userId) {
      //   FB.api (
      //     userId + '/picture',
      //     function(response) {
      //       console.log(response.url);
      //       console.log(div);
      //       div.find('img').attr('src', response.data.url);
      //     }
      //   );
      // }

    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new ListFriend(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {

  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
/**
 *  @Accordion plugin
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    toggle
 *    destroy
 */
;(function($, window, undefined) {
  var pluginName = 'list-friend-fb',
      win = $(window);

  function ListFriend(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, options);
    this.init();
  }

  ListFriend.prototype = {
    init: function() {
      var that = this;
      var templateLoading= '<div class="wrapLoad" style="z-index: 100000"><div class="load-wrapp"><div class="load-1"><div class="line"></div><div class="line"></div><div class="line"></div></div></div></div>';
      this.element.on('click', function(evt) {
        
        window.facebook.getListFriend();

        $('body').bind('facebook.friendselect', function(evt) {
          that.showFriends(evt);
        });
        $('body').append(templateLoading);
        $('#facebookfriend.modal').on('hidden.bs.modal', function (e) {
          var jsp = $('#facebookfriend .invitation-list').data('jsp');
          if (jsp) {
            jsp.destroy();
          }

        });
      });
    },
    destroy: function() {
      // $.removeData(this.element[0], pluginName);
    },

    showFriends: function(evt) {
      var tmpl = '<li><div class="media" data-id="{userid}"><div class="media-left"><img class="media-object" alt="thumb" src=""></div><div class="media-body"><div class="inner"><h4 class="media-heading">{name}</h4><div class="desc"><p>{cover.bio}</p></div></div><div class="custom-checkbox pull-right" data-check="data-check" data-original-title="" title=""><label for="{id}"><span class="custom"><input type="checkbox" name="" id="{id}"></span></label></div></div></div></li>';

      var div;
      var str;
      if (!evt.friends) {
        return;
      }
      
      var list = $('#facebookfriend .invitation-list .list-unstyled');
      list.empty();
      for (var i = 0; i < evt.friends.length; i++) {
        // console.log(evt.friends[i].name);
        str = tmpl;
        str = str.replace(new RegExp('{name}', "g"), evt.friends[i].name);
        str = str.replace(new RegExp('{cover.source}', "g"), evt.friends[i].cover.source);
        str = str.replace(new RegExp('{cover.bio}', "g"), evt.friends[i].cover.bio ? evt.friends[i].cover.bio : "" );
        str = str.replace(new RegExp('{userid}', "g"), evt.friends[i].id);
        str = str.replace(new RegExp('{id}', "g"), evt.friends[i].id);
        div = $(str);
        getAvatar(div,evt.friends[i].id);
        list.append(div);        
      }
      var images = list.find('img');
      var count = 0;
      images.each(function() {
        $(this).on('load', function() {
          count ++;
          if (count == images.length) {
            $('body .wrapLoad').remove();
            $('#listFriend').modal('hide');
            setTimeout(function(){
              $('body').addClass('modal-open');
            }, 300);
            $('[data-check]').check();
             $('#facebookfriend .invitation-list').jScrollPane({
              showArrows: true,
              autoReinitialise: true
            });
          }
        })
      });
      function getAvatar(div, userId) {
        FB.api (
          userId + '/picture',
          function(response) {
            // console.log(response.url);
            // console.log(div);
            div.find('img').attr('src', response.data.url);
          }
        );
      }

    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new ListFriend(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {

  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
/**
 *  @name loadmore
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  var pluginName = 'loadmore-collasap',
      win = $(window),
      loadingEle = $('.loading-more');

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;
      that.vars = {
        group: $(that.options.listWrapper, that.element),
        trigger: $(that.options.loadmoreTrigger, that.element),
        page: 0,
        endLoad: false   // not have data to load more for autoload (ended data)
      };

      if (!that.vars.group.length || !that.options.urlLoadmore.length) {
        return;
      }

      that.vars.trigger.on('click.' + pluginName, function(e) {
        e.preventDefault();
        var link = that.element.attr('data-url-loadmore');
        if (!link.length || that.vars.endLoad || loadingEle.is(':visible')) { return; }
        loadingEle.fadeIn(function() {
          that.vars.page = that.vars.page + 1;
          $.ajax({
            url: link,
            dataType: 'json',
            success: function(response) {
              var items, listMedia, lenItemBefore;
              var flag = true;
              if (response.status !== 'ok') {
                // that.vars.page = that.vars.page - 1;
                return;
              }
              if (response.endPage) {
                that.vars.trigger.hide();
                if (that.vars.trigger.closest('.full').length){
                  that.vars.trigger.closest('.full').hide();
                }
              }
              if (response.content.length > 0) {
                listMedia = that.element.children('[data-media-social]');
                lenItemBefore = listMedia.children('.item').length;
                items = $(response.content.join(''));
                items
                  .css('opacity', 0)
                  .appendTo(that.vars.group);
                  // .animate({ 'opacity': 1 });
                if (listMedia.length) {
                  listMedia.on('completeCheckSize', function() {
                    items.animate({ 'opacity': 1 });
                  });
                  listMedia['media-social']('setHeightImg');
                  listMedia['media-social']('checkSizeImg', lenItemBefore);
                } else {
                  items.animate({ 'opacity': 1 });
                }
              }
              if (response['url-loadmore'].length) {
                that.element.attr('data-url-loadmore', response['url-loadmore']);
              }
              if (0 === response.remain) {
                that.vars.trigger.hide();
                if (that.vars.trigger.closest('.full').length){
                  that.vars.trigger.closest('.full').hide();
                }
              }
              loadingEle.fadeOut();
              setTimeout(function(){
                $('.accordion .item').each(function(){
                  var deleteBtn = $('.icon-delete', $(this)),
                      that = $(this),
                      marryBlock = $('[data-manage]');
                  // $(deleteBtn).on('click', function(){
                  //   that.remove();
                  // });
                  var urlContent = deleteBtn.parent().data('delete');
                  $(deleteBtn).on('click', function(e){
                    if (flag === true){
                      $.ajax({
                        url: urlContent,
                        dataType: 'json',
                        beforeSend: function(){
                          flag = false;
                          // loading.appendTo();
                        },
                        success: function(data){
                          if (data.result === 1) {
                            that.fadeOut(800,function(){
                              that.remove();
                            });
                            marryBlock.find('.list-unstyled').html(data.content);
                          }
                        },
                        error: function(){
                          alert('Please try again');
                        }
                      });
                    }
                  });
                });
                $('[data-check]').check();
              },200);
            },
            error: function(err) {
              that.vars.page = that.vars.page - 1;
              loadingEle.fadeOut();
            }
          });
        });
      });
    },
    resetValues: function() {
      this.vars.page = 0;
      this.vars.endLoad = false;
    },
    destroy: function() {
      win.off('click.' + pluginName);
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {
    listWrapper: '',
    urlLoadmore: '',
    classLoading: 'loading-animated',
    loadmoreTrigger: '[data-loadmore-trigger]'
  };

  $(function() {
    win.on(Site.events.AJAX_SUCCESS + '.' + pluginName, function() {
      $('[data-' + pluginName + ']')[pluginName]();
    });
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

/**
 *  @name scroll-video
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  var pluginName = 'map-lt';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
          ele = that.element;
      var geocoder = new google.maps.Geocoder();
      function geocodePosition(pos) {
        geocoder.geocode({
          latLng: pos
        }, function(responses) {
          if (responses && responses.length > 0) {
            updateMarkerAddress(responses[0].formatted_address);
          } else {
            updateMarkerAddress('Cannot determine address at this location.');
          }
        });
      }

      function updateMarkerStatus(str) {
        document.getElementById('markerStatus').innerHTML = str;
      }

      function updateMarkerPosition(latLng) {
        var ltlong = [
          latLng.lat(),
          latLng.lng()
        ].join(', ');
        $('#info').attr('value', ltlong);
      }

      function updateMarkerAddress(str) {
        document.getElementById('address').innerHTML = str;
      }

      function initialize() {
        var latLng = new google.maps.LatLng(10.810583, 106.709145);
        
        var map = new google.maps.Map(document.getElementById('mapCanvas'), {
          zoom: 11,
          center: latLng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });



        var marker = new google.maps.Marker({
          position: latLng,
          title: 'Point',
          map: map,
          icon: ele.data('icon-marker') || '',
          draggable: true
        });

        // Update current position info.
        updateMarkerPosition(latLng);
        geocodePosition(latLng);
        
        // Add dragging event listeners.
        google.maps.event.addListener(marker, 'dragstart', function() {
          updateMarkerAddress('Dragging...');
        });
        
        google.maps.event.addListener(marker, 'drag', function() {
          updateMarkerStatus('Dragging...');
          updateMarkerPosition(marker.getPosition());
        });
        
        google.maps.event.addListener(marker, 'dragend', function() {
          updateMarkerStatus('Drag ended');
          geocodePosition(marker.getPosition());
        });

        google.maps.event.addListener(map, 'click', function(event) {
          var myLatLng = event.latLng;
          var lat = myLatLng.lat();
          var lng = myLatLng.lng();
        });
      }

      // Onload handler to fire off the app.

      window.google.maps.event.addDomListener(window, 'load', initialize);
      window.google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center); 
      });
    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

/* =================
 * navigation/app.js
 * ================= */

(function($, App) {

  "use strict";

  /* ============== */
  /* MODULE TRIGGER */
  /* ============== */

  var sideNavTrigger = '[data-navigation]',
      body = $('body'),
      TweenMax = window.TweenMax;

  /* =============== */
  /* MODULE DEFAULTS */
  /* =============== */

  var defaults = {
    mobileMaxWidth: 996,
    animateDuration: 200,
    mobileRightSpace: 50,
    navTopPos: 74
  };

  /* ================= */
  /* MODULE DEFINITION */
  /* ================= */

  function SideNav(opts) {
    this.settings = $.extend({}, defaults, opts);
    return this.init();
  }

  /* ============== */
  /* MODULE METHODS */
  /* ============== */

  SideNav.prototype.init = function() {
    this.initSideNav($(sideNavTrigger));
    return this;
  };

  SideNav.prototype.initSideNav = function(navigation) {
    var that = this,
        vars = {};
    that.vars = vars;
    vars.app = $('#app');
    vars.header = $('> #header', vars.app);
    vars.mainHeader = $('.bottom-head .container', vars.header);

    if(navigation.length && vars.header.length) {
      vars.navigation = navigation;
      vars.sideNavDefaultPaddingLeft = parseInt(navigation.css('padding-right'), 10);
      vars.sideNavDefaultW = navigation.outerWidth() - vars.sideNavDefaultPaddingLeft;
      vars.allSubmenuWrap = $('.dropdown', vars.navigation);
      vars.overlay = $('.overlay');
      vars.winElm = $(window);
      vars.bodyElm = $('body');
      vars.iOSDevice = navigator.userAgent.match(/iPhone|iPad|iPod/i);
      vars.isMobile = App.viewportWidth() < that.settings.mobileMaxWidth;
      vars.toggleMenuBtn = $('.navbar-toggle');
      vars.iconBurger1 = $('.icon-burger-1', vars.toggleMenuBtn);
      vars.iconBurger2 = $('.icon-burger-2', vars.toggleMenuBtn);
      vars.iconBurger3 = $('.icon-burger-3', vars.toggleMenuBtn);
      vars.btnMenuPaddingLeft = parseInt(vars.toggleMenuBtn.parent().css('padding-right'), 10) * 2;
      vars.inputSearch = $('#input-search-nav', navigation);

      vars.toggleMenuBtn.off('click.toggleSideNav').on('click.toggleSideNav', function() {
        that.toggleSideNav();
      });

      vars.navigation.find('.btn-close').off('click.closeSideNav').on('click.closeSideNav', function() {
        that.closeSideNav();
        $('body').removeClass('show-menu');
      });

      vars.overlay.off('click.closeSideNav').on('click.closeSideNav', function() {
        that.closeSideNav();
        $('body').removeClass('show-menu');
      });

      that.initSubmenu();
      vars.winElm
        .on('resize.setSideNavPos', function() {
          that.setSideNavPos();
        }).trigger('resize.setSideNavPos');

      if(window.Modernizr.touch) {
        vars.navigation.on('touchstart', function() {
          if(vars.timeoutNavFocus) {
            clearTimeout(vars.timeoutNavFocus);
          }
          vars.isNavFocus = true;
        }).on('touchend', function() {
          vars.timeoutNavFocus = setTimeout(function() {
            vars.isNavFocus = false;
          }, 1000);
        });
        vars.bodyElm.on('touchstart', function() {
          if(vars.timeoutBodyTouch) {
            clearTimeout(vars.timeoutBodyTouch);
          }
          vars.isBodyTouch = true;
        }).on('touchend', function() {
          vars.timeoutBodyTouch = setTimeout(function() {
            vars.isBodyTouch = false;
          }, 1000);
        });
        if(vars.iOSDevice && vars.isMobile) {
          vars.navigation.css('position', 'fixed');
        }
        else {
          vars.inputSearch.on('focus.scrollToInput', function() {
            setTimeout(function() {
              vars.navigation.scrollTop(vars.inputSearch.offset().top);
            }, 500);
          });
        }
        vars.winElm.on('resize.setHeightBody', function() {
          if(window.Modernizr.touch && !vars.isBodyTouch && vars.navigation.hasClass('open')) {
            vars.app.css({
              'height': vars.winElm.height()
            });
          }
        });
      }
      else{
        vars.navigation.mCustomScrollbar();
        vars.navigation.on('mousewheel wheel', function(e){
          e.preventDefault();
        });
        vars.winElm.on('resize.setSideNavPaddingLeft', function() {
          if (App.viewportWidth() >= that.settings.mobileMaxWidth) {
            navigation.width(vars.sideNavDefaultW);
            navigation.css('padding-right', vars.mainHeader.offset().right + vars.sideNavDefaultPaddingLeft);
            vars.overlay.addClass('hide');
          }
          else {
            navigation.css('padding-right', vars.sideNavDefaultPaddingLeft);
            $('body').removeClass('show-menu');
          }
        }).trigger('resize.setSideNavPaddingLeft');
      }
      vars.winElm.on('scroll.closeSideNav touchmove', function() {
        if(vars.inputSearch.is(':focus') || vars.isNavFocus) {
          return;
        }
        if(window.Modernizr.touch && !vars.isBodyTouch && vars.navigation.hasClass('open')) {
          vars.app.css({
            'height': vars.winElm.height()
          });
          return;
        }
        if(vars.navigation.hasClass('open')) {
          that.closeSideNav();
          $('body').removeClass('show-menu');
        }
      });
    }
    return this;
  };

  SideNav.prototype.toggleSideNav = function() {
    if(this.vars.navigation.hasClass('open')) {
      this.closeSideNav();
      $('body').removeClass('show-menu');
    }
    else {
      this.openSideNav();
      $('body').addClass('show-menu');
    }
  };

  SideNav.prototype.openSideNav = function() {
    var vars = this.vars;
    vars.overlay.removeClass('hide');
    vars.navigation.addClass('open');
    $('body').removeClass('show-menu');
    TweenMax.to(vars.iconBurger1, 0.3, {
      rotation: 45,
      top: 8
    });
    TweenMax.to(vars.iconBurger2, 0.3, {
      rotation: 30,
      top: 6,
      opacity: 0
    });
    TweenMax.to(vars.iconBurger3, 0.3, {
      rotation: -45,
      top: 8
    });

    vars.navigation.css('position', 'fixed').stop().animate({
      'right': 0
    }, this.settings.animateDuration * 2, function() {
      if(window.Modernizr.touch && vars.isMobile) {
        vars.isNavFocus = true;
        vars.app.css({
          'height': vars.winElm.height(),
          'overflow': 'hidden'
        });
        if(vars.iOSDevice) {
          vars.navigation.css('position', 'fixed');
        }
        setTimeout(function() {
          vars.isNavFocus = false;
        }, 500);
      }
      vars.winElm.trigger('resize');
    });

    if (App.viewportWidth() < this.settings.mobileMaxWidth) {
      vars.header.stop().animate({
        'right': vars.navigationW
      }, this.settings.animateDuration * 2);
    }
    $.widget("custom.catAutocomplete", $.ui.autocomplete, {
      _renderItemData: function( ul, item ) {
        return this._renderItem( ul, item ).data( "ui-autocomplete-item", item );
      },
      _renderItem: function( ul, item ) {
        return $( "<li>" )
          // .append( $( "<a>" ).text( item.label ) )
          .append( "<b>"+ item.alphabet + "-</b>" + item.label )
          .appendTo( ul );
      },
      _renderMenu: function(ul, items) {
        var that = this,
          currentCategory = "";
        ul.addClass('search-category');
        $.each(items, function(index, item) {
          if (item.category != currentCategory) {
            ul.append("<li class='ui-autocomplete-category " + item.class + "-icon '><span></span><p>" + item.category + "</p></li>");
            currentCategory = item.category;
          }
          // if (item) {
          //   ul.append("<li class='item' value='" + item.value + "'><b>" + item.alphabet + "</b>-" + item.label + "</li>");
          //   currentCategory = item.category;
          // }
          // console.log(item.value);
          that._renderItemData(ul, item);
          
          // console.log(item.label);
          
        });
      }
    });

    // Initialize autocomplete with categories
    var xhr;
    $('.video-style.cloned #search-form-1 #input-search-1').catAutocomplete({
        minLength: 0,
        delay: 0,
        source: function(request, response) {
          var regex = new RegExp(request.term, 'i');
          if(xhr){
            xhr.abort();
          }
          xhr = $.ajax({
            // Retrieve github user repositories list
            url: 'data/category.json',
            dataType: "json",
            cache: false,
            success: function(data) {
              // data.sort(function(item1, item2){
              //   return item1.forks > item2.forks ? 1 : -1;
              // });
              response($.map(data.temp, function(item) {
                if(regex.test(item.label)){
                  return {
                    label: item.label,
                    category: item.category,
                    alphabet: item.alphabet,
                    class: item.classCategory
                  }
                }
              }));
            }
          });
        },
    });
  };

  SideNav.prototype.closeSideNav = function() {
    var vars = this.vars;
    TweenMax.to(vars.iconBurger1, 0.3, {
      rotation: 0,
      top: 0
    });
    TweenMax.to(vars.iconBurger2, 0.3, {
      rotation: 0,
      top: vars.iconBurger2.data('top-pos'),
      opacity: 1
    });
    TweenMax.to(vars.iconBurger3, 0.3, {
      rotation: 0,
      top: vars.iconBurger3.data('top-pos')
    });

    vars.navigation.stop().animate({
      'right': '-100%'
    }, this.settings.animateDuration * 2, function() {
      if(window.Modernizr.touch && vars.isMobile) {
        vars.app.css({
          'height': '',
          'overflow': ''
        });
      }
      vars.overlay.addClass('hide');
      vars.navigation.removeClass('open');
      $('body').removeClass('show-menu');
      vars.navigation.scrollTop(0);
      vars.winElm.trigger('scroll.setHeaderPosition');
    });

    if (App.viewportWidth() < this.settings.mobileMaxWidth) {
      vars.header.stop().animate({
        'right': 0
      }, this.settings.animateDuration * 2);
    }
    vars.inputSearch.removeClass('error').val('');
    this.closeSubMenu();
    $('body').removeClass('show-menu');
  };

  SideNav.prototype.setSideNavPos = function() {
    var that = this,
        vars = this.vars,
        headerLeft = 0,
        isMobileView = App.viewportWidth() < this.settings.mobileMaxWidth ? true : false;

    if(!window.Modernizr.touch){
      var jsp = vars.navigation.data('jsp');
      if(jsp){
        jsp.destroy();
      }
    }
    vars.navigation.css('height', '');
    vars.navigationW = '';
    if(isMobileView) {
      vars.navigationW = vars.bodyElm.width() - this.settings.mobileRightSpace;
      headerLeft = vars.navigationW;
      vars.navigation.css('top', '');
      vars.iconBurger2.data('top-pos', 6);
      vars.iconBurger3.data('top-pos', 12);
    }
    else {
      vars.iconBurger2.data('top-pos', 8);
      vars.iconBurger3.data('top-pos', 16);
      vars.navigation.css({
        'height': vars.navigation.height() - that.settings.navTopPos,
        'top': that.settings.navTopPos
      });
    }
    if(!vars.navigation.hasClass('open')) {
      vars.iconBurger2.css('top', vars.iconBurger2.data('top-pos'));
      vars.iconBurger3.css('top', vars.iconBurger3.data('top-pos'));
    }

    vars.navigation.css('width', vars.navigationW);
    if(vars.navigation.hasClass('open')) {
      vars.header.css('right', headerLeft);
    }
  };

  SideNav.prototype.initSubmenu = function() {
    var that = this,
        vars = this.vars;
    vars.allSubmenuWrap.each(function() {
      var subMenuWrap = $(this),
          subMenu = $('.dropdown-menu', subMenuWrap);
      subMenuWrap.on('click', function() {
        if(!vars.forceWait) {
          vars.forceWait = true;
          if(subMenuWrap.hasClass('isOpen')) {
            that.closeSubMenu();            
            $('body').removeClass('show-menu');
          }
          else {
            that.closeSubMenu();
            subMenuWrap.addClass('isOpen');            
            $('body').removeClass('show-menu');
            subMenu.slideDown(that.settings.animateDuration, function() {
              vars.activeSubmenuWrap = subMenuWrap;
              vars.activeSubmenu = subMenu;
              vars.forceWait = false;
            });
          }
        }
      });
    });
  };

  SideNav.prototype.closeSubMenu = function() {
    var vars = this.vars;
    if(vars.activeSubmenuWrap) {
      vars.activeSubmenuWrap.removeClass('isOpen');
      vars.activeSubmenu.slideUp(this.settings.animateDuration, function() {
        vars.activeSubmenuWrap = null;
        vars.activeSubmenu = null;
        vars.forceWait = false;
      });
    }
  };


  /* =============== */
  /* MODULE DATA-API */
  /* =============== */

  $(function() {
    var opts = {};
    App.sideNav = new SideNav(opts);
  });

}(window.jQuery, window.App));

/* =========
 * sample.js
 * ========= */

(function($, App) {

  "use strict";

  /* ============== */
  /* MODULE TRIGGER */
  /* ============== */

  var sliderShow = '[data-slider-home]',
      nav = '[data-slider-nav]';

  /* =============== */
  /* MODULE DEFAULTS */
  /* =============== */

  var defaults = {};

  /* ================= */
  /* MODULE DEFINITION */
  /* ================= */

  function Slider(opts) {
    this.settings = $.extend({}, defaults, opts);
    return this.init();
  }

  /* ============== */
  /* MODULE METHODS */
  /* ============== */

  Slider.prototype.init = function() {
    var slider = $(sliderShow),
        navSlider = $(nav),
        select = $('[data-slider-home]').find('.custom-select');
    slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: false,
      asNavFor: navSlider,
      adaptiveHeight: true,
      autoplay: true,
      autoplaySpeed: 5000,
      // onBeforeChange: function(slick, currentSlide, targetSlide) {
      //   // lastSlide = $('.slick-center .menu-entry').attr('id');
      //   console.log(slick);
      //   console.log(currentSlide);
      //   console.log(targetSlide);
      // },
      onAfterChange:function(slickSlider,i){
        // console.log(slickSlider);
        $('[data-slider-nav] .slick-slide').removeClass('slick-current');
        $('[data-slider-nav] .slick-slide').eq(i).addClass('slick-current');
      }
    });
    $('.content-select').on('mouseenter', function(){
        slider.slickPause();
        navSlider.slickPause();
    });
    $('.content-select').on('mouseleave', function(){
        slider.slickPlay();
        navSlider.slickPlay();
    });
    navSlider.slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      asNavFor: sliderShow,
      infinite: false,
      autoplay: true,
      autoplaySpeed: 5000,
      focusOnSelect: true
    });
    // $('[data-slider-nav] .slick-slide').eq(0).addClass('slick-current');
    
    // slide.slickSetOption('autoplay', false);
    // var paused = false;
    // $('[data-slider-home] .custom-select').on('click', function() {
    //   paused = !paused;
    //   if(paused) {
    //     console.log(1);
    //     slide.slickPause();
    //   } else {
    //     slide.slickPlay();
    //   }
    // });

    $(window).on('load resize.homeslider', function(){
      if($(window).width() < 768){
        $('[data-slider-home] .slick-slide .find-block').each(function(){
          $(this).css({
            'top': ($('[data-slider-home]').height() - $(this).height()) / 2
          });
        });
      }else{
        $('[data-slider-home] .slick-slide .find-block').each(function(){
          $(this).css({
            'top': ''
          });
        });
      }
    }).trigger('resize.homeslider');
  };


  /* =============== */
  /* MODULE DATA-API */
  /* =============== */

  $(function() {
    var opts = {};
    App.slider = new Slider(opts);
  });

}(window.jQuery, window.App));
/**
 *  @name read-more
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  var pluginName = 'read-more';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
          ele = that.element;

      that.vars = {
        btnReadmore: ele.find('.open-btn'),
        btnClose: ele.find('.close-btn'),
        content: ele.find('.content'),
        map: ele.find('[data-gmap]')
      };

      that.vars.content.css('display', 'none');

      that.vars.btnReadmore
        .on('click.' + pluginName, function(e) {
          e.preventDefault();
          that.vars.btnReadmore.fadeOut(500, function() {
            that.vars.content.slideDown(500, function() {
              if (that.vars.map.length) {
                setTimeout(function() {
                  that.vars.map['gmap']('resizeMap');
                }, 100);
              }
            });
          });
        });

      that.vars.btnClose
        .on('click.' + pluginName, function(e) {
          e.preventDefault();
          e.stopPropagation();
          that.vars.content.slideUp(500, function() {
            that.vars.btnReadmore.fadeIn(500);
          });
        });
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
// /**
//  *  @name scroll-video
//  *  @description description
//  *  @version 1.0
//  *  @options
//  *    option
//  *  @events
//  *    event
//  *  @methods
//  *    init
//  *    publicMethod
//  *    destroy
//  */
// ;(function($, window, undefined) {
//   var pluginName = 'scroll-video';

//   function Plugin(element, options) {
//     this.element = $(element);
//     this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
//     this.init();
//   }

//   Plugin.prototype = {
//     init: function() {
//       var that = this,
//           ele = that.element;

//       ele.jScrollPane();
//     }
//   };

//   $.fn[pluginName] = function(options, params) {
//     return this.each(function() {
//       var instance = $.data(this, pluginName);
//       if (!instance) {
//         $.data(this, pluginName, new Plugin(this, options));
//       } else if (instance[options]) {
//         instance[options](params);
//       } else {
//         window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
//       }
//     });
//   };

//   $.fn[pluginName].defaults = {
//   };

//   $(function() {
//     $('[data-' + pluginName + ']')[pluginName]();
//   });

// }(jQuery, window));
/* =================
 * seat.js
    TO DO:
   - grid width + height
 * ================= */

;(function($, window, createjs, App) {

  "use strict";

  //PERSON CLASS
  (function() {

    function Person(label, size) {
      this.Container_constructor();
      
      this.background = null;
      this.text = null;
      
      this.label = label;
      this.size = size;
      
      this.createElement();
    }
  
    var p = createjs.extend(Person, createjs.Container);

    p.createElement = function() {
      
      this.background = new createjs.Shape();
      this.background.graphics.beginStroke('#7e7e7e').setStrokeStyle(1).beginFill('#e0e0e0').drawCircle(0, 0, this.size);
      this.addChild(this.background); 
      
      this.text = new createjs.Text(this.label, "12px myriadPro-regular", "black");
      this.text.textBaseline = "top";
      this.text.textAlign = "left";
      this.addChild(this.text); 

      var textWidth = this.text.getMeasuredWidth();
      var textHeight = this.text.getMeasuredHeight();

      this.text.x = (this.size - textWidth)/2 - 5;
      this.text.y = (this.size - textHeight)/2 - 6;
    };

    createjs.Person = createjs.promote(Person, "Container");
      
  }());

  //TABLE CLASS
  (function() {

    function Table(label, width, height, numOfPerson) {
      this.Container_constructor();
      
      this.background = null;
      this.text = null;
      this.select = null;
      this.groupText = null;
      this.editText = null;
      this.deleteText = null;
      this.container = null;
      this.tooltip = null;
      this.tooltipText = null;
      this.tooltipBG = null;
      
      this.arrPerson = [];
      this.SIZE = 20;
      this.TOOLTIP_WIDTH = 200;
      this.listener = null;
      
      this.label = label;
      this.numOfPerson = numOfPerson;
      this.tableWidth = width;
      this.tableHeight = height;
      this.rotate = 0;
      this.comment = '';

      this.createElement();

      this.setSize(width, height);
    }
  
    var p = createjs.extend(Table, createjs.Container);

    p.createElement = function() {
      this.cursor = "pointer";

      //create background
      this.background = new createjs.Shape();
      this.addChild(this.background);

      this.select = new createjs.Shape();
      this.select.visible = false;
      this.select.mouseEnabled = false;
      this.addChild(this.select); 
      
      //create table name
      this.text = new createjs.Text(this.label, "13px myriadPro-regular", "black");
      this.text.textBaseline = "top";
      this.text.textAlign = "left";
      this.text.mouseEnabled = false;
      this.addChild(this.text); 
      
      //create edit and delete text
      this.groupText = new createjs.Container();
      this.groupText.visible = false;
      this.addChild(this.groupText);

      this.editText = new createjs.Text(editLabel, "13px myriadPro-regular", "#bc2670");
      this.editText.textBaseline = "top";
      this.editText.textAlign = "left";
      this.groupText.addChild(this.editText); 

      var seperateText = new createjs.Text('|', "13px myriadPro-regular", "black");
      seperateText.textBaseline = "top";
      seperateText.textAlign = "left";
      seperateText.x = this.editText.x + this.editText.getMeasuredWidth() + 5;
      this.groupText.addChild(seperateText); 
    
      this.deleteText = new createjs.Text(deleteLabel, "13px myriadPro-regular", "#bc2670");
      this.deleteText.textBaseline = "top";
      this.deleteText.textAlign = "left";
      this.deleteText.x = seperateText.x + seperateText.getMeasuredWidth() + 5;
      this.groupText.addChild(this.deleteText); 

      //create person
      this.container = new createjs.Container();
      this.addChild(this.container);
      this.setNumOfPerson(this.numOfPerson);

      this.tooltip = new createjs.Container();
      this.tooltip.visible = false;
      this.tooltip.mouseEnabled = false;
      this.tooltip.mouseChildren = false;
      this.addChild(this.tooltip);

      this.tooltipBG = new createjs.Shape();
      this.tooltip.addChild(this.tooltipBG);

      this.tooltipText = new createjs.Text('Table: ' + this.label, "13px myriadPro-regular", "black");
      this.tooltipText.textBaseline = "top";
      this.tooltipText.textAlign = "left";
      this.tooltipText.lineWidth = this.TOOLTIP_WIDTH - 20;
      this.tooltipText.x = this.tooltipText.y = 10;
      this.tooltip.addChild(this.tooltipText); 
      this.updateTooltip();

      //add event for elements
      var that = this; 
      
      this.on("mouseover", function (evt) {
        //that.parent.addChild(that);
        if (!this.select.visible) {
          that.stage.addChild(that.tooltip);
          that.groupText.visible = true;
          that.tooltip.visible = true;
          that.listener = that.stage.on("stagemousemove", that.onMouseMoveHandler, this);
        }
      });

      this.on("mouseout", function (evt) {
        if (!this.select.visible) {
          that.stage.off("stagemousemove", that.listener);
          that.groupText.visible = false;
          that.tooltip.visible = false;
        }
      });

      this.editText.on("click", function (evt) {
        //evt.stopPropagation();

        var editEvent = {
          type: "editEvent"
        };
        that.dispatchEvent(editEvent);
      });

      this.deleteText.on("click", function (evt) {
        //evt.stopPropagation();

        var deleteEvent = {
          type: "deleteEvent"
        };
        that.dispatchEvent(deleteEvent);
      });
    };

    p.onMouseMoveHandler = function(evt) {
      //var point = this.globalToLocal(evt.stageX, evt.stageY);
      this.tooltip.x = evt.stageX - 25;
      this.tooltip.y = evt.stageY - this.tooltipBG.tooltipHeight - 5;
    };

    p.setDisplayTooltip = function(value) {
      this.tooltip.visible = value;
    };

    p.setDisplayEdit = function(value) {
      this.groupText.visible = value;
    };

    p.setSelect = function(selected) {
      this.select.visible = selected;
    };

    p.setLabel = function(label) {
      this.label = label;
      this.text.text = label;
      
      this.updateText();
      this.updateTooltip();
    };

    p.setNumOfPerson = function(numOfPerson) {
      this.numOfPerson = numOfPerson;

      this.arrPerson = [];
      this.container.removeAllChildren();

      var person;
      for (var i = 0; i < this.numOfPerson; i ++) {
        person = this.container.addChild(new createjs.Person(i + 1, this.SIZE / 2));
        this.arrPerson.push(person);
      }

      this.updatePerson();
    };

    p.setRotate = function(rotate) {
      this.rotate = rotate;
      this.rotation = rotate;
    };

    p.setComment = function(comment) {
      this.comment = comment;
      this.updateTooltip();
    };

    p.updateTooltip = function() {
      this.tooltipText.text = 'Tên: ' + this.label + '\n\nLưu ý: ' + ($.trim(this.comment) != '' ? $.trim(this.comment) : "chưa có");

      this.tooltipBG.tooltipHeight = this.tooltipText.getMeasuredHeight() + 40;

      this.tooltipBG.graphics.beginStroke('#7e7e7e').setStrokeStyle(1).beginFill('#edcdce')
        .moveTo(0, 0).lineTo(this.TOOLTIP_WIDTH, 0).lineTo(this.TOOLTIP_WIDTH, this.tooltipText.getMeasuredHeight() + 20)
        .lineTo(35, this.tooltipText.getMeasuredHeight() + 20).lineTo(25, this.tooltipText.getMeasuredHeight() + 40)
        .lineTo(15, this.tooltipText.getMeasuredHeight() + 20) 
        .lineTo(0, this.tooltipText.getMeasuredHeight() + 20).lineTo(0, 0).endFill();
    };

    p.toJSON = function() {
      var json = '';
      json = '{' +
              '"type": "' + this.constructor.name + '"' +
              ', "label": "' + this.label + '"' +
              ', "tableWidth": ' + this.tableWidth +
              ', "tableHeight": ' + this.tableHeight +
              ', "numOfPerson": ' + this.numOfPerson + 
              ', "rotate": ' + this.rotate + 
              ', "comment": "' + this.comment + '"' + 
              ', "x": ' + this.x +
              ', "y": ' + this.y +
              this.getCustomJSON() +
             '}';
      return json;
    };

    p.getCustomJSON = function() {
      return '';
    };

    p.setSize = function(width, height) {
    };

    p.updateText = function() {
    };

    p.updatePerson = function() {
    };

    p.isEqual = function() {
      return false;
    };

    p.clone = function() {
    };

    createjs.Table = createjs.promote(Table, "Container");
      
  }());

  //HALF RECTANGLE TABLE CLASS
  (function() {

    function HalfRectTable(label, width, height, numOfPerson) {
      this.Table_constructor(label, width, height, numOfPerson);
    }
  
    var p = createjs.extend(HalfRectTable, createjs.Table);

    p.setSize = function(width, height) {
      this.tableWidth = width;
      this.tableHeight = height;

      this.background.graphics.clear();
      this.background.graphics.beginStroke('#7e7e7e').setStrokeStyle(1).beginFill('#edcdce').drawRect(0, 0, this.tableWidth, this.tableHeight);
      this.background.x = -this.tableWidth/2;
      this.background.y = -this.tableHeight/2;

      this.select.graphics.clear();
      this.select.graphics.beginStroke('#7e7e7e').setStrokeStyle(1).beginFill('#fed4aa').drawRect(0, 0, this.tableWidth, this.tableHeight);
      this.select.x = -this.tableWidth/2;
      this.select.y = -this.tableHeight/2;

      this.updateText();
      this.updatePerson();
    };

    p.updateText = function() {
      //update text after change sizev []
      var textWidth = this.text.getMeasuredWidth();
      var textHeight = this.text.getMeasuredHeight();

      this.text.x = - textWidth/2;
      this.text.y = - textHeight/2 - 5;

      this.groupText.x = - this.groupText.getBounds().width/2;
      this.groupText.y = this.text.y + textHeight + 5;
    };

    p.updatePerson = function() {

        //calculate distance between person
      var wid = this.tableWidth - (this.numOfPerson * this.SIZE);
      wid = Math.floor(wid / (this.numOfPerson - 1)); 

      var person;
      var toX = -this.tableWidth/2 + this.SIZE/2;
      for (var i = 0; i < this.arrPerson.length; i ++) {
        person = this.arrPerson[i];
        person.x = toX;
        person.y = - this.tableHeight/2 - 10;
        toX = toX + this.SIZE + wid;
      }
    };

    p.clone = function() {
      var table = new createjs.HalfRectTable(this.label, this.tableWidth, this.tableHeight, this.numOfPerson);
      table.rotate = this.rotate;
      table.comment = this.comment;
      return table;
    };

    createjs.HalfRectTable = createjs.promote(HalfRectTable, "Table");
      
  }());

  //RECTANGLE TABLE CLASS
  (function() {

    function RectTable(label, width, height, numOfPerson) {
      this.Table_constructor(label, width, height, numOfPerson);
    }
  
    var p = createjs.extend(RectTable, createjs.HalfRectTable);

    p.updatePerson = function() {
      if (this.numOfPerson == 0) {
        return;
      }

      var up = Math.ceil(this.arrPerson.length/2);
      var down = this.arrPerson.length - up;

      //calculate distance between person
      var wid = this.tableWidth - (up * this.SIZE);
      wid = Math.floor(wid / (up - 1)); 

      var i;
      var person;
      var toX = -this.tableWidth/2 + this.SIZE/2;
      
      for (i = 0; i < up; i ++) {
        person = this.arrPerson[i];
        person.x = toX;
        person.y = - this.tableHeight/2 - 10;
        toX = toX + this.SIZE + wid;
      }

      //calculate distance between person
      wid = this.tableWidth - (down * this.SIZE);
      wid = Math.floor(wid / (down - 1)); 

      var toX = -this.tableWidth/2 + this.SIZE/2;
      
      for (i = up; i < this.arrPerson.length; i ++) {
        person = this.arrPerson[i];
        person.x = toX;
        person.y = this.tableHeight/2 + 10;
        toX = toX + this.SIZE + wid;
      }
    };

    p.clone = function() {
      var table = new createjs.RectTable(this.label, this.tableWidth, this.tableHeight, this.numOfPerson);
      table.rotate = this.rotate;
      table.comment = this.comment;
      return table;
    };

    createjs.RectTable = createjs.promote(RectTable, "HalfRectTable");
      
  }());
  
  //CIRCLE TABLE CLASS
  (function() {

    function CircleTable(label, width, height, numOfPerson) {
      this.Table_constructor(label, width, height, numOfPerson);
    }
  
    var p = createjs.extend(CircleTable, createjs.Table);

    p.setSize = function(width, height) {
      this.tableWidth = this.tableHeight = width;

      this.background.graphics.clear();
      this.background.graphics.beginStroke('#7e7e7e').setStrokeStyle(1).beginFill('#edcdce').drawCircle(0, 0, this.tableWidth/2);
      
      this.select.graphics.clear();
      this.select.graphics.beginStroke('#7e7e7e').setStrokeStyle(1).beginFill('#fed4aa').drawCircle(0, 0, this.tableWidth/2);
      
      this.updateText();
      this.updatePerson();
    };

    p.updateText = function() {
      //update text after change sizev []
      var textWidth = this.text.getMeasuredWidth();
      var textHeight = this.text.getMeasuredHeight();

      this.text.x = - textWidth/2;
      this.text.y = - textHeight;

      this.groupText.x = - this.groupText.getBounds().width/2;
      this.groupText.y = this.text.y + textHeight + 5;
    };

    p.updatePerson = function() {

      //calculate distance between person
      var step = 360 / this.numOfPerson;

      var person;
      var angle;

      var toX = this.tableWidth/2 + this.SIZE/2;
      for (var i = 0; i < this.arrPerson.length; i ++) {
        angle = -(90 + i * step) * Math.PI / 180;

        person = this.arrPerson[i];
        person.x = (this.tableWidth/2 + 10) * Math.sin(angle);
        person.y = (this.tableWidth/2 + 10) * Math.cos(angle);
      }
    };

    p.clone = function() {
      var table = new createjs.CircleTable(this.label, this.tableWidth, this.tableHeight, this.numOfPerson);
      table.rotate = this.rotate;
      table.comment = this.comment;
      return table;
    };

    p.isEqual = function() {
      return true;
    };

    createjs.CircleTable = createjs.promote(CircleTable, "Table");
      
  }());

  //SQUARE TABLE CLASS
  (function() {

    function SquareTable(label, width, height, numOfPerson) {
      this.Table_constructor(label, width, height, numOfPerson);
    }
  
    var p = createjs.extend(SquareTable, createjs.Table);

    p.setSize = function(width, height) {
      this.tableWidth = this.tableHeight = width;

      this.background.graphics.clear();
      this.background.graphics.beginStroke('#7e7e7e').setStrokeStyle(1).beginFill('#edcdce').drawRect(0, 0, this.tableWidth, this.tableWidth);
      this.background.x = -this.tableWidth/2;
      this.background.y = -this.tableHeight/2;

      this.select.graphics.clear();
      this.select.graphics.beginStroke('#7e7e7e').setStrokeStyle(1).beginFill('#fed4aa').drawRect(0, 0, this.tableWidth, this.tableWidth);
      this.select.x = -this.tableWidth/2;
      this.select.y = -this.tableHeight/2;

      this.updateText();
      this.updatePerson();
    };

    p.updateText = function() {
      //update text after change sizev []
      var textWidth = this.text.getMeasuredWidth();
      var textHeight = this.text.getMeasuredHeight();

      this.text.x = - textWidth/2;
      this.text.y = - textHeight/2 - 5;

      this.groupText.x = - this.groupText.getBounds().width/2;
      this.groupText.y = this.text.y + textHeight + 5;
    };

    p.updatePerson = function() {

      var leftTop = Math.floor(this.numOfPerson/2);
      var left = Math.floor(leftTop/2);
      var top = leftTop - left;

      var rightBottom = this.numOfPerson - leftTop;
      var right = Math.floor(rightBottom/2);
      var bottom = rightBottom - right;

      //calculate distance between person
      var i, person, toX, toY, person, distance;

      //left side
      distance = this.tableWidth - (left * this.SIZE);
      distance = Math.floor(distance / (left + 1)); 
      toY = this.tableHeight/2 - distance - this.SIZE/2;      
      
      for (i = 0; i < left; i ++) {
        person = this.arrPerson[i];
        person.x = -this.tableWidth/2 - 10;
        person.y = toY;
        
        toY = toY - this.SIZE - distance;
      }

      //top
      distance = this.tableWidth - (top * this.SIZE);
      distance = Math.floor(distance / (top + 1)); 
      toX = - this.tableWidth/2 + distance + this.SIZE/2;
      
      for (i = left; i < leftTop; i ++) {
        person = this.arrPerson[i];
        person.x = toX;
        person.y = - this.tableHeight/2 - 10;
        
        toX = toX + this.SIZE + distance;
      }

      //right
      distance = this.tableWidth - (right * this.SIZE);
      distance = Math.floor(distance / (right + 1)); 
      toY = -this.tableHeight/2 + distance + this.SIZE/2;     

      for (i = leftTop; i < leftTop + right; i ++) {
        person = this.arrPerson[i];
        person.x = this.tableWidth/2 + 10;
        person.y = toY;
        
        toY = toY + this.SIZE + distance;
      }

      //bottom
      distance = this.tableWidth - (bottom * this.SIZE);
      distance = Math.floor(distance / (bottom + 1)); 
      toX = this.tableWidth/2 - distance - this.SIZE/2;

      for (i = leftTop + right; i < this.numOfPerson; i ++) {
        person = this.arrPerson[i];
        person.x = toX;
        person.y = this.tableHeight/2 + 10;
        
        toX = toX - this.SIZE - distance;
      }
    };

    p.clone = function() {
      var table = new createjs.SquareTable(this.label, this.tableWidth, this.tableHeight, this.numOfPerson);
      table.rotate = this.rotate;
      table.comment = this.comment;
      return table;
    };

    p.isEqual = function() {
      return true;
    };

    createjs.SquareTable = createjs.promote(SquareTable, "Table");
      
  }());

  //CUSTOM TABLE CLASS
  (function() {

    function CustomTable(label, width, height, typeOfTable, customId, customURL) {
      this.typeOfTable = typeOfTable;
      this.customId = customId;
      this.customURL = customURL;
      this.bitmap = null;
      this.item = null;

      this.Table_constructor(label, width, height, 0);

      this.item = new createjs.Container();
      this.addChild(this.item);
      this.addChild(this.tooltip);

      this.setItem(customURL);
    }
  
    var p = createjs.extend(CustomTable, createjs.Table);

    p.setSize = function(width, height) {
      this.tableWidth = width;
      
      this.background.graphics.clear();
      this.select.graphics.clear();

      if (this.typeOfTable == 1) {
        this.tableHeight = this.tableWidth;
        this.background.graphics.beginStroke('#7e7e7e').setStrokeStyle(1).beginFill('#edcdce').drawRect(0, 0, this.tableWidth, this.tableWidth);
        this.select.graphics.beginStroke('#7e7e7e').setStrokeStyle(1).beginFill('#fed4aa').drawRect(0, 0, this.tableWidth, this.tableWidth);

        this.background.x = this.select.x = -this.tableWidth/2;
        this.background.y = this.select.y = -this.tableWidth/2;
      }

      else if (this.typeOfTable == 2) {
        this.tableHeight = this.tableWidth;
        this.background.graphics.beginStroke('#7e7e7e').setStrokeStyle(1).beginFill('#edcdce').drawCircle(0, 0, this.tableWidth/2);
        this.select.graphics.beginStroke('#7e7e7e').setStrokeStyle(1).beginFill('#fed4aa').drawCircle(0, 0, this.tableWidth/2);
        this.background.x = this.select.x = 0;
        this.background.y = this.select.y = 0;
      }

      else {
        this.tableHeight = height;
        this.background.graphics.beginStroke('#7e7e7e').setStrokeStyle(1).beginFill('#edcdce').drawRect(0, 0, this.tableWidth, this.tableHeight);
        this.select.graphics.beginStroke('#7e7e7e').setStrokeStyle(1).beginFill('#fed4aa').drawRect(0, 0, this.tableWidth, this.tableHeight);
        this.background.x = this.select.x = -this.tableWidth/2;
        this.background.y = this.select.y = -this.tableHeight/2;
      }

      this.updateText();
      this.updatePosition();
    };

    p.updateText = function() {
      var textWidth = this.text.getMeasuredWidth();
      var textHeight = this.text.getMeasuredHeight();

      this.text.x = - textWidth/2;
      this.text.y = - textHeight/2 - 5;

      this.groupText.x = -this.groupText.getBounds().width/2;
      this.groupText.y = this.text.y + textHeight + 5;
    };

    p.updatePerson = function() {
    };

    p.setTypeOfTable = function(typeOfTable) {
      this.typeOfTable = typeOfTable;
    };

    p.setCustom = function(customId) {
      this.customId = customId;
    };

    p.setItem = function(url) {
      this.customURL = url;
      var that = this;

      if (this.item.contains(this.bitmap)) {
        this.item.removeChild(this.bitmap);
      }

      var img = new Image();
      img.onload = function() {
        that.bitmap = new createjs.Bitmap(img);
        that.item.addChild(that.bitmap);
        that.updatePosition();
      }
      img.src = url;
    };

    p.updatePosition = function() {
      if (!this.bitmap) {
        return;
      }

      this.bitmap.x = - this.bitmap.getBounds().width / 2;
      this.bitmap.y = - this.tableHeight / 2 - this.bitmap.getBounds().height + 10;
    };

     p.clone = function() {
      var table = new createjs.CustomTable(this.label, this.tableWidth, this.tableHeight, this.typeOfTable, this.customId, this.customURL);
      table.rotate = this.rotate;
      table.comment = this.comment;
      return table;
    };

     p.getCustomJSON = function() {
      var json = '' +
                 ', "typeOfTable": ' + this.typeOfTable +
                 ', "customId": "' + this.customId + '"' +
                 ', "customURL": "' + this.customURL + '"';
      return json;
    };

    p.isEqual = function() {
      return (this.typeOfTable == 1 || this.typeOfTable == 2) ?  true : false;
    };

    createjs.CustomTable = createjs.promote(CustomTable, "Table");
      
  }());

  ////TRANSFORM CLASS/////  
  (function() {
    function Transform() {
      this.Container_constructor();
      
      this.line = null;
      this.center = null;
      
      this.top = null;
      this.right = null;
      this.bottom = null;
      this.left = null;
      
      this.rtopleft = null;
      this.rtopright = null;
      this.rbottomleft = null;
      this.rbottomright = null;
      
      this.createElement();
      this.alpha = 0.5;
      this.target = null;
      this.isOne = false;
      
      this.angle = 0;      
    };
  
    var p = createjs.extend(Transform, createjs.Container);

    p.createElement = function() {
      this.line = this.addChild(new createjs.Shape());
      
      //this.center = this.addChild(new createjs.Shape());
      //this.center.graphics.beginFill('red').drawCircle(0, 0, 3);
      
      this.rtopleft = this.addChild(new createjs.Shape());
      this.rtopleft.graphics.beginFill('white').beginStroke('red').setStrokeStyle(2, 'round').drawCircle(0, 0, 6, 6);
      this.rtopleft.cursor = 'pointer';      
      
      this.top = this.addChild(new createjs.Shape());
      this.top.graphics.beginFill('white').beginStroke('red').setStrokeStyle(2, 'round').drawRect(-5, -5, 10, 10);
      this.top.cursor = 'n-resize';
       
      this.rtopright = this.addChild(new createjs.Shape());
      this.rtopright.graphics.beginFill('white').beginStroke('red').setStrokeStyle(2, 'round').drawCircle(0, 0, 6, 6);
      this.rtopright.cursor = 'pointer';
      
      this.right = this.addChild(new createjs.Shape());
      this.right.graphics.beginFill('white').beginStroke('red').setStrokeStyle(2, 'round').drawRect(-5, -5, 10, 10);
      this.right.cursor = 'e-resize';
      
      this.rbottomleft = this.addChild(new createjs.Shape());
      this.rbottomleft.graphics.beginFill('white').beginStroke('red').setStrokeStyle(2, 'round').drawCircle(0, 0, 6, 6);
      this.rbottomleft.cursor = 'pointer';
      
      this.bottom = this.addChild(new createjs.Shape());
      this.bottom.graphics.beginFill('white').beginStroke('red').setStrokeStyle(2, 'round').drawRect(-5, -5, 10, 10);
      this.bottom.cursor = 'n-resize';
      
      this.rbottomright = this.addChild(new createjs.Shape());
      this.rbottomright.graphics.beginFill('white').beginStroke('red').setStrokeStyle(2, 'round').drawCircle(0, 0, 6, 6);
      this.rbottomright.cursor = 'pointer';
      
      this.left = this.addChild(new createjs.Shape());
      this.left.graphics.beginFill('white').beginStroke('red').setStrokeStyle(2, 'round').drawRect(-5, -5, 10, 10);
      this.left.cursor = 'e-resize';
      
      var that = this;
      this.top.on('pressmove', function(evt) { that.onVertialResizeHandler(evt); });
      this.right.on('pressmove', function(evt) { that.onHorizonalResizeHandler(evt); });
      this.bottom.on('pressmove', function(evt) { that.onVertialResizeHandler(evt); });
      this.left.on('pressmove', function(evt) { that.onHorizonalResizeHandler(evt); });
      
      this.rtopleft.on('mousedown', function(evt) { that.onRotateHandler(evt); });
      this.rtopright.on('mousedown', function(evt) { that.onRotateHandler(evt); });
      this.rbottomleft.on('mousedown', function(evt) { that.onRotateHandler(evt); });
      this.rbottomright.on('mousedown', function(evt) { that.onRotateHandler(evt); });       
    };
    
    p.onHorizonalResizeHandler = function(evt) {
      var global = this.localToGlobal(0, 0); 
      
      var disX = Math.abs(evt.stageX - global.x);
      
      this.updateWidth(2 * disX);

      if (this.isOne) {
         this.updateHeight(2 * disX);
      }
        
      var resizeEvent = {
        type: "hResizeEvent",
        distance: 2 * disX
      };
      this.dispatchEvent(resizeEvent);     
    };
  
    p.onVertialResizeHandler = function(evt) {
      var global = this.localToGlobal(0, 0); 
      
      var disY = Math.abs(evt.stageY - global.y);
      
      if (this.isOne) {
         this.updateWidth(2 * disY);
      }
      this.updateHeight(2 * disY);

      var resizeEvent = {
        type: "vResizeEvent",
        distance: 2 * disY
      };
      this.dispatchEvent(resizeEvent);
    };
    
    p.getAngle = function(cX, cY, mX, mY){
      var angle = Math.atan2(mY - cY, mX - cX);
      return angle;
    };
  
    p.onRotateHandler = function(evt) {
      
      this.global = this.localToGlobal(0, 0); 
      
      this.clickAngle = this.getAngle(this.global.x, this.global.y, evt.stageX, evt.stageY) - this.angle;
      
      var that = this;
      this.pressmove = this.stage.on('pressmove', function(evt) { that.onRotateMoveHandler(evt); });
      this.pressup = this.stage.on('pressup', function(evt) { that.onRotateUpHandler(evt); });
    };
  
    p.onRotateUpHandler = function(evt) {
      this.stage.off('pressmove', this.pressmove);      
      this.stage.off('pressup', this.pressup);  
    };
    
    p.onRotateMoveHandler = function(evt) {
      
      this.angle = this.getAngle(this.global.x, this.global.y, evt.stageX, evt.stageY) - this.clickAngle;
      
      var rotate = this.angle * 180 / Math.PI;
      
      this.rotation = rotate;
      
      var rotateEvent = {
        type: "rotateEvent",
        data: {rotation: rotate }
      };
      this.dispatchEvent(rotateEvent);
    };
    
    p.setTarget = function(target, isOne) {
      this.target = target;
      this.isOne = isOne;

      if (target) {
        target.parent.addChild(this);
        this.x = target.x;
        this.y = target.y;
        this.rotation = target.rotation;
      } else {
        if (this.parent) {
          this.parent.removeChild(this);
        }
      }
    };
  
    p.updateWidth = function(width) {
      this.right.x = width/2;
      this.left.x = -width/2;
      
      this.rtopleft.x = this.rbottomleft.x = -width/2;
      this.rtopright.x = this.rbottomright.x = width/2; 
    };
    
    p.updateHeight = function(height) {
      
      this.top.y = -height/2;
      this.bottom.y = height/2;
      this.rtopleft.y = this.rtopright.y = -height/2;
      this.rbottomleft.y = this.rbottomright.y = height/2;
      
      /*
      this.line.graphics.clear();
      this.line.graphics.beginStroke('red').setStrokeStyle(2, 'round').moveTo(this.topleft.x, this.topleft.y).lineTo(this.topright.x, this.topright.y).lineTo(this.bottomright.x, this.bottomright.y).lineTo(this.bottomleft.x, this.bottomleft.y).lineTo(this.topleft.x, this.topleft.y);*/
    };
  
    createjs.Transform = createjs.promote(Transform, "Container");

  }());

  /* =============== */
  /* MODULE DEFAULTS */
  /* =============== */

  var defaults = {};
  var pluginName = 'seat';
  var cvsId = 'cvsSeat';
   
  var defaultTable = [
    {"id": "custom", "type": "CustomTable", "label": "VẬT PHẨM", "tableWidth": 100, "tableHeight": 50, "numOfPerson": 0, "rotate": 0, "comment": "", "x": 0, "y": 0, "typeOfTable": 2, "customId": "item-1", "customURL": "images/seat/1.png"},
    {"id": "circle", "type": "CircleTable", "label": "BÀN TIỆC", "tableWidth": 100, "tableHeight": 50, "numOfPerson": 10, "rotate": 0, "comment": "", "x": 0, "y": 0}, 
    {"id": "square", "type": "SquareTable", "label": "BÀN TIỆC", "tableWidth": 100, "tableHeight": 90, "numOfPerson": 10, "rotate": 0, "comment": "", "x": 0, "y": 0}, 
    {"id": "rect", "type": "RectTable", "label": "BÀN TIỆC", "tableWidth": 180, "tableHeight": 80, "numOfPerson": 10, "rotate": 0, "comment": "", "x": 0, "y": 0}, 
    {"id": "halfrect", "type": "HalfRectTable", "label": "BÀN TIỆC", "tableWidth": 160, "tableHeight": 65, "numOfPerson": 5, "rotate": 0, "comment": "", "x": 0, "y": 0}];
  
  var defaultLabel = 'BÀN TIỆC';
  var defaultCustomLabel = 'VẬT PHẨM';
  var editLabel = 'Chỉnh sửa';
  var deleteLabel = 'Xóa';

  /* ================= */
  /* MODULE DEFINITION */
  /* ================= */

  function Seat(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, options);

    this.gridX = 0;
    this.gridY = 0;

    this.gridWidth = 0;
    this.gridHeight = 0;
    this.zoomLevel = 1;

    this.canvas = null;
    this.stage = null;
    
    this.container = null;
    this.background = null;
    this.grid = null;
    this.table = null;
    this.drag = null;

    this.hscroll = null;
    this.hscrollBgd = null;
    this.hscrollBar = null;

    this.vscroll = null;
    this.vscrollBgd = null;
    this.vscrollBar = null;

    this.isHScroll = false;
    this.isVScroll = false;

    this.selectedTable = null;

    this.transform = null;

    return this.init();
  }

  /* ============== */
  /* MODULE METHODS */
  /* ============== */

  Seat.prototype.init = function() {

    this.canvas = document.getElementById(cvsId);

    this.stage = new createjs.Stage(cvsId);
    this.stage.enableMouseOver();
    createjs.Touch.enable(this.stage);

    this.background = this.stage.addChild(new createjs.Shape());
    this.container = this.stage.addChild(new createjs.Container());

    this.drag = this.container.addChild(new createjs.Shape());
    this.drag.alpha = 0.1;
    
    this.grid = this.container.addChild(new createjs.Shape());
    this.table = this.container.addChild(new createjs.Container());

    //horizonal scroll
    this.hscroll = this.stage.addChild(new createjs.Container());
    this.hscrollBgd = this.hscroll.addChild(new createjs.Shape());
    this.hscrollBar = this.hscroll.addChild(new createjs.Shape());

    //vertial scroll
    this.vscroll = this.stage.addChild(new createjs.Container());
    this.vscrollBgd = this.vscroll.addChild(new createjs.Shape());
    this.vscrollBar = this.vscroll.addChild(new createjs.Shape());

    this.transform = new createjs.Transform();
    this.transform.on('vResizeEvent', function(evt) {
      if (that.selectedTable) {
        that.selectedTable.setSize(that.selectedTable.isEqual() ? evt.distance : that.selectedTable.tableWidth, evt.distance);
      }
    });
    
    this.transform.on('hResizeEvent', function(evt) {
      if (that.selectedTable) {
        that.selectedTable.setSize(evt.distance, that.selectedTable.isEqual() ? evt.distance : that.selectedTable.tableHeight);
      }
    });
    
    this.transform.on('rotateEvent', function(evt) {
       if (that.selectedTable) {
        that.selectedTable.setRotate(evt.data.rotation);
      }
    });

    var that = this;
    createjs.Ticker.addEventListener("tick", function(evt) {
      that.stage.update();
    });

    //show/hide tool bar event
    $('.arrow-show').on('click', function(evt){
      evt.preventDefault();
      $(this).closest('.block-seat').toggleClass('active');
      that.resize();
    });

    //fullscreen event
    document.addEventListener("fullscreenchange", function(evt) { that.onFullScreenChange(evt);});
    document.addEventListener("webkitfullscreenchange", function(evt) { that.onFullScreenChange(evt);});
    document.addEventListener("mozfullscreenchange", function(evt) { that.onFullScreenChange(evt);});
    document.addEventListener("MSFullscreenChange", function(evt) { that.onFullScreenChange(evt);});

    $('.control-toolbar').find("a[class='full']").on('click', function(evt) { that.onClickFullHandler(evt);});
    $('.block-seat').find('.addsize').find("button[type='submit']").on('click', function(evt) { that.onClickChangeSizeHandler(evt); });
    $('.select-tool').find("a[data-control]").on('click', function(evt) { that.handleControl($(this).data('control')); });

    $('.save-seat').on('click', function(evt) { that.saveSeat(); });
    $('.export-seat').on('click', function(evt) { that.exportSeat(); });

    //horizonal scroll event
    this.hscrollBar.on("mousedown", function (evt) {
      this.offset = {x: this.x - evt.stageX};
    });
    
    //vertical scroll event
    this.vscrollBar.on("mousedown", function (evt) {
      this.offset = {y: this.y - evt.stageY};
    });
    
    this.hscrollBar.on("pressmove", function (evt) { that.onPressMoveHScrollBarHandler(evt); });
    this.vscrollBar.on("pressmove", function (evt) { that.onPressMoveVScrollBarHandler(evt); });

    this.drag.on("mousedown", function (evt) { that.onMouseDownDragHandler(evt); });
    this.drag.on("pressmove", function (evt) { that.onPressMoveDragHandler(evt); });
    
    $(window).on('resize', function(evt) {
      that.resize();
    });

    this.updateScroll();
    this.resize();
    this.start();

    //var dataseat = $('.block-seat').data('seat');
    //var seatnew = $('#seatnew');
    //seatnew.modal('show');

    //if ($.trim(dataseat) != '') {
    //  this.loadSeat(dataseat);
    //} else {
    //  this.setDefaultSeat(150, 50);
    //}
  };

  Seat.prototype.start = function() {
    var that = this;
    var isClick = false;

    var dialog = $('#seatNew');
    dialog.modal('show');

    var totalseat = dialog.find("input[name='totalseat']");
    totalseat.val(25);

    dialog.find('div[data-check]').removeClass('checked');
    $(dialog.find('div[data-check]')[0]).addClass('checked');

    var start = dialog.find("button[name='start-new']");
    start.off('click').on('click', function (evt) {
      isClick = true;
      dialog.modal('hide');

      var numOfTable = Number(totalseat.val());
      numOfTable = numOfTable < 5 || isNaN(numOfTable) ? 25 : numOfTable;

      var typeitem = dialog.find('div[data-check][class*="checked"]');

      that.createSeat(numOfTable, Number(typeitem.data('seat-type')));
    });

    var cancel = dialog.find("button[name='cancel-new']");
    cancel.off('click').on('click', function (evt) {
      isClick = true;
      dialog.modal('hide');
      that.setDefaultSeat(150, 50);
    });

    dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (evt) {
      if (!isClick) {
        that.setDefaultSeat(150, 50);
      }
    });
  };

  Seat.prototype.createSeat = function(numOfTable, typeOfSeat) {

    if (typeOfSeat == 1) {
      this.setDefaultSeat(Math.ceil(numOfTable/4) * 10 + 50, 60);
    
      //circle
      var custom = this.getDefaultJsonTable('custom');
      custom.label = 'SÂN KHẤU';

      var table = this.createTable(custom, true);
      table.setSize(50 * 20, 60);
      table.setRotate(-90);
      table.x = 80;
      table.y = 30 * 20;
      
      var row = 0;
      var toX = 250;
      var toY = 200;

      for (var i = 0; i < numOfTable; i ++) {
        custom = this.getDefaultJsonTable('circle');
        custom.label = 'BÀN TIỆC ' + (i + 1);
        table = this.createTable(custom, false);
        table.x = toX;
        table.y = toY;
        
        toY += Number(table.tableHeight) + ((row == 1) ? 250 : 170);
        row ++;
        if (row >= 4) {
          row = 0;
          toY = 200;
          toX += Number(table.tableWidth) + 120;
        }
      }
    }

    else if (typeOfSeat == 2) {
      this.setDefaultSeat(60, Math.ceil(numOfTable/4) * 10 + 50);
    
      //circle
      var custom = this.getDefaultJsonTable('custom');
      custom.label = 'SÂN KHẤU';

      var table = this.createTable(custom, true);
      table.setSize(50 * 20, 60);
      table.x = 30 * 20;
      table.y = 100;

      var row = 0;
      var toX = 150;
      var toY = 250;

      for (var i = 0; i < numOfTable; i ++) {
        custom = this.getDefaultJsonTable('circle');
        custom.label = 'BÀN TIỆC ' + (i + 1);
        table = this.createTable(custom, false);
        table.x = toX;
        table.y = toY;
        toX += Number(table.tableWidth) + ((row == 1) ? 250 : 170);
        row ++;
        if (row >= 4) {
          row = 0;
          toX = 150;
          toY += Number(table.tableHeight) + 120;
        }
      }
    }

    else {
      this.setDefaultSeat(150, 50);
    }
  };

  Seat.prototype.setDefaultSeat = function(gridWidth, gridHeight) {
    $('.addsize').find('.wrap').find("input[name='Width']").val(gridWidth/10);
    $('.addsize').find('.wrap').find("input[name='Length']").val(gridHeight/10);
    this.changeSize(gridWidth, gridHeight);
  };

  Seat.prototype.loadSeat = function(url) {
    var that = this;
    var ajax = $.ajax({
      url: url,
      method: "GET",
      data: { id : '' },
      dataType: "json"
    });
     
    ajax.done(function(data) {
      try {
        that.parseSeat(data);
      } catch(err) {
        that.setDefaultSeat(150, 50);
      }
    });
     
    ajax.fail(function(jqXHR, textStatus) {
      that.setDefaultSeat(150, 50);
    });
  };

  Seat.prototype.parseSeat = function(json) {
    this.zoomLevel = json.zoomLevel;
    this.setDefaultSeat(json.gridWidth, json.gridHeight);

    //create table here;
    var table;
    for (var i = 0; i < json.table.length; i ++) {
      this.createTable(json.table[i], false);
    }
  };

  Seat.prototype.onClickFullHandler = function(evt) {
    var blockSeat = $('.block-seat');
    blockSeat.toggleClass('full-screen');

    if (blockSeat.hasClass('full-screen')) {
      this.fullscreen(document.documentElement);
    } else {
      this.exitFullscreen();
    }
  };

  Seat.prototype.onClickChangeSizeHandler = function(evt) {
    var wrap = $(evt.target).parent().prev();

    var wid = Number(wrap.find("input[name='Width']").val());
    var hei = Number(wrap.find("input[name='Length']").val());

    wid = wid < 4 || isNaN(wid) ? 4 : wid;
    hei = hei < 4 || isNaN(hei) ? 4 : hei;

    $('.addsize').find('.wrap').find("input[name='Width']").val(wid);
    $('.addsize').find('.wrap').find("input[name='Length']").val(hei);

    this.changeSize(Number(wid) * 10, Number(hei) * 10);
  };

  Seat.prototype.onPressMoveHScrollBarHandler = function(evt) {
    var toX = evt.stageX + evt.currentTarget.offset.x;

    toX = toX < 0 ? 0 : toX;
    toX = toX > this.hscrollBgd.width - this.hscrollBar.width ? this.hscrollBgd.width - this.hscrollBar.width : toX;

    evt.currentTarget.x = toX;

    this.updateGrid(true);
  };

  Seat.prototype.onPressMoveVScrollBarHandler = function(evt) {
    var toY = evt.stageY + evt.currentTarget.offset.y;

    toY = toY < 0 ? 0 : toY;
    toY = toY > this.vscrollBgd.height - this.vscrollBar.height ? this.vscrollBgd.height - this.vscrollBar.height : toY;

    evt.currentTarget.y = toY;

    this.updateGrid(false);
  };

  Seat.prototype.onMouseDownDragHandler = function(evt) {
    if (this.selectedTable) {
      this.selectedTable.setSelect(false);
      this.selectedTable = null;
    }

    this.transform.setTarget(null);

    this.container.offset = {x: this.container.x - evt.stageX, y: this.container.y - evt.stageY};
  };
  
  Seat.prototype.onPressMoveDragHandler = function(evt) {
    var toX = evt.stageX + this.container.offset.x;
    var toY = evt.stageY + this.container.offset.y;

    toX = toX > 0 ? 0 : toX;
    toX = toX < (this.hscrollBgd.width - (this.gridWidth * this.zoomLevel)) ? (this.hscrollBgd.width - (this.gridWidth * this.zoomLevel)) : toX;

    toY = toY > 0 ? 0 : toY
    toY = toY < (this.vscrollBgd.height - (this.gridHeight * this.zoomLevel)) ? (this.vscrollBgd.height - (this.gridHeight * this.zoomLevel)) : toY;

    if (this.isHScroll) {
      this.container.x = toX;
    }

    if (this.isVScroll) {
      this.container.y = toY;
    }

    this.updateScrollBar();
  };

  Seat.prototype.onFullScreenChange = function(evt) {
    var isFullScreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;

    if (!isFullScreen) {
      var blockSeat = $('.block-seat');
      blockSeat.removeClass('full-screen');
    }
  };

  Seat.prototype.fullscreen = function(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  Seat.prototype.exitFullscreen = function() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  };

  Seat.prototype.resize = function() {
    var isRight = $('.show-seat').next().css('display') != 'none';
    var width = isRight ? ($('.block-seat').width() - $('.show-seat').next().width()) : $('.block-seat').width();
    
    var isTop = $('.show-seat').prev().css('display') != 'none';
    var height = isTop ? ($('.block-seat').height() - $('.show-seat').prev().height()) : ($('.block-seat').height());

    this.updateCanvas(width - 5, height - 5);
  };

  Seat.prototype.updateCanvas = function(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;

    this.background.graphics.clear();
    this.background.graphics.beginFill('#FFFFFF').drawRect(0, 0, this.canvas.width, this.canvas.height).endFill();
    
    this.changeSize(this.gridX, this.gridY);
  };  

  Seat.prototype.changeSize = function(width, height) {
    this.gridX = width;
    this.gridY = height;

    this.gridWidth = this.gridX * 20;
    this.gridHeight = this.gridY * 20;

    this.hscroll.y = this.canvas.height - 10;
    this.vscroll.x = this.canvas.width - 10;
    
    this.drag.graphics.clear();
    this.drag.graphics.beginFill('#FFFFFF').drawRect(0, 1, this.gridWidth, this.gridHeight).endFill();

    this.hscrollBgd.width = this.canvas.width;
    this.vscrollBgd.height = this.canvas.height;

    this.isHScroll = this.hscrollBgd.width < (this.gridWidth * this.zoomLevel) ? true : false;

    if (this.isHScroll) {
       this.isVScroll = (this.gridHeight * this.zoomLevel) > (this.canvas.height - 10) ? true : false; 
    } else {
      this.isVScroll = (this.gridHeight * this.zoomLevel) > this.canvas.height ? true : false; 
    }
  
    if (this.isVScroll) {
      this.hscrollBgd.width = this.canvas.width - 10;
    } 

    if (this.isHScroll) {
      this.vscrollBgd.height = this.canvas.height - 10;
    }
    
    this.container.x = this.container.y = 0;
    this.grid.graphics.clear();
    
    var i, color, thickness;

    for (i = 0; i < (width + 1); i ++) {
        color = i % 10 == 0 ? '#9d9d9d' : '#dddddd';
        thickness = i % 10 == 0 ? 1 : 0.3;
        this.grid.graphics.beginStroke(color).setStrokeStyle(thickness).moveTo(i * 20, 0).lineTo(i * 20,  20 * height);
    }

    for (i = 0; i < (height + 1); i ++) {
        color = i % 10 == 0 ? '#9d9d9d' : '#dddddd';
        thickness = i % 10 == 0 ? 1 : 0.3;
        this.grid.graphics.beginStroke(color).setStrokeStyle(thickness).moveTo(0, i * 20).lineTo(20 * width, i * 20);
    }

    this.updateScroll();
  }

  Seat.prototype.updateScroll = function() {

    //horizonal scroll
    this.hscrollBgd.graphics.clear();
    this.hscrollBar.graphics.clear();
    this.hscrollBar.x = 0;

    if (this.isHScroll) {
      this.hscrollBgd.graphics.beginStroke('#b6b6b6').setStrokeStyle(1).beginFill('#e7e7e7').drawRoundRect(0, 0, this.hscrollBgd.width, 10, 5).endFill();
      
      //calculate width of hscrollbar
      var hscrollbarWidth = (this.hscrollBgd.width / (this.gridWidth * this.zoomLevel)) * this.hscrollBgd.width;

      this.hscrollBar.graphics.beginFill('#b33175').drawRoundRect(0, 0, hscrollbarWidth, 10, 5).endFill();
      this.hscrollBar.width = hscrollbarWidth;    
    }

    //vertical scroll
    this.vscrollBgd.graphics.clear();
    this.vscrollBar.graphics.clear();
    this.vscrollBar.y = 0;

    if (this.isVScroll) {
      this.vscrollBgd.graphics.beginStroke('#b6b6b6').setStrokeStyle(1).beginFill('#e7e7e7').drawRoundRect(0, 0, 10, this.vscrollBgd.height, 5).endFill();
      
      //calculate height of vscrollbar
      var vscrollbarHeight = (this.vscrollBgd.height / (this.gridHeight * this.zoomLevel)) * this.vscrollBgd.height;

      this.vscrollBar.graphics.beginFill('#b33175').drawRoundRect(0, 0, 10, vscrollbarHeight, 5).endFill();
      this.vscrollBar.height = vscrollbarHeight;    
    }
  };

  Seat.prototype.updateScrollBar = function() {
    this.hscrollBar.x = - this.container.x * (this.hscrollBgd.width - this.hscrollBar.width) / ((this.gridWidth * this.zoomLevel) - this.hscrollBgd.width);
    this.vscrollBar.y = - this.container.y * (this.vscrollBgd.height - this.vscrollBar.height) / ((this.gridHeight * this.zoomLevel) - this.vscrollBgd.height);
  };

  Seat.prototype.updateGrid = function(horizonal) {
    if (horizonal) {
      this.container.x = - this.hscrollBar.x * ((this.gridWidth * this.zoomLevel) - this.hscrollBgd.width) / (this.hscrollBgd.width - this.hscrollBar.width);
    } else {
      this.container.y = - this.vscrollBar.y * ((this.gridHeight * this.zoomLevel) - this.vscrollBgd.height) / (this.vscrollBgd.height - this.vscrollBar.height);
    }
  };

  Seat.prototype.setGridDisplay = function(isDisplay) {
    var grid = $('.select-tool').find("a[data-control='grid']").parent();
    var ungrid = $('.select-tool').find("a[data-control='ungrid']").parent();

    if (isDisplay) {    
      grid.addClass('active');
      ungrid.removeClass('active');
    } else {
      grid.removeClass('active');
      ungrid.addClass('active');
    }

    this.grid.visible = isDisplay;
  };

  Seat.prototype.zoom = function(zoomLevel) {
    
    //limit zoom level
    if (zoomLevel <= 0 || zoomLevel > 4) {
      return;
    }
    
    zoomLevel = Math.floor(zoomLevel * 100) / 100;
    
    //get the current center point
    var cenX = Math.abs(this.container.x) + this.hscrollBgd.width/2;    
    var cenY = Math.abs(this.container.y) + this.vscrollBgd.height/2;
    
    cenX = cenX / this.zoomLevel;
    cenY = cenY / this.zoomLevel;
    
    //zoom
    this.zoomLevel = zoomLevel;
    this.container.scaleX = this.container.scaleY = this.zoomLevel;
    
    this.hscrollBgd.width = this.canvas.width;
    this.vscrollBgd.height = this.canvas.height;

    this.isHScroll = this.hscrollBgd.width < (this.gridWidth * this.zoomLevel) ? true : false;

    if (this.isHScroll) {
       this.isVScroll = (this.gridHeight * this.zoomLevel) > (this.canvas.height - 10) ? true : false; 
    } else {
      this.isVScroll = (this.gridHeight * this.zoomLevel) > this.canvas.height ? true : false; 
    }
  
    if (this.isVScroll) {
      this.hscrollBgd.width = this.canvas.width - 10;
    } 

    if (this.isHScroll) {
      this.vscrollBgd.height = this.canvas.height - 10;
    }

    //calculate new center point
    var newX = cenX * this.zoomLevel;
    var newY = cenY * this.zoomLevel;

    //limit the position
    var toX = this.hscrollBgd.width/2 - newX;
    toX = toX > 0 ? 0 : toX;
    toX = toX < (this.hscrollBgd.width - (this.gridWidth * this.zoomLevel)) ? (this.hscrollBgd.width - (this.gridWidth * this.zoomLevel)) : toX;
    
    var toY = this.vscrollBgd.height/2 - newY;
    toY = toY > 0 ? 0 : toY
    toY = toY < (this.vscrollBgd.height - (this.gridHeight * this.zoomLevel)) ? (this.vscrollBgd.height - (this.gridHeight * this.zoomLevel)) : toY;

    //move to new center point
    this.container.x = this.isHScroll ? toX : 0;    
    this.container.y = this.isVScroll ? toY : 0;
    
    this.updateScroll();
    this.updateScrollBar();
  };

  Seat.prototype.handleControl = function(control) {

    switch(control) {
      case 'zoomin':
        this.zoom(this.zoomLevel + 0.1);
        break;

      case 'zoomout':
        this.zoom(this.zoomLevel - 0.1);
        break;

      case 'grid':
        this.setGridDisplay(true);
        break;

      case 'ungrid':
        this.setGridDisplay(false);
        break;
      
      case 'custom':
        this.prepareCustomTable();
        break;

      case 'copy':
        this.copyTable();
        break;

      case 'print':
        this.printSeat();
        break;

      case 'email':
        this.showPopupEmail();
        break;  
      
      default:
        this.prepareTable(control);
    }
  };

  Seat.prototype.getDefaultJsonTable = function(type) {
    var table;
    for (var i = 0; i < defaultTable.length; i ++) {
      if (defaultTable[i].id == type) {
        return defaultTable[i];
      }
    }
    return null;
  };

  Seat.prototype.prepareTable = function(type) {
    var json = this.getDefaultJsonTable(type);
    if (json) {
      this.createTable(json, true);
    }
  };

  Seat.prototype.prepareCustomTable = function() {
    var that = this;

    var dialog = $('#seatItem');
    dialog.modal('show');

    var nameitem = dialog.find("input[name='nameitem']");
    var kinditem = dialog.find("select[name='kinditem']");
    var sizeitem = dialog.find("input[name='sizeitem']");
    var rotateitem = dialog.find("input[name='rotateitem']");
    
    nameitem.val('');
    sizeitem.val('');
    rotateitem.val('');
    dialog.find('div[data-check]').removeClass('checked');
    $(dialog.find('div[data-check]')[0]).addClass('checked');

    var edit = dialog.find("button[name='edit']");
    edit.off('click').on('click', function (evt) {
      dialog.modal('hide');

      var typeitem = dialog.find('div[data-check][class*="checked"]');
      kinditem = dialog.find("select[name='kinditem']").find('option:selected');

      var label = nameitem.val();
      label = $.trim(label) == '' ? defaultCustomLabel : label;

      var wid = Number(sizeitem.val());
      wid = wid < 100 || isNaN(wid) ? 100 : wid;

      var typeOfTable = Number(kinditem.val());
      typeOfTable = typeOfTable < 1 || typeOfTable > 3 || isNaN(typeOfTable) ? 1 : typeOfTable;

      var table = that.table.addChild(new createjs.CustomTable(label, wid, wid/2, typeOfTable, typeitem.data('item-id'), typeitem.data('item-url')));
      that.addTable(table, true);
    });

    var cancel = dialog.find("button[name='cancel']");
    cancel.off('click').on('click', function (evt) {
       dialog.modal('hide');
    });
  };

  Seat.prototype.createTable = function(json, isCenter) {
    var label = json.label;
    var tableWidth = json.tableWidth;
    var tableHeight = json.tableHeight;
    var numOfPerson = json.numOfPerson;

    var table;
    if (json.type == 'CustomTable') {
      table = this.table.addChild(new createjs[json.type](label, tableWidth, tableHeight, numOfPerson, json.customId, json.customURL));
    } else {
      table = this.table.addChild(new createjs[json.type](label, tableWidth, tableHeight, numOfPerson));
    }

    table.x = json.x;
    table.y = json.y;
    this.addTable(table, isCenter);

    return table;
  };

  Seat.prototype.addTable = function(table, isCenter) {
    var that = this;
    
    //set position
    if (isCenter) {
      table.x = Math.abs(this.container.x) + this.hscrollBgd.width/2;
      table.y = Math.abs(this.container.y) + this.vscrollBgd.height/2;
    }

    //add event
    //table.on("mouseover", function (evt) {
      //if (that.transform.target == this) {
        //that.table.addChild(that.transform);
      //}
    //});

    table.on("mousedown", function (evt) {
      table.offset = {x: evt.stageX, y: evt.stageY};
      that.table.addChild(table);
      
      if (that.selectedTable) {
        that.selectedTable.setSelect(false);
      }

      that.selectedTable = table;
      that.selectedTable.setSelect(true);

      that.transform.setTarget(table, table.isEqual());
      that.transform.updateWidth(table.tableWidth);
      that.transform.updateHeight(table.tableHeight);
    });

    table.on("pressmove", function (evt) {
      table.setDisplayTooltip(false);
      table.setDisplayEdit(false);
      
      var toX = (evt.stageX - table.offset.x) / that.zoomLevel;
      var toY = (evt.stageY - table.offset.y) / that.zoomLevel;

      table.offset = {x: evt.stageX, y: evt.stageY};

      var tmpX = table.x + toX;
      var tmpY = table.y + toY;

      tmpX = tmpX < table.getBounds().width/2 ? table.getBounds().width/2 : tmpX;
      tmpX = tmpX > table.gridWidth - table.getBounds().width/2 ? that.gridWidth - table.getBounds().width/2 : tmpX;

      tmpY = tmpY < table.getBounds().height/2 ? table.getBounds().height/2 : tmpY;
      tmpY = tmpY > table.gridHeight - table.getBounds().height/2 ? that.gridHeight - table.getBounds().height/2 : tmpY;

      table.x = tmpX;
      table.y = tmpY;
      
      if (that.transform.target == table) {
        that.transform.setTarget(table, table.isEqual());
      }
    });

    //table.on("click", function (evt) {
    //  table.setDisplayTooltip(false);
    //  table.setDisplayEdit(false);
    //});

    //add custom event
    table.on('editEvent', function(evt) {
      if (table instanceof createjs.CustomTable) {
        that.editCustomTable(table);
      } else {
        that.editTable(table);
      }
      table.setDisplayTooltip(false);
    });

    table.on('deleteEvent', function(evt) {
      table.setDisplayTooltip(false);
      that.deleteTable(this);
      that.transform.setTarget(null);
    });

    this.updateInfo();
  };

  Seat.prototype.editTable = function(table) {
    var that = this;

    var dialog = $('#seatEdit');
    dialog.modal('show');

    var nameseat = dialog.find("input[name='nameseat']");
    var sizeseat = dialog.find("input[name='sizeseat']");
    var positionseat = dialog.find("input[name='positionseat']");
    var rotateseat = dialog.find("input[name='rotateseat']");
    var commentseat = dialog.find("textarea[name='commentseat']");
 
    nameseat.val(table.label);
    sizeseat.val(table.tableWidth);
    positionseat.val(table.numOfPerson);
    rotateseat.val(table.rotate);
    commentseat.val(table.comment);

    var edit = dialog.find("button[name='edit']");
    edit.off('click').on('click', function (evt) {
      dialog.modal('hide');

      var wid = Number(sizeseat.val());
      wid = wid < 100 || isNaN(wid) ? 100 : wid;
      table.setSize(wid, wid / 2);
      
      var label = nameseat.val();
      label = $.trim(label) == '' ? defaultLabel : label;
      table.setLabel(label.toUpperCase());
      
      var numOfPerson = Number(positionseat.val());
      numOfPerson = numOfPerson < 1 || numOfPerson > 15 || isNaN(numOfPerson) ? 10 : numOfPerson;
      table.setNumOfPerson(numOfPerson);
      
      var rotate = Number(rotateseat.val());
      rotate = rotate < 0 || rotate > 360 || isNaN(rotate) ? 0 : rotate;
      table.setRotate(rotate);
      table.setComment(commentseat.val());

      that.transform.setTarget(table, table.isEqual());
      that.transform.updateWidth(table.tableWidth);
      that.transform.updateHeight(table.tableHeight);

      that.updateInfo();
    })

    var cancel = dialog.find("button[name='cancel']");
    cancel.off('click').on('click', function (evt) {
       dialog.modal('hide');
    });
  };

  Seat.prototype.editCustomTable = function(table) {
    var that = this;

    var dialog = $('#seatItem');
    dialog.modal('show');

    var nameitem = dialog.find("input[name='nameitem']");
    var sizeitem = dialog.find("input[name='sizeitem']");
    var rotateitem = dialog.find("input[name='rotateitem']");
 
    nameitem.val(table.label);
    sizeitem.val(table.tableWidth);
    rotateitem.val(table.rotate);
    
    dialog.find('div[data-check]').removeClass('checked');
    dialog.find('div[data-check][data-item-id="' + table.customId + '"]').addClass('checked');

    var kinditem = dialog.find("select[name='kinditem']").find('option[value="' + table.typeOfTable + '"]');
    dialog.find('.custom-select').find('.text-val').html(kinditem.text());

    var edit = dialog.find("button[name='edit']");
    edit.off('click').on('click', function (evt) {
      dialog.modal('hide');

      var label = nameitem.val();
      label = $.trim(label) == '' ? defaultCustomLabel : label;
      table.setLabel(label.toUpperCase());

      var rotate = Number(rotateitem.val());
      rotate = rotate < 0 || rotate > 360 || isNaN(rotate) ? 0 : rotate;
      table.setRotate(rotate);
      
      kinditem = dialog.find("select[name='kinditem']").find('option:selected');
      var typeOfTable = Number(kinditem.val());
      typeOfTable = typeOfTable < 1 || typeOfTable > 3 || isNaN(typeOfTable) ? 1 : typeOfTable;
      table.setTypeOfTable(typeOfTable);

      var wid = Number(sizeitem.val());
      wid = wid < 100 || isNaN(wid) ? 100 : wid;
      table.setSize(wid, wid / 2);
      
      var typeitem = dialog.find('div[data-check][class*="checked"]');
      table.setCustom(typeitem.data('item-id'));
      table.setItem(typeitem.data('item-url'));

      that.transform.setTarget(table, table.isEqual());
      that.transform.updateWidth(table.tableWidth);
      that.transform.updateHeight(table.tableHeight);
    });

    var cancel = dialog.find("button[name='cancel']");
    cancel.off('click').on('click', function (evt) {
       dialog.modal('hide');
    });
  };

  Seat.prototype.copyTable = function() {
    if (!this.selectedTable) {
      return;
    }

    var table = this.table.addChild(this.selectedTable.clone());
    this.addTable(table, true);
  };

  Seat.prototype.deleteTable = function(table) {
    this.table.removeChild(table);
    
    this.updateInfo();
  };

  Seat.prototype.updateInfo = function() {

    var table;
    var numOfTable = 0;
    var numOfPerson = 0;
    var numOfItem = 0;

    for (var i = 0; i < this.table.numChildren; i ++) {
      table = this.table.getChildAt(i);

      if (table instanceof createjs.Transform) {
        continue;
      }

      if (table instanceof createjs.CustomTable) {
        numOfItem ++;
      } else {
        numOfTable ++;
        numOfPerson += table.numOfPerson;
      }      
    }

    $('.infor-seat').find('.total-table').html('Bàn: ' + numOfTable);
    $('.infor-seat').find('.total-seat').html('Ghế: ' + numOfPerson);
    $('.infor-seat').find('.total-item').html('Vật phẩm: ' + numOfItem);
  };

  Seat.prototype.prepare = function(callback, timeout) {
    //set zoom to 1
    var tmpZoomLevel = this.zoomLevel;
    this.zoom(1);

    //resize canvas to width, height of zoom 1
    var tmpGridWidth = this.canvas.width;;
    var tmpGridHeight = this.canvas.height;

    this.updateCanvas(this.gridWidth, this.gridHeight);

    this.hscroll.visible = this.vscroll.visible = false;

    //export
    var that = this;
    setTimeout(function() {
      
      //send image back
      callback.apply(this, [that.canvas.toDataURL('image/jpeg')]);

      //show scroll bar
      that.hscroll.visible = that.vscroll.visible = true;

      //resize to old size
      that.updateCanvas(tmpGridWidth, tmpGridHeight);

      //reset to old zoom
      that.zoom(tmpZoomLevel);

    }, timeout);
  };

  Seat.prototype.printSeat = function() {
    this.prepare(function(canvasData) {
      var windowContent = '<!DOCTYPE html>';
      windowContent += '<html>'
      windowContent += '<head><title>Print Seat</title></head>';
      windowContent += '<body><img src="' + canvasData + '"></body>';
      windowContent += '</html>';
      
      var printWin = window.open('','','width=1280,height=768');
      printWin.document.open();
      printWin.document.write(windowContent);
      printWin.document.close();
      printWin.focus();
      printWin.print();
      printWin.close();
    }, 100);
  };
  
  Seat.prototype.showPopupEmail = function() {
    var that = this;

    var dialog = $('#seatEmail');
    dialog.modal('show');

    var nameemail = dialog.find("input[name='nameemail']");
    var titleemail = dialog.find("input[name='titleemail']");
    var contentemail = dialog.find("textarea[name='contentemail']");

    var send = dialog.find("button[name='send-email']");
    send.off('click').on('click', function (evt) {

      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
      if (!re.test(nameemail.val())) {
        nameemail.focus();
        return;
      }

      if ($.trim(titleemail.val()) == '') {
        titleemail.focus();
        return;
      }

      if ($.trim(contentemail.val()) == '') {
        contentemail.focus();
        return;
      }

      dialog.modal('hide');
      that.sendEmail(nameemail.val(), titleemail.val(), contentemail.val());
    });

    var cancel = dialog.find("button[name='cancel-email']");
    cancel.off('click').on('click', function (evt) {
       dialog.modal('hide');
    });
  };
  
  Seat.prototype.sendEmail = function(email, title, content) {
    this.prepare(function(canvasData) {
      var ajax = $.ajax({
        url: 'http://localhost:3001/wedding/public/server/seat/sendEmail.php',
        method: "POST",
        data: { id : '', data: canvasData, email: email, title: title, content: content },
        dataType: "text",
        contentType: 'application/x-www-form-urlencoded'
      });
     
      ajax.done(function(data) {
      });
     
      ajax.fail(function(jqXHR, textStatus) {
      });
    }, 100);
  };

  Seat.prototype.saveSeat = function() {
    var json = '{' +
               '"zoomLevel" : ' + this.zoomLevel +
               ', "gridWidth" : ' + this.gridWidth / 20 +
               ', "gridHeight" : ' + this.gridHeight / 20+
               ', "table" : [';
    var table;
    var numOfTable = this.table.numChildren;

    for (var i = 0; i < numOfTable; i ++) {
      table = this.table.getChildAt(i);
      json = json + table.toJSON();
      if (i != numOfTable - 1) {
        json = json + ', '
      }
    }
    json = json + ']}';

    var that = this;
    var ajax = $.ajax({
      url: 'http://localhost:3001/wedding/public/server/seat/saveSeat.php',
      method: "POST",
      data: { id : '', seat: json },
      dataType: "json"
    });
     
    ajax.done(function(data) {
    });
     
    ajax.fail(function(jqXHR, textStatus) {
    });
  };

  Seat.prototype.exportSeat = function() {
    this.prepare(function(canvasData) {
      window.open(canvasData);
    }, 100);
  };

  /* =============== */
  /* MODULE DATA-API */
  /* =============== */

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Seat(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({});
  });

}(window.jQuery, window, window.createjs, window.App));

/* =========
 * sample.js
 * ========= */

(function($, App) {

  "use strict";

  /* ============== */
  /* MODULE TRIGGER */
  /* ============== */

  var sliderShowA = '[data-slider-mobile]',
      itemSlideDt = '[data-itemslidedt]',
      itemSlideMb = '[data-itemslidemb]';

  /* =============== */
  /* MODULE DEFAULTS */
  /* =============== */

  var defaults = {};

  /* ================= */
  /* MODULE DEFINITION */
  /* ================= */

  function Slider(opts) {
    this.settings = $.extend({}, defaults, opts);
    return this.init();
  }

  /* ============== */
  /* MODULE METHODS */
  /* ============== */

  Slider.prototype.init = function() {
    var slider = $(sliderShowA),
        itemslidedt = $(itemSlideDt).data('itemslidedt'),
        itemslidemb = $(itemSlideMb).data('itemslidemb');
    slider.slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: itemslidedt,
      slidesToScroll: itemslidedt,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: itemslidedt,
            slidesToScroll: itemslidedt,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: itemslidemb,
            slidesToScroll: itemslidemb
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
    return this;
  };


  /* =============== */
  /* MODULE DATA-API */
  /* =============== */

  $(function() {
    var opts = {};
    App.slider = new Slider(opts);
  });

}(window.jQuery, window.App));
/* =========
 * sample.js
 * ========= */

(function($, App) {

  "use strict";

  /* ============== */
  /* MODULE TRIGGER */
  /* ============== */

  var sliderShowA = '.slideshow-tab';

  /* =============== */
  /* MODULE DEFAULTS */
  /* =============== */

  var defaults = {};

  /* ================= */
  /* MODULE DEFINITION */
  /* ================= */

  function SliderTab(opts) {
    this.settings = $.extend({}, defaults, opts);
    return this.init();
  }

  /* ============== */
  /* MODULE METHODS */
  /* ============== */

  SliderTab.prototype.init = function() {
    var slider = $(sliderShowA);
    slider.slick({
      dots: false,
      infinite: true,
      speed: 300,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
    return this;
  };


  /* =============== */
  /* MODULE DATA-API */
  /* =============== */

  $(function() {
    var opts = {};
    App.sliderTab = new SliderTab(opts);
  });

}(window.jQuery, window.App));
/* =========
 * sample.js
 * ========= */

(function($, App) {

  "use strict";

  /* ============== */
  /* MODULE TRIGGER */
  /* ============== */

  var sliderShow = '[data-slidershow]';

  /* =============== */
  /* MODULE DEFAULTS */
  /* =============== */

  var defaults = {};

  /* ================= */
  /* MODULE DEFINITION */
  /* ================= */

  function Slider(opts) {
    this.settings = $.extend({}, defaults, opts);
    return this.init();
  }

  /* ============== */
  /* MODULE METHODS */
  /* ============== */

  Slider.prototype.init = function() {
    var slider = $(sliderShow);
    slider.slick({
      dots: false,
      // autoplay: true,
      // autoplaySpeed: 2000,
      infinite: false
    });
    return this;
  };


  /* =============== */
  /* MODULE DATA-API */
  /* =============== */

  $(function() {
    var opts = {};
    App.slider = new Slider(opts);
  });

}(window.jQuery, window.App));
/**
 *  @name scroll-video
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  var pluginName = 'tab-video-small';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
          ele = that.element,
          control = $('[data-control-small]', ele),
          content = $('[data-content-small]', ele);
      control.find('a').each(function(){
        var el = $(this);
        el.on('click.' + pluginName, function(e){
          e.preventDefault();
          var idControl = el.attr('href');
          if(el.parent().hasClass('active')){
            return;
          }
          else{
            var beforeEL = content.filter('.active');
            if(beforeEL.length){
              beforeEL.removeClass('active');
            }
            control.find('li').removeClass('active');
            el.parent().addClass('active');
            $(idControl).addClass('active');

            var ce = jQuery.Event("change.tab-video-small");
            $('body').trigger( ce );
          }
        });
      });
    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
/**
 *  @name scroll-video
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  var pluginName = 'tab-video';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
          ele = that.element,
          control = $('[data-control]', ele),
          content = $('[data-content]', ele);
      control.find('a').each(function(){
        var el = $(this);
        el.on('click.' + pluginName, function(e){
          e.preventDefault();
          var idControl = el.attr('href');
          if(el.parent().hasClass('active')){
            return;
          }
          else{
            var beforeEL = content.filter('.active');
            if(beforeEL.length){
              beforeEL.removeClass('active');
            }
            control.find('li').removeClass('active');
            el.parent().addClass('active');
            $(idControl).addClass('active');
          }
          
        });
      });
    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
/**
 *  @name video-frame
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  var pluginName = 'video-frame-1';

  function initTemplate (ele, videoSrc, videoType){
    var iframeContent;

    switch(videoType) {
      case 'vimeo':
        iframeContent = '<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="//player.vimeo.com/video/' + videoSrc + '?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1&amp;api=1&amp;frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>';
        break;
      case 'dailymotion':
        iframeContent = '<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="//www.dailymotion.com/embed/video/' + videoSrc + '?api=true" frameborder="0"></iframe></div>';
        break;
      case 'youku':
        iframeContent = '<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="//player.youku.com/embed/' + videoSrc + '" allowFullScreen="true"></iframe></div>';
        break;
      default:
        iframeContent = '<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" frameborder="0" allowfullscreen="1" title="YouTube video player" src="//www.youtube.com/embed/' + videoSrc + '?wmode=opaque&rel=0&showinfo=0&modestbranding=1&controls=1&showinfo=0&enablejsapi=0"></iframe></div>';
        break;
    }
    var iframe = $(iframeContent).attr('src', $(iframeContent).attr('src') + '?wmode=transparent');

    ele.html(null);
    ele.append(iframe);
  }

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
          ele = this.element,
          url = ele.data('video-id'),
          dataType = ele.data('type') ? ele.data('type') : '';

      ele.on('click.' + pluginName, function(e){
        e.preventDefault();
        initTemplate(ele, url, dataType);
      }).trigger('click.' + pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
/**
 *  @name video-frame
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  var pluginName = 'video-frame';

  function initTemplate (ele, videoSrc, videoType){
    var iframeContent;

    switch(videoType) {
      case 'vimeo':
        iframeContent = '<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="//player.vimeo.com/video/' + videoSrc + '?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1&amp;api=1&amp;frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>';
        break;
      case 'dailymotion':
        iframeContent = '<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="//www.dailymotion.com/embed/video/' + videoSrc + '?api=true&autoplay=1" frameborder="0"></iframe></div>';
        break;
      case 'youku':
        iframeContent = '<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="//player.youku.com/embed/' + videoSrc + '" allowFullScreen="true"></iframe></div>';
        break;
      default:
        iframeContent = '<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" frameborder="0" allowfullscreen="1" title="YouTube video player" src="//www.youtube.com/embed/' + videoSrc + '?wmode=opaque&autoplay=1&rel=0&showinfo=0&modestbranding=1&controls=1&showinfo=0&enablejsapi=0"></iframe></div>';
        break;
    }
    var iframe = $(iframeContent).attr('src', $(iframeContent).attr('src') + '?wmode=transparent');

    ele.html(null);
    ele.append(iframe);
  }

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
          ele = this.element,
          url = ele.data('video-id'),
          dataType = ele.data('type') ? ele.data('type') : '';

      ele.on('click.' + pluginName, function(e){
        e.preventDefault();
        initTemplate(ele, url, dataType);
      }).trigger('click.' + pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
    $('[data-modal-ajax]').on('show.bs.modal', function (e) {
      setTimeout(function(){
        $('[data-' + pluginName + ']')[pluginName]();
      },400);
    });
    $('[data-modal-ajax]').on('hide.bs.modal', function() {
      $('.modal-body .play-video-block').remove();
    });
  });

}(jQuery, window));