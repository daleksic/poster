angular.module('starter.effect', [])

.controller('EffectCtrl', function($scope, $ionicPopover, $state, $window) {

    $scope.height = $window.innerHeight - 45;
    $scope.selectedColor = '';

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
});
