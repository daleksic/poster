angular.module('starter.sync', [])

.factory('SyncService', ['$q', '$window' ,'GApi', '$cordovaToast', function ($q, $window, GApi, $cordovaToast) {

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
    }

  };

}]);
