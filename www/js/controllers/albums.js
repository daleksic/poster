angular.module('starter.albums', [])

.controller('AlbumsCtrl', function($scope, $state, $ionicActionSheet, $ionicModal, $ionicPopover, UtilsService, AlbumService) {

  $scope.selectedAlbumId = '';
  $scope.selectedAlbumIndex = '';
  $scope.errorMessage = "";
  $scope.modalType = "";

  $scope.currentThemeBackgroundColor = '';
  $scope.currentThemeBorder = '';
  $scope.currentThemeTextColor = '';
  $scope.currentThemeButton = '';

  $scope.album = {
    title:'',
    description:''
  }

  $scope.albums = [];
/*  { title: 'Nature', image: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pastemagazine.com%2Fblogs%2Flists%2F2009%2F11%2F15%2Fdangerdoom_mouse_mask.jpg&f=1",id: 1 },
  { title: 'Nature', image: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pastemagazine.com%2Fblogs%2Flists%2F2009%2F11%2F15%2Fdangerdoom_mouse_mask.jpg&f=1",id: 2 },
  { title: 'Nature', image: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.halogendesigns.com%2Fblog%2Fwp-content%2Fuploads%2Fcover1.jpg&f=1",id: 3 },
  { title: 'Nature', image: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.halogendesigns.com%2Fblog%2Fwp-content%2Fuploads%2Fcover1.jpg&f=1",id: 4 },
  { title: 'Nature', image: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pastemagazine.com%2Fblogs%2Flists%2F2009%2F11%2F15%2Fdangerdoom_mouse_mask.jpg&f=1",id: 5 }

  ];*/

  $scope.$on('$ionicView.beforeEnter', function(){
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

    AlbumService.findAlbumsByUserId(1).then(function(albums){
      $scope.albums = albums;
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
    $scope.modalAddAlbum.hide();
  };
  $scope.addUpdateAlbum = function() {
    if( $scope.modalType == 'update'){
      AlbumService.updateAlbum($scope.album.title, $scope.album.description, $scope.selectedAlbumId);
    }else if($scope.modalType == 'add'){
      AlbumService.addAlbum($scope.album.title, $scope.album.description, 1);
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
