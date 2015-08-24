angular.module('starter.albums', [])

.controller('AlbumsCtrl', function($window, $scope, $state, $ionicActionSheet, $ionicModal, $ionicPopover, UtilsService, AlbumService) {

  $scope.selectedAlbumId = '';
  $scope.selectedAlbumIndex = '';
  $scope.errorMessage = "";
  $scope.modalType = "";
  $scope.activeUserId = "";

  $scope.currentThemeBackgroundColor = '';
  $scope.currentThemeBorder = '';
  $scope.currentThemeTextColor = '';
  $scope.currentThemeButton = '';
  $scope.Itemheight = $window.innerWidth /2;

  $scope.album = {
    title:'',
    description:''
  }

  $scope.albums = [];

  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.selectedAlbumId = '';
    $scope.selectedAlbumIndex = '';
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
      });
    });

  });

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
          //$scope.openModalUpdateAddAlbum();
          $scope.openModalUpdateAddAlbum('update');
        }
        return true;
      },
      destructiveButtonClicked : function(){
        AlbumService.deleteAlbum($scope.selectedAlbumId);
        $scope.albums.splice($scope.selectedAlbumIndex, 1);

      }
    });

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
      $scope.album.title = $scope.albums[$scope.selectedAlbumIndex].title;
      $scope.album.description = $scope.albums[$scope.selectedAlbumIndex].description;
    }
    //alert('Add album');
    $scope.modalUpdateAddAlbum.show();
  };
  $scope.closeModalUpdateAddAlbum = function() {
    $scope.modalUpdateAddAlbum.hide();
  };
  $scope.addUpdateAlbum = function() {
    if( $scope.modalType == 'update'){
      AlbumService.updateAlbum($scope.album.title, $scope.album.description, $scope.selectedAlbumId);
    }else if($scope.modalType == 'add'){
      AlbumService.addAlbum($scope.album.title, $scope.album.description, $scope.activeUserId);

    }
    $scope.album.title = '';
    $scope.album.description = '';
    $scope.modalUpdateAddAlbum.hide();
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


  $ionicPopover.fromTemplateUrl('templates/popover/input_popover.html', { //file:///android_asset/www/
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.openPopover = function($event, message) {
    $scope.popover.show($event);
    $scope.errorMessage = message;
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
