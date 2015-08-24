angular.module('starter.login', [])

.controller('LoginCtrl', function($scope, $ionicPopover, $state, UtilsService, UserService) {
  $scope.errorMessage = "";
  $scope.user = {
    email:"",
    password: ""
  };

  $scope.login = function() {
    UserService.userExists($scope.user.email, $scope.user.password).then(function(result){

      if(result == true){
          UserService.findUserByEmail($scope.user.email).then(function(user){
            UtilsService.set('PosterActiveUser', user.id).then(function(response){
              $scope.user.email = "";
              $scope.user.password = "";
              $state.go('app.albums');
            });
          });
      }else{
        // user don't exists toust
      }
    });
  };

  $ionicPopover.fromTemplateUrl('templates/popover/input_popover.html', {
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
