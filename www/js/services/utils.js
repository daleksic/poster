angular.module('starter.utils', [])

.factory('UtilsService', ['$q', '$window' , function ($q, $window) {

  return {

    get: function (key) {
      var q = $q.defer();
      var valueResponse = undefined;
      var preferences = $window.plugins.appPreferences;
      preferences.fetch (function (value) {
        console.log('Utils get: ' + value);
        q.resolve(value);
      }, function (error) {
        console.log(error);
        q.reject(error);
      }, key);

      return q.promise;
    },

    set: function (key, value) {
      var q = $q.defer();
      var preferences = $window.plugins.appPreferences;
      preferences.store (function (result){
            console.log('Utils set: ' + result);
            q.resolve(result);
        }, function (error) {
          console.log(error);
          q.reject(error);
        }, key, value);

        return q.promise;
    }

  };

}]);
