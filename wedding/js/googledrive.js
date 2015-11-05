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
	var that = this;
	gapi.auth.authorize({
        'client_id': this.CLIENT_ID,
        'scope': this.SCOPES.join(' '),
        'immediate': true
    }, function(result) {
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
	console.log(gapi.client.drive.files.list);
};


$('#googledrive-connect').on('click', function(evt) {
	googleDrive.connect();
});
