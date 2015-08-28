angular.module('starter.validation', [])

.factory('ValidationService', function () {

/*  var ValidationService = function(){

    var fields = [];
    var addField = function(field){
      this.fields.push(field);
    };

*/

   return {
     validateEmail: function(email) {
       var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
       return regex.test(email);
     },
     validatePassword: function(password) {
       if(password.length >= 8)
         return true;

       return false;
     },
     validateTitle: function(title) {
        if(title.length < 20)
          return true;

        return false;
      },
      validateDescription: function(desc) {
        if(desc.length < 50)
          return true;

        return false;
      },
      isEditTextEmpty: function(editText) {
        console.log(editText);
        if(editText.length == 0 || editText == "" || editText == null)
            return true;

        return false;
      }
    }
//  };
//  return ValidationService;

});
