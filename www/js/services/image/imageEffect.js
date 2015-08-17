angular.module('starter.image', [])

.factory('ImageEffect', ['$q', function ($q) {

  return {

    original : function(data, original){
      for (var i = 0, n = data.length; i < n; i += 4){

        data[i] =  original[i]; // red
        data[i+1] =  original[i+1]; // green
        data[i+2] =  original[i+2]; // blue
      }
      return data;
    },
    invert : function(data){
      for (var i = 0, n = data.length; i < n; i += 4){

        data[i] = 255 - data[i]; // red
        data[i+1] = 255 - data[i+1]; // green
        data[i+2] = 255 - data[i+2]; // blue
      }
      return data;
    },

    grayscale: function(data){
      var sums = [];
      for (var i = 0, n = data.length; i < n; i += 4){
        var average = (data[i] + data[i+1] + data[i+2])/3;

        data[i] = average; // red
        data[i+1] = average; // green
        data[i+2] = average; // blue
      }
      return data;
    },
    blackWhite: function(data){
      var sums = [];
      for (var i = 0, n = data.length; i < n; i += 4){
        var average = (data[i] + data[i+1] + data[i+2])/3;
        if(average > 128){

          data[i] = 255; // red
          data[i+1] = 255; // green
          data[i+2] = 255; // blue

        }else{
          data[i] = 0; // red
          data[i+1] = 0; // green
          data[i+2] = 0; // blue
        }

      }
      return data;
    },
    sepia: function(data){
      var sepiaDepth = 20;
      for (var i = 0, n = data.length; i < n; i += 4){
        var average = (data[i] + data[i+1] + data[i+2])/3;

      var  b = average - 50;

        // normalize if out of bounds
        if (b<0) b=0;
        if (b>255) b=255;

          data[i] = average + (sepiaDepth * 2); // red
          data[i+1] = average + sepiaDepth; // green
          data[i+2] = b; // blue


      }
      return data;
    },

    vintage: function(data){

      var values = this.curves();

      for (var i = 0, n = data.length; i < n; i += 4){

          data[i] = values.r[data[i]]; // red
          data[i+1] = values.r[data[i+1]]; // green
          data[i+2] = values.r[data[i+2]]; // blue

      }
      return data;

    },

    curves: function() {
      var a = function(a) {
        return -12 * Math.sin(a * 2 * Math.PI / 255) + a
      },
      b, c = function(a) {
        return -.2 * Math.pow(255 * a, .5) * Math.sin(Math.PI * (-195e-7 * Math.pow(a, 2) + .0125 * a)) + a
      },
      d = function(a) {
        return -.001045244139166791 * Math.pow(a, 2) + 1.2665372554875318 * a
      },
      e = function(a) {
        return .57254902 * a + 53
      },
      f = {
        r: [],
        g: [],
        b: []
      };
      for (b = 0; b <= 255; ++b) {
        f.r[b] = c(a(b));
        f.g[b] = d(a(b));
        f.b[b] = e(a(b))
      }
      return f
    }

  };

}]);
