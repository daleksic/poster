angular.module('starter.menu', [])

.controller('MenuCtrl', function($scope, $state, $ionicSideMenuDelegate, UtilsService, UserService) {

  //$scope.user = {fullName: 'Dusko Aleksic', email:'dusko.@gmail.com'};
  $scope.user = {fullName: '', email:''};
  UtilsService.get('PosterActiveUser').then(function(userId){
    UserService.findUserById(userId).then(function(user){
      $scope.user.fullName = user.fullname;
      $scope.user.email = user.email;
    });
  });

  $scope.logout = function(){
    UtilsService.set('PosterActiveUser', '').then(function(response){
      $ionicSideMenuDelegate.toggleLeft();
      $state.go('login');
    });
  };

});
