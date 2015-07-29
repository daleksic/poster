angular.module('starter.albumdetail', [])

.controller('AlbumDetailCtrl', function($scope, $ionicActionSheet) {

  $scope.selectedImage = '';

  $scope.images = [
  { title: 'Nature', image: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pastemagazine.com%2Fblogs%2Flists%2F2009%2F11%2F15%2Fdangerdoom_mouse_mask.jpg&f=1",id: 1 },
  { title: 'Nature', image: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pastemagazine.com%2Fblogs%2Flists%2F2009%2F11%2F15%2Fdangerdoom_mouse_mask.jpg&f=1",id: 2 },
  { title: 'Nature', image: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.halogendesigns.com%2Fblog%2Fwp-content%2Fuploads%2Fcover1.jpg&f=1",id: 3 },
  { title: 'Nature', image: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.halogendesigns.com%2Fblog%2Fwp-content%2Fuploads%2Fcover1.jpg&f=1",id: 4 },
  { title: 'Nature', image: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pastemagazine.com%2Fblogs%2Flists%2F2009%2F11%2F15%2Fdangerdoom_mouse_mask.jpg&f=1",id: 5 }

  ];

  $scope.onHold = function(id){
    $scope.selectedImage = id;
    $scope.showActionSheet();
  };

  $scope.showActionSheet = function() {

    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: [
      { text: '<b>Edit</b>' }
      ],
      destructiveText: 'Delete',
      titleText: 'Modify your photo',
      cancelText: 'Cancel',
      cancel: function() {
        // add cancel code..
      },
      buttonClicked: function(index) {
        if(index == 0){
          alert("Edit");
        }
        return true;
      },
      destructiveButtonClicked : function(){
        alert("Delete");
      }
    });

  };

});