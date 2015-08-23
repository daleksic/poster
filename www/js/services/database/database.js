angular.module('starter.database', [])

.factory('DatabaseService', function ($q, $cordovaSQLite) {

  return {

    getDatabase: function(){
      var db = $cordovaSQLite.openDB('posterionic.db');
      return db;
    },

    deletetDatabase: function(name){
      $cordovaSQLite.deleteDB(name);
    },

    initDatabase: function(){
      //'DROP TABLE IF EXISTS test_table'
      $cordovaSQLite.execute(this.getDatabase(), "CREATE TABLE IF NOT EXISTS user ( user_id integer primary key autoincrement, user_fullname text not null, user_email text not null, user_password text not null, user_last_time_modified text not null)");
      $cordovaSQLite.execute(this.getDatabase(), "CREATE TABLE IF NOT EXISTS album ( album_id integer primary key autoincrement, album_title text not null, album_description text not null, album_last_time_modified text not null, album_user_id integer not null, foreign key ( album_user_id ) references user ( user_id ))");
      $cordovaSQLite.execute(this.getDatabase(), "CREATE TABLE IF NOT EXISTS image ( image_id integer primary key autoincrement, image_title text not null, image_location text not null, image_uri text not null, image_date_created text not null, image_width text not null, image_height text not null, image_content_type text not null, image_last_time_modified text not null, image_album_id integer not null, foreign key (  image_album_id ) references album ( album_id ))");
    },

    insertAlbum: function (title, description, user_id) {

      var query = "INSERT INTO album (album_title, album_description, album_last_time_modified, album_user_id) VALUES ( ?, ?, ?, ?)";
      $cordovaSQLite.execute(this.getDatabase(), query, [title, description,new Date(), user_id]).then(function(res) {                 // potrebno formatiranje datuma
        console.log("INSERT ID -> " + res.insertId);
      }, function (err) {
        console.error(err);
      });

    },

    updateAlbum: function (title, description, albumId) {
      var query = "UPDATE  album SET album_title = ?, album_description = ?, album_last_time_modified = ? WHERE album_id = ?";
      $cordovaSQLite.execute(this.getDatabase(), query, [title, description,new Date() + '', albumId]).then(function(res) {                 // potrebno formatiranje datuma
        console.log("UPDATED ID -> " + res.insertId);
      }, function (err) {
        console.error(err);
      });
    },

   // delete from database and file system
    deleteAlbum: function (albumId) {
      var query = "DELETE FROM album WHERE album_id = ?";
      $cordovaSQLite.execute(this.getDatabase(), query, [albumId]).then(function(res) {
        console.log("DELETED ID -> " + res.insertId);
      }, function (err) {
        console.error(err);
      });
    },

    findAlbumById: function (albumId) {
      var q = $q.defer();
      var query = "SELECT album_id, album_title, album_description FROM album WHERE album_id = ?";
      $cordovaSQLite.execute(this.getDatabase(), query, [albumId]).then(function(res) {
        if(res.rows.length > 0) {
          console.log("SELECTED -> ");
          q.resolve(res);
        } else {
          console.log("No results found");
        }
      }, function (err) {
        console.error(err);
        q.resolve(err);
      });
      return q.promise;
    },
    findAlbumsByUserId: function (userId) {
      var q = $q.defer();
      var query = "SELECT album_id, album_title, album_description, album_user_id FROM album WHERE album_user_id = ?";
      $cordovaSQLite.execute(this.getDatabase(), query, [userId]).then(function(res) {
        if(res.rows.length > 0) {
          console.log("SELECTED -> " + res.rows.length + " ALBUMS");
          q.resolve(res);

        } else {
          console.log("No results found");
        }
      }, function (err) {
        console.error(err);
        q.resolve(err);
      });
      return q.promise;
    },

    insertImage: function (title, location, uri, width, height, contentType, albumId) {
      var query = "INSERT INTO image (image_title, image_location, image_uri, image_date_created, image_width, image_height, image_content_type, image_last_time_modified, image_album_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      $cordovaSQLite.execute(this.getDatabase(), query, [title, location, uri,  new Date()+'', width, height, contentType, new Date()+'', albumId]).then(function(res) {                 // potrebno formatiranje datuma

        console.log("INSERT ID -> " + res.insertId);
      }, function (err) {
        console.error(err);
      });
    },

    // delete from database and file system
    deleteImage: function (imageId) {
      var query = "DELETE FROM image WHERE image_id = ?";
      $cordovaSQLite.execute(this.getDatabase(), query, [imageId]).then(function(res) {
        console.log("DELETED ID -> " + res.insertId);
      }, function (err) {
        console.error(err);
      });

    },
    findImageById: function (imageId) {
      var q = $q.defer();
      var query = "SELECT image_id, image_title, image_location, image_uri, image_date_created, image_width, image_height, content_type, image_last_time_modified, image_album_id FROM image WHERE image_id = ?";
      $cordovaSQLite.execute(this.getDatabase(), query, [imageId]).then(function(res) {
        if(res.rows.length > 0) {
          console.log("SELECTED -> ");
          //  console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);

          q.resolve(res);
        } else {
          console.log("No results found");
        }
      }, function (err) {
        console.error(err);
        q.resolve(err);
      });
       return q.promise;

    },
    findImagesByAlbumId: function (albumId) {
      var q = $q.defer();
      var query = "SELECT * FROM image WHERE image_album_id = ?";
      $cordovaSQLite.execute(this.getDatabase(), query, [albumId]).then(function(res) {
        if(res.rows.length > 0) {
          console.log("SELECTED -> " + res.rows.length + " IMAGES");
          //console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
// image_id, image_title, image_location, image_uri, image_date_created, image_width, image_height, content_type, image_last_time_modified, image_album_id
          q.resolve(res);
        } else {
          console.log("No results found");
        }
      }, function (err) {
        console.error(err);
        q.resolve(err);
      });
      return q.promise;
    },
    insertUser: function (fullName, email, password) {

      var query = "INSERT INTO user (user_fullname, user_email, user_password, user_last_time_modified) VALUES ( ?, ?, ?, ?)";
      $cordovaSQLite.execute(this.getDatabase(), query, [fullName, email, password, new Date() + '']).then(function(res) {                 // potrebno formatiranje datuma
        console.log("INSERT ID -> " + res.insertId);
      }, function (err) {
        console.error(err);
      });

    },

  };

});
