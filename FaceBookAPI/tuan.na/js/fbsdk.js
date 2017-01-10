
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'fbsdk';

  var body       = $('body');
  var loginBtn   = $('#login');
  var content    = $('#status');
  var shareBtn   = $('#share');
  var galleryBtn = $('#gallery');

  var checkLogin = function(res) {
    if (res.status === 'connected') {
      content.show();
      loginBtn.hide();
      FB.api('/me', {fields: 'name,email,picture'}, function(res) {
        $('<p/>', {
          text: res.name
        }).appendTo(content);
        $('<p/>', {
          text: res.email
        }).appendTo(content);
        $('<img/>', {
          alt: 'avatar',
          src: res.picture.data.url
        }).appendTo(content);
      });
    } else if (res.status === 'not_authorized') {
      content.text('You are not authorized to access to the app.')
    } else {
      console.log('no connect');
      loginBtn.show();
    }
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
          opt  = that.options;
      $.ajaxSetup({ cache: true });
      $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
        FB.init({
          appId      : opt.appId,
          version    : opt.vs
        });
        FB.getLoginStatus(function(res) {
          checkLogin(res);
        });
        loginBtn.on('click.login', function() {
          FB.login(function(res) {
            checkLogin(res);
          }, {
            scope: 'user_photos'
          });
        });
        shareBtn.on('click.share', function() {
          FB.api('/me/feed', 'post', {link: window.location.href});
        });
        galleryBtn.on('click.gallery', function() {
          FB.api('/me/albums', function(res) {
            console.log(res);
            for (var i in res.data) {
              if ( res.data[i].name === "Profile Pictures") {
                FB.api('/' + res.data[i].id + '/photos', function(res) {
                  var photos = res.data;
                  for (var i in photos) {
                    FB.api('/'+ photos[i].id, {fields: 'picture'}, function(res) {
                      $('<img/>', {
                        alt: 'avatar',
                        src: res.picture
                      }).appendTo(content);
                    });
                  }
                });
                break;
              }
            }
          });
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
      }
    });
  };

  $.fn[pluginName].defaults = {
    appId: '390145291021310',
    vs: 'v2.8'
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({});
  });

}(jQuery, window));
