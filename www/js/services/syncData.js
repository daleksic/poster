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
            $cordovaToast.show('Users: ' + resp.items.length, 'long', 'center');
        }, function() {
             $cordovaToast.show('error :(', 'long', 'bottom');
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
    }

  };

}]);
