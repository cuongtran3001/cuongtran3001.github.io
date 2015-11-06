var googleDrive = new GoogleDrive();
$('#googledrive-connect').on('click', function(evt) {
	googleDrive.connect();
});

function onGooglClientApiLoadedHandler() {
	googleDrive.init();
}

function GoogleDrive() {
	this.CLIENT_ID = '691726389794-7cu5v657t6p7i8rthgh3h41re6n73obl.apps.googleusercontent.com';
    this.API_KEY = 'AIzaSyCJlI_jMOBXFbuhESUdg-epZHjAmiQKckM';
    this.SCOPES = ['https://www.googleapis.com/auth/drive'];
}

GoogleDrive.prototype.init = function() {
	gapi.client.setApiKey(this.API_KEY);
};

GoogleDrive.prototype.connect = function() {
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
		
		that.addFile({thumbnailLink: 'images/video/folder.png'});
		that.addFile({thumbnailLink: 'images/video/folder.png'});
		that.addFile({thumbnailLink: 'images/video/Thumb1.png'});
		that.addFile({thumbnailLink: 'images/video/Thumb2.png'});
		that.addFile({thumbnailLink: 'images/video/Thumb3.png'});
		that.addFile({thumbnailLink: 'images/video/Thumb4.png'});
		that.addFile({thumbnailLink: 'images/video/Thumb1.png'});
		that.addFile({thumbnailLink: 'images/video/Thumb2.png'});
		that.addFile({thumbnailLink: 'images/video/Thumb3.png'});
		that.addFile({thumbnailLink: 'images/video/Thumb4.png'});
	}, 2000);
};

GoogleDrive.prototype.loadDriveApi = function() {
	var that = this;
	gapi.client.load('drive', 'v2', function() {
		that.onDriveLoadHandler();
	});
};

GoogleDrive.prototype.onDriveLoadHandler = function() {
	this.loadFiles('root');
};

GoogleDrive.prototype.loadFiles = function(folderId) {
	var that = this;
	var request = gapi.client.request({
		'path': 'drive/v2/files?q=trashed=false ' +
				'and ( ' +
                'mimeType contains "folder" ' +
                'or mimeType contains "jpeg") and "' + folderId + '" in parents',
		'method': 'GET',
		'params': {'maxResults': 1000}
    });

	request.execute(function(resp) {
	  var files = resp.items;
	  if (files && files.length > 0) {
		for (var i = 0; i < files.length; i++) {
			that.addFile(files[i]);
		}
	  }
	});
};

GoogleDrive.prototype.addFile = function(file) {
	var div = $('<div data-item-id="item_1" data-item-url="Image1.png" class="item col-xs-3"><div class="thumb"><img src="' + file.thumbnailLink + '" alt="" class="img-responsive"/></div></div>');
	$('#googledrive-content').append(div);
};
