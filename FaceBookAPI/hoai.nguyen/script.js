var userId;

window.fbAsyncInit = function() {
  FB.init({
    appId      : '390145291021310',
    xfbml      : true,
    cookie     : true,
    version    : 'v2.8'
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
  if (response.status === 'connected') {
    userId = response.authResponse.userID;
    testAPI(userId);
    document.getElementById('fb-login-btn').style.display = 'none';
    document.getElementById('fb-logout-btn').style.display = 'block';
    document.getElementById('get-images').style.display = 'block';
    document.getElementById('share-current-page').style.display = 'block';
    console.log(response);
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

function testAPI(userId) {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', {fields: 'name,picture,email'}, function(response) {
    console.log(response);
    document.getElementById('status').innerHTML =
      'Fullname:' + response.name + '<br>' +
      'Email:' + response.email + '<br>' +
      'Picture:' + '<img src="' + response.picture.data.url + '" />' + '<br>';
  });
}

function getImages(userId) {
  FB.api(
    "/" + userId + "/albums",
    function (response) {
      if (response && !response.error) {
        response.data.forEach( function(element, index) {
          if (element.name == 'Profile Pictures') {
            FB.api(
              "/" + element.id + "/photos?fields=name,source,id",
              function (response) {
                if (response && !response.error) {
                  response.data.forEach( function(element, index) {
                    document.getElementById('images').innerHTML += '<img src="' + element.source + '" width="100" />';
                  });
                }
              }
            );
          }
        });
      }
    }
  );
}

function doLogout() {
  FB.logout(function(response) {
    console.log('Logged out.')
    location.reload();
  });
}

function pageShare() {
  FB.ui({
    method: 'share',
    href: 'https://developers.facebook.com/docs/sharing/reference/share-dialog',
  }, function(response){});
}