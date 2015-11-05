var googleDrive = new GoogleDrive();

function onGooglClientApiLoadedHandler() {
	googleDrive.init();
}

function GoogleDrive() {

}

GoogleDrive.prototype.init = function() {
	alert(0);
};

