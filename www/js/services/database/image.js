angular.module('starter.service.image', ['starter.database'])

.factory('ImageService', ['$q', 'DatabaseService', '$cordovaToast', function ($q, DatabaseService, $cordovaToast) {

  return {

    addImage: function(title, location, uri, width, height, contentType, albumId){
      DatabaseService.insertImage(title, location, uri, width, height, contentType, albumId);
    },

    deleteImage: function(imageId){
      DatabaseService.deleteImage(imageId);
    },
    
    deleteImagesByAlbumId: function(albumId){
      DatabaseService.deleteImagesByAlbumId(albumId);
    },

    imageExists: function(title){
      var q = $q.defer();
      var response = '';
      DatabaseService.imageExists(title).then(function(result){
        response = result;
        q.resolve(response);
      });
      return q.promise;
    },

    findImageById: function (imageId) {
      var q = $q.defer();
      var image = {};
      DatabaseService.findImageById(imageId).then(function(result){
        for(var i=0; i < result.rows.length; i++){
          image['id'] = result.rows.item(0).image_id;
          image['title'] = result.rows.item(0).image_title;
          image['location'] = result.rows.item(0).image_location;
          image['uri'] = result.rows.item(0).image_uri;
          image['date_created'] = result.rows.item(0).image_date_created;
        }
        q.resolve(image);
      });
      return q.promise;
    },
    findImagesByAlbumId: function (albumId) {
      var q = $q.defer();
      var images = [];
      DatabaseService.findImagesByAlbumId(albumId).then(function(result){
        for(var i=0; i < result.rows.length; i++){
          var image = {};
          image['id'] = result.rows.item(i).image_id;
          image['title'] = result.rows.item(i).image_title;
          image['location'] = result.rows.item(i).image_location;
          image['uri'] = result.rows.item(i).image_uri;
          image['date_created'] = result.rows.item(i).image_date_created;
          images.push(image);
       }
       q.resolve(images);

     });
     return q.promise;
   },
   
   findImagesByAlbumIdForSync: function (albumId) {
      var q = $q.defer();
      var images = [];
      DatabaseService.findImagesByAlbumId(albumId).then(function(result){
        for(var i=0; i < result.rows.length; i++){
          var image = {};
          image['androidId'] = result.rows.item(i).image_id;
          image['title'] = result.rows.item(i).image_title;
          image['location'] = result.rows.item(i).image_location;
          image['uri'] = result.rows.item(i).image_uri;
          image['dateCreated'] = result.rows.item(i).image_date_created;
          image['contentType'] = result.rows.item(i).image_content_type;
          image['width'] = result.rows.item(i).image_width;
          image['height'] = result.rows.item(i).image_height;
          image['lastTimeModified'] = result.rows.item(i).image_last_time_modified;
          
          images.push(image);
       }
       q.resolve(images);

     });
     return q.promise;
   }

 };

}]);
