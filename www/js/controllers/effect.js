angular.module('starter.effect', [])

.controller('EffectCtrl', function($scope, $ionicPopover, $state, $window, $cordovaCamera, $document, ImageEffect, UtilsService) { //, ImageEffect

    $scope.height = $window.innerHeight - 45;
    $scope.selectedColor = '';
    $scope.imageCaptured='';
    $scope.imageData='';
    $scope.original='';
    $scope.canvasExists = false;
    $scope.canvas = '';

    $scope.currentThemeBackgroundColor = '';
    $scope.currentThemeTextColor = '';

    $scope.colors = [{'name': 'clouds', 'hashcode': 'ecf0f1'},
      {'name': 'silver', 'hashcode': 'bdc3c7'},
      {'name': 'concrete', 'hashcode': '95a5a6'},
      {'name': 'asbestos', 'hashcode': '7f8c8d'},
      {'name': 'wetasphalt', 'hashcode': '34495e'},
      {'name': 'midnightblue', 'hashcode': '2c3e50'},
      {'name': 'peterriver', 'hashcode': '3498db'},
      {'name': 'belizehole', 'hashcode': '2980b9'},
      {'name': 'amethyst', 'hashcode': '9b59b6'},
      {'name': 'wisteria', 'hashcode': '8e44ad'},
      {'name': 'pomegranate', 'hashcode': 'c0392b'},
      {'name': 'alizarin', 'hashcode': 'e74c3c'},
      {'name': 'pumpkin', 'hashcode': 'd35400'},
      {'name': 'carrot', 'hashcode': 'e67e22'},
      {'name': 'orange', 'hashcode': 'f39c12'},
      {'name': 'sunflower', 'hashcode': 'f1c40f'},
      {'name': 'emerald', 'hashcode': '2ecc71'},
      {'name': 'nephritis', 'hashcode': '27ae60'},
      {'name': 'turqoise', 'hashcode': '1abc9c'},
      {'name': 'greensea', 'hashcode': '16a085'}];


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

      $cordovaCamera.getPicture(options).then(function(imageData) {

        $scope.imageCaptured =  "data:image/jpeg;base64," + imageData;
        $scope.imageData = imageData;


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
        }else{
          $scope.currentThemeTextColor = 'dark';
        }
      });


    });


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


  /*  $scope.applyColor = function(event){


      var canvasPosition = getPosition(event.gesture.touches[0].target);

      var tap = { x:0, y:0 };
      if(event.gesture.touches.length>0){
        tt = event.gesture.touches[0];
        tap.x = tt.clientX || tt.pageX || tt.screenX ||0;
        tap.y = tt.clientY || tt.pageY || tt.screenY ||0;
      }
      tap.x = tap.x - canvasPosition.x;
      tap.y = tap.y - canvasPosition.y;


      console.log(tap);
    };

    $scope.applyEffect = function(){

      if( $scope.canvasExists == false){
         $scope.init($scope.imageData);
         $scope.canvasExists = true;
      }

      var ctx =  $scope.canvas.getContext('2d');

      var imgd = ctx.getImageData(0, 0, $scope.canvas.width, $scope.canvas.height);
      var pix = imgd.data;
      console.log(pix[0] + ' ' + pix[1] + ' ' + pix[2]);
      console.log('applyKMeansEffect effect.js');

      var newData = ImageEffect.vintage(pix);//.then(function(newData){ gray(pix);
        console.log('newImgd');
        console.log(newData[0] + ' ' + newData[1] + ' ' + newData[2]);
        console.log('newImgd');
        imgd.data = newData;
        // Draw the ImageData at the given (x,y) coordinates.
        ctx.putImageData(imgd, 0, 0);
        var jpegUrl = $scope.canvas.toDataURL("image/jpeg");
        $scope.imageCaptured =  jpegUrl;
        $scope.imageData = jpegUrl;
    //  });

      console.log('finished applyKMeansEffect effect.js');

    };*/

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

});
