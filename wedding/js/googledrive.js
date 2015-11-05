var googleDrive = new GoogleDrive();
$('#googledrive-connect').on('click', function(evt) {
	googleDrive.connect();
});

function onGooglClientApiLoadedHandler() {
	googleDrive.init();
}

function GoogleDrive() {
	this.CLIENT_ID = '691726389794-4boot0bt98elrqjr6rqos45dvs7bf0f7.apps.googleusercontent.com';
    this.API_KEY = 'AIzaSyCbJYq6i_CJzt8okRFQw4frnBtvjp4IV80';
    this.SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
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
			//appendPre(files[i]);
			console.log(files[i]);
		}
	  }
	});
};