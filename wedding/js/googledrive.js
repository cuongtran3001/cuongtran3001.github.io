var googleDrive = new GoogleDrive();

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
	gapi.auth.authorize({
        'client_id': this.CLIENT_ID,
        'scope': this.SCOPES.join(' '),
        'immediate': true
    }, this.onAuthResultHandler);
};

GoogleDrive.prototype.onAuthResultHandler = function(authResult) {
    if (authResult && !authResult.error) {
		this.loadDriveApi();
    }

	else {
		
	}
};

GoogleDrive.prototype.loadDriveApi = function() {
	gapi.client.load('drive', 'v2', this.onDriveLoadHandler);
};

GoogleDrive.prototype.onDriveLoadHandler = function() {
	console.log(gapi.client.drive.files.list);
};


$('#googledrive-connect').on('click', function(evt) {
	googleDrive.connect();
});
