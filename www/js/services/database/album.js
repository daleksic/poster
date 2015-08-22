angular.module('starter.service.album', ['starter.database'])

.factory('AlbumService', ['$q', 'DatabaseService', function ($q, DatabaseService) {

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

    findAlbumById: function (albumId) {
      var q = $q.defer();
      var album = {};
      DatabaseService.findAlbumById(albumId).then(function(result){
          album['id'] = result.rows.item(0).album_id;
          album['title'] = result.rows.item(0).album_title;
          album['description'] = result.rows.item(0).album_description;
          album['userId'] = result.rows.item(0).album_user_id;
          album['images'] = [{id: 1, uri:'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pastemagazine.com%2Fblogs%2Flists%2F2009%2F11%2F15%2Fdangerdoom_mouse_mask.jpg&f=1'},
                            {id: 2, uri:'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pastemagazine.com%2Fblogs%2Flists%2F2009%2F11%2F15%2Fdangerdoom_mouse_mask.jpg&f=1'},
                            {id: 3, uri:'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pastemagazine.com%2Fblogs%2Flists%2F2009%2F11%2F15%2Fdangerdoom_mouse_mask.jpg&f=1'}];

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
          album['image'] = 'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pastemagazine.com%2Fblogs%2Flists%2F2009%2F11%2F15%2Fdangerdoom_mouse_mask.jpg&f=1';
          albums.push(album);
        }
        console.log(JSON.stringify(albums));
        q.resolve(albums);
      });
      return q.promise;
  }

  };

}]);
