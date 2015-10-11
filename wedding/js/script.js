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
    $(image.img).before(templateLoading);
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
    $('.replay-comment').each(function(){
      var that = $(this);
      that.off('click').on('click', function(e){
        e.preventDefault;
        $(this).parent().addClass('active');
        $(this).closest('.btn-group').next().removeClass('hidden');
        $(this).closest('.btn-group').next().slideToggle();
      });
    });
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
    if(!$('.non-fixed #header').length){
      $('#header').addClass('original').clone().insertAfter('#header').addClass('cloned').css('position','fixed').css('top','0').css('margin-top','0').css('z-index','500').removeClass('original').hide();
      setInterval(function(){stickIt();}, 100);
      function stickIt() {
        var orgElementPos = $('.original').offset();
        orgElementTop = orgElementPos.top;
        var target = $('[data-toggle-slide]').data('target'); 
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
        $('[data-check]').check();
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
    var url = window.location.hostname === 'blueimp.github.io' ?'//jquery-file-upload.appspot.com/' : $('.upload-form').data('uploadlink'),
    uploadButton = $('<button/>')
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
                $('.file-upload-custom .fileinput-button span').hide();
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
            $('.file-upload-custom .text-danger').hide();
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
                $('.file-upload-custom .fileinput-button span').show();
            } else if (file.error) {
                var error = $('<span class="text-danger"/>').text(file.error);
                $('.file-upload-custom .fileinput-button span').show();
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
    var url = window.location.hostname === 'blueimp.github.io' ?'//jquery-file-upload.appspot.com/' : $('.upload-form').data('uploadlink'),
    uploadButton = $('<button/>')
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
                $('.file-upload-custom .fileinput-button span').show();
            } else if (file.error) {
                var error = $('<span class="text-danger"/>').text(file.error);
                $('.file-upload-custom .fileinput-button span').show();
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
        e.preventDefault();
      });
    })
  }
  function deleteInvitation() {
    var flag = true;
    $('.accordion .item').each(function(){
      var deleteBtn = $('.icon-delete', $(this)),
          that = $(this);
      // $(deleteBtn).on('click', function(){
      //   that.remove();
      // });
      var urlContent = 'data/data-8.json';
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
        }
        e.preventDefault();
      });
    })
  }
  function uploadIMG(){
    var urlUpload = window.location.hostname === $('.upload-form-1').data('uploadlink'),
        uploadButton = $('<button/>')
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
  return {
    publicVar: 1,
    publicObj: {
      var1: 1,
      var2: 2
    },
    loadMore: loadMore,
    deleteInvitation: deleteInvitation,
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
});
(function (window, App) {

  "use strict";

  App = {};
  App.settings = {};
  App.settings.locales = {};

  window.App = App;

}(window));


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
          formEl = this.element.find('input');
      customEl.tooltip();
      $('[data-validate]').validate();
      formEl.on('click.'+ pluginName, function(){
        var formElment = this;
        that.check(this, customEl);
        var el = $(formElment).closest('.accordion .item');
        var checkedBtn = $(formElment, el);
        if(!el.hasClass('active')){
          el.addClass('active').fadeOut();
        }else{
          el.removeClass('active');
        }
      });
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
          select.val(el.data('val'));
          that.toggle(this, false);
        });
        that.vars.template2.find('li>span').on('click', function(){
          var el = $(this),
              textShow = that.element.find('.text-val');
          textShow.text(el.text());
          select.val(el.data('val'));
          that.toggle(this, false);
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
        });
        $('.custom-select select', that.element).each(function() {
          var el = $(this);
          var titleSpan = el.siblings('.text-val');
          titleSpan.text(el.find('option:selected').text());
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
            function loadImage(evt)   {
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
/* =================
 * seat.js
 * ================= */

(function($, createjs, App) {

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

      this.groupText = null;
      this.editText = null;
      this.deleteText = null;

      this.label = label;

      this.numOfPerson = numOfPerson;
      this.container = null;
      this.arrPerson = [];

      this.SIZE = 20;

      this.tableWidth = width;
      this.tableHeight = height;
  
      this.createElement();

      this.setSize(width, height);
    }
  
    var p = createjs.extend(Table, createjs.Container);

    p.createElement = function() {
      this.cursor = "pointer";

      //create background
      this.background = new createjs.Shape();
      this.addChild(this.background); 
      
      //create table name
      this.text = new createjs.Text(this.label, "13px myriadPro-regular", "black");
      this.text.textBaseline = "top";
      this.text.textAlign = "left";
      this.text.mouseEnabled = false;
      this.addChild(this.text); 
      
      //create edit and delete text
      this.groupText = new createjs.Container();
      
      this.addChild(this.groupText);
      this.editText = new createjs.Text('Chỉnh sửa', "13px myriadPro-regular", "#bc2670");
      this.editText.textBaseline = "top";
      this.editText.textAlign = "left";
      this.groupText.addChild(this.editText); 

      var seperateText = new createjs.Text('|', "13px myriadPro-regular", "black");
      seperateText.textBaseline = "top";
      seperateText.textAlign = "left";
      seperateText.x = this.editText.x + this.editText.getMeasuredWidth() + 5;
      this.groupText.addChild(seperateText); 
    
      this.deleteText = new createjs.Text('Xóa', "13px myriadPro-regular", "#bc2670");
      this.deleteText.textBaseline = "top";
      this.deleteText.textAlign = "left";
      this.deleteText.x = seperateText.x + seperateText.getMeasuredWidth() + 5;
      this.groupText.addChild(this.deleteText); 

      //create person
      this.container = new createjs.Container();
      this.addChild(this.container);
      this.setNumOfPerson(this.numOfPerson);

      //add event for elements
      var that = this; 
      
      this.on("mousedown", function (evt) {
        this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
        this.parent.addChild(this);
      });
    
      this.on("pressmove", function (evt) {
        this.x = evt.stageX + this.offset.x;
        this.y = evt.stageY + this.offset.y;
      });

      this.on("mouseover", function (evt) {
        //createjs.Tween.get(that.text).to({y: orY - 5}, 200);
      });

      this.on("mouseout", function (evt) {
        //createjs.Tween.get(that.text).to({y: orY}, 200);
      });

      this.editText.on("click", function (evt) {
        var editEvent = {
          type: "editEvent"
        };
        that.dispatchEvent(editEvent);
      });

      this.deleteText.on("click", function (evt) {
        var deleteEvent = {
          type: "deleteEvent"
        };
        that.dispatchEvent(deleteEvent);
      });
    };

    p.setLabel = function(label) {
      this.text.text = label;
      this.updateText();
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

    p.setSize = function(width, height) {
    
    };

    p.updateText = function() {
    
    };

    p.updatePerson = function() {

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

      this.background.graphics.beginStroke('#7e7e7e').setStrokeStyle(1).beginFill('#edcdce').drawRect(0, 0, this.tableWidth, this.tableHeight);
      
      this.updateText();
      this.updatePerson();
    };

    p.updateText = function() {
      //update text after change sizev []
      var textWidth = this.text.getMeasuredWidth();
      var textHeight = this.text.getMeasuredHeight();

      this.text.x = (this.tableWidth - textWidth)/2;
      this.text.y = (this.tableHeight - textHeight)/2 - 5;

      this.groupText.x = (this.tableWidth - this.groupText.getBounds().width)/2;
      this.groupText.y = this.text.y + textHeight + 5;
    };

    p.updatePerson = function() {

        //calculate distance between person
      var wid = this.tableWidth - (this.numOfPerson * this.SIZE);
      wid = Math.floor(wid / (this.numOfPerson - 1)); 

      var person;
      var toX = this.SIZE/2;
      for (var i = 0; i < this.arrPerson.length; i ++) {
        person = this.arrPerson[i];
        person.x = toX;
        person.y = -10;
        toX = toX + this.SIZE + wid;
      }
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
      var toX = this.SIZE/2;
      
      for (i = 0; i < up; i ++) {
        person = this.arrPerson[i];
        person.x = toX;
        person.y = -10;
        toX = toX + this.SIZE + wid;
      }

      //calculate distance between person
      wid = this.tableWidth - (down * this.SIZE);
      wid = Math.floor(wid / (down - 1)); 

      toX = this.SIZE/2;
      
      for (i = up; i < this.arrPerson.length; i ++) {
        person = this.arrPerson[i];
        person.x = toX;
        person.y = this.tableHeight + 10;
        toX = toX + this.SIZE + wid;
      }
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
      this.tableWidth = width;
      this.tableHeight = height;

      this.background.graphics.beginStroke('#7e7e7e').setStrokeStyle(1).beginFill('#edcdce').drawCircle(0, 0, this.tableWidth);
      
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

      var toX = this.tableWidth + this.SIZE/2;
      for (var i = 0; i < this.arrPerson.length; i ++) {
        angle = -(90 + i * step) * Math.PI / 180;

        person = this.arrPerson[i];
        person.x = (this.tableWidth + 10) * Math.sin(angle);
        person.y = (this.tableWidth + 10) * Math.cos(angle);
      }
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
      this.tableWidth = width;
      this.tableHeight = height;

      this.background.graphics.beginStroke('#7e7e7e').setStrokeStyle(1).beginFill('#edcdce').drawRect(0, 0, this.tableWidth, this.tableWidth);
      
      this.updateText();
      this.updatePerson();
    };

    p.updateText = function() {
      //update text after change sizev []
      var textWidth = this.text.getMeasuredWidth();
      var textHeight = this.text.getMeasuredHeight();

      this.text.x = (this.tableWidth - textWidth)/2;
      this.text.y = (this.tableHeight - textHeight)/2 - 5;

      this.groupText.x = (this.tableWidth - this.groupText.getBounds().width)/2;
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
      toY = this.tableWidth - distance - this.SIZE/2;      
      
      for (i = 0; i < left; i ++) {
        person = this.arrPerson[i];
        person.x = -10;
        person.y = toY;
        
        toY = toY - this.SIZE - distance;
      }

      //top
      distance = this.tableWidth - (top * this.SIZE);
      distance = Math.floor(distance / (top + 1)); 
      toX = distance + this.SIZE/2;
      
      for (i = left; i < leftTop; i ++) {
        person = this.arrPerson[i];
        person.x = toX;
        person.y = -10;
        
        toX = toX + this.SIZE + distance;
      }

      //right
      distance = this.tableWidth - (right * this.SIZE);
      distance = Math.floor(distance / (right + 1)); 
      toY = distance + this.SIZE/2;     

      for (i = leftTop; i < leftTop + right; i ++) {
        person = this.arrPerson[i];
        person.x = this.tableWidth + 10;
        person.y = toY;
        
        toY = toY + this.SIZE + distance;
      }

      //bottom
      distance = this.tableWidth - (bottom * this.SIZE);
      distance = Math.floor(distance / (bottom + 1)); 
      toX = this.tableWidth - distance - this.SIZE/2;

      for (i = leftTop + right; i < this.numOfPerson; i ++) {
        person = this.arrPerson[i];
        person.x = toX;
        person.y = this.tableWidth + 10;
        
        toX = toX - this.SIZE - distance;
      }
    };

    createjs.SquareTable = createjs.promote(SquareTable, "Table");
      
  }());

  //CUSTOM TABLE CLASS
  (function() {

    function CustomTable(label, width, height, typeOfTable, url) {
      this.typeOfTable = typeOfTable;

      if (this.typeOfTable == 1) {
        width = 70;
      }

      else if (this.typeOfTable == 2) {
        height = width ;
      }
      
      this.bitmap = null;

      this.Table_constructor(label, width, height, 0);

      this.setItem(url);
    }
  
    var p = createjs.extend(CustomTable, createjs.Table);

    p.setSize = function(width, height) {
      this.tableWidth = width;
      this.tableHeight = height;

      if (this.typeOfTable == 1) {
        this.background.graphics.beginStroke('#7e7e7e').setStrokeStyle(1).beginFill('#edcdce').drawCircle(this.tableWidth/2, this.tableWidth/2, this.tableWidth);
      }

      else if (this.typeOfTable == 2) {
        this.background.graphics.beginStroke('#7e7e7e').setStrokeStyle(1).beginFill('#edcdce').drawRect(0, 0, this.tableWidth, this.tableWidth);
      }

      else {
        this.background.graphics.beginStroke('#7e7e7e').setStrokeStyle(1).beginFill('#edcdce').drawRect(0, 0, this.tableWidth, this.tableHeight);
      }

      this.updateText();
      this.updatePosition();
    };

    p.updateText = function() {
      //update text after change sizev []
      var textWidth = this.text.getMeasuredWidth();
      var textHeight = this.text.getMeasuredHeight();

      this.text.x = (this.tableWidth - textWidth)/2;
      this.text.y = (this.tableHeight - textHeight)/2 - 5;

      this.groupText.x = (this.tableWidth - this.groupText.getBounds().width)/2;
      this.groupText.y = this.text.y + textHeight + 5;
    };

    p.updatePerson = function() {
    };

    p.setItem = function(url) {
      var that = this;

      var img = new Image();
      img.onload = function() {
        that.bitmap = new createjs.Bitmap(img);
        that.addChild(that.bitmap);
        that.updatePosition();
      }
      img.src = url;  
    };

    p.updatePosition = function() {
      if (!this.bitmap) {
        return;
      }

      this.bitmap.x = (this.tableWidth - this.bitmap.getBounds().width) / 2;
        
      if (this.typeOfTable == 1) {
        this.bitmap.y = - this.bitmap.getBounds().height;
      } else {
        this.bitmap.y = - this.bitmap.getBounds().height + 20;
      }  
    };


    createjs.CustomTable = createjs.promote(CustomTable, "Table");
      
  }());

  /* =============== */
  /* MODULE DEFAULTS */
  /* =============== */

  var defaults = {};

  var cvsId = 'cvsSeat';

  /* ================= */
  /* MODULE DEFINITION */
  /* ================= */

  function Seat(opts) {
    this.settings = $.extend({}, defaults, opts);

    this.gridX = 0;
    this.gridY = 0;

    this.gridWidth = 0;
    this.gridHeight = 0;

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

    return this.init();
  }

  /* ============== */
  /* MODULE METHODS */
  /* ============== */

  Seat.prototype.init = function() {

    this.stage = new createjs.Stage(cvsId);
    
    this.stage.enableMouseOver();
    createjs.Touch.enable(this.stage);

    this.canvas = document.getElementById(cvsId);

    this.background = new createjs.Shape();
    this.stage.addChild(this.background);

    this.container = new createjs.Container();
    this.stage.addChild(this.container);

    this.drag = new createjs.Shape();
    this.drag.alpha = 0.1;
    this.container.addChild(this.drag);

    this.grid = new createjs.Shape();
    this.container.addChild(this.grid);

    this.table = new createjs.Container();
    this.container.addChild(this.table);

    this.hscroll = new createjs.Container();
    this.stage.addChild(this.hscroll);

    //horizonal scroll
    this.hscrollBgd = new createjs.Shape();
    this.hscroll.addChild(this.hscrollBgd);

    this.hscrollBar = new createjs.Shape();
    this.hscroll.addChild(this.hscrollBar);

    //vertial scroll
    this.vscroll = new createjs.Container();
    this.stage.addChild(this.vscroll);

    this.vscrollBgd = new createjs.Shape();
    this.vscroll.addChild(this.vscrollBgd);

    this.vscrollBar = new createjs.Shape();
    this.vscroll.addChild(this.vscrollBar);

    var that = this;
    createjs.Ticker.addEventListener("tick", function(event) {
      that.stage.update();
    });

    $('.addsize').find('button').on('click', function(evt) {
      var wrap = $(evt.target).parent().prev();
      var wid = wrap.find("input[name='Width']").val();
      var hei = wrap.find("input[name='Length']").val();
      that.changeSize(Number(wid), Number(hei));
    });

    $('.select-tool').find("a[data-control]").on('click', function(evt) {
      that.handleControl($(this).data('control'));
    });

    this.updateScroll();

    //horizonal scroll event
    this.hscrollBar.on("mousedown", function (evt) {
      this.offset = {x: this.x - evt.stageX};
    });
    
    this.hscrollBar.on("pressmove", function (evt) {
      var toX = evt.stageX + this.offset.x;

      toX = toX < 0 ? 0 : toX;      
      toX = toX > that.hscrollBgd.width - that.hscrollBar.width ? that.hscrollBgd.width - that.hscrollBar.width : toX;

      this.x = toX;

      that.updateGrid(true);
    });

    //vertical scroll event
    this.vscrollBar.on("mousedown", function (evt) {
      this.offset = {y: this.y - evt.stageY};
    });
    
    this.vscrollBar.on("pressmove", function (evt) {
      var toY = evt.stageY + this.offset.y;

      toY = toY < 0 ? 0 : toY;      
      toY = toY > that.vscrollBgd.height - that.vscrollBar.height ? that.vscrollBgd.height - that.vscrollBar.height : toY;

      this.y = toY;

      that.updateGrid(false);
    });

    //horizonal scroll event
    this.drag.on("mousedown", function (evt) {
      that.container.offset = {x: that.container.x - evt.stageX, y: that.container.y - evt.stageY};
    });
    
    this.drag.on("pressmove", function (evt) {
      var toX = evt.stageX + that.container.offset.x;
      var toY = evt.stageY + that.container.offset.y;

      toX = toX > 0 ? 0 : toX;
      toX = toX < (that.hscrollBgd.width - that.gridWidth) ? (that.hscrollBgd.width - that.gridWidth) : toX;

      toY = toY > 0 ? 0 : toY
      toY = toY < (that.vscrollBgd.height - that.gridHeight) ? (that.vscrollBgd.height - that.gridHeight) : toY;

      that.container.x = toX;
      that.container.y = toY;

      that.updateScrollBar();
    });

    $(window).on('resize', function(evt) {
      that.resize();
    });
    that.resize();

    //default
    $('.addsize').find('.wrap').find("input[name='Width']").val('100');
    $('.addsize').find('.wrap').find("input[name='Length']").val('100');
    this.changeSize(100, 100);
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
    
    this.hscrollBgd.width = this.canvas.width;
    this.vscrollBgd.height = this.canvas.height;

    this.drag.graphics.clear();
    this.drag.graphics.beginFill('#FFFFFF').drawRect(0, 1, this.gridWidth, this.gridHeight).endFill();

    this.isHScroll = this.gridWidth > this.canvas.width ? true : false;

    if (this.isHScroll) {
       this.isVScroll = this.gridHeight > (this.canvas.height - 10) ? true : false; 
    } else {
      this.isVScroll = this.gridHeight > this.canvas.height ? true : false; 
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
      var hscrollbarWidth = (this.hscrollBgd.width / this.gridWidth) * this.hscrollBgd.width;

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
      var vscrollbarHeight = (this.vscrollBgd.height / this.gridHeight) * this.vscrollBgd.height;

      this.vscrollBar.graphics.beginFill('#b33175').drawRoundRect(0, 0, 10, vscrollbarHeight, 5).endFill();
      this.vscrollBar.height = vscrollbarHeight;    
    }
  };

  Seat.prototype.updateGrid = function(horizonal) {
    if (horizonal) {
      this.container.x = - this.hscrollBar.x * (this.gridWidth - this.hscrollBgd.width) / (this.hscrollBgd.width - this.hscrollBar.width);
    } else {
      this.container.y = - this.vscrollBar.y * (this.gridHeight - this.vscrollBgd.height) / (this.vscrollBgd.height - this.vscrollBar.height);
    }
  };

  Seat.prototype.updateScrollBar = function() {
    this.hscrollBar.x = - this.container.x * (this.hscrollBgd.width - this.hscrollBar.width) / (this.gridWidth - this.hscrollBgd.width);
    this.vscrollBar.y = - this.container.y * (this.vscrollBgd.height - this.vscrollBar.height) / (this.gridHeight - this.vscrollBgd.height);
  };

  Seat.prototype.setGridDisplay = function(isDisplay) {
    this.grid.visible = isDisplay;
  };

  Seat.prototype.handleControl = function(control) {

    switch(control) {
      case 'halfrect':
        this.addTable('halfrect');
        break;

      case 'rect':
        this.addTable('rect');
        break;  

      case 'circle':
        this.addTable('circle');
        break;   

      case 'square':
        this.addTable('square');
        break;

      case 'custom':
        this.addTable('custom');
        break;    

      case 'grid':
        this.setGridDisplay(true);
        break;

      case 'ungrid':
        this.setGridDisplay(false);
        break; 
    }
  };

  Seat.prototype.addTable = function(type) {
    var table;

    if (type == 'halfrect') {
      table = this.table.addChild(new createjs.HalfRectTable("NỮA BÀN HÌNH CHỮ NHẬT", 160, 65, 5));
    }

    else if (type == 'rect') {
      table = this.table.addChild(new createjs.RectTable("BÀN HÌNH CHỮ NHẬT", 180, 80, 10));
    }

    else if (type == 'circle') {
      table = this.table.addChild(new createjs.CircleTable("BÀN TRÒN", 50, 50, 10));
    }

    else if (type == 'square') {
      table = this.table.addChild(new createjs.SquareTable("BÀN VUÔNG", 90, 90, 10));
    }

    else if (type == 'custom') {
      table = this.table.addChild(new createjs.CustomTable("VẬT PHẨM", 130, 75, Math.ceil(Math.random() * 3), 'images/seat/' + Math.ceil(Math.random() * 4) + '.png'));
    }

    table.x = Math.abs(this.container.x) + this.hscrollBgd.width/2;
    table.y = Math.abs(this.container.y) + this.vscrollBgd.height/2;

    //table.x = table.y = 100;
    table.on('editEvent', function(evt) {
      
    })
  };

  /* =============== */
  /* MODULE DATA-API */
  /* =============== */

  $(function() {
    var opts = {};
    App.Seat = new Seat(opts);
  });

}(window.jQuery, window.createjs, window.App));
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