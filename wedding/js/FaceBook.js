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
	
	if (this.state) {
		console.log('Logon. Can call API');
		
	} else {	
		FB.login(function(response) {
			console.log(response);
			
		  if (response.status === 'connected') {
			that.state = 'LOGIN';
		  }
		  
		  else if (response.status === 'not_authorized') {
			// The person is logged into Facebook, but not your app.
		  } 
		  
		  else {
			// The person is not logged into Facebook, so we're not sure if
			// they are logged into this app or not.
		  }
		});
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

FaceBook.prototype.loadDriveApi = function() {
	//var that = this;
	//gapi.client.load('drive', 'v2', function() {
	//	that.onDriveLoadHandler();
	//});
};

FaceBook.prototype.onDriveLoadHandler = function() {
	//this.loadFiles('root');
};

FaceBook.prototype.loadFiles = function(folderId) {
	
};

FaceBook.prototype.addFile = function(file) {
  var thumbnail = file.mimeType != 'application/vnd.google-apps.folder' ? file.thumbnailLink : 'http://cuongtran3001.github.io/wedding/images/video/folder.png';
  
	var div = $('<div data-item-id="item_1" data-item-url="Image1.png" class="item col-xs-3"><div class="thumb"><img src="' + thumbnail + '" alt="" class="img-responsive"/></div></div>');
	$('#googledrive-content').append(div);
};

$(document).ready(function() {
	$('#cloud-connect').on('click', function(evt) {
		facebook.connect();
	});
});