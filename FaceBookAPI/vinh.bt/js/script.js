function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    if (response.status === 'connected') {
       Facebook();
     } else if (response.status === 'not_authorized') {
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '390145291021310',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.8',
    oauth: true
  });

  FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  function Logout(){
    $('.img-avatar').empty();
    FB.logout(function(response) {
      $('.fb_iframe_widget').children('span').show();
       $('.status').hide();
    });
  }

  function showPicture(){
    FB.api('/me','GET',{"fields":"albums{photos{picture},id,name}"}, function(response){
      var data = response.albums.data;
      var listAvarta = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].name === 'Profile Pictures') {
          listAvarta = data[i].photos.data;
          break;
        }
      }
      var full = $('.img-avatar').children('img');
      if (full.length  < listAvarta.length) {
        for (var i = 0; i < listAvarta.length; i++) {
          var img = listAvarta[i].picture;
          $('.img-avatar').append('<img src="'+img+'"/>');
        }
      }
    });
  }

  function shareFacbook(){
    var value = window.location.href;
    FB.ui({
      method: 'share',
      href: value,
      mobile_iframe: true,
    }, function(response){});
  }


  function Facebook() {
    $('.fb_iframe_widget').children('span').hide();
    $('.status').show();
    $('.img-avatar').empty();
    FB.api('/me',{fields: 'name, email, picture.width(180).height(180).redirect(1), albums'}, function(response) {
      var url = response.picture.data.url;
      $('.status').find('h1').text(response.name);
      $('.status').find('h2').text(response.email);
      $('.status').find('img').attr('src', url);
    });
  }

