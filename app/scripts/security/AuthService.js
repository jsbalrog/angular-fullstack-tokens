'use strict';

angular.module('myApp').factory('Auth', function Auth($window, $http, $location, $rootScope, $q) {

  // Get currentUser from sessionStorage token
  $rootScope.currentUser = getUserFromSessionStorage();
  //$cookieStore.remove('user');

  function getUserFromSessionStorage() {
    var token = $window.sessionStorage.token || null;

    if(token) {
      //$rootScope.isAuthenticated = true;
      var encodedProfile = token.split('.')[1];
      var profile = JSON.parse(urlBase64Decode(encodedProfile));
      return profile;
    }
    return undefined;
  }


  function urlBase64Decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
  }

  return {

    /**
     * Authenticate user
     *
     * @param  {Object}   user     - login info
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    login: function(user, callback) {
      var deferred = $q.defer(),
          cb = callback || angular.noop;
      $http.post('/login', user)
        .success(function(data) {
          $window.sessionStorage.token = data.token;
          $rootScope.isAuthenticated = true;
          var encodedProfile = data.token.split('.')[1];
          var profile = JSON.parse(urlBase64Decode(encodedProfile));
          $rootScope.currentUser = profile;
          console.log('Welcome ' + profile.name);
          cb();
          deferred.resolve(profile);
        })
        .error(function(data) {
          delete $window.sessionStorage.token;
          $rootScope.isAuthenticated = false;
          $rootScope.currentUser = null;
          cb(data.error);
          deferred.reject($rootScope.currentUser);
        });
      return deferred.promise;
    },

    /**
     * Unauthenticate user
     *
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    logout: function(callback) {
      var deferred = $q.defer(),
          cb = callback || angular.noop;
      delete $window.sessionStorage.token;
      $rootScope.isAuthenticated = false;
      $rootScope.currentUser = null;
      cb();
      deferred.resolve();
      return deferred.promise;
    },

    /**
     * Create a new user
     *
     * @param  {Object}   user     - user info
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    createUser: function(user, callback) {
      var deferred = $q.defer(),
          cb = callback || angular.noop;

      $http.post('/users/create', user)
        .success(function(data) {
          $window.sessionStorage.token = data.token;
          $rootScope.isAuthenticated = true;
          var encodedProfile = data.token.split('.')[1];
          var profile = JSON.parse(urlBase64Decode(encodedProfile));
          $rootScope.currentUser = profile;
          console.log('Welcome ' + profile.name);
          cb(user);
          deferred.resolve(profile);
        })
        .error(function(data) {
          delete $window.sessionStorage.token;
          $rootScope.isAuthenticated = false;
          $rootScope.currentUser = null;
          cb(data.error);
          deferred.reject($rootScope.currentUser);
        });
      return deferred.promise;
    },

    /**
     * Change password
     *
     * @param  {String}   oldPassword
     * @param  {String}   newPassword
     * @param  {Function} callback    - optional
     * @return {Promise}
     */
    changePassword: function(oldPassword, newPassword, callback) {
      var deferred = $q.defer(),
          cb = callback || angular.noop;

      $http.put('/api/users/changePassword', {oldPassword: oldPassword, newPassword: newPassword})
        .success(function(data) {
          console.log('Password successfully changed');
          cb(data.user);
          deferred.resolve(data.user);
        })
        .error(function(data) {
          console.log('Error');
          cb(data.error);
          deferred.reject(data.error);
        });
      return deferred.promise;
    },

    /**
     * Gets all available info on authenticated user
     *
     * @return {Object} user
     */
    currentUser: function() {
      return $rootScope.currentUser;
    },

    /**
     * Simple check to see if a user is logged in
     *
     * @return {Boolean}
     */
    isLoggedIn: function() {
      var user = $rootScope.currentUser;
      return !!user;
    },
  };
});
