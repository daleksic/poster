angular.module('starter.login', [])

.controller('LoginCtrl', function($scope, $ionicPopover) {
  $scope.errorMessage = "";
  $scope.user = {
    email:"",
    password: ""
  };

  $scope.login = function() {
    alert($scope.user.email);
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
