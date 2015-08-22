angular.module('starter.service.image', ['starter.database'])

.factory('ImageService', ['DatabaseService', function (DatabaseService) {

  return {

    addImage: function(title, description, userId){
      DatabaseService.insertAlbum(title, description, userId);
    },

    deleteImage: function(albumId){
      DatabaseService.deleteAlbum(albumId);
    },

    updateAlbum: function (title, description, albumId) {

      DatabaseService.insertAlbum(title, description, albumId);
    },

    findAlbumById: function (albumId) {
      var result = DatabaseService.findAlbumById(albumId);

    },
    findAlbumsByUserId: function (userId) {
      var result = DatabaseService.findAlbumsByUserId(userId);
      console.log("SELECTED -> ");
      console.log(result.rows.length);
      console.log("SELECTED -> ");
     }

};

}]);
