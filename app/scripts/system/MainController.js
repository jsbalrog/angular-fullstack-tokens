'use strict';

angular.module('myApp').controller('MainCtrl', function ($rootScope, $scope, $http) {
  $http.get('/awesomeThings').success(function(awesomeThings) {
    $scope.awesomeThings = awesomeThings;
  });
});
