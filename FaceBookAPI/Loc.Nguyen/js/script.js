
/**
 *  @name custom social-share
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

  var pluginName = 'face-app',
      block = $('#avatar'),
      id = '';

  function login() {
    window.FB.login(function (response) {
      if (response.authResponse) {
      }
    }, { scope: 'email,user_photos,publish_actions' });
  }
  function photo(){
    window.FB.api(
      '/'+id+'/photos',
      function (response) {
        var data = response.data.length;
        if (response && !response.error) {
          for(var i =0; i< data; i++) {
            var avatar = '<img class ="avatar" src="' + 'http://graph.facebook.com/'+response.data[i].id+'/picture' + '"/>';
            block.append(avatar);
          }
        }
      }
    );
  }
  function profile() {
    block.empty();
    window.FB.api(
      '/me/albums',
      function(response) {
        var data = response.data.length;
        for(var i = 0; i< data; i++){
          var name = response.data[i].name;
          if(name === 'Profile Pictures'){
            id = response.data[i].id;
          }
        }
        if(id){
          photo(id);
        }
      }
    );
  }
  function share(){
    // window.FB.ui({
    //   method: 'share',
    //   display: 'popup',
    //   href: 'localhost:3000',
    // });
    var current = window.location.href;
    window.FB.ui({
      method: 'share_open_graph',
      action_type: 'og.likes',
      action_properties: JSON.stringify({
        object: current ,
      })
    });
  }
  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
          elm = that.element;
      setTimeout(function(){
        login.call(that);
      }, 2000);
      elm.find('#shareBtn').click(function(){
        share.call(that);
      });
      elm.find('#profile-pictures').click(function() {
        setTimeout(function(){
          profile.call(that);
        }, 500);
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
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

