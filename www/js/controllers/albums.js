angular.module('starter.albums', [ 'starter.albums.albumitem'])

.controller('AlbumsCtrl', function($scope) {

  $scope.albums = [
    { title: 'Nature', id: 1 },
    { title: 'Animals', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 },
  ];

});
