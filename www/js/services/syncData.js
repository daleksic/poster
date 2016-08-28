angular.module('starter.sync', [])

.factory('SyncService', ['$q', '$window' ,'GApi', '$cordovaToast', 'UserService', 'AlbumService', 'ImageService', function ($q, $window, GApi, $cordovaToast, UserService, AlbumService, ImageService) {

  return {

    loadPosterEndpoints: function () {
      var BASE = 'https://posterapi-971.appspot.com/_ah/api';
      var NAME = 'posterendpoint';
      var VERSION = 'v1';
        GApi.load(NAME,VERSION,BASE).then(function(resp) {
            console.log('api: ' + resp.api + ', version: ' + resp.version + ' loaded');
        }, function(resp) {
            console.log('an error occured during loading api: ' + resp.api + ', resp.version: ' + resp.version);
        });
    },

    listUsers: function () {  
        GApi.execute('posterendpoint', 'listUser').then( function(resp) {
            console.log('List users ' + resp);
        }, function() {
           console.log('Error: failed to list users');
        });
    },
    
    updateUser: function (user, albums) {
         GApi.execute('posterendpoint', 'updateUser', {key: user.key, androidId: user.androidId, fullName:user.fullName, email:user.email, password:user.password, lastTimeModified:user.lastTimeModified, albums:albums}).then( function(resp) {
            console.log('Update user: ' + resp);
        }, function() {           
            console.log('Error: failed to update user');
        });     
    },
    
    syncData: function (userId) {      
        // check network connection
        
        // check if user exists
        // // update user
        // // insert user 
        GApi.execute('posterendpoint', 'getUserByAndroidId', {androidId: userId}).then( function(userDatastore) {
             if(JSON.stringify(userDatastore.result)!="{}") {//userDatastore.result != '' && userDatastore != undefined) {
                 // update user
                  $cordovaToast.show('User: ' + JSON.stringify(userDatastore), 'long', 'center');
                  AlbumService.findAlbumsByUserIdForSync(userId).then(function(albumsLocal) {

                        this.syncAlbums(albumsLocal, userDatastore);  
                                             
                  }); 
             }else{
                 // insert user 
                  UserService.findUserByIdForSync(userId).then(function(userLocal) {
                      AlbumService.findAlbumsByUserIdForSync(userId).then(function(albumsLocal) {

                          GApi.execute('posterendpoint', 'insertUser', {androidId: userLocal.androidId, fullName:userLocal.fullName, email:userLocal.email, password:userLocal.password, lastTimeModified:userLocal.lastTimeModified, albums:albumsLocal}).then( function(result) {                
           
                           }, function() {
                                    $cordovaToast.show('insert user error :(', 'long', 'bottom');
                           });
                                             
                      });                                      
                  });                                       
             }
           
        }, function() {
             $cordovaToast.show('error :(', 'long', 'bottom');
        });
    },
    
    syncAlbums: function (albumsLocal, userDatastore) {
        
        var albumsLocalMap = {};
        var albumsDatastoreMap = {};
        
        for (var i = 0; i < userDatastore.albums.length; i++) {         
            albumsDatastoreMap[userDatastore.albums[i].androidId] = userDatastore.albums[i];
        }
        for (var i = 0; i < albumsLocal.length; i++) {         
            albumsLocalMap[albumsLocal[i].androidId] = albumsLocal[i];
        }
        
        if (userDatastore.albums.length > 0 && albumsLocal.length > 0) {
            
            for (var n = 0; n < albumsLocal.length; n++) {
                if(albumsDatastoreMap[albumsLocal[n].androidId] != undefined) {
                    var albumDatastore = albumsDatastoreMap[albumsLocal[n].androidId];
                    if(albumsLocal[n].lastTimeModified != albumDatastore.lastTimeModified) {
                        albumDatastore.title = albumsLocal[n].title;
                        albumDatastore.description = albumsLocal[n].description;
                        albumDatastore.lastTimeModified = albumsLocal[n].lastTimeModified;
                    }
                    
                } else {
                    
                    userDatastore.albums.push(albumsLocal[n]);
                }
            } 
            
            for (var n = 0; n < userDatastore.albums.length; n++) {
                if(albumsLocalMap[userDatastore.albums[n].androidId] == undefined) {
                    this.removeItem(userDatastore.albums, userDatastore.albums[n]);
                    
                }
            }  
             // update user
            this.updateUser(userDatastore, userDatastore.albums);
            
        } else if (userDatastore.albums.length == 0 && albumsLocal.length > 0) {
            // update user
            this.updateUser(userDatastore, albumsLocal);
        } else if (userDatastore.albums.length > 0 && albumsLocal.length == 0) {
            // update user
            this.updateUser(userDatastore, []);
        } 
    },
    
    removeItem: function(array, item) {
      for(var i = array.length; i--;) {
          if(array[i] === item) {
              array.splice(i, 1);
          }
      }
  }

  };

}]);
