
window.fbAsyncInit = function() {
  FB.init({
    appId      : '390145291021310',
    cookie     : true,
    status     : true,
    xfbml      : true,
    version    : 'v2.8'
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

function checkLogin() {
  FB.login(function(response) {
    if (response.status === 'connected') {
      document.getElementById("btnLogin").className += "hide";
      getUserInfo();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
    } else {
      document.getElementById('status').innerHTML = 'User cancelled login or did not fully authorize.';
    }
  }, {scope: 'email, user_photos'});
}

function statusChangeCallback(response) {
  console.log(response);
  if (response.authResponse) {
    globalAccessToken = response.authResponse.accessToken;
    document.getElementById("btnLogin").className = "hide";
    console.log('Welcome!');
    getUserInfo();
  } else {
    console.log('User cancelled login or did not fully authorize.');
    document.getElementById('status').innerHTML = 'User cancelled login or did not fully authorize.';
  }
}

var userID,globalAccessToken;

function getUserInfo() {
  FB.api('/me', {fields: 'name,id,email,picture'}, function(response) {
    document.getElementById("btnPicture").className = "  ";
    userID = response.id;
    document.getElementById('status').innerHTML = 'User Profile Info.';
    document.getElementById('profileInfo').innerHTML = '\
      <div><img src="' +response.picture.data.url+'"></div>\
      <div><span>Name:</span><span>'+ response.name +'</span></div>\
      <div><span>Email:</span><span>'+ response.email +'</span></div>';
      console.log('userID',userID,globalAccessToken);
  });
  showAllAvatar();
}
//Adds a new option into the drop down box
function addOption(opText,opVal)
{
    var v = document.getElementById("albumsList");
    v.innerHTML += '<br/><a  href="facebookphotos.aspx?album='+opVal+'&name='+opText+'">'+opText+'</a>';
}

function getAlbumPhotos(album, callback){
  if (album.id) {
    FB.api("/" + album.id + "/photos?fields=source,name,id", function(response) {
      var photos = [];
      var data = response["data"];
      var arrLength = data.length;
      for(var i=0;i<arrLength;i++) {
        photos.push(data[i].source);
      }
      if(callback) {
        callback(photos);
      }
    });
  }
}

function showAllAvatar() {
  FB.api('/me/albums',  function(resp) {
    var userAlbum = {};
    for (var i=0, l=resp.data.length; i<l; i++){
      var album = resp.data[i];
      if (album.name === "Profile Pictures")
      {
        userAlbum.name =  album.name;
        userAlbum.id  = album.id;
      }
    }
    document.getElementById("btnPicture").className = "hide";
    getAlbumPhotos(userAlbum, function(arr) {
      var html = '';
      for (var i = 0, len = arr.length; i< len; i++) {
        html += '<img src="' + arr[i] + '" width=150 />';
      }
      document.getElementById("albumsList").innerHTML=html;
    });
  });
}

function sharePost() {
    FB.ui({
    method: 'share',
    display: 'popup',
    href: 'https://developers.facebook.com/docs/',
  }, function(response){});
}
