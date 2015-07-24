// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.login', 'starter.albums', 'starter.albumdetail', 'starter.imagedetail','starter.settings'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'LoginCtrl'
  })
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html"

  })
  .state('app.albums', {
    url: "/albums",
    views: {
      'menuContent': {
        templateUrl: "templates/albums.html",
        controller: 'AlbumsCtrl'
      }
    }
  })
  .state('app.albumDetail', {
    url: "/albums/:albumId",
    views: {
      'menuContent': {
        templateUrl: "templates/albumDetail.html",
        controller: 'AlbumDetailCtrl'
      }
    }
  })
  .state('app.imageDetail', {
    url: "/albums/:albumId/images/:imageId",
    views: {
      'menuContent': {
        templateUrl: "templates/imageDetail.html",
        controller: 'ImageDetailCtrl'
      }
    }
  })
  .state('app.settings', {
    url: "/settings",
    views: {
      'menuContent': {
        templateUrl: "templates/settings.html",
        controller: 'SettingsCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/login');
});
