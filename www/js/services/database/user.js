angular.module('starter.service.user', ['starter.database'])

.factory('UserService', ['$q', 'DatabaseService', function ($q, DatabaseService) {

  return {

    registerUser: function(fullname, email, password){
      DatabaseService.insertUser(fullname, email, password);
    },

    deleteUser: function(userId){
       //  delete user
    },

    updateUser: function (title, description, user_id) {
      //  update user
    },

    userExists: function(email, password){
      var q = $q.defer();
      var response = '';
      DatabaseService.userExists(email, password).then(function(result){
        response = result;
        q.resolve(response);
      });
      return q.promise;
    },

    findUserById: function (userId) {
      var q = $q.defer();
      var user = {};
      DatabaseService.findUserById(userId).then(function(result){
        user['id'] = result.rows.item(0).user_id;
        user['fullname'] = result.rows.item(0).user_fullname;
        user['email'] = result.rows.item(0).user_email;
        q.resolve(user);
      });
      return q.promise;
    },
    findUserByEmail: function (email) {
      var q = $q.defer();
      var user = {};
      DatabaseService.findUserByEmail(email).then(function(result){
        user['id'] = result.rows.item(0).user_id;
        user['fullname'] = result.rows.item(0).user_fullname;
        user['email'] = result.rows.item(0).user_email;
        q.resolve(user);
      });
      return q.promise;
    },
    
    findUserByIdForSync: function (userId) {
      var q = $q.defer();
      var user = {};
      DatabaseService.findUserById(userId).then(function(result){
        user['androidId'] = result.rows.item(0).user_id;
        user['fullName'] = result.rows.item(0).user_fullname;
        user['email'] = result.rows.item(0).user_email;
        user['password'] = result.rows.item(0).user_password;
        user['lastTimeModified'] = result.rows.item(0).user_last_time_modified;
        q.resolve(user);
      });
      return q.promise;
    }

  };

}]);
