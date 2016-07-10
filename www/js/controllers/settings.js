angular.module('starter.settings', [])

.controller('SettingsCtrl', function($scope, $ionicModal,  UtilsService) {

  $scope.splashScreenLength = 3;
  $scope.syncDataTime = 15;
  $scope.theme = '';

  $scope.currentThemeBackgroundColor = '';
  $scope.currentThemeBorder = '';
  $scope.currentThemeTextColor = '';
  $scope.currentThemeButton = '';


  $scope.$on('$ionicView.enter', function(){
    UtilsService.get('PosterTheme').then(function(value){
      var defaultTheme = 'light';
      if(value != undefined){
        defaultTheme =  value;
      }
      $scope.currentThemeBackgroundColor = defaultTheme + '-bg';
      if(defaultTheme == 'dark'){
        $scope.currentThemeTextColor = 'light';
        $scope.currentThemeBorder = 'dark-border-color';
        $scope.currentThemeButton = 'button-dark';
      }else{
        $scope.currentThemeTextColor = 'dark';
        $scope.currentThemeBorder = 'light-border-color';
        $scope.currentThemeButton = 'button-stable';
      }
    });
  });

  $scope.dragRangeSyncDataTime = function(value) {
    $scope.syncDataTime= value;
  };

  $scope.dragRangeSplash = function(value) {
    $scope.splashScreenLength = value;
  };

  $ionicModal.fromTemplateUrl('templates/modal/theme.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalTheme = modal;
  });
  $scope.openModalTheme = function() {

    UtilsService.get('PosterTheme').then(function(value){
      var defaultTheme = 'light';
      if(value != undefined){
        defaultTheme =  value;
      }
      $scope.theme = defaultTheme;
      $scope.modalTheme.show();
    });
  };
  $scope.closeModalTheme = function() {

    $scope.modalTheme.hide();
  };
  $scope.saveThemePreference = function () {

    UtilsService.set('PosterTheme', $scope.theme);
    $scope.$parent.$broadcast( "$ionicView.enter" );
    $scope.modalTheme.hide();

  };
  $scope.lightThemeSelected = function(theme){
    $scope.theme = theme;
  };
  $scope.darkThemeSelected = function(theme){
    $scope.theme = theme;
  };


  $ionicModal.fromTemplateUrl('templates/modal/splashScreen.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalSplash = modal;
  });

  $scope.openModalSplash = function() {

    UtilsService.get('PosterSplashScreenDelay').then(function(value){
      var delay = 3000;
      if(value != undefined){
          delay =  value;
      }
      $scope.splashScreenLength = delay/1000;
      $scope.modalSplash.show();
    });
  };

  $scope.closeModalSplash = function() {

    $scope.modalSplash.hide();
  };

  $scope.saveSplashScreenPreference = function () {

    UtilsService.set('PosterSplashScreenDelay', $scope.splashScreenLength*1000);
    $scope.modalSplash.hide();
  };


  $ionicModal.fromTemplateUrl('templates/modal/syncData.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalSyncDataTime = modal;
  });
  
  $scope.openModalmodalSyncDataTime = function() {
      UtilsService.get('SyncDataTime').then(function(value){
      if(value != undefined){
          $scope.syncDataTime =  value;
      }
      $scope.modalSyncDataTime.show();
    });
  };
  
  $scope.closeModalmodalSyncDataTime = function() {
    $scope.modalSyncDataTime.hide();
  };
  
  $scope.saveSyncDataTime = function () {
    UtilsService.set('SyncDataTime', $scope.syncDataTime);
    $scope.modalSyncDataTime.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modalTheme.remove();
    $scope.modalSplash.remove();
    $scope.modalSyncDataTime.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });




});
