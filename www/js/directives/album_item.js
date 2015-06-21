angular.module('starter.albums.albumitem', [])

.controller('AlbumItemCtrl',['$scope', '$timeout', function($scope, $timeout) {

  $scope.albumTitle = '';
  $scope.albumImage = '';

  $scope.albumtitlestyle = "album-deselected";

  $scope.onHold = function(){
    $scope.albumtitlestyle = "album-selected";
  };

}])

.directive('albumItem', function() {
  return {
  //  scope: {},
    restrict: 'E',
    replace: 'true',
    template: '<div class="block-inline width-33" on-hold="onHold()" ng-controller="AlbumItemCtrl">'+
                     '<div class="block width-100 color-silver">'+
                          '<img class="block image" ng-src="{{albumImage}}">'+
                          '<div class="block-absolute bottom width-100 padding-left-5 padding-right-5 padding-top-5 padding-bottom-5 text-center" ng-class="albumtitlestyle">'+
                            '{{albumTitle}}'+
                          '</div>'+
                     '</div>'+
              '</div>',
    link: function(scope, elem, attrs) {
      var albumTitle = attrs.albumTitle;
      var albumImage = attrs.albumImage;


      if((albumTitle !== null) && (albumTitle !== undefined) && (albumTitle!== '')){

        scope.albumTitle = albumTitle;

      }
      if((albumImage !== null) && (albumImage !== undefined) && (albumImage!== '')){

        scope.albumImage = albumImage;

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
