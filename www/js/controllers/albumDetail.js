angular.module('starter.albumdetail', [])

.controller('AlbumDetailCtrl', function($scope,  $window, $ionicActionSheet, $stateParams, $cordovaToast, $cordovaFile, UtilsService, AlbumService, ImageService) {

  $scope.selectedImage = '';
  $scope.selectedImageIndex = '';

  $scope.currentThemeBackgroundColor = '';
  $scope.currentThemeBorder = '';
  $scope.currentThemeTextColor = '';
  $scope.currentThemeButton = '';
  $scope.Itemheight = $window.innerWidth /2;
  $scope.hideActionSheet = '';

  $scope.album = {};
  $scope.albumId = '';
  $scope.images = [];
  
  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.albumId = $stateParams.albumId;
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

    AlbumService.findAlbumById($scope.albumId).then(function(album){
      $scope.album = album;
    //  console.log(JSON.stringify(album));
    });

  });

  $scope.onHold = function(id, index){
    $scope.selectedImage = id;
    $scope.selectedImageIndex = index;
    $scope.showActionSheet();
  };

  $scope.showActionSheet = function() {

    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: [
      //{ text: '<i class="icon ion-edit"></i> <b>Edit</b>' }
      ],
      destructiveText: '<i class="icon ion-android-delete"></i> <b>Delete</b>',
      titleText: 'Modify your photo',
      cancelText: 'Cancel',
      cancel: function() {
        // add cancel code..
      },
     buttonClicked: function(index) {
   
      },
      destructiveButtonClicked : function(){

        ImageService.findImageById($scope.selectedImage).then(function(image){
            $cordovaFile.removeFile(cordova.file.externalDataDirectory, image.title + '.jpg').then(function(result){ 
              console.log('image is removed.');
           });
           ImageService.deleteImage($scope.selectedImage);
           $scope.album.images.splice($scope.selectedImageIndex, 1);
           $scope.hideActionSheet();
           $cordovaToast.show('Photo is deleted', 'short', 'bottom');
        });
        return true;
      }
    });

    $scope.hideActionSheet = hideSheet;

  };

});
