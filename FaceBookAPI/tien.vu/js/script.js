/**
 * @name Site
 * @description Global variables and functions
 * @version 1.0
 */

var Site = (function($, window, undefined) {
  'use strict';

  var statusChangeCallback = function (response) {
    if (response.status === 'connected') {
      //console.log(response);
      $('[data-login-button]').hide();
      showInfo();
    } else if (response.status === 'not_authorized') {
      document.getElementById('status').innerHTML = 'Please log into this app.';
    } else {
      document.getElementById('status').innerHTML = 'Please log into Facebook. <a target="_blank" href="https://www.facebook.com/login">Login</a>';
    }
  };

  var checkLoginState = function() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  };

  var  showInfo = function() {       
    FB.api('/me', function(response) {
      $('#status').html('Thanks for logging in, ' + response.name + '<br/>Your Email: ' + response.email  + '!' );
      $('[data-profileimage]').show();
      $('[data-profileimage]').attr({
        src: "http://graph.facebook.com/" + response.id + "/picture",
        id: response.id
      });
    });
  }

  var showAvatar = function() { 
    var id = $(this).attr('id');  
    FB.api(
      "/"+ id+"",
      function (response) {       
        if (response && !response.error) {
          $('[data-avatarPopup]').show().append('<img src="http://graph.facebook.com/' + response.id +'/picture" />');
        }
      }
    );
  };
  var shareFB = function() {
    var url = $(this).attr('data-url');
    FB.ui({
      method: 'share',
      href: url,
    }, function(response){});
  };

  var initFB = function() {
    FB.init({
      appId: '1799220153644280',
      status: true,
      cookie: true,
      oauth: true
    });
    FB.getLoginStatus(function(response) {   
      statusChangeCallback(response);
    });

    $('[data-share]').on('click', shareFB);
    $('[data-profileimage]').on('click', showAvatar);
  };

  return {
    initFB: initFB
  };

})(jQuery, window);

jQuery(function() {

  Site.initFB();   

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.8&appId=390145291021310";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
});

