var googleDrive = new GoogleDrive();
//$('#cloud-connect').on('click', function(evt) {
//  googleDrive.connect();
//});

function onGooglClientApiLoadedHandler() {
  googleDrive.init();
}

function GoogleDrive() {
  this.CLIENT_ID = '691726389794-s28o1ikvvepsjclilk8e6tv1gdmua7f9.apps.googleusercontent.com';
  this.API_KEY = 'AIzaSyBo1FC19SxyHcSgS_1qBTMzvU-xRHKF7wQ';
  this.SCOPES = ['https://www.googleapis.com/auth/drive'];  
  
  this.isMe = false;
  this.totalItem = 0;
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
      console.log(authResult);

    if (authResult && !authResult.error) {
      that.loadDriveApi();
    }
  });
  
  //dispatch event here 
  $('#cloud-breadcrumb').find('.separate').hide();
  $('#cloud-breadcrumb').hide();
    
  this.totalItem = 0;
};

GoogleDrive.prototype.loadDriveApi = function() {
  var that = this;
  gapi.client.load('drive', 'v2', function() {
    that.onDriveLoadHandler();
  });
};

GoogleDrive.prototype.onDriveLoadHandler = function() {
  var that = this;
  var request = gapi.client.drive.about.get();
  request.execute(function(response) {

    that.isMe = true;
    $('#cloud-breadcrumb').find('.root').html(response.name);
    $('#cloud-breadcrumb').find('.root').data('folderId', response.rootFolderId);
    
    $('#cloud-breadcrumb').find('.root').on('click', function(evt) { that.onClickMeHandler(evt); });
    $('#cloud-breadcrumb').find('.album').on('click', function(evt) { that.onClickAlbumHandler(evt); });
    
    that.loadFiles(response.rootFolderId);
  });
  
  //this.loadFiles('root');
};

GoogleDrive.prototype.onClickMeHandler = function(evt) {
  $('#cloud-breadcrumb').find('.separate').hide();
  $('#cloud-breadcrumb').find('.album').html('');
  
  var folderId = $('#cloud-breadcrumb').find('.root').data('folderId');
  this.loadFiles(folderId);
};

GoogleDrive.prototype.onClickAlbumHandler = function(evt) {
  var folderId = $('#cloud-breadcrumb').find('.album').data('folderId');
  this.loadFiles(folderId);
};

GoogleDrive.prototype.loadFiles = function(folderId) {
  var that = this;
  
  $('#cloud-loadding').show();  
  $('#cloud-content').empty();
  this.totalItem = 0;
  $('#cloud-breadcrumb').find('.selected-item').html('Selected ' + that.totalItem + ' item');
  
  var request = gapi.client.request({
    'path': 'drive/v2/files?q=trashed=false ' +
        'and ( ' +
                'mimeType contains "folder" ' +
                'or mimeType contains "jpeg"' +
                'or mimeType contains "png")' +
                ' and "' + folderId + '" in parents',
    'method': 'GET',
    'params': {'maxResults': 1000, 'orderBy': 'folder'}
    });
  
  request.execute(function(resp) {
    $('#cloud-loadding').hide();
    $('#cloud-breadcrumb').show();
  
    
    var files = resp.items;
    if (files && files.length > 0) {
      for (var i = 0; i < files.length; i++) {
        that.addFile(files[i]);
      }
    }
  });
};

GoogleDrive.prototype.addFile = function(file) {
  var that = this;
  
  var isFolder = file.mimeType != 'application/vnd.google-apps.folder' ? false : true;
  var thumbnail = isFolder ? 'http://cuongtran3001.github.io/wedding/images/video/folder.png' : file.thumbnailLink;  
  var title = isFolder ? file.title : '';
  var folderId = file.id;
  
  var div = $('<div data-item-id="item_1" data-item-url="Image1.png" class="item col-xs-3">' +
              '<span>' + title + '</span>' +
              '  <div class="thumb"><img src="' + thumbnail + '" alt="" class="img-responsive"/>'+
              '</div></div>');
  
  div.on('click', function(evt) {
    if (isFolder) {
      $('#cloud-breadcrumb').find('.separate').show();
      $('#cloud-breadcrumb').find('.album').html(title);
      $('#cloud-breadcrumb').find('.album').data('folderId', folderId);
      that.loadFiles(folderId);
    } else {
      div.toggleClass('active');
      
      if (div.hasClass('active')) {
        that.totalItem ++;
      } else {
        that.totalItem --;
      }
      $('#cloud-breadcrumb').find('.selected-item').html('Selected ' + that.totalItem + ' item');
      
    }
  });
  
  $('#cloud-content').append(div);
};
