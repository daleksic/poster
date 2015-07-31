angular.module('starter.albums', [])

.controller('AlbumsCtrl', function($scope, $state, $ionicActionSheet, $ionicModal, $ionicPopover) {

  $scope.selectedAlbum = '';
  $scope.errorMessage = "";

  $scope.album = {
    title:'',
    description:''
  }

  $scope.albums = [
  { title: 'Nature', image: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pastemagazine.com%2Fblogs%2Flists%2F2009%2F11%2F15%2Fdangerdoom_mouse_mask.jpg&f=1",id: 1 },
  { title: 'Nature', image: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pastemagazine.com%2Fblogs%2Flists%2F2009%2F11%2F15%2Fdangerdoom_mouse_mask.jpg&f=1",id: 2 },
  { title: 'Nature', image: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.halogendesigns.com%2Fblog%2Fwp-content%2Fuploads%2Fcover1.jpg&f=1",id: 3 },
  { title: 'Nature', image: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.halogendesigns.com%2Fblog%2Fwp-content%2Fuploads%2Fcover1.jpg&f=1",id: 4 },
  { title: 'Nature', image: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pastemagazine.com%2Fblogs%2Flists%2F2009%2F11%2F15%2Fdangerdoom_mouse_mask.jpg&f=1",id: 5 }

  ];

  $scope.onHold = function(id){
    $scope.selectedAlbum = id;
    $scope.showActionSheet();
  };
  $scope.goToAlbum = function(id){
    $state.go('app.albums.detail', {albumId: id});

  };

  $scope.showActionSheet = function() {

    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: [
      { text: '<i class="icon ion-edit"></i><b >Edit</b>' }
      ],
      destructiveText: '<i class="icon ion-android-delete"></i> <b >Delete</b>',
      titleText: 'Modify your album',
      cancelText: 'Cancel',
      cancel: function() {
        // add cancel code..
      },
      buttonClicked: function(index) {
        if(index == 0){
          $scope.openModalmodalAddAlbum();
        }
        return true;
      },
      destructiveButtonClicked : function(){
        alert("Delete");
      }
    });

  };

  $ionicModal.fromTemplateUrl('templates/modal/addAlbum.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalAddAlbum = modal;
  });
  $scope.openModalmodalAddAlbum = function() {
    //alert('Add album');
    $scope.modalAddAlbum.show();
  };
  $scope.closeModalAddAlbum = function() {
    $scope.modalAddAlbum.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modalAddAlbum.remove();
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
