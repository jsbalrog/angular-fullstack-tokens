'use strict';

angular.module('myApp', ['pascalprecht.translate', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute']).config(function ($translateProvider, $routeProvider, $locationProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/system/main',
      controller: 'MainCtrl'
    })
    .when('/login', {
      templateUrl: 'partials/security/login',
      controller: 'LoginCtrl'
    })
    .when('/signup', {
      templateUrl: 'partials/system/signup',
      controller: 'SignupCtrl'
    })
    .when('/settings', {
      templateUrl: 'partials/system/settings',
      controller: 'SettingsCtrl',
      authenticate: true
    })
    .otherwise({
      redirectTo: '/'
    });

  // These next two lines specify looking for localization strings at:
  // locales/strings.json?lang=en_US
  $translateProvider.useUrlLoader('locales/strings.json');
  $translateProvider.preferredLanguage('en_US');

  $locationProvider.html5Mode(true);

  $httpProvider.interceptors.push('authInterceptor');

  // Intercept 401s and redirect you to login
  $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
    return {
      'responseError': function(response) {
        if(response.status === 401) {
          $location.path('/login');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  }]);
})
.run(function ($rootScope, $location, Auth) {

  // Redirect to login if route requires auth and you're not logged in
  $rootScope.$on('$routeChangeStart', function (event, next) {

    if (next.authenticate && !Auth.isLoggedIn()) {
      $location.path('/login');
    }
  });
});
