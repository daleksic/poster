angular.module('starter.geocoding', [])

.factory('GeocodingService', ['$q', '$cordovaGeolocation',  function ($q, $cordovaGeolocation) {

  return {
    getLocation: function(geocoder){
      var q = $q.defer();
      var userLocation='';
      var posOptions = {timeout: 10000, enableHighAccuracy: false}; // 10000, false

      var codeLatLng = function(latitude, longitude){
        var q = $q.defer();
        var city, country, response = '';
        var latlng = new google.maps.LatLng(latitude, longitude);

        geocoder.geocode({'latLng': latlng}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              //find city and country name
              for (var i=0; i<results[0].address_components.length; i++) {
                for (var b=0;b<results[0].address_components[i].types.length;b++) {
                  if (results[0].address_components[i].types[b] == "locality"){

                    city= results[0].address_components[i].long_name;
                    break;
                  }else if (results[0].address_components[i].types[b] == "country"){

                    country= results[0].address_components[i].long_name;
                    break;
                  }
                }
              }
              response = city + ', ' + country;
              q.resolve(response);
            } else {
              alert("No results found");
            }
          } else {
            alert("Geocoder failed due to: " + status);
          }
        });

        return q.promise;
      };


      $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        var lat  = position.coords.latitude;
        var long = position.coords.longitude;
        codeLatLng(lat, long).then(function(result){
          userLocation = result;
          q.resolve(userLocation);
        });

      }, function(err) {
        console.log("Can't get coordinates.");
        userLocation = 'No location';
        q.resolve(userLocation);
      });
      return q.promise;
    }


  };

}]);
