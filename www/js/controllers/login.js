angular.module('starter.login', [])

.controller('LoginCtrl', function($scope, $ionicPopover, $state, $cordovaToast, UtilsService, UserService, ValidationService) {
  $scope.errorMessage = "";
  $scope.user = {
    email:"",
    password: ""
  };
  $scope.emailMessage = '';
  $scope.passwordMessage = '';
  $scope.emailErrorShow = false;
  $scope.passwordErrorShow = false;

  $scope.login = function() {
    var emailEmpty = ValidationService.isEditTextEmpty($scope.user.email);
    var passwordEmpty = ValidationService.isEditTextEmpty($scope.user.password);

    if( passwordEmpty == true && emailEmpty == true){
      $scope.emailMessage = "Email mustn't be empty!";
      $scope.emailErrorShow = true;
      $scope.passwordMessage = "Password mustn't be empty!";
      $scope.passwordErrorShow = true;

    }else if(emailEmpty == true){
      $scope.emailMessage = "Email mustn't be empty!";
      $scope.emailErrorShow = true;
    }else if( passwordEmpty == true){
      $scope.passwordMessage = "Password mustn't be empty!";
      $scope.passwordErrorShow = true;
    }else if(passwordEmpty == false && emailEmpty == false && $scope.emailErrorShow  == false &&   $scope.passwordErrorShow == false){
        UserService.userExists($scope.user.email, $scope.user.password).then(function(result){

          if(result == true){
              UserService.findUserByEmail($scope.user.email).then(function(user){
                UtilsService.set('PosterActiveUser', user.id).then(function(response){
                  $scope.user.email = "";
                  $scope.user.password = "";
                  $cordovaToast.show('Welcome, ' + user.fullname + '.', 'short', 'bottom');
                  $state.go('app.albums');
                });
              });
          }else{
            // user don't exists toust
            $cordovaToast.show("User doesn't exists!", 'long', 'bottom');
          }
        });
    }
  };

  $scope.validateEmail = function(){
    var valid = ValidationService.validateEmail($scope.user.email);
    if(valid == false){
       $scope.emailMessage = 'Email is not valid!';
       $scope.emailErrorShow = true;
     }else{
       $scope.emailMessage = '';
       $scope.emailErrorShow = false;
       $scope.closePopover();
     }

  };

  $scope.validatePassword = function(){
    var valid = ValidationService.validatePassword($scope.user.password);
    if(valid == false){
      $scope.passwordMessage = 'Password must be at least 8 characters long!';
      $scope.passwordErrorShow = true;
    }else{
      $scope.passwordMessage = '';
      $scope.passwordErrorShow = false;
      $scope.closePopover();
    }

  };

  $ionicPopover.fromTemplateUrl('templates/popover/input_popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.openPopover = function($event, message, type) {
    if(type == 'email'){
      if($scope.emailErrorShow == true){
        $scope.popover.show($event);
        $scope.errorMessage = message;
      }
    }else if(type == 'password'){
      if($scope.passwordErrorShow == true){
        $scope.popover.show($event);
        $scope.errorMessage = message;
      }
    }

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
