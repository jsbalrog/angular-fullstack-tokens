'use strict';

angular.module('myApp').controller('NavbarCtrl', function ($scope, $location, Auth) {
  $scope.menu = [{
    'title': 'Home',
    'link': '/'
  }, {
    'title': 'Settings',
    'link': '/settings'
  }];

  $scope.logout = function() {
    Auth.logout()
    .then(function() {
      $location.path('/login');
    });
  };

  // Used to show active menu item
  $scope.isActive = function(route) {
    return route === $location.path();
  };
});
