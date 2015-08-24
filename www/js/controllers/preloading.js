angular.module('starter.preloading', [])

.controller('PreloadingCtrl', function($scope, $state, UtilsService) {

    $scope.$on('$ionicView.enter', function(){

      UtilsService.get('PosterActiveUser').then(function(userId){
        if(userId != undefined){
          if(userId != ''){
            $state.go('app.albums');
          }else{
            $state.go('login');
          }
        }else{
          $state.go('login');
        }
      });

    });

});
