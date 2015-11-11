function FaceBook() {
	this.CLIENT_ID = '131211991594-2l4cskeuaoa2o5m0jqdh0p79uksishnl.apps.googleusercontent.com';
    this.API_KEY = 'AIzaSyDm_hXiAoCjmg01rTc6aPSuMcZWOF8EgqU';
    this.SCOPES = ['https://www.googleapis.com/auth/drive'];
	
	this.state = null;
}

FaceBook.prototype.init = function() {
	var	that = this;
	
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			that.state = 'LOGIN';
		}
    });
};

FaceBook.prototype.connect = function() {
	var	that = this;
	
	if (this.state) {
		that.callAPI('me/albums?fields=id,name,cover_photo', that.onAlbumLoadedHandler);
	} else {	
		FB.login(function(response) {
			if (response.status === 'connected') {
				that.state = 'LOGIN';
				this.callAPI('me/albums?fields=id,name,cover_photo', that.onAlbumLoadedHandler);
			}
		  
			else if (response.status === 'not_authorized') {
				// The person is logged into Facebook, but not your app.
			} 
		  
			else {
				// The person is not logged into Facebook, so we're not sure if
				// they are logged into this app or not.
			}
		}, {scope: 'public_profile, user_photos, user_videos'});
	}

/*
	var that = this;
	gapi.auth.authorize({
        'client_id': this.CLIENT_ID,
        'scope': this.SCOPES.join(' '),
        'immediate': true
    }, function(authResult) {
		if (authResult && !authResult.error) {
			that.loadDriveApi();
		}
	});
	
	//dispatch event here
	$('#googledrive-loadding').show();
	$('#googledrive-content').empty();
	$('#googledrive-breadcrumb').hide();
	$('#uploadGoogle').modal('show');
	
	var that = this;
	setTimeout(function() {
		$('#googledrive-loadding').hide();
		$('#googledrive-breadcrumb').show();
	}, 2000);
	*/
};

//{album-id}/photos
//me/albums?fields=id,name,cover_photo

FaceBook.prototype.callAPI = function(apiQuery, callback) {
	
	var that = this;
	
	$('#cloud-content').empty();
	$('#cloud-breadcrumb').hide();	
	$('#cloud-loadding').show();
	$('#cloudPopup').modal('show');
	
	FB.api(
		apiQuery,
		function (response) {
			if (response && !response.error) {					
				$('#cloud-loadding').hide();
				$('#cloud-breadcrumb').show();
				callback(response);
			}
		}
	);
};

FaceBook.prototype.onAlbumLoadedHandler = function(response) {
	for (var i = 0; i < response.data.length; i ++) {
		this.addFolder(response.data[i]);
	}
};

FaceBook.prototype.onAlbumDetailLoadedHandler = function(response) {
	console.log(response);
};

FaceBook.prototype.addFolder = function(file) {
	var thumbnail = 'http://cuongtran3001.github.io/wedding/images/video/folder.png';
	var title = file.name;
	var albumId = file.id;
	
	var div = $('<div data-item-id="item_1" data-item-url="Image1.png" class="item col-xs-3">' +
				'	<span>' + title + '</span>' +
				'	<div class="thumb"><img src="' + thumbnail + '" alt="" class="img-responsive"/></div>' +
				'</div>');
	$('#cloud-content').append(div);
	
	div.on('click', function(evt) {
		that.callAPI(albumId + '/photos', that.onAlbumDetailLoadedHandler);
	});
};

var facebook = new FaceBook();

$(document).ready(function() {
	$('#cloud-connect').on('click', function(evt) {
		facebook.connect();
	});
});