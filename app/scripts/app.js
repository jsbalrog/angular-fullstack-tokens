'use strict';

angular.module('myApp', ['pascalprecht.translate', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'facebook', 'config']).config(function ($translateProvider, $routeProvider, $locationProvider, $httpProvider, $facebookProvider, ENV) {
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

  $facebookProvider.init({appId: ENV.appId});

  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers
    .common['X-Requested-With'];

  // These next two lines specify looking for localization strings at:
  // locales/strings.json?lang=en-US
  $translateProvider.useUrlLoader('locales/strings.json');
  $translateProvider.preferredLanguage('en-US');
  $translateProvider.useLocalStorage();

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
