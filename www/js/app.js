// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'starter.login', 'starter.register', 'starter.albums', 'starter.albumdetail', 'starter.imagedetail','starter.settings', 'starter.effect', 'starter.utils'])

.run(function($ionicPlatform, $cordovaSplashscreen, UtilsService) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    var now = new Date().getTime();
    console.log("Time start: " + now);
    UtilsService.get('PosterSplashScreenDelay').then(function(value){

      var delay = 3000;
      if(value != undefined){
        delay =  value;
      }
      var now2 = new Date().getTime();
      var res = now2 - now;

      setTimeout(function() {
        $cordovaSplashscreen.hide();
      }, delay - res);
      
      console.log("Time finish: " + now);
      console.log("Time pass: " + res);
      console.log("AppJS delay: " + value);

    });

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

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
    url: "/effect",
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

  $urlRouterProvider.otherwise('/login');
});
