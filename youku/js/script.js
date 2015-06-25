/**
 * @name Site
 * @description Define global variables and functions
 * @version 1.0
 */
var Site = (function($, window, undefined) {
  var privateVar = 1;

  function privateMethod1() {
    // todo
  }
  return {
    publicVar: 1,
    publicObj: {
      var1: 1,
      var2: 2
    },
    publicMethod1: privateMethod1
  };

})(jQuery, window);

jQuery(function() {
  Site.publicMethod1();
});

/* ========================================
 * mchm-content/video-youku.js
 * ======================================== */

(function($, App) {

  "use strict";

  var videoTrigger = '[data-video-youku]',
      clientID = '85umcobwswozr4r6';

  /* VIDEO CLASS DEFINITION
   * ======================= */

  function VideoYouku(el) {
    this.el = $(el);
    var that = this;
    that.currentTime = 0;

    that.defaultOptions = {
      width: '100%',
      height: '100%',
      styleid: '1',
      autoplay: false,
      show_related: false,
      embsig: 'VERSION_TIMESTAMP_SIGNATURE',
      vid : '',
      starttime: 10,
      events: {
        onPlayerReady: function() {
        },
        onPlayStart: function () {
          that.seekTo(that.videoOptions.starttime);
        }
      }
    };

    that.videoOptions = $.extend(true, that.defaultOptions, that.el.data('video-youku'));
    that.videoOptions.client_id = clientID;
    that.videoOptions.id = 'youku-player-id-' + that.videoOptions.vid;

    that.init();
  }

  VideoYouku.prototype = {
    constructor: VideoYouku,
    init: function(){
      var that = this;

      that.el.empty().attr('id', that.videoOptions.vid);
      that.player = new window.YKU.Player(that.videoOptions.vid, that.videoOptions);
    },
    pause: function(){
      var object = this.el.find('object, video').first();
      if (object.is('object')) {
        object[0].pauseVideo(true);
      } else {
        object[0].pause();
      }
    },
    play: function(){
      var object = this.el.find('object, video').first();
      if (object.is('object')) {
        object[0].pauseVideo(false);
      } else {
        object[0].play();
      }
    },
    seekTo: function(sec){
      var object = this.el.find('object, video').first();
      if (object.is('object')) {
        object[0].nsseek(sec);
      } else {
        object.one('loadedmetadata', function() {
          object[0].currentTime = sec;
        });
        object[0].currentTime = sec;
      }
    },
    getCurrentTime: function() {
      var object = this.el.find('object, video').first();
      if (object.is('object')) {
        var a = object[0].getPlayerState().split("|");
        return 3 <= a.length ? a[2] : -1;
      } else {
        return Math.ceil(object[0].currentTime);
      }
    }
  };

  /* VIDEO PLUGIN DEFINITION
   * ======================== */

  var old = $.fn.videoyouku;
  $.fn.videoyouku = function(option) {
    return this.each(function() {
      var $this = $(this),
        data = $this.data('app-video-youku');
      if (!(data instanceof VideoYouku)) {
        data = new VideoYouku(this);
        $this.data('app-video-youku', data);
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.videoyouku.Constructor = VideoYouku;

  /* VIDEO NO CONFLICT
   * ================== */

  $.fn.videoyouku.noConflict = function() {
    $.fn.videoyouku = old;
    return this;
  };

  /* VIDEO DATA-API
   * =============== */

  $(function() {
    var tag = document.createElement('script');
    tag.src = "http://player.youku.com/jsapi";
    var firstScriptTag = document.getElementsByTagName('head')[0].getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    initPlayer();
  });

  function videoyouku(parent){
    var _parent = ( typeof(parent) === "undefined" ) ? document.body : parent ;
    $(videoTrigger, _parent).videoyouku();
  }

  function initPlayer() {
    setTimeout(function () {
      try {
        videoyouku();
      } catch(err) {
        initPlayer();
      }
    }, 3000);
  }

}(window.jQuery, window.App));
