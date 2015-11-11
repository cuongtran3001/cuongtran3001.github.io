function FaceBook() {
	this.SCOPES = 'public_profile, user_photos, user_videos';
	
	this.state = null;
	this.isMe = false;
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
	
	$('#cloud-breadcrumb').find('.separate').hide();
	$('#cloud-breadcrumb').find('.album').html('');
				
	if (this.state) {
		that.callMe();
		that.callAPI('me/albums?fields=id,name,cover_photo', function(response) { that.onAlbumLoadedHandler(response); });
	} else {	
		FB.login(function(response) {
			if (response.status === 'connected') {
				that.state = 'LOGIN';
				that.callMe();
				that.callAPI('me/albums?fields=id,name,cover_photo', function(response) { that.onAlbumLoadedHandler(response); });
			}
		  
			else if (response.status === 'not_authorized') {
				// The person is logged into Facebook, but not your app.
			} 
		  
			else {
				// The person is not logged into Facebook, so we're not sure if
				// they are logged into this app or not.
			}
		}, {scope: this.SCOPES});
	}
};

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

FaceBook.prototype.callMe = function() {
	var that = this;
	
	if (!that.isMe) {
		FB.api(
			'me/',
			function (response) {
				if (response && !response.error) {					
					that.isMe = true;
					$('#cloud-breadcrumb').find('.root').html(response.name);
					$('#cloud-breadcrumb').find('.root').on('click', function(evt) { that.onClickMeHandler(evt); });
					$('#cloud-breadcrumb').find('.album').on('click', function(evt) { that.onClickAlbumHandler(evt); });
				}
			}
		);
	}	
};

FaceBook.prototype.onClickMeHandler = function(evt) {
	$('#cloud-breadcrumb').find('.separate').hide();
	$('#cloud-breadcrumb').find('.album').html('');
	
	var that = this;
	that.callAPI('me/albums?fields=id,name,cover_photo', function(response) { that.onAlbumLoadedHandler(response); });
};

FaceBook.prototype.onClickAlbumHandler = function(evt) {
	var that = this;
	
	var albumId = $('#cloud-breadcrumb').find('.album').data('album-id');	
	that.callAPI(albumId + '/photos?fields=id,name,images,url', function(response) { that.onAlbumDetailLoadedHandler(response); });
};

FaceBook.prototype.onAlbumLoadedHandler = function(response) {
	for (var i = 0; i < response.data.length; i ++) {
		this.addFolder(response.data[i]);
	}
};

FaceBook.prototype.onAlbumDetailLoadedHandler = function(response) {
	for (var i = 0; i < response.data.length; i ++) {
		this.addPhoto(response.data[i]);
	}
};

FaceBook.prototype.addFolder = function(folder) {
	var that = this;
	var title = folder.name;
	var albumId = folder.id;
	
	var div = $('<div data-item-id="item_1" data-item-url="Image1.png" class="item col-xs-3">' +
				'	<span>' + title + '</span>' +
				'	<div class="thumb"><img src="" alt="" class="img-responsive"/></div>' +
				'</div>');
	$('#cloud-content').append(div);
	
	FB.api(
		albumId + '/picture',
		function (response) {
			if (response && !response.error) {					
				div.find('.thumb img').attr('src', response.data.url);
			}
		}
	);
		
	div.on('click', function(evt) {	
		$('#cloud-breadcrumb').find('.separate').show();
		$('#cloud-breadcrumb').find('.album').html(title);
		$('#cloud-breadcrumb').find('.album').data('album-id', albumId);
				
		that.callAPI(albumId + '/photos?fields=id,name,images,url', function(response) { that.onAlbumDetailLoadedHandler(response); });
	});
};

FaceBook.prototype.addPhoto = function(photo) {
	var that = this;
	
	var height = 10000;
	var thumbnail = 'http://cuongtran3001.github.io/wedding/images/video/folder.png';
	
	for (var i = 0; i < photo.images.length; i ++) {
		if (photo.images[i].height < height) {
			height = photo.images[i].height;
			thumbnail = photo.images[i].source;
		}
	}
	
	var div = $('<div data-item-id="item_1" data-item-url="Image1.png" class="item col-xs-3">' +
				'	<div class="thumb"><img src="' + thumbnail + '" alt="" class="img-responsive"/></div>' +
				'</div>');
	$('#cloud-content').append(div);
	
	div.on('click', function(evt) {		
		div.toggleClass('active');
	});
};

var facebook = new FaceBook();

$(document).ready(function() {
	$('#cloud-connect').on('click', function(evt) {
		facebook.connect();
	});
});