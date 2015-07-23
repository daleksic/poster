angular.module('starter.login', [])

.controller('LoginCtrl', function($scope, $ionicPopover, $state) {
  $scope.errorMessage = "";
  $scope.user = {
    email:"",
    password: ""
  };

  $scope.login = function() {
    if(true){
      $state.go('app.albums');
    }
  };



  $ionicPopover.fromTemplateUrl('../../templates/popover/input_popover.html', {
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

});
