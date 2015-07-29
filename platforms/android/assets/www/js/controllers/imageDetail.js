angular.module('starter.imagedetail', [])

.controller('ImageDetailCtrl', function($scope) {

  $scope.images = [
  { title: 'Image title 1', url: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fdroidlessons.com%2Fwp-content%2Fuploads%2F2012%2F05%2Fhtc_one_x_screenshot.png&f=1", date: "25-08-2015", location: "City 1, Country", id: 1 },
  { title: 'Image title 2', url: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fforums.androidcentral.com%2Fattachments%2Fhtc-one-m8%2F109681d1395933442t-share-your-htc-one-m8-screenshots-setup-1395933442684.jpg&f=1", date: "25-08-2015", location: "City 2, Country", id: 2 },
  { title: 'Image title 3', url: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fforums.androidcentral.com%2Fattachments%2Fhtc-one-m8%2F109689d1395935114t-share-your-htc-one-m8-screenshots-setup-screenshot_2014-03-27-11-41-29.png&f=1", date: "25-08-2015", location: "City 3, Country", id: 3 }
  ];

});
