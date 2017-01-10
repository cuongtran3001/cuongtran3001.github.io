(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$(document).ready(function() {
  var uid, token, isLogin;

  var initImage = function(data) {
    var html = '';
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].images[0].source);
      html += '<img src="'+data[i].images[0].source+'" style="width: 200px; float: left;">';
    }
    $('body').append(html);
  };

  window.fbAsyncInit = function() {
    initFaceBook('390145291021310');
    handleFBLogin();
  };

  var initFaceBook = function(appID) {
    FB.init({
      appId      : appID,
      xfbml      : true,
      status     : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
  };

  var handleFBLogin = function(){
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        uid = response.authResponse.userID;
        token = response.authResponse.accessToken;
        return true;
      } else if(response.status === 'not_authorized') {
      } else {
        FB.login(function(response) {
          uid = response.authResponse.userID;
          token = response.authResponse.accessToken;
        }, {scope: 'email,user_photos'});
      }
    });
    return false;
  };

  var handleFBShare = function(linkShare){
    FB.ui({
        method: 'share',
        display: 'dialog',
        href: linkShare,
    }, function(response) {});
  };

  var handleGetData = function(){
    FB.api('/'+uid+'/photos', 'get', {access_token: token, type: 'uploaded', fields: 'images'}, function(response) {
      if (response && !response.error) {
        initImage(response.data);
      }
    });
  };

  document.getElementById('loadMe').onclick = function(){
    if (isLogin) {
      handleFBLogin();
    }
    handleGetData();
  };

  document.getElementById('shareBtn').onclick = function() {
    handleFBLogin();
    handleFBShare('https://developers.facebook.com/docs/');
  };

});
