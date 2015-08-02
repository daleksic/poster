angular.module('starter.settings', [])

.controller('SettingsCtrl', function($scope, $ionicModal,  UtilsService) {

  $scope.splashScreenLength = 3;
  $scope.syncDataTime = 15;

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
    $scope.modalTheme.show();
  };
  $scope.closeModalTheme = function() {
    $scope.modalTheme.hide();
  };


  $ionicModal.fromTemplateUrl('templates/modal/splashScreen.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalSplash = modal;
  });
  $scope.openModalSplash = function() {
    console.log('splash open');

    UtilsService.get('PosterSplashScreenDelay').then(function(value){

      console.log('Settings splashScreenDelay: ' + value);
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
    console.log('splash ok');
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
    $scope.modalSyncDataTime.show();
  };
  $scope.closeModalmodalSyncDataTime = function() {
    $scope.modalSyncDataTime.hide();
  };



  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modalTheme.remove();
    $scope.modalSplash.remove();
    $scope.modalSyncDataTime.remove()
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
