angular.module('starter.imagedetail', [])

.controller('ImageDetailCtrl', function($scope, $stateParams, $ionicSlideBoxDelegate, ImageService) {

  $scope.images = [];
  $scope.activeSlide = 0;
  $scope.$on('$ionicView.beforeEnter', function(){
    //console.log($stateParams.albumId);
    ImageService.findImagesByAlbumId($stateParams.albumId).then(function(images){

      $scope.images = images;
      $scope.findSelected();
      $ionicSlideBoxDelegate.update();

    });

  });
 $scope.$on('$ionicView.enter', function(){

    $ionicSlideBoxDelegate.slide( $scope.activeSlide);
  });

  $scope.slideChanged = function(index) {
    console.log('Slide changed to ' + index);
  };

  $scope.findSelected = function(){
    var id = $stateParams.imageId;
    for(var i=0; i< $scope.images.length; i++){
      if( $scope.images[i].id == id ){
        $scope.activeSlide = i;
        console.log(  $scope.activeSlide );
      }
    }
  };

});
