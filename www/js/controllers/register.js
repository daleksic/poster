angular.module('starter.register', [])

.controller('RegisterCtrl', function($scope, $ionicPopover, $state, $cordovaToast, UserService, ValidationService) {
  $scope.errorMessage = "";
  $scope.user = {
    fullName:"",
    email:"",
    password: ""
  };
  $scope.fullnameMessage = '';
  $scope.emailMessage = '';
  $scope.passwordMessage = '';
  $scope.fullnameErrorShow = false;
  $scope.emailErrorShow = false;
  $scope.passwordErrorShow = false;

  $scope.register = function() {
    var fullnameEmpty = ValidationService.isEditTextEmpty($scope.user.fullName);
    var emailEmpty = ValidationService.isEditTextEmpty($scope.user.email);
    var passwordEmpty = ValidationService.isEditTextEmpty($scope.user.password);

    if( passwordEmpty == true && emailEmpty == true && fullnameEmpty == true){
      $scope.emailMessage = "Email mustn't be empty!";
      $scope.emailErrorShow = true;
      $scope.passwordMessage = "Password mustn't be empty!";
      $scope.passwordErrorShow = true;
      $scope.fullnameMessage = "Full name mustn't be empty!";
      $scope.fullnameErrorShow = true;
    }else if(fullnameEmpty == true){
      $scope.fullnameMessage = "Full name mustn't be empty!";
      $scope.fullnameErrorShow = true;
    }else if(emailEmpty == true){
      $scope.emailMessage = "Email mustn't be empty!";
      $scope.emailErrorShow = true;
    }else if( passwordEmpty == true){
      $scope.passwordMessage = "Password mustn't be empty!";
      $scope.passwordErrorShow = true;
    }else if(passwordEmpty == false && emailEmpty == false && fullnameEmpty == false && $scope.fullnameErrorShow  == false && $scope.emailErrorShow  == false &&   $scope.passwordErrorShow == false){
      UserService.userExists($scope.user.email, $scope.user.password).then(function(result){

        if(result == false){
            UserService.registerUser($scope.user.fullName, $scope.user.email, $scope.user.password);
            $scope.user.fullName = "";
            $scope.user.email = "";
            $scope.user.password = "";
            $cordovaToast.show('User is registered.', 'short', 'bottom');
            $state.go('login');
        }else{
          // user don't exists toust
          $cordovaToast.show("User already exists!", 'long', 'bottom');
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
  $scope.validateFullName = function(){

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
    }else if(type == 'fullname'){
      if($scope.fullnameMessage == true){
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
