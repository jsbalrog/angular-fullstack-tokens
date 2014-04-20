'use strict';

angular.module('myApp').controller('LoginCtrl', function ($scope, Auth, $location, $facebook) {
  $scope.user = {};
  $scope.errors = {};

  $scope.login = function(form) {
    $scope.submitted = true;

    if(form.$valid) {
      Auth.login({
        email: $scope.user.email,
        password: $scope.user.password
      })
      .then(function() {
        // Logged in, redirect to home
        $location.path('/');
      });
    }
  };

  $scope.loginFacebook = function() {
    $facebook.login({scope:'email'}).then(function(response) {
      console.log(response);
      $scope.me();
    },
    function(response) {
      console.log(response);
    });
  };

  $scope.getLoginStatus = function() {
  };

  $scope.me = function() {
    $facebook.api('/me', {fields: 'id, name, email, username'}).then(function(response) {
      console.log(response);
      Auth.loginFacebook(response).then(function() {
        $location.path('/');
      });
    });
  };

});
