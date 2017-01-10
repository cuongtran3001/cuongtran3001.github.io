
/**
 *  @name plugin
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
  'use strict';

  var pluginName = 'fb-social';
  var privateVar = null;

  function FBShareHandler(){
    $('[data-fb-share-link]').click( function(){
      // var url = window.location.href;
      var url = 'http://genk.vn';
        FB.ui({
        method: 'share',
        href: url,
      }, function(response){});
    });
  }

  function getLoginState(self){
      window.FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          self.vars.token = response.authResponse.accessToken;
          setUserInfor(self);
        } else if (response.status === 'not_authorized') {
          fbLogin(self);
        } else {
          fbLogin(self);
        }
      });
  }

  function avatarHandler(self){
    $('#avatar').click( function(){
      getAllProfilePicture(self, self.vars.userId);
    });
  }

  function fbLogin(self){
    FB.login(function(response) {
      console.log(response);
        if (response.status == 'connected') {
          setUserInfor(self);
          self.vars.token = response.authResponse.accessToken;
        } else {
         console.log('User cancelled login or did not fully authorize.');
        }
    },  {scope: 'email,user_likes,user_photos'});
  }

  function getPicture(id){
    return 'http://graph.facebook.com/' + id + '/picture';
  }

  function setUserInfor(self){
      $("#loading").removeClass('hidden');
     FB.api('/me?fields=id,name,email',  function(response) {
      console.log(response);
        self.vars.userId = response.id;
         var avatar = getPicture(response.id);
         $('#avatar').attr('src', avatar);
         $('#yourname').text(response.name);
         $('#email').text(response.email);

         $('#avatar').removeClass('hidden');
         $("#loading").addClass('hidden');
      });
      avatarHandler(self);

  }

  function getAllProfilePicture(self, id){

    var profileAlbumID = '';

    $("#loading").removeClass('hidden');
    $.get('https://graph.facebook.com/'+ id+'/albums?access_token=' + self.vars.token, function(response) {
      var i = 0;
      while (i< response.data.length) {
        if(response.data[i].type === 'profile')
        {
          console.log('profile albume: '+response.data[i].id);
          profileAlbumID = response.data[i].id;
          break;
        }
        i++;
      }

      $.get('https://graph.facebook.com/'+ profileAlbumID+'/photos?access_token=' + self.vars.token, function(response) {
          if(response && response.error){
            alert(response.error.message);
          }else{

            var j = 0;
            var listImageString = '';
            while (j< response.data.length) {
              listImageString += '<li><img src="' + response.data[j].picture+ '" alt="profile picture" /></li>';
              j++;
            }

             $('#profile-pics-list').append(listImageString);
            $("#loading").addClass('hidden');
          }

      });

    });

  }



  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;
      this.vars = {
        key: 'value',
        token: '',
        userID: null
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));


      window.fbAsyncInit = function() {
        FB.init({
          appId      : '390145291021310',
          cookie     : true,  // enable cookies to allow the server to access
                              // the session
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.8' // use graph api version 2.8
        });

        getLoginState(that);
      }

      FBShareHandler();
    },
    publicMethod: function(params) {
      // to do
      $.isFunction(this.options.onCallback) && this.options.onCallback();
      this.element.trigger('customEvent');
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
    key: 'value',
    onCallback: null
  };

  $(function() {
    $('[data-' + pluginName + ']').on('customEvent', function() {
      // to do
    });

    $('[data-' + pluginName + ']')[pluginName]({
      key: 'custom'
    });
  });

}(jQuery, window));
