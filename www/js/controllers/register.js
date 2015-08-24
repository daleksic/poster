angular.module('starter.register', [])

.controller('RegisterCtrl', function($scope, $ionicPopover, $state, $cordovaToast, UserService) {
  $scope.errorMessage = "";
  $scope.user = {
    fullName:"",
    email:"",
    password: ""
  };

  $scope.register = function() {
    UserService.registerUser($scope.user.fullName, $scope.user.email, $scope.user.password);
    if(true){
      $cordovaToast.show('User is registered.', 'short', 'bottom');
      $state.go('login');
    }
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
