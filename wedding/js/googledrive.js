var googleDrive = new GoogleDrive();

function onGooglClientApiLoadedHandler() {
	googleDrive.init();
}

function GoogleDrive() {

}

GoogleDrive.prototype.init = function() {
	console.log('init');
};

GoogleDrive.prototype.connect = function() {
	console.log('connect');
};

$('#googledrive-connect').on('click', function(evt) {
	googleDrive.connect();
}
