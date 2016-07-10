angular.module('starter.service.album', ['starter.database'])

.factory('AlbumService', ['$q', 'DatabaseService', 'ImageService', function ($q, DatabaseService, ImageService) {

  return {

    addAlbum: function(title, description, userId){
      DatabaseService.insertAlbum(title, description, userId);
    },

    deleteAlbum: function(albumId){
      DatabaseService.deleteAlbum(albumId);
    },

    updateAlbum: function (title, description, albumId) {

      DatabaseService.updateAlbum(title, description, albumId);
    },

    albumExists: function(title){
      var q = $q.defer();
      var response = '';
      DatabaseService.albumExists(title).then(function(result){
        response = result;
        q.resolve(response);
      });
      return q.promise;
    },

    findAlbumById: function (albumId) {
      var q = $q.defer();
      var album = {};
      DatabaseService.findAlbumById(albumId).then(function(result){
          album['id'] = result.rows.item(0).album_id;
          album['title'] = result.rows.item(0).album_title;
          album['description'] = result.rows.item(0).album_description;
          album['userId'] = result.rows.item(0).album_user_id;
          ImageService.findImagesByAlbumId(result.rows.item(0).album_id).then(function(images){

            album['images'] = images;

          });

        q.resolve(album);

      });
      return q.promise;
    },
    findAlbumsByUserId: function (userId) {
      var q = $q.defer();
      var albums = [];
      DatabaseService.findAlbumsByUserId(userId).then(function(result){
        for(var i=0; i < result.rows.length; i++){
          var album = {};
          album['id'] = result.rows.item(i).album_id;
          album['title'] = result.rows.item(i).album_title;
          album['description'] = result.rows.item(i).album_description;
          album['userId'] = result.rows.item(i).album_user_id;
          album['image'] = "file:///android_asset/www/img/defaultImage.jpg";
          
          albums.push(album);       
        }
        q.resolve(albums);
      });

      return q.promise;
  },
  
  findAlbumsByUserIdForSync: function (userId) {
      var q = $q.defer();
      var albums = [];
      DatabaseService.findAlbumsByUserId(userId).then(function(result){
        for(var i=0; i < result.rows.length; i++){
          var album = {};
          album['androidId'] = result.rows.item(i).album_id;
          album['title'] = result.rows.item(i).album_title;
          album['description'] = result.rows.item(i).album_description;
          album['lastTimeModified'] = result.rows.item(i).album_last_time_modified;

          albums.push(album);
        }
        q.resolve(albums);
      });

      return q.promise;
  }

  };

}]);
