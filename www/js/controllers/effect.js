angular.module('starter.effect', [])

.controller('EffectCtrl', function($scope, $ionicPopover, $state, $window, $document, $stateParams, $cordovaCamera, $cordovaFile, $ionicModal, $ionicLoading, $ionicPopover, $cordovaToast, ImageEffect, UtilsService, ImageService, ValidationService) {

    $scope.height = $window.innerHeight - 45;
    $scope.selectedColor = '';
    $scope.imageCaptured='';
    $scope.imageData='';
    $scope.original='';
    $scope.canvasExists = false;
    $scope.canvas = '';
    $scope.image= {
      imageTitle: ''
    };
    $scope.errorMessage = '';
    $scope.effectApplied = false;

    $scope.currentThemeBackgroundColor = '';
    $scope.currentThemeBorder = '';
    $scope.currentThemeTextColor = '';
    $scope.currentThemeButton = '';

    $scope.imageMessage = '';
    $scope.imageErrorShow = false;

    $scope.selectColor = function(name){
      $scope.selectedColor = name;
    };

    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL, // DATA_URI, FILE_URL
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    };

    $scope.$on('$ionicView.beforeEnter', function(){
      $ionicLoading.show({
        template: '  Loading...  '
      });
      $cordovaCamera.getPicture(options).then(function(imageData) {

        $scope.imageCaptured =  "data:image/jpeg;base64," + imageData;
        $scope.imageData = imageData;
        $ionicLoading.hide();
      }, function(err) {
        // error
      });

      UtilsService.get('PosterTheme').then(function(value){
        var defaultTheme = 'light';
        if(value != undefined){
          defaultTheme =  value;
        }
        $scope.currentThemeBackgroundColor = defaultTheme + '-bg';
        if(defaultTheme == 'dark'){
          $scope.currentThemeTextColor = 'light';
          $scope.currentThemeBorder = 'dark-border-color';
          $scope.currentThemeButton = 'button-dark';
        }else{
          $scope.currentThemeTextColor = 'dark';
          $scope.currentThemeBorder = 'light-border-color';
          $scope.currentThemeButton = 'button-stable';
        }
      });


    });

    $ionicModal.fromTemplateUrl('templates/modal/addImage.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modalAddImage = modal;
    });
    $scope.openModaAddImage = function(type) {
      if($scope.effectApplied == true){
        $scope.modalAddImage.show();
      }else{
        $cordovaToast.show('Effect is not applied.', 'short', 'bottom');
      }

    };
    $scope.closeModalAddImage= function() {
      $scope.modalAddImage.hide();
    };
    $scope.addImage = function() {
      var titleEmpty = ValidationService.isEditTextEmpty($scope.image.imageTitle);
      var img = $scope.canvas.toDataURL("image/jpeg");
      var data = img.replace(/^data:image\/\w+;base64,/, "");
      //  var name =  $scope.image.imageTitle + '_' + makeid() + '.jpg';
      var name =  $scope.image.imageTitle + '.jpg';
      var fileName, uri = '';

      if(titleEmpty == true){
        $scope.imageMessage = "Title mustn't be empty!";
        $scope.imageErrorShow = true;
      }else if(titleEmpty == false && $scope.imageErrorShow == false){
        ImageService.imageExists($scope.image.imageTitle).then(function(result){
          if(result == false){
            $cordovaFile.createFile(cordova.file.externalDataDirectory, name, false).then(function(result){
              fileName = result.name;
              uri = result.nativeURL;
              $cordovaFile.writeFile(cordova.file.externalDataDirectory, fileName, Base64Binary.decodeArrayBuffer(data), true).then(function(writeResult){
                console.log(writeResult);
                var width = $scope.canvas.width;
                var height = $scope.canvas.height;
                var album = $stateParams.albumId;
                ImageService.addImage($scope.image.imageTitle, 'No location', uri, width, height, 'image/jpeg', album);
                $cordovaToast.show('New photo is added.', 'short', 'bottom');
                $state.go('app.albumDetail', {albumId: $stateParams.albumId});
              });
            });

            $scope.title = '';
            $scope.modalAddImage.hide();

          }else{
            // user don't exists toust
            $cordovaToast.show("Photo already exists!", 'long', 'bottom');
          }

        });
      }

    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modalAddImage.remove();
    });


    $scope.validateTitle = function(){
      var valid = ValidationService.validateTitle($scope.image.imageTitle);
      if(valid == false){
        $scope.imageMessage = 'Title is not valid!';
        $scope.imageErrorShow = true;
      }else{
        $scope.imageMessage = '';
        $scope.imageErrorShow = false;
        $scope.closePopover();
      }

    };


    $scope.init = function(imageData){

      $scope.canvas = document.getElementById('canvasEffect');
      var image =  document.getElementById('imageEffect');
      $scope.canvas.width = image.offsetWidth;
      $scope.canvas.height = image.offsetHeight;
      var ctx =   $scope.canvas.getContext('2d');
      var img = new Image();
      img.src = "data:image/jpeg;base64," + imageData;
      ctx.drawImage(img,0,0, $scope.canvas.width, $scope.canvas.height);

    //  var ctx =  $scope.canvas.getContext('2d');
      var imgd = ctx.getImageData(0, 0, $scope.canvas.width, $scope.canvas.height);
      $scope.original = imgd.data;
    //  console.log(JSON.stringify($scope.original));
    };


    $scope.applyOriginal = function(){
      if( $scope.canvasExists == false){
        $scope.init($scope.imageData);
        $scope.canvasExists = true;
      }
      var ctx =  $scope.canvas.getContext('2d');
      var imgd = ctx.getImageData(0, 0, $scope.canvas.width, $scope.canvas.height);
      var pix = imgd.data;

      var newData = ImageEffect.original(pix, $scope.original);
      imgd.data = newData;
      // Draw the ImageData at the given (x,y) coordinates.
      ctx.putImageData(imgd, 0, 0);
      var jpegUrl = $scope.canvas.toDataURL("image/jpeg");
      $scope.imageCaptured =  jpegUrl;
      $scope.imageData = jpegUrl;
      $scope.effectApplied = true;

    };
    $scope.applySepia = function(){
      if( $scope.canvasExists == false){
        $scope.init($scope.imageData);
        $scope.canvasExists = true;
      }
      var ctx =  $scope.canvas.getContext('2d');
      var imgd = ctx.getImageData(0, 0, $scope.canvas.width, $scope.canvas.height);
      var pix = imgd.data;

      var newData = ImageEffect.sepia(pix);
      imgd.data = newData;
      // Draw the ImageData at the given (x,y) coordinates.
      ctx.putImageData(imgd, 0, 0);
      var jpegUrl = $scope.canvas.toDataURL("image/jpeg");
      $scope.imageCaptured =  jpegUrl;
      $scope.imageData = jpegUrl;
      $scope.effectApplied = true;

    };
    $scope.applyGrayscale = function(){
      if( $scope.canvasExists == false){
        $scope.init($scope.imageData);
        $scope.canvasExists = true;
      }

      var ctx =  $scope.canvas.getContext('2d');
      var imgd = ctx.getImageData(0, 0, $scope.canvas.width, $scope.canvas.height);
      var pix = imgd.data;

      var newData = ImageEffect.grayscale(pix);
      imgd.data = newData;
      // Draw the ImageData at the given (x,y) coordinates.
      ctx.putImageData(imgd, 0, 0);
      var jpegUrl = $scope.canvas.toDataURL("image/jpeg");
      $scope.imageCaptured =  jpegUrl;
      $scope.imageData = jpegUrl;
      $scope.effectApplied = true;

    };
    $scope.applyVintage = function(){
      if( $scope.canvasExists == false){
        $scope.init($scope.imageData);
        $scope.canvasExists = true;
      }
      var ctx =  $scope.canvas.getContext('2d');
      var imgd = ctx.getImageData(0, 0, $scope.canvas.width, $scope.canvas.height);
      var pix = imgd.data;

      var newData = ImageEffect.vintage(pix);
      imgd.data = newData;
        // Draw the ImageData at the given (x,y) coordinates.
      ctx.putImageData(imgd, 0, 0);
      var jpegUrl = $scope.canvas.toDataURL("image/jpeg");
      $scope.imageCaptured =  jpegUrl;
      $scope.imageData = jpegUrl;
      $scope.effectApplied = true;

    };
    $scope.applyInvert = function(){
      if( $scope.canvasExists == false){
        $scope.init($scope.imageData);
        $scope.canvasExists = true;
      }
      var ctx =  $scope.canvas.getContext('2d');
      var imgd = ctx.getImageData(0, 0, $scope.canvas.width, $scope.canvas.height);
      var pix = imgd.data;

      var newData = ImageEffect.invert(pix);
      imgd.data = newData;
      // Draw the ImageData at the given (x,y) coordinates.
      ctx.putImageData(imgd, 0, 0);
      var jpegUrl = $scope.canvas.toDataURL("image/jpeg");
      $scope.imageCaptured =  jpegUrl;
      $scope.imageData = jpegUrl;
      $scope.effectApplied = true;

    };

    function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i=0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };



    function getPosition(element) {
      var xPosition = 0;
      var yPosition = 0;

      while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
      }
      return { x: xPosition, y: yPosition };
    };


    var Base64Binary = {
      _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

      /* will return a  Uint8Array type */
      decodeArrayBuffer: function(input) {
        var bytes = (input.length/4) * 3;
        var ab = new ArrayBuffer(bytes);
        this.decode(input, ab);

        return ab;
      },

      removePaddingChars: function(input){
        var lkey = this._keyStr.indexOf(input.charAt(input.length - 1));
        if(lkey == 64){
          return input.substring(0,input.length - 1);
        }
        return input;
      },

      decode: function (input, arrayBuffer) {
        //get last chars to see if are valid
        input = this.removePaddingChars(input);
        input = this.removePaddingChars(input);

        var bytes = parseInt((input.length / 4) * 3, 10);

        var uarray;
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        var j = 0;

        if (arrayBuffer)
          uarray = new Uint8Array(arrayBuffer);
          else
            uarray = new Uint8Array(bytes);

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            for (i=0; i<bytes; i+=3) {
              //get the 3 octects in 4 ascii chars
              enc1 = this._keyStr.indexOf(input.charAt(j++));
              enc2 = this._keyStr.indexOf(input.charAt(j++));
              enc3 = this._keyStr.indexOf(input.charAt(j++));
              enc4 = this._keyStr.indexOf(input.charAt(j++));

              chr1 = (enc1 << 2) | (enc2 >> 4);
              chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
              chr3 = ((enc3 & 3) << 6) | enc4;

              uarray[i] = chr1;
              if (enc3 != 64) uarray[i+1] = chr2;
              if (enc4 != 64) uarray[i+2] = chr3;
            }

            return uarray;
          }
        };

        $ionicPopover.fromTemplateUrl('templates/popover/input_popover.html', {
            scope: $scope
          }).then(function(popover) {
            $scope.popover = popover;
          });

          $scope.openPopover = function($event, message) {
            if($scope.imageErrorShow == true){
              $scope.popover.show($event);
              $scope.errorMessage = message;
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
