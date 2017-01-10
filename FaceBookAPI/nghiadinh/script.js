/**
 *  @name loginfacebook
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';


  var pluginName = 'loginfacebook',
      run = true;


  window.fbAsyncInit = function() {
    FB.init({
      appId      : '390145291021310',
      xfbml      : true,
      version    : 'v2.8'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
          el = that.element,
          btnlogin = el.find('.login'),
          showlogin = el.find('.show-login'),
          share = el.find('.share'),
          getlist = el.find('.getlist'),
          showlist = el.find('.show-list-picture');
          //login
          btnlogin.on('click', function() {
            FB.getLoginStatus(function(response) {
              if (response.status === 'connected') {
                that.loginview(response,showlogin);
              }
              else {
                FB.login(function(response) {
                  that.loginview(response,showlogin);
                }, {scope: 'email,user_photos'});
              }
            });
          });
          //share
          share.on('click', function() {
            FB.ui({
              method: 'share',
              href: window.location.href,
            }, function(response){});
          });
          // get list photo
          getlist.on('click', function() {
            FB.getLoginStatus(function(response) {
              if(response.status === 'connected') {
                that.listavartar(response, showlist);
              }
              else {
                FB.login(function(response) {
                  that.listavartar(response, showlist);
                }, {scope: 'email,user_photos'});
              }
            });
          });
      // initialize
      // add events
    },
    loginview: function(response, showlogin) {
      FB.api('/me', 'get', { fields: 'name, email, picture' }, function (response) {
        showlogin.html('<p>'+response.name+'</p><p>'+response.email+'</p><img src="'+response.picture.data.url+'"/>');
      });
    },
    listavartar: function (response, showlist) {
      FB.api(
        '/me',
        'GET',
        {"fields":"albums{photos{picture},id,name}"},
        function(response) {
          var data = response.albums.data;
          for(var i =0; i< data.length; i++) {
            if(data[i].name === 'Profile Pictures' && run === true) {
              run =false;
              var item = data[i].photos,
                  arraypicture = '';
              for(var j = 0; j< item.data.length; j++) {
                arraypicture+= '<img src="'+item.data[j].picture+'"/>';
              }
              showlist.append(arraypicture);
            }
          }
        }
      );
    },
    destroy: function() {
      // remove events
      // deinitialize
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
    $('[data-' + pluginName + ']')[pluginName]({
    });
  });

}(jQuery, window));
