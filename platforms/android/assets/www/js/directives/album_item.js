angular.module('starter.albums.albumitem', [])

.controller('AlbumItemCtrl',['$scope', '$timeout', function($scope, $timeout) {

  $scope.albumId = '';
  $scope.albumTitle = '';
  $scope.albumImage = '';

  $scope.albumtitlestyle = "album-deselected";

  $scope.onHold = function(id){
    $scope.albumtitlestyle = "album-selected";
    $scope.selectedAlbum = id;
  };

}])

.directive('albumItem', function() {
  return {
//    scope: {},
    restrict: 'E',
    replace: 'true',
    template: '<div class="block-inline width-33" on-hold="onHold(albumId)" ng-controller="AlbumItemCtrl">'+
                     '<div class="block width-100 color-silver">'+
                          '<a ng-href=""><img class="block image" ng-src="{{albumImage}}"></a>'+
                          '<div class="block-absolute bottom width-100 padding-left-5 padding-right-5 padding-top-5 padding-bottom-5 text-center" ng-class="albumtitlestyle">'+
                            '<a ng-href="">{{albumTitle}}</a>'+
                          '</div>'+
                     '</div>'+
              '</div>',
    link: function(scope, elem, attrs) {
      var albumId= attrs.albumId;
      var albumTitle = attrs.albumTitle;
      var albumImage = attrs.albumImage;


      if((albumTitle !== null) && (albumTitle !== undefined) && (albumTitle!== '')){

        scope.albumTitle = albumTitle;

      }
      if((albumImage !== null) && (albumImage !== undefined) && (albumImage!== '')){

        scope.albumImage = albumImage;

      }
      if((albumId !== null) && (albumId !== undefined) && (albumId!== '')){

        scope.albumId = albumId;

      }


      elem.bind('click', function() {
        elem.css('background-color', 'white');
        scope.$apply(function() {
          scope.color = "white";
        });
      });
      elem.bind('mouseover', function() {
        elem.css('cursor', 'pointer');
      });
    }
  };
})
.directive('albumId', function(){

  return {
    restrict: 'A',

  };
})
.directive('albumTitle', function(){

  return {
    restrict: 'A',

  };
})
.directive('albumImage', function(){

  return {
    restrict: 'A',

  };
});
