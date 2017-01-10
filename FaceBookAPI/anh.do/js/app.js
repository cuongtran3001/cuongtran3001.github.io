function checkLoginState() {
  login();
  getInfo();
  album();
}
function login() {
  FB.login(function(response) {
    if (response.status === 'connected') {
        document.getElementById('profile').innerHTML = 'We are connected.';
        document.getElementById('login').style.visibility = 'hidden';
        getInfo();
      } else if (response.status === 'not_authorized') {
        document.getElementById('profile').innerHTML = 'We are not logged in.'
      } else {
        document.getElementById('profile').innerHTML = 'You are not logged into Facebook.';
      }
  }, {scope: 'email'});
}
function getInfo() {
  FB.api(
    '/me',
    'GET',
    {"fields": "name,id,email,about,cover,picture"},
    function(response) {
    document.getElementById('profile').innerHTML = '\
      <div class="id-fb">\
        <div class="text-title">'+'<span>ID</span>:'+'<span>'+ response.id +'</span></div>\
      </div>\
      <div class="name">\
        <div class="text-title">'+'Name:'+'<span>'+ response.name +'</span></div>\
      </div>\
      <div class="about">\
        <div class="text-title">'+'About:'+'<span>'+ response.about +'</span></div>\
      </div>\
      <div class="email">\
        <div class="text-title">'+'Email:'+'<span>'+ response.email +'</span></div>\
      </div>\
      <img src="'+response.cover.source+'">\
      <img src="'+response.picture.data.url+'">\
      ';
    });
}
function album(){
  FB.api(
    '/me',
    'GET',
    {"fields":"photos.limit(5){picture}"},
    function(response) {
      console.log(response);
      var contentString = '';
      for (var i = 0; i < response.photos.data.length; i++) {
        contentString += '\
          <img src="'+ response.photos.data[i].picture +'">\
        ';

      }
      document.getElementById('photo').innerHTML = contentString;
    }
  );
}
