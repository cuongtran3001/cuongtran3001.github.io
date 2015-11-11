/**
 * @name Site
 * @description Define global variables and functions
 * @version 1.0
 */
var Site = (function($, window, undefined) {
  var privateVar = 1;
  var loading = $('<div class="loading"></div>');
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
  
  if($('.change-title').length){
    var replaceWith = $('<input name="temp" type="text" />'),
        connectWith = $('input[name="hiddenField"]');
    $('.change-title').inlineEdit(replaceWith, connectWith);
  }

  var limit = $('[data-multiple-select]').data('option-check');

  $('[data-multiple-select]').change(function() {
  }).multipleSelect({
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
  $('.testselect2').SumoSelect({ okCancelInMulti: true });
  $('[data-sortable]').sortable();
  $('[data-rate]').raty({
    numberMax : 5,
    number    : 100,
    starOff : '../images/un-rate-large.png',
    starOn  : '../images/rate-large.png',
    target : '.hint'
  });
  var templateLoading= '<div class="wrapLoad"><div class="load-wrapp"><div class="load-1"><div class="line"></div><div class="line"></div><div class="line"></div></div></div></div>';
  $('#app').imagesLoaded()
  .always( function( instance ) {
    // $('.wrapLoad').remove();
    // console.log('all images loaded');
  })
  .done( function( instance ) {
    $('.wrapLoad').remove();
  })
  .fail( function() {
    $('.wrapLoad').remove();
    // console.log('all images loaded, at least one is broken');
  })
  .progress( function( instance, image ) {
    // $(image.img).before(templateLoading);
    // var result = image.isLoaded ? 'loaded' : 'broken';
    // console.log( 'image is ' + result + ' for ' + image.img.src );
  });
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
          $('.play-video-block .list-videos').jScrollPane({
            showArrows: true
          });
        }).trigger('resize.windowI');
      }

      img.src = $(this).attr('src');
    });
  }
  function scrollEffect(){
    effectSocial();
    loadingImg();
  }
  function scrollPane() {
    $('[data-loadscroll]').jscroll({
      loadingHtml: '<img src="images/ajax-loader.gif" alt="Loading" />',
      padding: 20,
      nextSelector: '.data-next',
      callback: scrollEffect
    });
  }
  function privateMethod1() {
    var showChar = $('.caption-album-short').data('text-number');
    var ellipsestext = "...";
    var moretext = $('.caption-album-short').data('text-show');
    var lesstext = $('.caption-album-short').data('text-hide');
    $('.content-check > .inner').jScrollPane({
      showArrows: true
    });
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
      var that = $(this);
      that.find('thead').off('click').on('click', function(){
        that.find('tbody').fadeToggle();
      });
    });
    $(window).on('resize.windowA', function(){
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
            });;
          }
        });
      }
    }).trigger('resize.windowA');

    $('.list-link').jScrollPane({
      showArrows: true
    });

    $('.block-img .like').each(function(e){
        $(this).on('click', function(el){
          var target = el.target;
          // if(target.closest('.block-img a')){
          //   e.preventDefault;
          $(this).toggleClass('active');
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
    $('[data-money]').number(true);
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
    $('[data-tooltip]').tooltip();
    $(window).on('resize.tabtoogle',function(){
      if($(window).width() > 768){
        $('[data-toggle-mobile]').addClass('style-mb').css({display: 'block'});
      }else{
        $('[data-toggle-mobile]').removeClass('style-mb').css({display: 'none'});
      }
    }).trigger('resize.tabtoogle');
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
        // });
      }
      else{
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
    // $(document).ajaxError(function() {
    //   console.log('error connect internet!')
    //   setTimeout(function(){
    //     $('[data-modal-ajax]').modal('hide');
    //   },1000);
    // });
    $('[data-modal-ajax]').on('hide.bs.modal', function() {
      $(this).removeData();
    });
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
    if(!$('.non-fixed #header').length && !$('.fullheight').length){
      $('#header').addClass('original').clone().insertAfter('#header').addClass('cloned').css('position','fixed').css('top','0').css('margin-top','0').css('z-index','500').removeClass('original').hide();
      setInterval(function(){stickIt();}, 100);
      function stickIt() {
        var orgElementPos = $('.original').offset();
        orgElementTop = orgElementPos.top;
        var target = $('[data-toggle-slide]').data('target'); 
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
    container.imagesLoaded( function () {
      container.masonry({
        itemSelector: '.item',
        columnWidth: '.item',
        isAnimated:true,
        animationOptions: {
          duration: 500,
          easing:'swing',
          queue :false
        }
      });
    });
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
    $('[data-check]').check();
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
              duration: 500,
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
        if($(this).parent().hasClass('noslider')){
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
    $('.slider-dashboard').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2000
    });

    $('[data-slider-small]').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      onAfterChange:function(slickSlider,i){
        $('[data-slider-small] .slick-slide').removeClass('slick-current');
        $('[data-slider-small] .slick-slide').eq(i + 3).addClass('slick-current');
      }
    });
    $('[data-slider-small]').find('.slick-slide').eq(3).addClass('slick-current');
    $('[data-modal-ajax]').on('show.bs.modal', function (e) {
      setTimeout(function(){
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
          $('[data-picker]').datepicker('hide');
            $('[data-picker]').blur();
        });
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
        var jsonAddress = function(){
          var jsAddress= $('[data-autocomplete]').data('autocomplete');
          $.ajax({
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
        $('.invitation-list').jScrollPane({
          showArrows: true
        });
        $('.slidershow-album .control-album .slick-slide').eq(0).addClass('slick-current');
      },400);
    });
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
    $('.slidershow-album .control-album').slick({
      slidesToShow: 8,
      slidesToScroll: 1,
      asNavFor: '.thumbnail-album',
      dots: false,
      arrows: true,
      vertical: true,
      focusOnSelect: true
    });
    $('.slidershow-album .control-album .slick-slide').eq(0).addClass('slick-current');
    $('[data-validate]').validate({
        errorPlacement: function errorPlacement(error, element) { element.before(error);  error.appendTo(element.parent()); },
    });
    var itemList= $('.banner .slider-nav.slick-slider .slick-slide');
    if(itemList.length < 6){
      $('.banner .slider-nav .slick-track').addClass('remove-transition');
    }else{
      $('.banner .slider-nav .slick-track').remove('remove-transition');
    }
    var form = $('[data-signup]');
    form.validate({
        errorPlacement: function errorPlacement(error, element) { element.before(error); error.appendTo(element.parent()); },
    });
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
    $('[data-step]').click(function (e) {
        var source = $(e.target);
        if(source.is("li")){
        }
    }).trigger('click.step');

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
    $(window).resize(function() {
      $('[data-picker]').datepicker('hide');
        $('[data-picker]').blur();
    });
    $('.modal-1').on('show.bs.modal', function (e) {
      setTimeout(function(){
        $('[data-validate]').validate({
          errorPlacement: function errorPlacement(error, element) { element.before(error);  error.appendTo(element.parent()); }
        });
      },300);
    });
    if($('#fileupload').length){
    var url = window.location.hostname === 'blueimp.github.io' ?'//jquery-file-upload.appspot.com/' : $('.upload-form').data('uploadlink'),
    uploadButton = $('<button type="button"/>')
        .addClass('btn-2')
        .prop('disabled', true)
        .text('Processing...')
        .on('click', function () {
            var $this = $(this),
                data = $this.data();
            $this
                .off('click')
                .text('Abort')
                .on('click', function () {
                    $this.remove();
                    data.abort();
                });
            data.submit().always(function () {
                $this.remove();
            });
        });
    $('#fileupload').fileupload({
        url: url,
        dataType: 'json',
        autoUpload: false,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
        previewMaxWidth: 100,
        previewMaxHeight: 100,
        previewCrop: true
    }).on('fileuploadadd', function (e, data) {
        data.context = $('<div class="canvas"/>').appendTo('#files');
        $.each(data.files, function (index, file) {
            var node = $('<div class="inner"/>')
                    .append($('<span/>'));
            var error = $('<span class="text-danger"/>').text(file.error);
            if (!index) {
              node.append(uploadButton.clone(true).data(data));
              setTimeout(function(){
              if($('.fileinput-button').length){
                $('.file-upload-custom.avatar .fileinput-button span').hide();
              }else{

              }
            },100);
            }
            node.appendTo(data.context);
        });
    }).on('fileuploadprocessalways', function (e, data) {
        var index = data.index,
            file = data.files[index],
            node = $(data.context.children()[index]);
        if (file.preview) {
            $('.file-upload-custom.avatar .text-danger').hide();
            node.prepend(file.preview);
        }
        if (file.error) {
            node
                .append('<br>')
                .append($('<span class="text-danger"/>').text(file.error));
            $(data.context.children()[index]).addClass('error-file');
        }
        if (index + 1 === data.files.length) {
            data.context.find('button')
                .text('Upload')
                .prop('disabled', !!data.files.error);
        }
        if(data.files.length){
          // file.error.hide();
        }
    }).on('fileuploadprogressall', function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress').show();
        $('#progress .progress-bar').css(
            'width',
            progress + '%'
        );
    }).on('fileuploaddone', function (e, data) {
        $.each(data.result.files, function (index, file) {
            if (file.url) {
                var link = $('<a>')
                    .attr('target', '_blank')
                    .prop('href', file.url);
                $(data.context.children()[index])
                    .wrap(link);
                $('.file-upload-custom.avatar .fileinput-button span').show();
            } else if (file.error) {
                var error = $('<span class="text-danger"/>').text(file.error);
                $('.file-upload-custom.avatar .fileinput-button span').show();
                $(data.context.children()[index])
                    .append(error);
                
            }
        });
    }).on('fileuploadfail', function (e, data) {
        $.each(data.files, function (index) {
            var error = $('<span class="text-danger"/>').text('File upload failed.');
            $(data.context.children()[index])
                .append(error);
        });
    }).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
    }
    if($('#fileupload1').length){
    var url = window.location.hostname === 'blueimp.github.io' ?'//jquery-file-upload.appspot.com/' : $('.upload-form').data('uploadlink'),
    uploadButton = $('<button type="button"/>')
        .addClass('btn-2')
        .prop('disabled', true)
        .text('Processing...')
        .on('click', function () {
            var $this = $(this),
                data = $this.data();
            $this
                .off('click')
                .text('Abort')
                .on('click', function () {
                    $this.remove();
                    data.abort();
                });
            data.submit().always(function () {
                $this.remove();
            });
        });
    $('#fileupload1').fileupload({
        url: url,
        dataType: 'json',
        autoUpload: false,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
        previewMaxWidth: 100,
        previewMaxHeight: 100,
        previewCrop: true
    }).on('fileuploadadd', function (e, data) {
        data.context = $('<div class="canvas"/>').appendTo('#files1');
        $.each(data.files, function (index, file) {
            var node = $('<div class="inner"/>')
                    .append($('<span/>'));
            var error = $('<span class="text-danger"/>').text(file.error);
            if (!index) {
              node.append(uploadButton.clone(true).data(data));
              setTimeout(function(){
              if($('.fileinput-button').length){
                $('.file-upload-custom.cover .fileinput-button span').hide();
              }else{

              }
            },100);
            }
            node.appendTo(data.context);
        });
    }).on('fileuploadprocessalways', function (e, data) {
        var index = data.index,
            file = data.files[index],
            node = $(data.context.children()[index]);
        if (file.preview) {
            $('.file-upload-custom.cover .text-danger').hide();
            node.prepend(file.preview);
        }
        if (file.error) {
            node
                .append('<br>')
                .append($('<span class="text-danger"/>').text(file.error));
            $(data.context.children()[index]).addClass('error-file');
        }
        if (index + 1 === data.files.length) {
            data.context.find('button')
                .text('Upload')
                .prop('disabled', !!data.files.error);
        }
        if(data.files.length){
          // file.error.hide();
        }
    }).on('fileuploadprogressall', function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress1').show();
        $('#progress1 .progress-bar').css(
            'width',
            progress + '%'
        );
    }).on('fileuploaddone', function (e, data) {
        $.each(data.result.files, function (index, file) {
            if (file.url) {
                var link = $('<a>')
                    .attr('target', '_blank')
                    .prop('href', file.url);
                $(data.context.children()[index])
                    .wrap(link);
                $('.file-upload-custom.cover .fileinput-button span').show();
            } else if (file.error) {
                var error = $('<span class="text-danger"/>').text(file.error);
                $('.file-upload-custom.cover .fileinput-button span').show();
                $(data.context.children()[index])
                    .append(error);
                
            }
        });
    }).on('fileuploadfail', function (e, data) {
        $.each(data.files, function (index) {
            var error = $('<span class="text-danger"/>').text('File upload failed.');
            $(data.context.children()[index])
                .append(error);
        });
    }).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
  }
  }
  function loadMore() {
    var flag = true;
    $('.load-more').each(function(){
      var url = $(this).data('content'),
          urlContent = $(this).attr('href');
      var page = 1;
      $(this).on('click', function(e){
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
              container.append(data);
              if (container.data('masonry')){
                container.masonry('destroy');
                container.masonry({
                  itemSelector: '.item',
                  columnWidth: '.item',
                  percentPosition: true,
                  isAnimated:true,
                  animationOptions: {
                    duration: 1000,
                    easing:'linear',
                    queue :false
                  }
                });
              }
              $(window).on('resize.a', function(){
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
                      $(this).find('.content').stop().slideDown(500);
                    },
                    function () {
                      $(this).find('.content').stop().slideDown(500);
                    });
                  }
                });
              }).trigger('resize.a');
              $(container).find('.item').on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
               function(e){
                  $(this).removeClass('animated zoomIn');
               });
              $(window).scrollTop(currTop);
              $('.album-detail').eqheight();
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
          marryBlock = $('.marry-block');
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
                marryBlock.find('.list-unstyled').html(data.content);
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
  function deleteImg() {
    $('.block-album .item').each(function(){
      var deleteBtn = $('.fancybox-close', $(this)),
          that = $(this);
      // $(deleteBtn).on('click', function(){
      //   that.remove();
      // });
      var urlContent = $(deleteBtn).data('url');
      $(deleteBtn).on('click', function(e){
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
    })
  }
  function uploadIMG(){
    if($('[data-upload-multi]').length){
    var urlUpload = window.location.hostname === $('.upload-form-1').data('uploadlink'),
        uploadButton = $('<button type="button"/>')
            .addClass('btn btn-primary')
            .prop('disabled', true)
            .text('Processing...')
            .on('click', function () {
                var $this = $(this),
                    data = $this.data();
                $this
                    .off('click')
                    .text('Abort')
                    .on('click', function () {
                        $this.remove();
                        data.abort();
                    });
                data.submit().always(function () {
                    $this.remove();
                });
            });
    $('[data-upload-multi]').fileupload({
        url: urlUpload,
        dataType: 'json',
        autoUpload: false,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        maxFileSize: 999000,
        // Enable image resizing, except for Android and Opera,
        // which actually support image resizing, but fail to
        // send Blob objects via XHR requests:
        disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
        previewMaxWidth: 100,
        previewMaxHeight: 100,
        previewCrop: true
    }).on('fileuploadadd', function (e, data) {
        data.context = $('<div/>').appendTo('.file');
        $.each(data.files, function (index, file) {
            var node = $('<p/>')
                    .append($('<span/>').text(file.name));
            if (!index) {
                node
                    .append('<br>')
                    .append(uploadButton.clone(true).data(data));
            }
            node.appendTo(data.context);
        });
    }).on('fileuploadprocessalways', function (e, data) {
        var index = data.index,
            file = data.files[index],
            node = $(data.context.children()[index]);
        if (file.preview) {
            node
                .prepend('<br>')
                .prepend(file.preview);
        }
        if (file.error) {
            node
                .append('<br>')
                .append($('<span class="text-danger"/>').text(file.error));
        }
        if (index + 1 === data.files.length) {
            data.context.find('button')
                .text('Upload')
                .prop('disabled', !!data.files.error);
        }
    }).on('fileuploadprogressall', function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('.progress .progress-bar').css(
            'width',
            progress + '%'
        );
    }).on('fileuploaddone', function (e, data) {
        $.each(data.result.files, function (index, file) {
            if (file.url) {
                var link = $('<a>')
                    .attr('target', '_blank')
                    .prop('href', file.url);
                $(data.context.children()[index])
                    .wrap(link);
            } else if (file.error) {
                var error = $('<span class="text-danger"/>').text(file.error);
                $(data.context.children()[index])
                    .append('<br>')
                    .append(error);
            }
        });
    }).on('fileuploadfail', function (e, data) {
        $.each(data.files, function (index) {
            var error = $('<span class="text-danger"/>').text('File upload failed.');
            $(data.context.children()[index])
                .append('<br>')
                .append(error);
        });
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
  }
  }
  return {
    publicVar: 1,
    publicObj: {
      var1: 1,
      var2: 2
    },
    loadMore: loadMore,
    deleteInvitation: deleteInvitation,
    deleteImg: deleteImg,
    effectSocial: effectSocial,
    loadingImg: loadingImg,
    uploadIMG: uploadIMG,
    scrollPane: scrollPane,
    publicMethod1: privateMethod1
  };

})(jQuery, window);

jQuery(function() {
  Site.publicMethod1();
  Site.loadMore();
  Site.scrollPane();
  Site.effectSocial();
  Site.uploadIMG();
  Site.loadingImg();
  Site.deleteInvitation();
  Site.deleteImg();
});
(function (window, App) {

  "use strict";

  App = {};
  App.settings = {};
  App.settings.locales = {};

  window.App = App;

}(window));


var googleDrive = new GoogleDrive();
$('#googledrive-connect').on('click', function(evt) {
  googleDrive.connect();
});

function onGooglClientApiLoadedHandler() {
  googleDrive.init();
}

function GoogleDrive() {
  this.CLIENT_ID = '691726389794-4boot0bt98elrqjr6rqos45dvs7bf0f7.apps.googleusercontent.com';
    this.API_KEY = 'AIzaSyCbJYq6i_CJzt8okRFQw4frnBtvjp4IV80';
    this.SCOPES = ['https://www.googleapis.com/auth/drive'];
}

GoogleDrive.prototype.init = function() {
  gapi.client.setApiKey(this.API_KEY);
};

GoogleDrive.prototype.connect = function() {
  var that = this;
  gapi.auth.authorize({
        'client_id': this.CLIENT_ID,
        'scope': this.SCOPES.join(' '),
        'immediate': true
    }, function(authResult) {
    if (authResult && !authResult.error) {
      that.loadDriveApi();
    }
  });
  
  //dispatch event here
  $('#googledrive-loadding').show();
  $('#googledrive-content').empty();
  $('#googledrive-breadcrumb').hide();
  $('#uploadGoogle').modal('show', function() {
    setTimeout(function() {
      var container = $('#googledrive-content');
      container.imagesLoaded( function () {
        container.masonry({
          itemSelector: '.item',
          columnWidth: '.item',
          isAnimated:true,
          animationOptions: {
            duration: 500,
            easing:'swing',
            queue :false
          }
        });
      });
    }, 2000);
  });
  
  var that = this;
  setTimeout(function() {
    $('#googledrive-loadding').hide();
    $('#googledrive-breadcrumb').show();
    that.addFile({mimeType:'application/vnd.google-apps.folder', thumbnailLink: 'images/video/folder.png'});
    that.addFile({thumbnailLink: 'images/video/Thumb1.png'});
    that.addFile({thumbnailLink: 'images/video/Thumb1.png'});
    that.addFile({thumbnailLink: 'images/video/thumb413.png'});
    that.addFile({thumbnailLink: 'images/video/Thumb3.png'});
    that.addFile({thumbnailLink: 'images/video/Thumb41.png'});
    that.addFile({thumbnailLink: 'images/video/Thumb1.png'});
    that.addFile({thumbnailLink: 'images/video/Thumb48.png'});
    that.addFile({thumbnailLink: 'images/video/Thumb3.png'});
    that.addFile({thumbnailLink: 'images/video/Thumb42.png'});
    that.addFile({thumbnailLink: 'images/video/Thumb1.png'});
    that.addFile({thumbnailLink: 'images/video/Thumb2.png'});
    that.addFile({thumbnailLink: 'images/video/Thumb3.png'});
    var container = $('#googledrive-content');
    container.imagesLoaded( function () {
      container.masonry({
        itemSelector: '.item',
        columnWidth: '.item',
        isAnimated:true,
        animationOptions: {
          duration: 500,
          easing:'swing',
          queue :false
        }
      });
    });
  }, 2000);
};

GoogleDrive.prototype.loadDriveApi = function() {
  var that = this;
  gapi.client.load('drive', 'v2', function() {
    that.onDriveLoadHandler();
  });
};

GoogleDrive.prototype.onDriveLoadHandler = function() {
  this.loadFiles('root');
};

GoogleDrive.prototype.loadFiles = function(folderId) {
  var that = this;
  var request = gapi.client.request({
    'path': 'drive/v2/files?q=trashed=false ' +
        'and ( ' +
                'mimeType contains "folder" ' +
                'or mimeType contains "jpeg") and "' + folderId + '" in parents',
    'method': 'GET',
    'params': {'maxResults': 1000}
    });

  request.execute(function(resp) {
    var files = resp.items;
    if (files && files.length > 0) {
    for (var i = 0; i < files.length; i++) {
      that.addFile(files[i]);
    }
    }
  });
};

GoogleDrive.prototype.addFile = function(file) {

  var thumbnail = file.mimeType != 'application/vnd.google-apps.folder' ? file.thumbnailLink : 'http://cuongtran3001.github.io/wedding/images/video/folder.png';

  var classfolder= file.mimeType != 'application/vnd.google-apps.folder' ? '' : ' folder-item';
  
  var div = $('<div data-item-id="item_1" data-item-url="Image1.png" class="item col-xs-3' + classfolder + '"><div class="thumb"><img src="' + thumbnail + '" alt="" class="img-responsive"/></div></div>');
  $('#googledrive-content').append(div);
};

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
      var marryBlock = $('.marry-block');
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
        if(xhr){
          xhr.abort();
        }
        xhr = $.ajax({
          url: customEl.data('url'),
          data: formEl,
          dataType: 'json',
          success: function(res){
            if(res.result == 1){
              marryBlock.find('.list-unstyled').html(res.content);
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
        that.element.on('click.' + pluginName , function(){
          that.offsetSelect();
          that.toggle(this, true);
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
    duration: 500
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({
      duration: 400
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
        this.vars.blocks.css('height', maxHeight);
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
                win.on('resize.' + pluginName, $.proxy(setHeight, that)).trigger('resize.' + pluginName);
              }
            }
            for ( i = 0; i < arrImage.length; i ++) {
              arrImage[i].onload = loadImage;
            }
            win.on('resize.' + pluginName, $.proxy(setHeight, that)).trigger('resize.' + pluginName);
        },
        destroy: function() {
            win.off('resize.' + pluginName);
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
    animateDuration: 400,
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
        navSlider = $(nav);
   slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: false,
      asNavFor: navSlider,
      autoplay: true,
      autoplaySpeed: 5000,
      onAfterChange:function(slickSlider,i){
        $('[data-slider-nav] .slick-slide').removeClass('slick-current');
        $('[data-slider-nav] .slick-slide').eq(i).addClass('slick-current');
     }
    })
    navSlider.slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      asNavFor: sliderShow,
      infinite: false,
      autoplay: true,
      autoplaySpeed: 5000,
      focusOnSelect: true
    });
    $('[data-slider-nav] .slick-slide').eq(0).addClass('slick-current');
    $(window).on('resize.homeslider', function(){
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
   - update new code for suggestion
   - save api
   - share api
   - multi email
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
      this.setDefaultSeat(60, 150);
    
      //circle
      var custom = this.getDefaultJsonTable('custom');
      custom.label = 'SÂN KHẤU';

      var table = this.createTable(custom, true);
      table.setSize(50 * 20, 60);
      table.x = 30 * 20;
      table.y = 80;

      var row = 0;
      var toX = 150;
      var toY = 200;

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
          toY += Number(table.tableHeight) + 100;
        }
      }

    }
  };

  Seat.prototype.setDefaultSeat = function(gridWidth, gridHeight) {
    $('.addsize').find('.wrap').find("input[name='Width']").val(gridWidth);
    $('.addsize').find('.wrap').find("input[name='Length']").val(gridHeight);
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

    wid = wid < 40 || isNaN(wid) ? 40 : wid;
    hei = hei < 40 || isNaN(hei) ? 40 : hei;

    $('.addsize').find('.wrap').find("input[name='Width']").val(wid);
    $('.addsize').find('.wrap').find("input[name='Length']").val(hei);

    this.changeSize(Number(wid), Number(hei));
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
/* =================
 * video-clip.js
  TO DO:
  PreviewVC: seek video clip, resize video

 * ================= */

;(function($, window, createjs, App) {

  "use strict";

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

  function AudioData() {
    this.id = null;
    this.url = null;
    this.start = 0;
    this.end = -1;
    this.audioInstance = null;
  };

  function BackgroundData() {
    this.id = null;
    this.url = null;
    this.time = 30;
    this.bitmapView = null;
    this.imageView = null;
  };

  function FrameData() {
    //text data
    this.text = new TextData();
    this.textEffect = 'TFade';
    this.textEffectClass = 'TEffect_Fade';
    this.textEffectDelay = 5;
    this.textEffectDuration = 5;

    //image data
    this.bitmapId = null;
    this.bitmapUrl =  null;
    this.bitmapEffect = 'BFade';
    this.bitmapEffectClass = 'BEffect_Fade';
    this.bitmapEffectDelay = 3;
    this.bitmapEffectDuration = 5;

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
    this.duration = 5;

    this.type = null;

    this.bitmapView = null;
    this.textView = null;
    this.imageView = null;
    this.videoView = null;
  };

  FrameData.prototype.getDuration = function() {
    return this.bitmapEffectDelay + this.bitmapEffectDuration + this.delayTime;
  }
  
  //bug: when duplicate frame, the getDuration is not cloned
  FrameData.prototype.clone = function() {
    return (JSON.parse(JSON.stringify(this)));
  }

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

      getBackgroundDataByTime: function(arrBG, time) {
        var bgData;
        var bgTime = 0;
        for (var i = 0; i < arrBG.length; i ++) {
          bgData = arrBG[i];
          if (time >= bgTime && (bgTime + bgData.time) >= time) {
            return bgData;
          }
          bgTime += bgData.time;
        }
        return null;
      }
    }
  }();
  
  //////////TEffect_Fade//////////
  function TEffect_Fade() {}
  TEffect_Fade.prototype.play = function(container, preText, text, delay, time) {

    if (preText) {
      TweenLite.to(preText, 1, {alpha: 0, onComplete: function() {
        container.removeChild(preText);
      }});
    }

    container.addChild(text);
    text.alpha = 0;
    TweenLite.to(text, time, {delay: delay, alpha: 1});
  };
  window.TEffect_Fade = TEffect_Fade;

  //////////TEffect_SlideLeft//////////
  function TEffect_SlideLeft() {}
  TEffect_SlideLeft.prototype.play = function(container, preText, text, delay, time) {
    if (preText) {
      TweenLite.to(preText, time, {delay: delay, x: -container.VC_WIDTH, onComplete: function() {
        container.removeChild(preText);
      }});
    }

    container.addChild(text);
    var orgX = text.x;

    text.x = container.VC_WIDTH;
    TweenLite.to(text, time, {delay: delay, x: orgX});
  };
  window.TEffect_SlideLeft = TEffect_SlideLeft;

  //////////BEffect_Fade//////////
  function BEffect_Fade() {}
  BEffect_Fade.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {
    container.addChild(nextBitmap);
    nextBitmap.alpha = 0;
    TweenLite.to(nextBitmap, time, {delay: delay, alpha: 1});
  };
  window.BEffect_Fade = BEffect_Fade;

  //////////BEffect_Slide//////////
  function BEffect_SlideLeft() {}
  BEffect_SlideLeft.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {

    if (prevBitmap) {
      TweenLite.to(prevBitmap, 1.5, {x: -container.VC_WIDTH});
    }

    container.addChild(nextBitmap);
    nextBitmap.x = container.VC_WIDTH;
    TweenLite.to(nextBitmap, 1.5, {x: 0});
  }
  window.BEffect_SlideLeft = BEffect_SlideLeft;

  //////////BEffect_SlideRight//////////
  function BEffect_SlideRight() {}
  BEffect_SlideRight.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {

    if (prevBitmap) {
      TweenLite.to(prevBitmap, 1.5, {x: container.VC_WIDTH});
    }

    container.addChild(nextBitmap);
    nextBitmap.x = -container.VC_WIDTH;
    TweenLite.to(nextBitmap, 1.5, {x: 0});
  }
  window.BEffect_SlideRight = BEffect_SlideRight;

  //////////BEffect_SlideUp//////////
  function BEffect_SlideUp() {}
  BEffect_SlideUp.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {

    if (prevBitmap) {
      TweenLite.to(prevBitmap, 1.5, {y: -container.VC_HEIGHT});
    }

    container.addChild(nextBitmap);
    nextBitmap.y = container.VC_HEIGHT;
    TweenLite.to(nextBitmap, 1.5, {y: 0});
  }
  window.BEffect_SlideUp = BEffect_SlideUp;

  //////////BEffect_SlideDown//////////
  function BEffect_SlideDown() {}
  BEffect_SlideDown.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {

    if (prevBitmap) {
      TweenLite.to(prevBitmap, 1.5, {y: container.VC_HEIGHT});
    }

    container.addChild(nextBitmap);
    nextBitmap.y = -container.VC_HEIGHT;
    TweenLite.to(nextBitmap, 1.5, {y: 0});
  }
  window.BEffect_SlideDown = BEffect_SlideDown;

  //////////BEffect_ZoomIn//////////
  function BEffect_ZoomIn() {}
  BEffect_ZoomIn.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {
   
    container.addChild(nextBitmap);
    
    var scale = nextBitmap.scaleX;
    nextBitmap.alpha = 0;

    nextBitmap.scaleX = nextBitmap.scaleY = 0.5;
    nextBitmap.x = 0.5 * nextBitmap.getBounds().width / 2;
    nextBitmap.y = 0.5 * nextBitmap.getBounds().height / 2;
    
    TweenLite.to(nextBitmap, time, {delay: delay, alpha: 1, x: 0, y :0, scaleX: scale, scaleY: scale});
  }
  window.BEffect_ZoomIn = BEffect_ZoomIn;
  
//////////BEffect_ZoomOut//////////
  function BEffect_ZoomOut() {}
  BEffect_ZoomOut.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {
   
    container.addChild(nextBitmap);
    
    var scale = nextBitmap.scaleX;
    nextBitmap.alpha = 0;
    nextBitmap.scaleX = nextBitmap.scaleY = 2;
    nextBitmap.x = - nextBitmap.getBounds().width / 2;
    nextBitmap.y = - nextBitmap.getBounds().height / 2;
    
    TweenLite.to(nextBitmap, 3, {alpha: 1, x: 0, y :0, scaleX: scale, scaleY: scale});
  }
  window.BEffect_ZoomOut = BEffect_ZoomOut;
  
  //////////BEffect_AlphaBars//////////
  function BEffect_AlphaBars() {}
  BEffect_AlphaBars.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {
    
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
    var delayTime = 0.03;
    
    for (var i = 0; i < numOfBar; i ++) {
      bar = new createjs.Bitmap(bitmapData.canvas);
      bar.sourceRect = new createjs.Rectangle(barWidth * i, 0, barWidth, container.VC_HEIGHT);
      bar.x = barWidth * i;
      bar.alpha = 0;
      temp.addChild(bar); 
      
      TweenLite.to(bar, showTime, {alpha: 1, delay: i < numOfBar / 2  ? delayTime * i : numOfBar * delayTime - delayTime * i, onComplete: onCompleteShowBar, onCompleteParams: [bar, i]});
    }      
    
    function onCompleteShowBar(bar, index) {
      if (index == numOfBar - 1) {
        container.addChild(new createjs.Bitmap(bitmapData.canvas));
        temp.removeAllChildren();
        container.removeChild(temp);
      }
    }      
  };
  window.BEffect_AlphaBars = BEffect_AlphaBars;
  
  //////////BEffect_SquareExplode//////////
  function BEffect_SquareExplode() {}
  BEffect_SquareExplode.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {
    
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
    TweenLite.to(imageMask, 2, {scaleX: 1, ease: Power2.easeOut });
    
    //step 2: create and show bars
    var barWidth = 40;
    var barHeight = 40;
    var col = Math.ceil(container.VC_HEIGHT / barHeight);
    var row = Math.ceil(container.VC_WIDTH / barWidth);      
    var i, j;
    var bar;      
    var showTime = 1;
    var delayTime = 0.06;
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
      
        TweenLite.to(bar, showTime, {alpha: 0, delay: delayTime * i, x: toX, y: toY, onComplete: onCompleteShowEffect, onCompleteParams: [bar]});
      }      
    }
    
    function onCompleteShowEffect(bar) {
      temp.removeChild(bar);
    }
  };
  window.BEffect_SquareExplode = BEffect_SquareExplode;

  //////////BEffect_BrightSquares//////////
  function BEffect_BrightSquares() {}
  BEffect_BrightSquares.prototype.play = function(container, prevBitmap, nextBitmap, delay, time) {
    
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
    var delayTime = 0.01;
    var delay;
    
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
        
        delay = delayTime *  i * (col - j);                    
        TweenLite.to(bright, showTime + 0.2, {alpha: 0, delay: delay + 0.2});
        
        TweenLite.to(bar, showTime, {alpha: 1, x: bar.orgX, y: bar.orgY, scaleX: 1, scaleY: 1, delay: delay, onComplete: onCompleteShowEffect, onCompleteParams: [bar]});
      }      
    }
    
    function onCompleteShowEffect(bar) {
      //temp.removeChild(bar);
    }
  };
  window.BEffect_BrightSquares = BEffect_BrightSquares;

  EffectUtils.addEffectPlugin('TFade', new window['TEffect_Fade']());
  EffectUtils.addEffectPlugin('TSlideLeft', new window['TEffect_SlideLeft']());
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

  /* =============== */
  /* MODULE DEFAULTS */
  /* =============== */

  var defaults = {};
  var pluginName = 'videoclip';

  var SERVER_URL = 'http://localhost:3001/wedding/public';

  var IMAGE = 'image';
  var AUDIO = 'audio';
  var VIDEO = 'video';

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

  var HA_LEFT = 'left';
  var HA_CENTER = 'center';
  var HA_RIGHT = 'right';

  var VA_TOP = 'top';
  var VA_MIDDLE = 'middle';
  var VA_BOTTOM = 'bottom';  

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

    this.effectSetting = null;
    this.mediaSetting = null;
    this.loading = null;

    this.audioInstance = null;
    this.videoInstance = null;

    this.curPanel = null;
    this.previewVC = new PreviewVC(); 

    this.googleDrive = null;

    return this.init();
  }

  /* ============== */
  /* MODULE METHODS */
  /* ============== */

  VideoClip.prototype.init = function() {

    var that = this;

    createjs.Sound.alternateExtensions = ["mp3", "m4a", "wav"];
    createjs.Sound.registerPlugins([createjs.WebAudioPlugin]);
    
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

    //add new
    $('.vc-backgrounds').find('.add-more').off('click').on('click', function(evt) { that. onClickAddBackgroundHandler(evt);});
    $('.vc-audios').find('.add-more').off('click').on('click', function(evt) { that. onClickAddAudioHandler(evt);});
    $('.vc-frames').find('.add-more-effect').off('click').on('click', function(evt) { that. onClickAddFrameHandler(evt);});
    $('#vc-add-intro').find('.intro-click').off('click').on('click', function(evt) { that. onClickAddFrameHandler(evt);});

    $('.vc-frames').find('.add-more-effect').off('click').on('click', function(evt) { that. onClickAddFrameHandler(evt);});
    $(window).on('resize.videoResize', function(){
      $('.wrapper-video .tfooter .add-function-block .item .content').jScrollPane('reinitialise');
    }).trigger('resize.videoResize');
    
    //menu
    var controlMenu = $('.control-menu').find('li');
    controlMenu.off('click').on('click', function(evt) {
      that.changePanel($(this).attr('id'));
    });

    //save, preview and finish
    var listControl = $('.list-control');
    listControl.find('.save-vc').off('click').on('click', function(evt) { that.save();});
    listControl.find('.preview-vc').off('click').on('click', function(evt) { that.preview();});
    listControl.find('.finish-vc').off('click').on('click', function(evt) { that.finish();});

    //select image from library
    var imageLibrary = $('#vc-image-library').find('.item');
    imageLibrary.off('click').on('click', function(evt) {
      that.selectFrameData(this, IMAGE);
    });

    //select image from local
    var imageUpload = $('#vc-image-upload').find('.vc-image-upload-local');
    imageUpload.off('click').on('click', function(evt) {
      that.browseFile(IMAGE, that.uploadFrameData);
    });

    var imageGD = $('#vc-image-upload').find('.vc-image-upload-gd');
    imageGD.off('click').on('click', function(evt) {
      if (!that.googleDrive) {
        that.googleDrive = window.googleDrive;
      }
      that.googleDrive.connect();
    });

    //select image from your album
    var imageYours = $('#vc-image-yours').find('.item');
    imageYours.off('click').on('click', function(evt) {
      that.selectFrameData(this, IMAGE);
    });

    //select video from library
    var videoLibrary = $('#vc-video-library').find('.item');
    videoLibrary.off('click').on('click', function(evt) {
      that.selectFrameData(this, VIDEO);
    });

    //select video from local
    var videoUpload = $('#vc-video-upload').find('.vc-video-upload-local');
    videoUpload.off('click').on('click', function(evt) {
      that.browseFile(VIDEO, that.uploadFrameData);
    });

    //select video from your album
    var videoYours = $('#vc-video-yours').find('.item');
    videoYours.off('click').on('click', function(evt) {
      that.selectFrameData(this, VIDEO);
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

    $('#vc-add-text').find('input[name="textcolor"]').bind('input propertychange', function(evt) {
      that.applyFrameText();
    });

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
      that.browseFile(AUDIO, that.uploadFrameData);
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

    this.displayOnlyMenu(true, PANEL_INTRO);
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

      } else {
        
        var timeStart = that.mediaSetting.find('.time-start').offset().left;

        toX = (toX < timeStart) ? timeStart : toX;
        toX = (toX > left + width - 10) ? left + width - 10 : toX;

        target.offset({left: toX});

        that.mediaSetting.find('.timeline').width(toX - timeStart);

        var te = (that.mediaSetting.find('.timeline').offset().left + that.mediaSetting.find('.timeline').width() - left) * duration / width;
        target.find('.text').html(EffectUtils.formatTime(te));
      }
    });

    $(document.body).off("mouseup").on("mouseup", function (evt) {
      
      target = null;

      $(document.body).off("mousemove");
      $(document.body).off("mouseup");

      that.seekMedia((that.mediaSetting.find('.timeline').offset().left - left) * duration / width);
    });
  };

  VideoClip.prototype.onClickDropDownMenuHandler = function(item) {
    
    var arrPanel = [PANEL_TEXT, PANEL_TEXT_EFFECT, PANEL_IMAGE, PANEL_VIDEO, PANEL_EFFECT, PANEL_AUDIO];
      
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

  VideoClip.prototype.onClickAddBackgroundHandler = function(evt) {
    var that = this;

    var box =  $('<div class="box">' +
                 '  <div class="img-add">' +
                 '    <img src="" alt="">' +
                 '  </div>' +
                 '  <span class="time">00:30</span>' +
                 '  <a href="javascript:void(0);" title="Delete" class="delete">' +
                 '    <span class="fa fa-minus"></span>' +
                 '  </a>' +
                 '</div>');

    $('.vc-backgrounds').find('.list-box').append(box);

    var bgData = new BackgroundData();
    this.arrBG.push(bgData);

    box.on('click', function(evt) {
      var target = $(evt.target);

      if (target.hasClass('fa-minus')) {
        that.deactiveBackground(box, IMAGE);
      } else {
        that.activeBackground(box, IMAGE);
      }
    });

    box.click();
  };

  VideoClip.prototype.onClickAddAudioHandler = function(evt) {
    var that = this;

    var box = $('' +
        '<div class="box">' +
          '<div class="control-media"><a href="javascript:void(0);" title="Play"><span class="fa fa-play"></span></a></div>' +
          '<div class="title"><strong>No selected audio, please choose audio</strong></div><span class="time">00:00</span><a href="javascript:void(0);" title="Delete" class="delete"><span class="fa fa-minus"></span></a>' +
        '</div>');

    $('.vc-audios').find('.list-box').append(box);

    var audioData = new AudioData();
    this.arrBGAudio.push(audioData);

    box.on('click', function(evt) {
      var target = $(evt.target);

      if (target.hasClass('fa-minus')) {
        that.deactiveBackground(box, AUDIO);
      } else {
        that.activeBackground(box, AUDIO);
      }
    });
    box.click();
  };

  VideoClip.prototype.onClickAddFrameHandler = function(evt) {
    //just hide the intro and show the panel text in the first time click on add frame
    if (this.arrFrame.length == 0 || this.isAudio || this.isBackground)  {
      this.isAudio = false;
      this.isBackground = false;
      this.showPanel(PANEL_TEXT);
    }
    
    var frame = this.addEmptyFrame();
    frame.click();
    // setTimeout(function(){
    //   $('.wrapper-video .tfooter .add-function-block .item .content').jScrollPane('reinitialise');
    // }, 1000);
    // $('.wrapper-video .tfooter .add-function-block .item .content').jScrollPane({
    //   autoReinitialise: true
    // });
    // $('.wrapper-video .tfooter .add-function-block .item .content').jScrollPaneRemove();
    // $('.wrapper-video .tfooter .add-function-block .item .content').jScrollPane('reinitialise');
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
      ajax.open("POST", SERVER_URL + "/server/videoclip/uploadData.php");
      ajax.send(formData);
    }
  };

  VideoClip.prototype.deactiveBackground = function(item, type) {
    item = $(item);

    if (this.isAudio) {
      if (item.is(this.curBGAudio)) {
        this.loading.hide();
        this.mediaSetting.hide();
        this.clearAudio();

        if (this.curFrameAudio) {
          this.curFrameAudio.removeClass('active');
          this.curFrameAudio = null;
        }
      }

      this.arrBGAudio.splice(item.index(), 1);
    }

    item.off();
    item.remove();
  };

  VideoClip.prototype.activeBackground = function(item, type) {
    
    item = $(item);

    if (type == AUDIO) {
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

        this.loadFrameAudio(audioData.id, audioData.url);
      }
    }

    else if (type == IMAGE) {
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
  };

  VideoClip.prototype.uploadFrameData = function(type, name, url, actived) {
    var that = this;
    var item, list;
    
    //add to your album
    if (type == AUDIO) {
      list = $('#vc-' + type + '-yours').find('.audio-control');
      item = $('<div data-item-id="item-' + type +'-yours_'  + (list.children().length + 1)  + '" data-item-url="' + url + '" data-item-time="300" class="item"><div class="control-media"><a href="javascript:void(0);" title="Play" class="play-pause"><span class="fa fa-play"></span></a></div><div class="title"><strong>Audio song name - upload </strong></div><a href="javascript:void(0)" title="Select" class="add-more"><span class="fa fa-plus"></span></a><span class="time">05:00</span></div>');
      
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
    }
    list.append(item);
      
    //apply to current frame
    if (actived) {
      //show album tab
      var tab = $('#vc-add-' + type).find('a[href="#vc-' + type + '-yours"]');
      tab.click();

      item.click();
    }
  };

  VideoClip.prototype.addEmptyFrame = function() {
    var that = this;

    var listframe =  $('.vc-frames').find('.list-frame');

    var frame =  $('<div class="frame">' +
                   '  <div class="icon-effect" title="Effect"><span class="fa fa-exchange"></span></div>' +
                   '  <div class="icon-show" title="Click to show menu"><span class="fa fa-sort-desc"></span></div>' +
                   ' <div class="thumb" title="Click to change image or video"><img class="frame-image" src="images/videoclip/default.jpg" alt=""></div>' +
                   '  <div class="desc"><span class="icon-edit-text" title="Click to change text effect"></span><p class="frame-text" title="Click to change frame text">text here</p></div>' +
                   '</div>');

    listframe.append(frame);
    
    listframe.closest('.wrap-list').css({
      width: listframe.find('.frame').length * 130 + 'px'
    });

    frame.on('click', function(evt) {
      var target = $(evt.target);

      //console.log(target);

      if(target.hasClass('fa-exchange') || target.hasClass('icon-effect')) {
        that.showPanel(PANEL_EFFECT);
        that.activeFrame(frame);
      }

      else if(target.hasClass('fa-sort-desc') || target.hasClass('icon-show')) {
        $('.dropdown-menu').show(); 

        var wh = $(window).height();
        var top = evt.pageY;

        //if (top + $('.dropdown-menu').height() > wh) {
        //  top = wh - $('.dropdown-menu').height();
        //}
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
        that.activeFrame(frame);
      }
    });

    var frameData = new FrameData();
    this.arrFrame.push(frameData);

    var totalTime = EffectUtils.getTimeByFrame(this.arrFrame, this.arrFrame.length - 1);
    $('.video-clip-time').html('Thời gian: ' + EffectUtils.formatTime(totalTime) + ' giây');

    return frame;
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
    var frameData = (JSON.parse(JSON.stringify(this.arrFrame[this.curFrameIndex])));
    
    var frame = this.addEmptyFrame();
    frame.find('.thumb img').attr('src', this.curFrame.find('.thumb img').attr('src'));
    
    if (frame.type == VIDEO) {
      frame.find('.thumb').addClass('video');
    }

    this.arrFrame[this.arrFrame.length - 1] = frameData;

    this.activeFrame(frame);
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
    this.arrFrame.splice(this.curFrameIndex, 1)

    //active next or prev frame 
    if (frame) {
      this.activeFrame(frame);
    } else {
      this.curFrame = null;
      this.curFrameIndex = -1;
      this.displayOnlyMenu(true, PANEL_INTRO);
    }
  };

  VideoClip.prototype.selectFrameData = function(item, type) {
    

    var itemId = $(item).data('item-id');
    var itemSrc = $(item).find('.thumb img').attr('src');
    var itemUrl = $(item).data('item-url');

    //if choosing image for background then
    if (this.isBackground && type == IMAGE) {

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
      frameData.bitmapId = null;
      frameData.bitmapUrl = null;
      frameData.type = null;
      this.curFrameImage = null;
      this.bitmapContainer.removeAllChildren();
      this.bgContainer.visible = frameData.type != VIDEO ? true : false;
      return;
    }

    if (frameData.videoId == itemId) {
      this.curFrame.find('.thumb img').attr('src', 'images/videoclip/default.jpg');
      this.curFrame.find('.thumb').removeClass('video');
      frameData.videoId = null;
      frameData.videoUrl = null;
      frameData.type = null;
      this.curFrameVideo = null;
      $('#video').attr('src', '');
      this.videoInstance.pause();
      this.mediaSetting.hide();
      this.bgContainer.visible = frameData.type != VIDEO ? true : false;
      return;
    }

    //set new image or video
    if (type == IMAGE) {
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
      
      if (type == IMAGE) {
        this.curFrame.find('.thumb').removeClass('video');
      } else {
        this.curFrame.find('.thumb').addClass('video');
      }

      this.bitmapContainer.removeAllChildren();
      this.videoInstance.pause();
      $('#video').attr('src', '');
      this.bgContainer.visible = frameData.type != VIDEO ? true : false;

      //update image
      if (type == IMAGE) {
        frameData.bitmapId = itemId;
        frameData.bitmapUrl = itemUrl;
        frameData.videoId = null;
        frameData.videoUrl = null;
        this.mediaSetting.hide();
        this.loadFrameImage(frameData.bitmapUrl);
      } 

      else {
        //update video
        frameData.videoId = itemId;
        frameData.videoUrl = itemUrl;
        frameData.bitmapId = null;
        frameData.bitmapUrl = null;
        this.loadFrameVideo(frameData.videoUrl);
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
      this.textContainer.addChild(this.frameText);
    }

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

      if (halign == HA_LEFT) {
        this.frameText.x = padding;
      }
      else if (halign == HA_CENTER) {
        this.frameText.x = this.textContainer.VC_WIDTH/2;
      }
      else if (halign == HA_RIGHT) {
        this.frameText.x = this.textContainer.VC_WIDTH - padding;
      }
    }

    if (this.curFrameVAlign) {
      var valign = this.curFrameVAlign.data('align');
      frameData.text.valign = valign;

      var textHeight = this.frameText.getBounds() ? this.frameText.getBounds().height : 0;
      if (valign == VA_TOP) {
        this.frameText.y = padding;
      }
      else if (valign == VA_MIDDLE) {
        this.frameText.y = this.textContainer.VC_HEIGHT/2 - textHeight/2;
      }
      else if (valign == VA_BOTTOM) {
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
      this.effectSetting.show();
    }
  }; 

  VideoClip.prototype.selectFrameImageEffect = function(item) {

    if (this.curFrameIndex < 0 || this.curFrameIndex >= this.arrFrame.length) {
      return;
    }

    var frameData = this.arrFrame[this.curFrameIndex]; 
    if (frameData.type == IMAGE) {

      if (this.curFrameEffect) {
        this.curFrameEffect.removeClass('active');
      }
      this.curFrameEffect = $(item);
      this.curFrameEffect.addClass('active');

      //apply data here
      frameData.bitmapEffect = this.curFrameEffect.data('item-id');
      frameData.bitmapEffectClass = this.curFrameEffect.data('item-url');
            
      this.effectSetting.show();
    }
  };

  VideoClip.prototype.applyEffect = function() {
    if (this.curFrameIndex < 0 || this.curFrameIndex >= this.arrFrame.length) {
      return;
    }

    var delayTime = this.effectSetting.find('input[name="delay"]').val();
    var effectTime = this.effectSetting.find('input[name="time"]').val();

    delayTime = Number(delayTime);
    delayTime = delayTime < 0 ? 0 : delayTime;

    effectTime = Number(effectTime);
    effectTime = effectTime < 1 ? 1 : effectTime;
    
    var frameData = this.arrFrame[this.curFrameIndex];

    //bitmap effect
    if ($('#vc-add-effect').hasClass('active')) {
      frameData.bitmapEffectDelay = delayTime;
      frameData.bitmapEffectDuration = effectTime;

      //preview bitmap effect
      var bitmapEffectPlugin = EffectUtils.getEffectPlugin(frameData.bitmapEffect);
      if (bitmapEffectPlugin) {
        this.bitmapContainer.removeAllChildren();
        bitmapEffectPlugin.play(this.bitmapContainer, null, this.frameBitmap, delayTime, effectTime);
      }
    } 

    else {
      //text effect
      frameData.textEffectDelay = delayTime;
      frameData.textEffectDuration = effectTime;

      $('#vc-add-text').find('.effect-detail').html(frameData.textEffect + "(delay: " + frameData.textEffectDelay + ", time: " + frameData.textEffectDuration + ")");
      
      //preview text effect
      var textEffectPlugin = EffectUtils.getEffectPlugin(frameData.textEffect);
      if (textEffectPlugin) {
        this.textContainer.removeAllChildren();
        textEffectPlugin.play(this.textContainer, null, this.frameText, delayTime, effectTime);
      }
    }

    this.effectSetting.hide();
    var that = this;
    var time = delayTime + effectTime;
    var ti = setTimeout(function() {
      clearTimeout(ti);
      that.effectSetting.show();
    }, time * 1000);
  };

  VideoClip.prototype.selectAudio = function(item) {
    var that = this;
    var itemId = $(item).data('item-id');
    var itemUrl = $(item).data('item-url');

    //select audio for video clip
    if (this.isAudio) {
      
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

        that.loading.hide();
        this.mediaSetting.hide();
        this.clearAudio();
      }

      else {
        audioData.id = itemId;
        audioData.url = itemUrl;
        audioData.start = 0;
        audioData.end = $(item).data('item-time');

        this.curFrameAudio =  $(item);
        this.curFrameAudio.addClass('active');
        this.curFrameAudio.find('.add-more span').removeClass('fa fa-plus').addClass('fa fa-minus');

        this.mediaSetting.hide();
        this.loadFrameAudio(itemId, itemUrl);
      }

      //update box here
      this.curBGAudio.find('.title strong').html(audioData.id == null ? 'No selected audio, please choose audio' : this.curFrameAudio.find('.title strong').html());
      this.curBGAudio.find('.time').html(audioData.end == -1 ? '00:00' : EffectUtils.formatTime(audioData.end - audioData.start));

      return;
    } 

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
      this.clearAudio();
      this.mediaSetting.hide();
      return;
    }
    
    this.curFrameAudio =  $(item);
    this.curFrameAudio.addClass('active');
    this.curFrameAudio.find('.add-more span').removeClass('fa fa-plus').addClass('fa fa-minus');

    frameData.audioId = itemId;
    frameData.audioUrl = itemUrl;

    this.loadFrameAudio(itemId, itemUrl);
  };

  VideoClip.prototype.onClickPlayPauseHandler = function(item) {
    item = $(item);
    var icon = item.find('span');
    if (icon.hasClass('fa-pause')) {
      icon.removeClass('fa-pause').addClass('fa-play');

      if (this.audioInstance) {
        this.audioInstance.stop();
      } else {
        this.videoInstance.pause();
      }
    }
    else if (icon.hasClass('fa-play')) {
      icon.removeClass('fa-play').addClass('fa-pause');
      if (this.audioInstance) {
        this.audioInstance.play();
      } else {
        this.videoInstance.play();
      }
    }
  };

  VideoClip.prototype.updateMedia = function(position) {
    this.mediaSetting.find('.position').html(EffectUtils.formatTime(position));
  };

  VideoClip.prototype.seekMedia = function(startTime) {
    if (this.curFrameIndex < 0 || this.curFrameIndex >= this.arrFrame.length) {
      return;
    }
    var frameData = this.arrFrame[this.curFrameIndex];

    if (this.audioInstance) {
      this.audioInstance.stop();
      this.audioInstance.startTime = startTime;
      this.audioInstance.play();
    }

    else {
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
    $('#vc-add-' + name).addClass('active').show().children('[data-scroll-video]').jScrollPane();
    $(window).on('resize', function(){
      $('#vc-add-' + name + '.active').show().children('[data-scroll-video]').jScrollPane();
    });
    
    //hide or show effect setting
    if ((name == PANEL_EFFECT && this.arrFrame[this.curFrameIndex].type == IMAGE) ||
       (name == PANEL_TEXT_EFFECT)) {
      this.effectSetting.show();
    } else {
      this.effectSetting.hide();
    }

    //hide media setting
    if (name == PANEL_VIDEO) {
      this.mediaSetting.show();
    } else {
      this.mediaSetting.hide();
    }

    //stop all sounds
    //this.clearAudio();

    //stop all videos
    //this.videoInstance.pause();
    //$('#video').attr('src', '');

   //this.loading.hide();
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
    this.videoInstance.pause();
    $('#video').attr('src', '');

    this.loading.hide();

      //active menu
    if ($('#vc-menu-' + name).length) {
      $('#vc-menu-' + name).addClass('active');
    }

    //hide all content
    $('.block-tab-video').removeClass('active').hide();

    //show corresponding content
    if ($('#vc-add-' + name).length) {
      $('#vc-add-' + name).addClass('active').show().children('[data-scroll-video]').jScrollPane();
    }
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

    this.isBackground = false;
    if (this.curBG) {
      this.curBG.removeClass('active');
      this.curBG = null;
    }

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

    this.curFrameAudio = null;
    $('#vc-audio-library').find('div[data-item-id]').removeClass('active');
    $('#vc-audio-yours').find('div[data-item-id]').removeClass('active');

    //stop all sounds
    this.clearAudio();

    this.mediaSetting.hide();

    //remove image
    this.bitmapContainer.visible = true;
    this.bitmapContainer.removeAllChildren();
    
    this.textContainer.visible = true;
    
    //stop all videos
    this.videoInstance.pause();
    $('#video').attr('src', '');

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

    this.applyFrameText();

    //show current background
    this.bgContainer.visible = frameData.type != VIDEO ? true : false;
    this.bgContainer.removeAllChildren();
    if (this.bgContainer.visible) {
      var frameTime = EffectUtils.getTimeByFrame(this.arrFrame, this.curFrame.index());
      var bgData = EffectUtils.getBackgroundDataByTime(this.arrBG, frameTime);
      if (bgData && bgData.url) {
        this.loadBackgroundImage(bgData.url);
      }
    }

    //show current image edit
    if (frameData.type == IMAGE) {
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
    if (frameData.type == VIDEO) {
      
      var itemVideo = $('#vc-video-library').find('div[data-item-id="'+ frameData.videoId + '"]');
      if (!itemVideo.length) {
        itemVideo = $('#vc-video-yours').find('div[data-item-id="'+ frameData.videoId + '"]');
      }
      if (itemVideo.length) {
        this.curFrameVideo = $(itemVideo[0]);
        this.curFrameVideo.addClass('active');

        //load frame image
        if (frameData.videoUrl) {
          this.loadFrameVideo(frameData.videoUrl);
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
    var itemAudio = $('#vc-audio-library').find('div[data-item-id="'+ frameData.audioId + '"]');
      if (!itemAudio.length) {
        itemAudio = $('#vc-audio-yours').find('div[data-item-id="'+ frameData.audioId + '"]');
      }
      if (itemAudio.length) {
        this.curFrameAudio = $(itemAudio[0]);
        this.curFrameAudio.addClass('active');

        //load frame audio
        if (frameData.audioUrl && this.curPanel == PANEL_AUDIO) {
          this.loadFrameAudio(frameData.audioId, frameData.audioUrl);
        }
      }
  };

  VideoClip.prototype.loadFrameImage = function(url) {
    var that = this;

    this.loading.show();

    var image = new Image();
    image.onload = function(evt) {
      that.loading.hide();

      var w = image.width;
      var h = image.height;
      
      //find corrected scale
      var scale = that.bitmapContainer.VC_WIDTH / w;
      if(h * scale > that.bitmapContainer.VC_HEIGHT) {
        scale = that.bitmapContainer.VC_HEIGHT / h;
      }

      var translateX = (that.bitmapContainer.VC_WIDTH - scale * w)/2;
      var translateY = (that.bitmapContainer.VC_HEIGHT - scale * h)/2;
    
      var matrix = new createjs.Matrix2D(scale, 0, 0, scale, translateX, translateY);
      var bitmapData = new createjs.BitmapData(image, that.bitmapContainer.VC_WIDTH, that.bitmapContainer.VC_HEIGHT, 0x000000);
      bitmapData.draw(image, matrix, null, null, null, true);
    
      that.frameBitmap = that.bitmapContainer.addChild(new createjs.Bitmap(bitmapData.canvas));
    };
    image.src = url;
  };

  VideoClip.prototype.loadBackgroundImage = function(url) {
    var that = this;

    this.loading.show();

    var image = new Image();
    image.onload = function(evt) {
      that.loading.hide();

      var w = image.width;
      var h = image.height;
      
      //find corrected scale
      var scale = that.bitmapContainer.VC_WIDTH / w;
      if(h * scale > that.bitmapContainer.VC_HEIGHT) {
        scale = that.bitmapContainer.VC_HEIGHT / h;
      }

      var translateX = (that.bitmapContainer.VC_WIDTH - scale * w)/2;
      var translateY = (that.bitmapContainer.VC_HEIGHT - scale * h)/2;
    
      var matrix = new createjs.Matrix2D(scale, 0, 0, scale, translateX, translateY);
      var bitmapData = new createjs.BitmapData(image, that.bitmapContainer.VC_WIDTH, that.bitmapContainer.VC_HEIGHT, 0x000000);
      bitmapData.draw(image, matrix, null, null, null, true);
    
      that.bgContainer.removeAllChildren();
      that.bgBitmap = that.bgContainer.addChild(new createjs.Bitmap(bitmapData.canvas));
    };
    image.src = url;
  };

  VideoClip.prototype.clearAudio = function() {
    createjs.Sound.stop();
    createjs.Sound.removeAllSounds();
    createjs.Sound.removeAllEventListeners();

    if (this.audioInstance && this.audioInstance.playProgressTimeout) {
      clearInterval(this.audioInstance.playProgressTimeout);
    };
    this.audioInstance = null;
  };

  VideoClip.prototype.loadFrameAudio = function(id, url) {
    var that = this;

    $('.preview-setting').hide()
    this.clearAudio();

    //load audio if not exist
    createjs.Sound.addEventListener("fileload", onAudioLoadHandler);
    createjs.Sound.registerSound({id: id, src: url});

    this.loading.show();

    function onAudioLoadHandler(evt) {
      that.loading.hide();

      // Play the loaded sound
      that.mediaSetting.show();
      
      that.audioInstance = createjs.Sound.play(evt.src);
      that.saveMediaMetaData(0, that.audioInstance.duration / 1000);
      
      that.mediaSetting.find('.play-pause').find('span').removeClass('fa-pause').addClass('fa-pause');
      that.mediaSetting.find('.time').data('duration', that.audioInstance.duration / 1000);
      that.mediaSetting.find('.time-start .text').html(EffectUtils.formatTime(0));
      that.mediaSetting.find('.time-end .text').html(EffectUtils.formatTime(that.audioInstance.duration / 1000));
      
      that.audioInstance.on("complete", onAudioPlayCompleteHandler);
      that.audioInstance.playProgressTimeout = setInterval(onAudioPlayProgressHandler, 100);
    }

    function onAudioPlayProgressHandler(evt) {
      if (that.audioInstance) {
        that.updateMedia(that.audioInstance.position/1000);
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
    that.mediaSetting.find('.play-pause').find('span').removeClass('fa-pause').addClass('fa-pause');

    $('#video').off('loadedmetadata').on('loadedmetadata', function(evt) {
      that.loading.hide();
      that.saveMediaMetaData(0, that.videoInstance.duration);
    });

    $('#video').off('canplay').on('canplay', function(evt) {
      //enable start and end dragging here
    });

    $('#video').off('timeupdate').on('timeupdate', function(evt) {
      that.updateMedia(that.videoInstance.currentTime);
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

  VideoClip.prototype.save = function() {
  };

  VideoClip.prototype.preview = function() {
    this.textContainer.visible = false;
    this.bitmapContainer.visible = false;
    this.bgContainer.visible = false;
    
    this.effectSetting.hide();
    this.mediaSetting.hide();

    this.clearAudio();

    $('#video').attr('src', '');
    
    this.previewVC.setData(this.arrBG, this.arrBGAudio, this.arrFrame, this.stage, this.bitmapContainer.VC_WIDTH, this.bitmapContainer.VC_HEIGHT, this.loading, this.videoInstance, $('.preview-setting'));
  };

  VideoClip.prototype.finish = function() {
    var videoComplete = $('#videoComplete');
    videoComplete.modal('show');
  };

  //////////PreviewVC/////////////
  function PreviewVC() {
    this.curFrame = -1;
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

    this.duration = 0;
    this.timeoutId = null;
    this.psTimeout = null;

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

    this.resize(width, height);
    
    //duration
    var frameData;
    for (var i = 0; i < this.arrFrame.length; i ++) {
      frameData = this.arrFrame[i];
      this.duration += frameData.getDuration();
    }

    this.loadNextBackgroundImage(0);
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

    createjs.Sound.addEventListener("fileload", onAudioLoadHandler);
    createjs.Sound.registerSound({id: audioData.id, src: audioData.url});

    function onAudioLoadHandler(evt) {
      createjs.Sound.removeEventListener("fileload", onAudioLoadHandler);

      audioData.audioInstance = createjs.Sound.createInstance(audioData.id);
      
      index ++;
      that.loadNextAudio(index);
    };
  };

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

    if (textData.halign == HA_LEFT) {
      frameText.x = textData.padding;
    }
    else if (textData.halign == HA_CENTER) {
      frameText.x = this.VC_WIDTH/2;
    }
    else if (textData.halign == HA_RIGHT) {
      frameText.x = this.VC_WIDTH - textData.padding;
    }
    
    var textHeight = frameText.getBounds() ? frameText.getBounds().height : 0;
    if (textData.valign == VA_TOP) {
      frameText.y = textData.padding;
    }
    else if (textData.valign == VA_MIDDLE) {
      frameText.y = this.VC_HEIGHT/2 - textHeight/2;
    }
    else if (textData.valign == VA_BOTTOM) {
      frameText.y = this.VC_HEIGHT - textHeight - textData.padding;
    }

    return frameText;
  };

  PreviewVC.prototype.playAudio = function() {
      this.nextAudio(0);
  }
  
  PreviewVC.prototype.nextAudio = function(index) {
    if (this.isPlaying == false) {
      return;
    }

    var that = this;
    if (index >= 0 && index < this.arrAudio.length) {
      var audioData = this.arrAudio[index];

      audioData.audioInstance.volume = 0;
      audioData.audioInstance.play();
      audioData.audioInstance.on("complete", onAudioPlayCompleteHandler);
      audioData.audioInstance.playProgressTimeout = setInterval(onAudioPlayProgressHandler, 100);
    }

    function onAudioPlayProgressHandler(evt) {
      if (audioData.audioInstance) {

        if (audioData.audioInstance.volume < 1) {
          audioData.audioInstance.volume = audioData.audioInstance.volume += 0.03;
        }

        //start
        //end
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
  };

  PreviewVC.prototype.nextFrame = function() {
    if (this.isPlaying == false) {
      return;
    }

    this.curFrame ++;
    if (this.curFrame < this.arrFrame.length) {
      
      var preFrameData;
      if (this.curFrame > 0) {
        preFrameData = this.arrFrame[this.curFrame - 1];
      }
      
      var that = this;
      var nexFrameData = this.arrFrame[this.curFrame];
      
      this.playFrame(preFrameData, nexFrameData, function() { 
        that.nextFrame(); 
      });
    }
  };

  PreviewVC.prototype.playFrame = function(prev, next, callback) {
    if (this.isPlaying == false) {
      return;
    }

    //play video or play sound
    this.container.visible = true;
    this.bgContainer.visible = (next.type == VIDEO) ? false : true;

    $(this.videoInstance).attr('src', '');
    
    //text effect
    if (next.text.text != '') {
      next.textView = this.createText(next.text, next.textView);

      var textEffectPlugin = EffectUtils.getEffectPlugin(next.textEffect);
      if (textEffectPlugin) {
        textEffectPlugin.play(this.textContainer, prev ? prev.textView : null, next.textView, next.textEffectDelay, next.textEffectDuration);
      }
    } else {
      this.textContainer.removeAllChildren();
    }

    //bitmap effect
    if (next.bitmapUrl != null) {
      next.bitmapView = this.createBitmap(next.imageView);

      var bitmapEffectPlugin = EffectUtils.getEffectPlugin(next.bitmapEffect);
      if (bitmapEffectPlugin) {
        bitmapEffectPlugin.play(this.bitmapContainer, prev ? prev.bitmapView : null, next.bitmapView, next.bitmapEffectDelay, next.bitmapEffectDuration); 
      }
    } else {
      this.bitmapContainer.removeAllChildren();
    }

    if (next.type == VIDEO && next.videoView != null) {
      $(this.videoInstance).attr('src', next.videoView);
      this.videoInstance.play();
    }

    //frame duration timeout
    var timeoutId = setTimeout(function() {
      clearTimeout(timeoutId);
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
    var count = 0;

    //background image
    //next.bitmapView = this.createBitmap(next.imageView);
    
    this.previewSetting.find('.duration').html(EffectUtils.formatTime(this.duration));

    this.timeoutId = setInterval(function() {
      count += 100;
      that.previewSetting.find('.position').html(EffectUtils.formatTime(count/1000));
      that.previewSetting.find('.timeline').css('width', Math.floor(100 * count / (that.duration * 1000)) + '%');

      //show background image here
      that.playBackground(count / 1000);

      //play background audio here

      if (count >= that.duration * 1000) {
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

    //TweenLite

  };

  PreviewVC.prototype.play = function() {
    var that = this;

    this.loading.hide();
    this.previewSetting.show();
    this.previewSetting.find('.play-pause span').removeClass('fa fa-play').addClass('fa fa-stop');

    this.isPlaying = true;
    this.curFrame = -1;
    this.nextFrame();
    this.playAudio();
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

    createjs.Sound.stop();
    createjs.Sound.removeAllEventListeners();
    this.exitFullscreen();
  };

  PreviewVC.prototype.seek = function(position) {

    //stop current frame
    this.isPlaying = false;
    

    //find the frame by time

    //play the new frame
    

  };

  PreviewVC.prototype.clear = function(clearSound) {
    clearInterval(this.timeoutId);
    clearTimeout(this.psTimeout);
    $('.video-clip').off('mousemove')

    this.isPlaying = false;
    this.container.visible = false;
    
    this.textContainer.removeAllChildren();
    this.bitmapContainer.removeAllChildren();
    this.bgContainer.removeAllChildren();

    if (this.previewSetting) {
      this.previewSetting.find('.play-pause span').removeClass('fa fa-stop').addClass('fa fa-play');
      this.previewSetting.hide();
    }

    createjs.Sound.stop();
    createjs.Sound.removeAllSounds();
    createjs.Sound.removeAllEventListeners();
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
  var pluginName = 'color';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
          ele = that.element;

      // ele.colorpicker({
      //   displayIndicator: false
      // });
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