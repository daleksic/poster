angular.module('starter.albums', [])

.controller('AlbumsCtrl', function($window, $scope, $q, $state, $ionicActionSheet, $ionicModal, $ionicPopover, $cordovaToast, $cordovaFile, UtilsService, AlbumService, ValidationService, ImageService) {

  $scope.selectedAlbumId = '';
  $scope.selectedAlbumIndex = '';
  $scope.errorMessage = "";
  $scope.modalType = "";
  $scope.modalTypeTitle = "";
  $scope.activeUserId = "";

  $scope.currentThemeBackgroundColor = '';
  $scope.currentThemeBorder = '';
  $scope.currentThemeTextColor = '';
  $scope.currentThemeButton = '';
  $scope.Itemheight = $window.innerWidth /2;
  $scope.hideActionSheet = '';

  $scope.titleMessage = '';
  $scope.descriptionMessage = '';
  $scope.titleErrorShow = false;
  $scope.descriptionErrorShow = false;

  $scope.album = {
    title:'',
    description:''
  }

  $scope.albums = [];

  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.resetSelection();
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

    UtilsService.get('PosterActiveUser').then(function(userId){
      $scope.activeUserId = userId;
      AlbumService.findAlbumsByUserId($scope.activeUserId).then(function(albums){
        $scope.albums = albums;
        $scope.updateAlbumsImage();
      });
    });

  });
  
    $scope.updateAlbumsImage = function() {
     
        var promise = $q.all([]);
        
        angular.forEach($scope.albums, function (album, key) {
           promise = ImageService.findImagesByAlbumId(album.id).then(function(images){
                 if(images.length > 0) {
                      album.image = images[0].uri;
                 }       
             });
        });
        promise.finally(function () {
            console.log('Chain finished!');
        });
  };

  $scope.onHold = function(id, index){
    $scope.selectedAlbumId = id;
    $scope.selectedAlbumIndex = index;
    $scope.showActionSheet();
  };
  $scope.goToAlbum = function(id){
    $state.go('app.albums.detail', {albumId: id});

  };

  $scope.showActionSheet = function() {

    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: [
      { text: '<i class="icon ion-edit"></i><b>Edit</b>' }
      ],
      destructiveText: '<i class="icon ion-android-delete"></i><b>Delete</b>',
      titleText: 'Modify your album',
      cancelText: 'Cancel',
      cancel: function() {
        // add cancel code..
      },
      buttonClicked: function(index) {
        if(index == 0){        
          $scope.openModalUpdateAddAlbum('update');
        }
        return true;
      },
      destructiveButtonClicked : function(){
        ImageService.findImagesByAlbumId($scope.selectedAlbumId).then(function(images){
            var files = [];
            files = images;
            if(images.length > 0) {
                $scope.deleteFiles(files);
            }         
        });
        AlbumService.deleteAlbum($scope.selectedAlbumId);
        $scope.albums.splice($scope.selectedAlbumIndex, 1);
        $scope.resetSelection();
        $scope.hideActionSheet();
        $cordovaToast.show('Album is deleted.', 'short', 'bottom');                  
        
        return true;
      }
    });

    $scope.hideActionSheet = hideSheet;

  };

  $ionicModal.fromTemplateUrl('templates/modal/addAlbum.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalUpdateAddAlbum = modal;
  });
  $scope.openModalUpdateAddAlbum = function(type) {
    $scope.modalType = type;
    if(type == 'update'){
      $scope.modalTypeTitle = 'Edit';
      $scope.album.title = $scope.albums[$scope.selectedAlbumIndex].title;
      $scope.album.description = $scope.albums[$scope.selectedAlbumIndex].description;
    }else{
      $scope.modalTypeTitle = 'Add';
    }
    //alert('Add album');
    $scope.modalUpdateAddAlbum.show();
  };
  $scope.closeModalUpdateAddAlbum = function() {
    $scope.album.title = '';
    $scope.album.description = '';
    $scope.modalUpdateAddAlbum.hide();
  };
  $scope.addUpdateAlbum = function() {
    var titleEmpty = ValidationService.isEditTextEmpty($scope.album.title);
    var descriptionEmpty = ValidationService.isEditTextEmpty($scope.album.description);

    if( titleEmpty == true && descriptionEmpty == true){
      $scope.titleMessage = "Title mustn't be empty!";
      $scope.titleErrorShow = true;
      $scope.descriptionMessage = "Description mustn't be empty!";
      $scope.descriptionErrorShow = true;

    }else if(titleEmpty == true){
      $scope.titleMessage = "Title mustn't be empty!";
      $scope.titleErrorShow = true;
    }else if( descriptionEmpty == true){
      $scope.descriptionMessage = "Description mustn't be empty!";
      $scope.descriptionErrorShow = true;
    }else if(titleEmpty == false && descriptionEmpty == false && $scope.titleErrorShow  == false &&   $scope.descriptionErrorShow == false){

      if( $scope.modalType == 'update'){
            AlbumService.updateAlbum($scope.album.title, $scope.album.description, $scope.selectedAlbumId);
            $cordovaToast.show('Album is updated.', 'short', 'bottom');
            AlbumService.findAlbumsByUserId($scope.activeUserId).then(function(albums){
              $scope.albums = [];
              $scope.albums = albums;
              $scope.updateAlbumsImage();
              $scope.resetSelection();
              $scope.modalUpdateAddAlbum.hide();

              $scope.album.title = '';
              $scope.album.description = '';
            });
      }else if($scope.modalType == 'add'){
        AlbumService.albumExists($scope.album.title).then(function(result){
          if(result == false){
            AlbumService.addAlbum($scope.album.title, $scope.album.description, $scope.activeUserId);
            $cordovaToast.show('New album is created.', 'short', 'bottom');
            AlbumService.findAlbumsByUserId($scope.activeUserId).then(function(albums){
              $scope.albums = [];
              $scope.albums = albums;
              $scope.updateAlbumsImage();
              $scope.resetSelection();
              $scope.modalUpdateAddAlbum.hide();

              $scope.album.title = '';
              $scope.album.description = '';
            });
          }else{
            $cordovaToast.show("Album already exists!", 'long', 'bottom');
          }
        });
      }
    }  
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modalUpdateAddAlbum.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
  
  $scope.resetSelection = function() {
    $scope.selectedAlbumId = '';
    $scope.selectedAlbumIndex = '';    
  };

  $scope.validateTitle = function(){
    var valid = ValidationService.validateTitle($scope.album.title);
    if(valid == false){
      $scope.titleMessage = 'Title must be less than 8 characters long!';
      $scope.titleErrorShow = true;
    }else{
      $scope.titleMessage = '';
      $scope.titleErrorShow = false;
      $scope.closePopover();
    }

  };

  $scope.validateDescription = function(){
    var valid = ValidationService.validateDescription($scope.album.description);
    if(valid == false){
      $scope.descriptionMessage = 'Description must be less than 50 characters long!';
      $scope.descriptionErrorShow = true;
    }else{
      $scope.descriptionMessage = '';
      $scope.descriptionErrorShow = false;
      $scope.closePopover();
    }
  };

    $scope.deleteFiles = function(images){
        angular.forEach(images, function (image, key) {
            $cordovaFile.removeFile(cordova.file.externalDataDirectory, image.title + '.jpg').then(function(result){
             //  ImageService.deleteImage(image.id);
                    
             });
        });
        
       /* for (var i=0; i < images.length; i++) {
            $cordovaFile.removeFile(cordova.file.externalDataDirectory, images[i].title + '.jpg').then(function(result){
               ImageService.deleteImage(images[i].id);
                    
             });       
        }*/
    }

  $ionicPopover.fromTemplateUrl('templates/popover/input_popover.html', { //file:///android_asset/www/
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.openPopover = function($event, message, type) {
    if(type == 'title'){
      if($scope.titleErrorShow == true){
        $scope.popover.show($event);
        $scope.errorMessage = message;
      }
    }else if(type == 'description'){
      if($scope.descriptionErrorShow == true){
        $scope.popover.show($event);
        $scope.errorMessage = message;
      }
    }
  };

  $scope.closePopover = function() {
    $scope.popover.hide();
  };

  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });


});
