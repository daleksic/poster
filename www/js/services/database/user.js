angular.module('starter.service.user', ['starter.database'])

.factory('UserService', ['DatabaseService', function (DatabaseService) {

  return {

    registerUser: function(fullname, email, password){
      DatabaseService.insertUser(fullname, email, password);
    },

    deleteUser: function(userId){
    //  DatabaseService.deletetUser(userId);
    },

    updateUser: function (title, description, user_id) {


    },

    userExists: function(email){
      //DatabaseService.deletetUser(userId);
    },

    findUserById: function (albumId) {

    }

  };

}]);
