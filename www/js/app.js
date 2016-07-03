// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'angular-google-gapi', 'starter.login', 'starter.register', 'starter.albums', 'starter.albumdetail', 'starter.imagedetail','starter.settings',
 'starter.effect', 'starter.utils', 'starter.image', 'starter.service.user', 'starter.service.album', 'starter.service.image', 'starter.menu',
  'starter.preloading', 'starter.validation', 'starter.geocoding', 'starter.sync' ])
//, 'starter.image'
.run(function($ionicPlatform, $window, $cordovaSplashscreen, $cordovaToast, UtilsService, DatabaseService, GApi, SyncService) {

  SyncService.loadPosterEndpoints();

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    DatabaseService.initDatabase();
    //DatabaseService.deletetDatabase('posterionic.db');

    UtilsService.get('PosterSplashScreenDelay').then(function(value){

      var delay = 3000;
      if(value != undefined){
        delay =  value;
      }

      setTimeout(function() {
        $cordovaSplashscreen.hide();
      }, delay - 2000);

    });

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('preloading', {
    url: "/preloading",
    templateUrl: "templates/preloading.html",
    controller: 'PreloadingCtrl'
  })
  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'LoginCtrl'
  })
  .state('register', {
    url: "/register",
    templateUrl: "templates/register.html",
    controller: 'RegisterCtrl'
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
  .state('app.effect', {
    url: "/albums/:albumId/effect",
    views: {
      'menuContent': {
        templateUrl: "templates/effect.html",
        controller: 'EffectCtrl'
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

  $urlRouterProvider.otherwise('/preloading');
});
